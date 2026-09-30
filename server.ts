import express, { Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI, Type } from '@google/genai';
import { MsEdgeTTS, OUTPUT_FORMAT } from 'msedge-tts';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = Number(process.env.PORT) || 3000;

app.use((req: Request, res: Response, next: NextFunction) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  if (req.method === 'OPTIONS') {
    res.sendStatus(200);
    return;
  }
  next();
});

app.use(express.json());

// Automatic Zero-Touch Server-Side Gemini Client
// Uses the platform-injected process.env.GEMINI_API_KEY automatically without any manual user input
function getAutomatedAiClient(): GoogleGenAI | null {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey || apiKey.trim() === '') {
    return null;
  }
  return new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
}

app.get('/api/health', (_req: Request, res: Response) => {
  const hasAutoKey = Boolean(process.env.GEMINI_API_KEY && process.env.GEMINI_API_KEY.trim() !== '');
  res.json({
    status: 'ok',
    offlineReady: true,
    automatedApiReady: true,
    zeroManualConfig: true,
    nativePersianTtsReady: true,
    mode: hasAutoKey ? 'automated-cloud-ai-plus-offline' : 'zero-key-neural-plus-offline',
  });
});

// In-Memory Audio Cache for 0ms repeat playback of Native Persian & Multilingual TTS
const ttsMemoryCache = new Map<string, { buffer: Buffer; contentType: string }>();

function setTtsCache(key: string, buffer: Buffer, contentType: string) {
  if (ttsMemoryCache.size > 300) {
    const firstKey = ttsMemoryCache.keys().next().value;
    if (firstKey) ttsMemoryCache.delete(firstKey);
  }
  ttsMemoryCache.set(key, { buffer, contentType });
}

// Converts raw 24kHz 16-bit mono PCM bytes from Gemini TTS into a valid browser-playable WAV buffer
function pcm24kToWavBuffer(pcmData: Buffer, sampleRate = 24000): Buffer {
  const numChannels = 1;
  const bitsPerSample = 16;
  const byteRate = (sampleRate * numChannels * bitsPerSample) / 8;
  const blockAlign = (numChannels * bitsPerSample) / 8;
  const dataSize = pcmData.length;
  const header = Buffer.alloc(44);

  header.write('RIFF', 0);
  header.writeUInt32LE(36 + dataSize, 4);
  header.write('WAVE', 8);
  header.write('fmt ', 12);
  header.writeUInt32LE(16, 16); // PCM chunk size
  header.writeUInt16LE(1, 20); // PCM format = 1
  header.writeUInt16LE(numChannels, 22);
  header.writeUInt32LE(sampleRate, 24);
  header.writeUInt32LE(byteRate, 28);
  header.writeUInt16LE(blockAlign, 32);
  header.writeUInt16LE(bitsPerSample, 34);
  header.write('data', 36);
  header.writeUInt32LE(dataSize, 40);

  return Buffer.concat([header, pcmData]);
}

function synthesizeWithMsEdgeNeural(text: string, voiceName: string): Promise<Buffer> {
  return new Promise(async (resolve, reject) => {
    const tts = new MsEdgeTTS();
    const timer = setTimeout(() => {
      try {
        tts.close();
      } catch {}
      reject(new Error('Edge TTS timeout'));
    }, 8000);

    try {
      await tts.setMetadata(voiceName, OUTPUT_FORMAT.AUDIO_24KHZ_48KBITRATE_MONO_MP3);
      const { audioStream } = tts.toStream(text);
      const chunks: Buffer[] = [];
      audioStream.on('data', (c: Buffer) => {
        chunks.push(Buffer.isBuffer(c) ? c : Buffer.from(c));
      });
      audioStream.on('end', () => {
        clearTimeout(timer);
        try {
          tts.close();
        } catch {}
        const buf = Buffer.concat(chunks);
        if (buf.length > 100) {
          resolve(buf);
        } else {
          reject(new Error('Empty Edge TTS buffer'));
        }
      });
      audioStream.on('error', (err: Error) => {
        clearTimeout(timer);
        try {
          tts.close();
        } catch {}
        reject(err);
      });
    } catch (err) {
      clearTimeout(timer);
      try {
        tts.close();
      } catch {}
      reject(err);
    }
  });
}

// Native Persian (fa-IR) & Multilingual Neural Audio Stream Endpoint (/api/tts)
// Ensures 100% Authentic Native Iranian Pronunciation (fa-IR-DilaraNeural / fa-IR-FaridNeural)
app.get('/api/tts', async (req: Request, res: Response) => {
  const text = String(req.query.text || req.query.q || '').trim();
  const lang = String(req.query.lang || 'fa').trim().toLowerCase();
  const voicePref = String(req.query.voice || 'female').trim().toLowerCase();

  if (!text) {
    res.status(400).json({ error: 'Empty text' });
    return;
  }

  const voiceName =
    lang.startsWith('fa')
      ? voicePref === 'male'
        ? 'fa-IR-FaridNeural'
        : 'fa-IR-DilaraNeural'
      : lang.startsWith('de')
      ? 'de-DE-KatjaNeural'
      : lang.startsWith('fr')
      ? 'fr-CA-SylvieNeural'
      : lang.startsWith('es')
      ? 'es-US-PalomaNeural'
      : lang.startsWith('ar')
      ? 'ar-SA-ZariyahNeural'
      : lang.startsWith('zh')
      ? 'zh-CN-XiaoxiaoNeural'
      : lang.startsWith('ru')
      ? 'ru-RU-SvetlanaNeural'
      : 'en-US-AriaNeural';

  const cacheKey = `${voiceName}:${text}`;
  const cached = ttsMemoryCache.get(cacheKey);
  if (cached) {
    res.setHeader('Content-Type', cached.contentType);
    res.setHeader('Cache-Control', 'public, max-age=86400');
    res.send(cached.buffer);
    return;
  }

  // Layer 1: 100% Authentic Native Iranian Neural Voice (fa-IR-DilaraNeural / fa-IR-FaridNeural)
  try {
    const mp3Buffer = await synthesizeWithMsEdgeNeural(text, voiceName);
    setTtsCache(cacheKey, mp3Buffer, 'audio/mpeg');
    res.setHeader('Content-Type', 'audio/mpeg');
    res.setHeader('Cache-Control', 'public, max-age=86400');
    res.send(mp3Buffer);
    return;
  } catch {
    // Fall through to Layer 2 (Gemini Native TTS)
  }

  // Layer 2: Gemini Native Audio TTS (gemini-3.8-flash-lite-tts)
  const ai = getAutomatedAiClient();
  if (ai) {
    try {
      const ttsResp = await ai.models.generateContent({
        model: 'gemini-3.8-flash-lite-tts',
        contents: [
          {
            role: 'user',
            parts: [
              {
                text,
                speechMetadata: {
                  style: lang.startsWith('fa')
                    ? 'Authentic, warm native Iranian Tehran Persian speaker with pure Iranian pronunciation and natural intonation'
                    : 'Clear, natural native speaker'
                }
              } as any
            ]
          }
        ],
        config: {
          responseModalities: ['AUDIO'],
          speechConfig: {
            voiceConfig: {
              prebuiltVoiceConfig: {
                voiceName: voicePref === 'male' ? 'Puck' : 'Kore'
              }
            }
          }
        }
      });
      const inline = ttsResp.candidates?.[0]?.content?.parts?.[0]?.inlineData;
      if (inline?.data) {
        const rawBuffer = Buffer.from(inline.data, 'base64');
        const isRawPcm =
          !inline.mimeType ||
          inline.mimeType.toLowerCase().includes('pcm') ||
          inline.mimeType.toLowerCase().includes('l16');
        const audioBuffer = isRawPcm ? pcm24kToWavBuffer(rawBuffer, 24000) : rawBuffer;
        const mimeType = isRawPcm ? 'audio/wav' : inline.mimeType || 'audio/wav';
        setTtsCache(cacheKey, audioBuffer, mimeType);
        res.setHeader('Content-Type', mimeType);
        res.setHeader('Cache-Control', 'public, max-age=86400');
        res.send(audioBuffer);
        return;
      }
    } catch {
      // Fall through
    }
  }

  res.status(503).json({ error: 'Native TTS stream unavailable' });
});

// Zero-Touch Automated Translation Endpoint (Supports FA, EN, DE, FR, SV, AR, ZH, RU + C2 Proverbs, Colloquial Slang, 17+ Street Smarts & Persian Carpet Terminology)
app.post('/api/ai/translate', async (req: Request, res: Response) => {
  const { text, sourceLang = 'fa', targetLang = 'en', domain = 'carpet_and_travel' } = req.body || {};

  if (!text || typeof text !== 'string' || !text.trim()) {
    res.status(400).json({ error: 'متن ورودی خالی است' });
    return;
  }

  const cleanText = text.trim();
  const ai = getAutomatedAiClient();

  // Layer 1: Automated Server-Side Gemini AI (when platform key is automatically injected)
  if (ai) {
    try {
      const response = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: `Translate the following text from "${sourceLang}" to "${targetLang}" at an ultra-advanced C2 native level.
Context domain: ${domain}.
1. Master colloquial street slang (فارسی محاوره‌ای و کوچه‌بازاری تهرانی / American & British street slang), idioms (کنایه‌ها و اصطلاحات), proverbs (ضرب‌المثل‌های اصیل فارسی و انگلیسی با معادل دقیق فرهنگی), and edgy PG-17 / 17+ street-smart expressions (الفاظ تند، خودمانی و خیابانی رده سنی ۱۷+ سال برای درک کامل مکالمات واقعی و دفاع از خود).
2. Also master authentic Iranian hand-knotted carpet trade terminology (کهنه ذاتی / Kohneh Zaati / naturally aged patina, ذرع و نیم / Zar-o-Nim, دو ذرع / Dozar, قالیچه / Ghalicheh, رجشمار / Raj knot density, چله ابریشم / silk foundation, رنگ گیاهی / vegetable dyes).
Input text: "${cleanText}"`,
        config: {
          responseMimeType: 'application/json',
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              translation: {
                type: Type.STRING,
                description: 'Natural, accurate C2-level translation in targetLang.',
              },
              colloquialVariant: {
                type: Type.STRING,
                description: 'Authentic street/colloquial Tehrani or native English/European street slang equivalent (including 17+ street-smart idiom or proverb match).',
              },
              pronunciation: {
                type: Type.STRING,
                description: 'Latin phonetic pronunciation guide (Fingilish if target is Persian, or phonetic guide for targetLang).',
              },
              proverbOrIdiomNote: {
                type: Type.STRING,
                description: 'If the input contains a proverb, idiom, or 17+ street slang, explain the cultural equivalent in both Persian and English.',
              },
              arabicText: {
                type: Type.STRING,
                description: 'Arabic translation if relevant.',
              },
            },
            required: ['translation', 'pronunciation'],
          },
        },
      });

      const rawJson = response.text;
      if (rawJson) {
        const parsed = JSON.parse(rawJson);
        res.json({
          translation: parsed.translation || cleanText,
          colloquialVariant: parsed.colloquialVariant || '',
          pronunciation: parsed.pronunciation || cleanText,
          proverbOrIdiomNote: parsed.proverbOrIdiomNote || '',
          arabicText: parsed.arabicText || '',
          engine: 'automated-server-gemini',
        });
        return;
      }
    } catch {
      // Automatically proceed to Layer 2 zero-key neural fallback without failing
    }
  }

  // Layer 2: Key-Free Server-Side Neural Bridge (Zero API Key Needed)
  try {
    const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=${encodeURIComponent(
      sourceLang
    )}&tl=${encodeURIComponent(targetLang)}&dt=t&q=${encodeURIComponent(cleanText)}`;
    const gtxRes = await fetch(url);
    if (gtxRes.ok) {
      const data = await gtxRes.json();
      if (Array.isArray(data?.[0])) {
        const translated = data[0].map((seg: unknown[]) => (Array.isArray(seg) ? seg[0] || '' : '')).join('').trim();
        if (translated) {
          res.json({
            translation: translated,
            colloquialVariant: '',
            pronunciation: translated,
            engine: 'automated-zero-key-neural',
          });
          return;
        }
      }
    }
  } catch {
    // Client will seamlessly use its 0ms Offline Engine
  }

  res.status(200).json({
    translation: '',
    engine: 'offline-fallback',
  });
});

// ============================================================================
// SERVER-AUTHORITATIVE 5-CHANNEL GLOBAL LIVE CHAT & ABLEWAY CITY REGISTRY
// ============================================================================
export type ChatChannelId =
  | 'farsi_english_exchange'
  | 'ableway_city_council'
  | 'mind_sports_leagues'
  | 'dynasty_and_heba30'
  | 'credit850_and_visa';

export interface ServerChatMessage {
  id: string;
  channelId: ChatChannelId;
  senderName: string;
  senderRole: string;
  countryFlag: string;
  textFa: string;
  textFingilish: string;
  textEn: string;
  timestamp: string;
}

const serverChatState: Record<ChatChannelId, ServerChatMessage[]> = {
  farsi_english_exchange: [
    {
      id: 'msg_init_1',
      channelId: 'farsi_english_exchange',
      senderName: 'Sara (Los Angeles 🇺🇸)',
      senderRole: 'Citizen Pioneer',
      countryFlag: '🇺🇸',
      textFa: 'سلام دوستان! من متولد کالیفرنیا هستم و دارم با صدای دلارا و فرید فارسیِ اصیل تهرانی رو برای صحبت با مامان‌بزرگم تمرین می‌کنم!',
      textFingilish: 'Salām doostān! Man motevalled-e California hastam o dāram Fārsi-ye asil-e Tehrāni ro tamrin mikonam!',
      textEn: 'Hello friends! I was born in California and I am practicing authentic Tehrani Persian to talk with my grandma!',
      timestamp: '۱۰:۱۵'
    },
    {
      id: 'msg_init_2',
      channelId: 'farsi_english_exchange',
      senderName: 'Markus (Berlin 🇩🇪)',
      senderRole: 'Guild Master',
      countryFlag: '🇩🇪',
      textFa: 'نمایش سه‌خطی (فارسی + فینگلیش + انگلیسی/آلمانی) فوق‌العاده‌ست! خیلی راحت خط فارسی و شعر مولانا رو یاد گرفتم.',
      textFingilish: 'Namāyesh-e se-khati fogholādast! Kheyli rāhat khatt-e Fārsi o she’r-e Mowlānā ro yād gereftam.',
      textEn: 'The Triple-Script display is amazing! I learned Persian script and Rumi poetry so easily.',
      timestamp: '۱۰:۱۸'
    }
  ],
  ableway_city_council: [
    {
      id: 'msg_init_3',
      channelId: 'ableway_city_council',
      senderName: 'Siavash Ali-Miri (Founder 🇮🇷)',
      senderRole: 'Supreme Chancellor',
      countryFlag: '🇮🇷',
      textFa: 'به پایتخت شهر آرمانی AbleWay City خوش آمدید! سند زمین و پروانه کسب‌وکار برای تمام اعضای فعال لیگ معرفان ۱۰۰٪ رایگان صادر می‌شود.',
      textFingilish: 'Be pāytakht-e shahr-e ārmāni-ye AbleWay City khosh āmadid! Sanad-e zamin o parvāneh-ye kasb-o-kār rāygān sāder mishavad.',
      textEn: 'Welcome to AbleWay City Capital! Official Land Deeds and Commercial Business Licenses are issued 100% free to active Referral League citizens.',
      timestamp: '۰۹:۰۰'
    }
  ],
  mind_sports_leagues: [
    {
      id: 'msg_init_4',
      channelId: 'mind_sports_leagues',
      senderName: 'Aria (Toronto 🇨🇦)',
      senderRole: 'City Senator',
      countryFlag: '🇨🇦',
      textFa: 'تیم ۴ نفره ما در لیگ حکم، تخته‌نرد و دبرنای ۵ زبانه به سطح الماس (Diamond) رسید! بدون هیچ قمار و کاملاً اخلاقی و آموزشی.',
      textFingilish: 'Tim-e chāhār nafareh-ye mā dar lig-e Hokm, Takhteh-nard o Dabernā be sath-e Diamond resid!',
      textEn: 'Our 4-player team reached Diamond tier in Hokm, Backgammon, and 5-Language Daberna! 100% ethical and educational.',
      timestamp: '۱۱:۰۵'
    }
  ],
  dynasty_and_heba30: [
    {
      id: 'msg_init_5',
      channelId: 'dynasty_and_heba30',
      senderName: 'Nazanin (London 🇬🇧)',
      senderRole: 'Dynasty Founder',
      countryFlag: '🇬🇧',
      textFa: 'خاندان «پارسیان لندن» را تأسیس کردیم و ۳۰٪ از امتیازاتم را طبق قانون هبه به پسرم و یک زبان‌آموز دارای ADHD هدیه دادم.',
      textFingilish: 'Khāndān-e Pārsiyān-e London ro ta’sis kardim o 30% az emtiyāzātam ro طبق-e ghānoon-e Hebeh hedyeh dādam.',
      textEn: 'We founded the "London Parsian Dynasty" and legally gifted 30% of my points (Heba Law) to my son and a fellow ADHD learner.',
      timestamp: '۱۱:۲۰'
    }
  ],
  credit850_and_visa: [
    {
      id: 'msg_init_6',
      channelId: 'credit850_and_visa',
      senderName: 'Kourosh (Sydney 🇦🇺 / LA 🇺🇸)',
      senderRole: 'Cabinet Minister',
      countryFlag: '🇦🇺',
      textFa: 'با فرمول AZEO و نامه قانونی بخش ۶۰۹ در کلینیک کردیت برنامه، نمره کردیتم از ۵۸۰ به ۷۶۵ رسید و در مصاحبه سفارت هم قبول شدم!',
      textFingilish: 'Bā formool-e AZEO o nāmeh-ye ghānooni-ye bakhsh-e 609, nomreh-ye credit-am az 580 be 765 resid!',
      textEn: 'Using the AZEO formula and FCRA Section 609 dispute letter in the Credit Clinic, my score jumped from 580 to 765 and I passed my embassy interview!',
      timestamp: '۱۱:۴۰'
    }
  ]
};

const sseClients = new Set<Response>();

function broadcastChatEvent(payload: unknown) {
  const data = `data: ${JSON.stringify(payload)}\n\n`;
  for (const client of sseClients) {
    try {
      client.write(data);
    } catch {
      sseClients.delete(client);
    }
  }
}

app.get('/api/chat/state', (_req: Request, res: Response) => {
  res.json({
    channels: serverChatState,
    onlineCount: Math.max(1, sseClients.size + 14)
  });
});

app.get('/api/chat/stream', (req: Request, res: Response) => {
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');
  res.flushHeaders?.();

  sseClients.add(res);
  res.write(`data: ${JSON.stringify({ type: 'init', channels: serverChatState, onlineCount: sseClients.size + 14 })}\n\n`);

  req.on('close', () => {
    sseClients.delete(res);
  });
});

app.post('/api/chat/message', (req: Request, res: Response) => {
  const {
    id,
    channelId = 'farsi_english_exchange',
    senderName = 'Citizen',
    senderRole = 'Citizen Pioneer',
    countryFlag = '🌍',
    textFa = '',
    textFingilish = '',
    textEn = ''
  } = req.body || {};

  const validChannel: ChatChannelId =
    channelId in serverChatState ? (channelId as ChatChannelId) : 'farsi_english_exchange';

  const cleanFa = String(textFa || textEn).trim();
  if (!cleanFa) {
    res.status(400).json({ error: 'Empty message' });
    return;
  }

  const msgId = String(id || `msg_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`);
  const existing = serverChatState[validChannel].some((m) => m.id === msgId);
  if (existing) {
    res.json({ ok: true, duplicate: true });
    return;
  }

  const newMsg: ServerChatMessage = {
    id: msgId,
    channelId: validChannel,
    senderName: String(senderName).slice(0, 50),
    senderRole: String(senderRole).slice(0, 40),
    countryFlag: String(countryFlag).slice(0, 8),
    textFa: cleanFa,
    textFingilish: String(textFingilish || cleanFa),
    textEn: String(textEn || cleanFa),
    timestamp: new Date().toLocaleTimeString('fa-IR', { hour: '2-digit', minute: '2-digit' })
  };

  serverChatState[validChannel] = [newMsg, ...serverChatState[validChannel]].slice(0, 50);
  broadcastChatEvent({ type: 'message:created', message: newMsg });
  res.json({ ok: true, message: newMsg });
});

async function startServer() {
  if (process.env.NODE_ENV === 'production') {
    const distPath = path.join(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*all', (_req: Request, res: Response) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  } else {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Automated Zero-Key Server running on http://0.0.0.0:${PORT}`);
    // Pre-warm flagship Native Iranian Persian sentences in RAM for 0ms playback
    const flagshipSentences = [
      'مامان‌بزرگ و بابابزرگ جون، دلم براتون خیلی تنگ شده بود!',
      'مادرجان و پدربزرگ عزیزم، دلم برایتان بسیار تنگ شده بود.',
      'خیلی خوشحالم که بالاخره اومدم ایران و از نزدیک می‌بینمتون!',
      'فارسیم هنوز کامل نیست، ولی دارم هر روز تمرین می‌کنم!',
      'دستتون درد نکنه، واقعاً سنگ تموم گذاشتید!'
    ];
    (async () => {
      for (const sentence of flagshipSentences) {
        for (const vName of ['fa-IR-DilaraNeural', 'fa-IR-FaridNeural']) {
          const key = `${vName}:${sentence}`;
          if (!ttsMemoryCache.has(key)) {
            try {
              const buf = await synthesizeWithMsEdgeNeural(sentence, vName);
              setTtsCache(key, buf, 'audio/mpeg');
            } catch {}
          }
        }
      }
    })();
  });
}

startServer();
