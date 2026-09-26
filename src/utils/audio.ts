// Audio, Speech Synthesis & Calming Noise Generator for English-lingou
// Supports 100% offline text-to-speech for English and Persian, plus ADHD Calming Brown Noise!

class SoundEngine {
  private ctx: AudioContext | null = null;
  public enabled: boolean = true;
  private noiseNode: AudioNode | null = null;
  private noiseGain: GainNode | null = null;
  public isNoisePlaying: boolean = false;

  private getContext(): AudioContext | null {
    if (typeof window === 'undefined') return null;
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }
    return this.ctx;
  }

  playChime() {
    if (!this.enabled) return;
    try {
      const ctx = this.getContext();
      if (!ctx) return;
      const now = ctx.currentTime;
      
      const osc1 = ctx.createOscillator();
      const osc2 = ctx.createOscillator();
      const gain = ctx.createGain();

      osc1.type = 'sine';
      osc2.type = 'triangle';

      osc1.frequency.setValueAtTime(523.25, now);
      osc1.frequency.exponentialRampToValueAtTime(783.99, now + 0.15);
      osc1.frequency.exponentialRampToValueAtTime(1046.50, now + 0.3);

      osc2.frequency.setValueAtTime(659.25, now);
      osc2.frequency.exponentialRampToValueAtTime(1318.51, now + 0.3);

      gain.gain.setValueAtTime(0.2, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.6);

      osc1.connect(gain);
      osc2.connect(gain);
      gain.connect(ctx.destination);

      osc1.start(now);
      osc2.start(now);
      osc1.stop(now + 0.6);
      osc2.stop(now + 0.6);
    } catch {}
  }

  playCoin() {
    if (!this.enabled) return;
    try {
      const ctx = this.getContext();
      if (!ctx) return;
      const now = ctx.currentTime;

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(987.77, now);
      osc.frequency.setValueAtTime(1318.51, now + 0.08);

      gain.gain.setValueAtTime(0.15, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.35);
    } catch {}
  }

  playLevelUp() {
    if (!this.enabled) return;
    try {
      const ctx = this.getContext();
      if (!ctx) return;
      const now = ctx.currentTime;

      const freqs = [440, 554.37, 659.25, 880];
      freqs.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, now + idx * 0.1);

        gain.gain.setValueAtTime(0.2, now + idx * 0.1);
        gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.1 + 0.35);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(now + idx * 0.1);
        osc.stop(now + idx * 0.1 + 0.35);
      });
    } catch {}
  }

  playError() {
    if (!this.enabled) return;
    try {
      const ctx = this.getContext();
      if (!ctx) return;
      const now = ctx.currentTime;

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(220, now);
      osc.frequency.linearRampToValueAtTime(130, now + 0.25);

      gain.gain.setValueAtTime(0.15, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.3);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.3);
    } catch {}
  }

  playClick() {
    if (!this.enabled) return;
    try {
      const ctx = this.getContext();
      if (!ctx) return;
      const now = ctx.currentTime;

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(800, now);
      gain.gain.setValueAtTime(0.05, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.04);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.04);
    } catch {}
  }

  // ADHD Calming Brown Noise Generator (Scientific audio filter to anchor scattered thoughts)
  startCalmBrownNoise() {
    if (this.isNoisePlaying) return;
    try {
      const ctx = this.getContext();
      if (!ctx) return;

      const bufferSize = ctx.sampleRate * 2;
      const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const output = noiseBuffer.getChannelData(0);
      let lastOut = 0.0;

      for (let i = 0; i < bufferSize; i++) {
        const white = Math.random() * 2 - 1;
        output[i] = (lastOut + (0.02 * white)) / 1.02;
        lastOut = output[i];
        output[i] *= 3.5; // Gain compensation
      }

      const whiteNoise = ctx.createBufferSource();
      whiteNoise.buffer = noiseBuffer;
      whiteNoise.loop = true;

      // Soft low-pass filter (like gentle rain or ocean waves)
      const filter = ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(380, ctx.currentTime);

      const gain = ctx.createGain();
      gain.gain.setValueAtTime(0.035, ctx.currentTime); // Very gentle and unobtrusive

      whiteNoise.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      whiteNoise.start();
      this.noiseNode = whiteNoise;
      this.noiseGain = gain;
      this.isNoisePlaying = true;
    } catch {}
  }

  stopCalmBrownNoise() {
    if (!this.isNoisePlaying) return;
    try {
      if (this.noiseNode && 'stop' in this.noiseNode) {
        (this.noiseNode as AudioBufferSourceNode).stop();
        this.noiseNode.disconnect();
      }
      if (this.noiseGain) {
        this.noiseGain.disconnect();
      }
      this.noiseNode = null;
      this.noiseGain = null;
      this.isNoisePlaying = false;
    } catch {}
  }
}

export const sound = new SoundEngine();

// Automatic Persian script to phonetic Latin (Fingilish) converter
// Ensures mobile devices without a native fa-IR TTS voice pack still speak Persian audibly!
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
    'نیست': 'neest',
    'می‌خواهم': 'meekhaaham',
    'میخوام': 'meekhaam',
    'بروم': 'beravam',
    'برم': 'beram'
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
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;
  try {
    if (window.speechSynthesis.speaking || window.speechSynthesis.pending) {
      window.speechSynthesis.cancel();
    }
    setTimeout(() => {
      try {
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = lang;
        utterance.rate = rate;

        const voices = window.speechSynthesis.getVoices();
        if (voices && voices.length > 0) {
          const preferredVoice = voices.find(v => 
            (v.lang.startsWith(lang.substring(0, 2)) && (v.name.includes('Natural') || v.name.includes('Google') || v.name.includes('Siri') || v.name.includes('Samantha') || v.name.includes('Daniel')))
          ) || voices.find(v => v.lang.startsWith('en'));

          if (preferredVoice) utterance.voice = preferredVoice;
        }

        window.speechSynthesis.speak(utterance);
      } catch {}
    }, 60);
  } catch {}
};

export const speakPersian = (
  text: string,
  rate: number = 0.85,
  fingilishHint?: string
) => {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;
  try {
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
          // Arabic TTS engine on mobile reads Persian script letters naturally
          utterance.text = text;
          utterance.lang = arabicVoice.lang;
          utterance.voice = arabicVoice;
        } else {
          // Fallback for mobile devices without Persian/Arabic TTS pack: read phonetic Fingilish!
          const phoneticText = fingilishHint || transliteratePersianToFingilish(text);
          utterance.text = phoneticText;
          utterance.lang = 'en-US';
        }

        window.speechSynthesis.speak(utterance);
      } catch {}
    }, 60);
  } catch {}
};

export const speakArabic = (
  text: string,
  rate: number = 0.85,
  phoneticHint?: string
) => {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;
  try {
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
          utterance.text = phoneticHint || transliteratePersianToFingilish(text);
          utterance.lang = 'en-US';
        }
        window.speechSynthesis.speak(utterance);
      } catch {}
    }, 60);
  } catch {}
};

export const speakTarget = (text: string, isPersian: boolean, rate: number = 0.9) => {
  if (isPersian) speakPersian(text, rate);
  else speakEnglish(text, rate);
};
