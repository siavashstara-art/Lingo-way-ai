// Offline AI Teacher and Rule-based Intelligence Engine
// Operates 100% in-browser without requiring an internet connection or external servers!

import { BILINGUAL_KNOWLEDGE_BASE, OFFLINE_GRAMMAR_BRIDGE, BilingualUnit } from '../data/bilingual';

export interface OfflineEvaluationResult {
  reply: string;
  feedback: string;
  score: number;
  phoneticHelp?: string;
  culturalNote?: string;
  source: 'offline_knowledge_ai' | 'smart_parser';
}

/**
 * Normalizes Persian text for accurate offline matching (handling ye, kaf, spaces, punctuation).
 */
export function normalizePersian(text: string): string {
  return text
    .trim()
    .toLowerCase()
    .replace(/[ي]/g, 'ی')
    .replace(/[ك]/g, 'ک')
    .replace(/[\u200B\u200C\u200D\uFEFF]/g, ' ')
    .replace(/[.,!?،؛؟]/g, '')
    .replace(/\s+/g, ' ');
}

/**
 * Normalizes English text for offline intent classification.
 */
export function normalizeEnglish(text: string): string {
  return text
    .trim()
    .toLowerCase()
    .replace(/[^a-zA-Z0-9\s]/g, '')
    .replace(/\s+/g, ' ');
}

/**
 * Offline bidirectional AI conversational evaluation.
 * Works without internet connection by running local intent parsing, similarity scoring,
 * and pedagogical rule-based feedback!
 */
export function evaluateOfflineBidirectional(params: {
  userInput: string;
  targetUnit?: BilingualUnit;
  mode: 'learn_persian' | 'learn_english'; // learn_persian (for English speakers) OR learn_english (for Persian speakers)
}): OfflineEvaluationResult {
  const { userInput, targetUnit, mode } = params;
  const rawInput = userInput.trim();

  if (!rawInput) {
    return {
      reply: mode === 'learn_persian' ? 'Please say or type a phrase!' : 'لطفاً جمله یا کلمه‌ای را وارد کنید!',
      feedback: mode === 'learn_persian' ? 'Practice makes perfect.' : 'تمرین مداوم رمز تسلط کلامی است.',
      score: 5,
      source: 'smart_parser'
    };
  }

  // 1. If target unit is provided, check direct similarity & shadowing accuracy
  if (targetUnit) {
    if (mode === 'learn_persian') {
      // English user speaking/typing Persian or Fingilish
      const normInput = normalizePersian(rawInput);
      const normTargetFa = normalizePersian(targetUnit.persianPhrase);
      const normTargetPhonetic = normalizeEnglish(targetUnit.persianPhonetic);
      const normInputEn = normalizeEnglish(rawInput);

      const isPersianScriptMatch = normInput.includes(normTargetFa.slice(0, 8)) || normTargetFa.includes(normInput.slice(0, 8));
      const isPhoneticMatch = normInputEn.includes(normTargetPhonetic.slice(0, 6)) || normTargetPhonetic.includes(normInputEn.slice(0, 6));

      if (isPersianScriptMatch || isPhoneticMatch) {
        return {
          reply: `Afarin! (آفرین) You spoke it just like a native Iranian!`,
          feedback: `Your expression "${targetUnit.persianPhrase}" (${targetUnit.persianPhonetic}) is spot on and conveys authentic Persian warmth.`,
          score: 10,
          phoneticHelp: targetUnit.persianPhonetic,
          culturalNote: targetUnit.contextEn,
          source: 'offline_knowledge_ai'
        };
      }
    } else {
      // Persian user learning English
      const normInput = normalizeEnglish(rawInput);
      const normTarget = normalizeEnglish(targetUnit.englishPhrase);

      const words = normTarget.split(' ');
      const matchedWords = words.filter(w => normInput.includes(w));
      const matchRatio = matchedWords.length / words.length;

      if (matchRatio >= 0.6) {
        return {
          reply: `Excellent pronunciation and fluency!`,
          feedback: `آفرین! لحن و کلماتت کاملاً طبیعی و استاندارد بود. در زبان روزمره دقیقاً از همین عبارت استفاده می‌شود.`,
          score: Math.min(10, Math.round(matchRatio * 10) + 1),
          phoneticHelp: targetUnit.englishPhonetic,
          culturalNote: targetUnit.contextFa,
          source: 'offline_knowledge_ai'
        };
      }
    }
  }

  // 2. Intelligent pattern recognition from the entire offline knowledge base
  const cleanInput = mode === 'learn_persian' ? normalizePersian(rawInput) : normalizeEnglish(rawInput);
  
  for (const unit of BILINGUAL_KNOWLEDGE_BASE) {
    const compareTarget = mode === 'learn_persian' 
      ? normalizePersian(unit.persianPhrase) 
      : normalizeEnglish(unit.englishPhrase);
    
    if (cleanInput.length > 3 && (compareTarget.includes(cleanInput) || cleanInput.includes(compareTarget.slice(0, 6)))) {
      return {
        reply: mode === 'learn_persian'
          ? `Great effort! Related phrase: "${unit.persianPhrase}" (${unit.persianPhonetic})`
          : `Well done! Perfect contextual match with: "${unit.englishPhrase}"`,
        feedback: mode === 'learn_persian'
          ? `Meaning: ${unit.englishExplanation}. ${unit.contextEn}`
          : `معنی و کاربرد: ${unit.persianPhrase}. ${unit.contextFa}`,
        score: 9,
        phoneticHelp: mode === 'learn_persian' ? unit.persianPhonetic : unit.englishPhonetic,
        culturalNote: mode === 'learn_persian' ? unit.contextEn : unit.contextFa,
        source: 'offline_knowledge_ai'
      };
    }
  }

  // 3. Fallback General Evaluation (No connection needed!)
  if (mode === 'learn_persian') {
    return {
      reply: `Dastet dard nakoneh! Good job practicing Persian.`,
      feedback: `You are making steady progress. Keep listening to the native Persian audio to refine your vowels and authentic street rhythm.`,
      score: 8,
      phoneticHelp: 'Practice: "Salam, rooz bekheyr!" (Hello, good day!)',
      culturalNote: 'Persian speakers deeply appreciate any foreigner attempting their language, so never worry about minor mistakes!',
      source: 'smart_parser'
    };
  } else {
    return {
      reply: `I heard you clearly! Keep up the great English practice.`,
      feedback: `جمله‌ات مفهوم و قابل درک بود. برای روان‌تر شدن، استرس کلمات و ریتم متصل (Connected Speech) را مثل صدای استاد تکرار کن.`,
      score: 8,
      phoneticHelp: 'Practice: "Thank you so much for your help!"',
      culturalNote: 'در زبان انگلیسی، لحن دوستانه و تشکر سریع از هر نکته گرامری مهم‌تر است.',
      source: 'smart_parser'
    };
  }
}
