// Universal Sound, Voice-to-Chat (STT) & Chat-to-Voice (TTS) Engine
// Includes:
// 1. Live Visual Caption Events & Haptic Vibration for Deaf / Hard-of-Hearing Users
// 2. Brown Noise WebAudio Generator for ADHD Focus & Calm
// 3. Native Android APK Bridge + Web Speech Synthesis + Fingilish Phonetic Fallback

export interface VisualCaptionEventDetail {
  text: string;
  lang: 'fa' | 'en' | 'ar' | 'zh' | 'ru';
  phonetic?: string;
  timestamp: string;
}

const emitVisualCaptionForDeaf = (text: string, lang: 'fa' | 'en' | 'ar' | 'zh' | 'ru', phonetic?: string) => {
  if (typeof window === 'undefined') return;
  try {
    if ('vibrate' in navigator) {
      navigator.vibrate(35);
    }
    const detail: VisualCaptionEventDetail = {
      text,
      lang,
      phonetic,
      timestamp: new Date().toLocaleTimeString('fa-IR', { hour: '2-digit', minute: '2-digit', second: '2-digit' })
    };
    window.dispatchEvent(new CustomEvent('lingou-visual-caption', { detail }));
  } catch {}
};

class SoundEngine {
  private ctx: AudioContext | null = null;
  private brownNoiseNode: ScriptProcessorNode | null = null;
  private brownNoiseGain: GainNode | null = null;
  public enabled: boolean = true;
  public isBrownNoisePlaying: boolean = false;

  private getContext(): AudioContext | null {
    if (typeof window === 'undefined') return null;
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) this.ctx = new AudioCtx();
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }
    return this.ctx;
  }

  public playClick() {
    if (!this.enabled) return;
    const ctx = this.getContext();
    if (!ctx) return;
    try {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(520, ctx.currentTime);
      gain.gain.setValueAtTime(0.05, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.05);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.05);
    } catch {}
  }

  public playCoin() {
    if (!this.enabled) return;
    const ctx = this.getContext();
    if (!ctx) return;
    try {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(880, ctx.currentTime);
      osc.frequency.setValueAtTime(1174, ctx.currentTime + 0.07);
      gain.gain.setValueAtTime(0.07, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.18);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.18);
    } catch {}
  }

  public playLevelUp() {
    this.playCoin();
  }

  public playError() {
    if (!this.enabled) return;
    const ctx = this.getContext();
    if (!ctx) return;
    try {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(220, ctx.currentTime);
      gain.gain.setValueAtTime(0.05, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.14);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.14);
    } catch {}
  }

  // Soothing Brown Noise Generator for ADHD Focus & Sensory Calm
  public toggleBrownNoise(enable?: boolean): boolean {
    const target = enable !== undefined ? enable : !this.isBrownNoisePlaying;
    if (!target) {
      try {
        if (this.brownNoiseNode) {
          this.brownNoiseNode.disconnect();
          this.brownNoiseNode = null;
        }
        if (this.brownNoiseGain) {
          this.brownNoiseGain.disconnect();
          this.brownNoiseGain = null;
        }
      } catch {}
      this.isBrownNoisePlaying = false;
      return false;
    }

    const ctx = this.getContext();
    if (!ctx) return false;
    try {
      const bufferSize = 4096;
      let lastOut = 0.0;
      const node = ctx.createScriptProcessor(bufferSize, 1, 1);
      node.onaudioprocess = (e) => {
        const output = e.outputBuffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) {
          const white = Math.random() * 2 - 1;
          output[i] = (lastOut + 0.02 * white) / 1.02;
          lastOut = output[i];
          output[i] *= 0.12;
        }
      };
      const gain = ctx.createGain();
      gain.gain.setValueAtTime(0.18, ctx.currentTime);
      node.connect(gain);
      gain.connect(ctx.destination);
      this.brownNoiseNode = node;
      this.brownNoiseGain = gain;
      this.isBrownNoisePlaying = true;
      return true;
    } catch {
      return false;
    }
  }
}

export const sound = new SoundEngine();

export const transliteratePersianToFingilish = (faText: string): string => {
  const wordMap: Record<string, string> = {
    'سلام': 'Salaam',
    'درود': 'Dorood',
    'خوش': 'khosh',
    'آمدید': 'aamadeed',
    'چطورید': 'chetoreed',
    'چطوری': 'chetoree',
    'حالتون': 'haaletoon',
    'خوبم': 'khoobam',
    'ممنون': 'mamnoon',
    'مرسی': 'mersee',
    'ببخشید': 'bebakhsheed',
    'لطفاً': 'lotfan',
    'لطفا': 'lotfan',
    'بی‌زحمت': 'bee-zahmat',
    'کجاست': 'kojaast',
    'چقدر': 'cheghadr',
    'قیمت': 'gheymat',
    'تاکسی': 'taaksee',
    'مترو': 'metro',
    'هتل': 'hotel',
    'فرودگاه': 'foroodgaah',
    'رستوران': 'restoraan',
    'آب': 'aab',
    'چای': 'chaay',
    'نان': 'naan',
    'غذا': 'ghazaa',
    'کمک': 'komak',
    'کنید': 'koneed',
    'من': 'man',
    'شما': 'shomaa',
    'ما': 'maa',
    'این': 'een',
    'آن': 'aan',
    'بله': 'baleh',
    'نه': 'nah',
    'خیر': 'kheyr',
    'دست': 'dast',
    'درد': 'dard',
    'نکنه': 'nakoneh',
    'قابل': 'ghaabel',
    'نداره': 'nadaareh',
    'تعارف': 'taarof',
    'قالی': 'ghaalee',
    'قالیچه': 'ghaaleecheh',
    'گلیم': 'geleem',
    'پشتی': 'poshtee',
    'ذرع': 'zar',
    'نیم': 'neem',
    'چارک': 'chaarak',
    'کهنه': 'kohneh',
    'ذاتی': 'zaatee',
    'نوبافت': 'now-baaft',
    'کارکرده': 'kaar-kardeh',
    'ابریشم': 'abreesham',
    'دمت': 'damet',
    'گرم': 'garm',
    'رفیق': 'rafeegh',
    'داداش': 'daadaash',
    'حساب': 'hesaab',
    'کارت': 'kaart',
    'نقدی': 'naghdee',
    'داروخانه': 'daarookhaaneh',
    'دکتر': 'doktor',
    'گم': 'gom',
    'کردم': 'kardam',
    'خیلی': 'kheylee',
    'خوب': 'khoob',
    'است': 'ast',
    'هست': 'hast',
    'نیست': 'neest'
  };

  let result = faText;
  for (const [faWord, enPhon] of Object.entries(wordMap)) {
    result = result.split(faWord).join(` ${enPhon} `);
  }

  const charMap: Record<string, string> = {
    'آ': 'aa', 'ا': 'a', 'ب': 'b', 'پ': 'p', 'ت': 't', 'ث': 's',
    'ج': 'j', 'چ': 'ch', 'ح': 'h', 'خ': 'kh', 'د': 'd', 'ذ': 'z',
    'ر': 'r', 'ز': 'z', 'ژ': 'zh', 'س': 's', 'ش': 'sh', 'ص': 's',
    'ض': 'z', 'ط': 't', 'ظ': 'z', 'ع': 'a', 'غ': 'gh', 'ف': 'f',
    'ق': 'gh', 'ک': 'k', 'ك': 'k', 'گ': 'g', 'ل': 'l', 'م': 'm',
    'ن': 'n', 'و': 'o', 'ه': 'eh', 'ی': 'ee', 'ي': 'ee', 'ئ': 'y',
    '؟': '?', '،': ',', '«': '"', '»': '"', '‌': ' '
  };

  let out = '';
  for (const ch of result) {
    out += charMap[ch] !== undefined ? charMap[ch] : ch;
  }
  return out.replace(/\s+/g, ' ').trim();
};

export const speakEnglish = (
  text: string,
  rate: number = 0.9,
  lang: string = 'en-US'
) => {
  if (typeof window === 'undefined' || !text) return;
  emitVisualCaptionForDeaf(text, 'en', text);
  try {
    const androidBridge = (window as any).AndroidBridge;
    if (androidBridge && typeof androidBridge.speak === 'function') {
      androidBridge.speak(text, 'en');
      return;
    }

    if (!('speechSynthesis' in window)) return;
    if (window.speechSynthesis.speaking || window.speechSynthesis.pending) {
      window.speechSynthesis.cancel();
    }
    setTimeout(() => {
      try {
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = lang;
        utterance.rate = rate;
        const voices = window.speechSynthesis.getVoices() || [];
        const preferred = voices.find(v => v.lang.startsWith('en'));
        if (preferred) utterance.voice = preferred;
        window.speechSynthesis.speak(utterance);
      } catch {}
    }, 45);
  } catch {}
};

export const speakPersian = (
  text: string,
  rate: number = 0.85,
  fingilishHint?: string
) => {
  if (typeof window === 'undefined' || !text) return;
  const phoneticText = fingilishHint || transliteratePersianToFingilish(text);
  emitVisualCaptionForDeaf(text, 'fa', phoneticText);
  try {
    const androidBridge = (window as any).AndroidBridge;
    if (androidBridge && typeof androidBridge.speakPersian === 'function') {
      androidBridge.speakPersian(text, phoneticText);
      return;
    }

    if (!('speechSynthesis' in window)) return;
    if (window.speechSynthesis.speaking || window.speechSynthesis.pending) {
      window.speechSynthesis.cancel();
    }
    setTimeout(() => {
      try {
        const voices = window.speechSynthesis.getVoices() || [];
        const farsiVoice = voices.find(v =>
          v.lang.toLowerCase().startsWith('fa') ||
          v.name.toLowerCase().includes('persian') ||
          v.name.toLowerCase().includes('farsi')
        );
        const arabicVoice = voices.find(v => v.lang.toLowerCase().startsWith('ar'));

        const utterance = new SpeechSynthesisUtterance();
        utterance.rate = rate;

        if (farsiVoice) {
          utterance.text = text;
          utterance.lang = 'fa-IR';
          utterance.voice = farsiVoice;
        } else if (arabicVoice && /[\u0600-\u06FF]/.test(text)) {
          utterance.text = text;
          utterance.lang = arabicVoice.lang;
          utterance.voice = arabicVoice;
        } else {
          utterance.text = phoneticText;
          utterance.lang = 'en-US';
        }
        window.speechSynthesis.speak(utterance);
      } catch {}
    }, 45);
  } catch {}
};

export const speakArabic = (
  text: string,
  rate: number = 0.85,
  phoneticHint?: string
) => {
  if (typeof window === 'undefined' || !text) return;
  const phon = phoneticHint || transliteratePersianToFingilish(text);
  emitVisualCaptionForDeaf(text, 'ar', phon);
  try {
    const androidBridge = (window as any).AndroidBridge;
    if (androidBridge && typeof androidBridge.speak === 'function') {
      androidBridge.speak(text, 'ar');
      return;
    }

    if (!('speechSynthesis' in window)) return;
    if (window.speechSynthesis.speaking || window.speechSynthesis.pending) {
      window.speechSynthesis.cancel();
    }
    setTimeout(() => {
      try {
        const voices = window.speechSynthesis.getVoices() || [];
        const arabicVoice = voices.find(v => v.lang.toLowerCase().startsWith('ar') || v.name.toLowerCase().includes('arabic'));
        const utterance = new SpeechSynthesisUtterance();
        utterance.rate = rate;
        if (arabicVoice) {
          utterance.text = text;
          utterance.lang = arabicVoice.lang;
          utterance.voice = arabicVoice;
        } else {
          utterance.text = phon;
          utterance.lang = 'en-US';
        }
        window.speechSynthesis.speak(utterance);
      } catch {}
    }, 45);
  } catch {}
};

export const speakChinese = (
  text: string,
  rate: number = 0.85,
  pinyinHint?: string
) => {
  if (typeof window === 'undefined' || !text) return;
  emitVisualCaptionForDeaf(text, 'zh', pinyinHint || text);
  try {
    const androidBridge = (window as any).AndroidBridge;
    if (androidBridge && typeof androidBridge.speak === 'function') {
      androidBridge.speak(text, 'zh');
      return;
    }

    if (!('speechSynthesis' in window)) return;
    if (window.speechSynthesis.speaking || window.speechSynthesis.pending) {
      window.speechSynthesis.cancel();
    }
    setTimeout(() => {
      try {
        const voices = window.speechSynthesis.getVoices() || [];
        const zhVoice = voices.find(v => v.lang.toLowerCase().startsWith('zh') || v.name.toLowerCase().includes('chinese'));
        const utterance = new SpeechSynthesisUtterance(zhVoice ? text : (pinyinHint || text));
        utterance.lang = zhVoice ? zhVoice.lang : 'zh-CN';
        if (zhVoice) utterance.voice = zhVoice;
        utterance.rate = rate;
        window.speechSynthesis.speak(utterance);
      } catch {}
    }, 45);
  } catch {}
};

export const speakRussian = (
  text: string,
  rate: number = 0.85,
  phoneticHint?: string
) => {
  if (typeof window === 'undefined' || !text) return;
  emitVisualCaptionForDeaf(text, 'ru', phoneticHint || text);
  try {
    const androidBridge = (window as any).AndroidBridge;
    if (androidBridge && typeof androidBridge.speak === 'function') {
      androidBridge.speak(text, 'ru');
      return;
    }

    if (!('speechSynthesis' in window)) return;
    if (window.speechSynthesis.speaking || window.speechSynthesis.pending) {
      window.speechSynthesis.cancel();
    }
    setTimeout(() => {
      try {
        const voices = window.speechSynthesis.getVoices() || [];
        const ruVoice = voices.find(v => v.lang.toLowerCase().startsWith('ru') || v.name.toLowerCase().includes('russian'));
        const utterance = new SpeechSynthesisUtterance(ruVoice ? text : (phoneticHint || text));
        utterance.lang = ruVoice ? ruVoice.lang : 'ru-RU';
        if (ruVoice) utterance.voice = ruVoice;
        utterance.rate = rate;
        window.speechSynthesis.speak(utterance);
      } catch {}
    }, 45);
  } catch {}
};

