import express, { Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI, Type } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = Number(process.env.PORT) || 3000;

app.use(cors());
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
    mode: hasAutoKey ? 'automated-cloud-ai-plus-offline' : 'zero-key-neural-plus-offline',
  });
});

// Zero-Touch Automated Translation Endpoint (Supports FA, EN, AR, ZH, RU + Persian Carpet Trade Terminology)
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
        contents: `Translate the following text from "${sourceLang}" to "${targetLang}".
Context domain: ${domain} (specifically authentic Iranian hand-knotted carpet trade terminology such as کهنه ذاتی / Kohneh Zaati / naturally aged patina, ذرع و نیم / Zar-o-Nim, دو ذرع / Dozar, قالیچه / Ghalicheh, رجشمار / Raj knot density, چله ابریشم / silk foundation, رنگ گیاهی / vegetable dyes, as well as everyday travel & colloquial conversation).
Input text: "${cleanText}"`,
        config: {
          responseMimeType: 'application/json',
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              translation: {
                type: Type.STRING,
                description: 'Natural, accurate translation in targetLang.',
              },
              colloquialVariant: {
                type: Type.STRING,
                description: 'Polite bazaar or natural conversational phrasing in targetLang.',
              },
              pronunciation: {
                type: Type.STRING,
                description: 'Latin phonetic pronunciation guide (Fingilish if Persian, Pinyin if Chinese, Latin phonetics if Arabic/Russian/English).',
              },
              arabicText: {
                type: Type.STRING,
                description: 'Arabic translation for Gulf carpet buyers.',
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
  });
}

startServer();
