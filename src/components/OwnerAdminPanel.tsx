import React, { useState } from 'react';
import {
  ShieldCheck,
  DollarSign,
  Landmark,
  FileText,
  TrendingUp,
  Copy,
  Check,
  Smartphone,
  Globe,
  X
} from 'lucide-react';
import { sound } from '../utils/audio';

interface OwnerAdminPanelProps {
  onClose: () => void;
}

export const OwnerAdminPanel: React.FC<OwnerAdminPanelProps> = ({ onClose }) => {
  const [activeTab, setActiveTab] = useState<'admob' | 'us_bank_guide' | 'aso_seo' | 'privacy_gdpr' | 'aab_release'>('admob');
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  // Interactive Revenue Simulator State
  const [dailyActiveUsers, setDailyActiveUsers] = useState<number>(5000);
  const [tier1TrafficShare, setTier1TrafficShare] = useState<number>(75); // % from US, CA, UK, DE, AU
  const [creditClinicViewsPerUser, setCreditClinicViewsPerUser] = useState<number>(2);

  // High-CPM calculation (Finance/Credit Clinic commands $45-$85 CPM; General Language commands $8-$18 CPM)
  const effectiveCpmUsd = ((tier1TrafficShare / 100) * (18 + creditClinicViewsPerUser * 16)) + ((1 - tier1TrafficShare / 100) * 4);
  const dailyImpressions = dailyActiveUsers * (3 + creditClinicViewsPerUser);
  const estimatedDailyUsd = Math.round((dailyImpressions / 1000) * (effectiveCpmUsd * 0.28));
  const estimatedMonthlyUsd = estimatedDailyUsd * 30;

  // Privacy Policy Generator State
  const [appContactEmail, setAppContactEmail] = useState<string>('siavashhamiri@gmail.com');
  const [companyEntityName, setCompanyEntityName] = useState<string>('LingoEnglish & Farsi Bridge — AbleWay City Studios');

  const handleCopy = (text: string, key: string) => {
    sound.playCoin();
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const privacyPolicyText = `PRIVACY POLICY — ${companyEntityName}
Effective Date: ${new Date().toISOString().slice(0, 10)}
App Name: LingoEnglish & Farsi Bridge (AbleWay City Capital): Learn Persian for English Speakers & Learn English for Persian Speakers

1. OVERVIEW & ETHICAL COMMITMENT (100% FREE EDUCATIONAL ACCESS)
${companyEntityName} ("we", "our", or "us") operates the LingoEnglish & Farsi Bridge mobile and web application. Our platform is 100% free for learners worldwide and contains zero gambling, zero real-money wagering, and zero predatory dark patterns.

2. GDPR (EUROPEAN UNION / UK) & CCPA (CALIFORNIA / USA) COMPLIANCE
- Personal Data Minimization: Core language lessons, Persian alphabet drawing, offline Raj scanner, and family mind sports operate locally on your device without requiring sensitive personal data.
- Microphone & Camera Permissions: Microphone access is used strictly for live voice pronunciation practice and speech translation. Camera access is used strictly for the local optical Persian carpet knot-density (Raj) scanner. Audio and video streams are never sold to third parties.
- Right to Deletion & Opt-Out: Users in the EU, UK, California, Canada, and Australia may request immediate erasure of any chat nickname or leaderboard record by contacting ${appContactEmail}.

3. GOOGLE ADMOB & THIRD-PARTY ADVERTISING
We use Google AdMob (com.google.android.gms:play-services-ads) to display ethical, non-intrusive educational and financial literacy advertisements (including credit education and banking offers) to keep this application 100% free. Users in the EEA/UK are presented with Google's User Messaging Platform (UMP) consent form in compliance with IAB TCF v2.2.

4. ACCESSIBILITY & NEURODIVERSITY DATA (ADHD / BLIND / DEAF)
Your accessibility preferences (Bionic Reading, Brown Noise, Deaf Live Captions, High-Contrast Mode, and Dyslexia Font) are stored strictly in your local browser/device storage and are never transmitted to external trackers.

5. CONTACT INFORMATION
Developer & Heritage Custodian: Siavash Ali-Miri
Email: ${appContactEmail}`;

  const asoListingText = `TITLE (Google Play & Apple App Store - Max 50 chars):
LingoEnglish & Farsi Bridge: Learn Persian & English

SHORT DESCRIPTION (80 chars):
Learn Spoken Persian (Farsi/Dari/Tajik) & English + Visa, 850 Credit & 8 Games!

FULL ASO DESCRIPTION (Optimized for US, Canada, UK, Germany & Australia):
🇮🇷⇄🇬🇧 LingoEnglish & Farsi Bridge (AbleWay City Capital) is the world's #1 complete, 100% FREE dual-direction language, heritage, and life-mastery Super-App!

🌟 DIRECTION 1 (PRIORITY #1): LEARN PERSIAN (FARSI / DARI / TAJIK) FOR ENGLISH, GERMAN, FRENCH & SPANISH SPEAKERS
• Designed for 2nd & 3rd generation Iranian, Afghan & Tajik diaspora youth in the US, Canada, Australia, UK & Germany, foreign spouses, diplomats, and lovers of Rumi & Hafez!
• Triple-Script Display on Every Phrase: 1) Standard Persian Script, 2) Accurate Fingilish Phonetics, and 3) Native English + Spanish, French & German translations.
• 100% Authentic Native Iranian Neural Voices (Dilara & Farid) — zero robotic English accent!
• Interactive Finger-Touch Persian Alphabet Canvas Board, Spoken Tehrani vs. Textbook Rules, Family & Grandparents Conversations, and Rumi/Hafez Poetry Studio.

🎓 DIRECTION 2: LEARN AMERICAN, BRITISH & CANADIAN ENGLISH + VICTORYPATH HUB
• Job Interview & Salary Negotiation Simulator (+$15k–$35k salary script generator)
• Full-Fund University Scholarship Interview Prep
• 5-Country Embassy Visa Officer Simulator (USA, Canada, Australia, UK, Germany)
• Official Citizenship & Passport Exams (US Civics 100 Questions, Discover Canada, Life in the UK)

💳 BILINGUAL CREDIT REPAIR (450→700+) & 850 ELITE CREDIT CLINIC
• Interactive Credit Diagnostic Scanner, FCRA Section 609 & Goodwill Dispute Letter Generator, Golden AZEO Formula, and USD/EUR/GBP Mortgage & Auto Loan Savings Calculator.

🏛️ ABLEWAY CITY & 8 ETHICAL FAMILY MIND SPORTS (ZERO GAMBLING)
• Earn free Official Land Deeds & Business Licenses, establish Global Dynasties, gift up to 30% of points to children or ADHD/disabled learners (Heba Law), and compete in 8 independent family leagues: Quiz Duel, Color-8/UNO, Backgammon, Chess, Ludo/Mensch, 5-Language Daberna, Team Hokm/Spades, and Math-11 Memory Cards!`;

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      <div className="bg-slate-900 text-white border-2 border-amber-400 rounded-3xl max-w-5xl w-full max-h-[92vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Modal Header */}
        <div className="p-4 sm:p-6 bg-slate-950 border-b border-amber-400/40 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-amber-400 text-slate-950 font-black">
              <DollarSign className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-base sm:text-xl font-black text-amber-300">
                👑 پنل مدیریت مالک و درآمدزایی دلاری (Owner Admin & Global ASO/AdMob Panel)
              </h2>
              <p className="text-xs text-slate-300">
                مدیریت تبلیغات گران‌قیمت ۴۵ تا ۸۵ دلاری AdMob، راهنمای اتصال حساب بانکی دوست مقیم آمریکا/اروپا، تولیدکننده Privacy Policy و سئوی گوگل‌پلی
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-xl bg-white/10 hover:bg-rose-600 text-white transition-colors"
            aria-label="بستن پنل مدیریت"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto p-3 bg-slate-950/60 border-b border-white/10">
          {[
            { id: 'admob' as const, label: '💵 ۱. مدیریت تبلیغات دلاری AdMob و تخمین درآمد', icon: DollarSign },
            { id: 'us_bank_guide' as const, label: '🏦 ۲. راهنمای اتصال حساب بانکی دوست در آمریکا/اروپا', icon: Landmark },
            { id: 'aso_seo' as const, label: '🚀 ۳. سئوی گوگل‌پلی و اپ‌استور (ASO 5 کشور)', icon: TrendingUp },
            { id: 'privacy_gdpr' as const, label: '🛡️ ۴. تولیدکننده Privacy Policy (GDPR/CCPA)', icon: ShieldCheck },
            { id: 'aab_release' as const, label: '📦 ۵. فایل‌های آماده انتشار (.aab و PWA)', icon: Smartphone }
          ].map((t) => {
            const Icon = t.icon;
            return (
              <button
                key={t.id}
                type="button"
                onClick={() => {
                  sound.playClick();
                  setActiveTab(t.id);
                }}
                className={`px-3.5 py-2 rounded-xl text-xs font-black whitespace-nowrap flex items-center gap-1.5 transition-all ${
                  activeTab === t.id
                    ? 'bg-amber-400 text-slate-950 shadow-sm'
                    : 'bg-white/10 text-slate-200 hover:bg-white/20'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{t.label}</span>
              </button>
            );
          })}
        </div>

        {/* Body Content */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-5 text-right">
          {activeTab === 'admob' && (
            <div className="space-y-5">
              <div className="p-4 rounded-2xl bg-emerald-950/80 border border-emerald-400/50 space-y-2">
                <h3 className="text-sm sm:text-base font-black text-amber-300">
                  💡 راز مهندسی مالی این سوپراپ: چرا کلینیک کردیت ۸۵۰ (Credit Clinic) درآمد تبلیغات را ۵ برابر می‌کند؟
                </h3>
                <p className="text-xs sm:text-sm text-emerald-100 leading-relaxed">
                  در گوگل ادموب (Google AdMob)، تبلیغات معمولی بازی یا آموزش زبان در آمریکا حدود <strong>$8 تا $15 به ازای هر هزار نمایش (CPM)</strong> پرداخت می‌کنند؛ اما بانک‌ها، شرکت‌های کارت اعتباری (Chase, Amex, Capital One) و موسسات وام مسکن در آمریکا، کانادا، انگلیس، آلمان و استرالیا برای کلیدواژه‌های <strong>Credit Repair, FICO 850, Mortgage Refinance و Auto Loan</strong> بین <strong>$45 تا $85 دلار CPM</strong> می‌پردازند! با قرار دادن «کلینیک کردیت ۸۵۰» در کنار آموزش رایگان زبان فارسی و انگلیسی، برنامهٔ شما بدون دریافت حتی یک سنت از کاربر، بالاترین ردهٔ تبلیغات دلاری جهان را جذب می‌کند.
                </p>
              </div>

              {/* Interactive Revenue Simulator */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 rounded-2xl bg-white/5 border border-white/15 space-y-2">
                  <label className="text-xs font-black text-amber-300 block">
                    👥 تعداد کاربران فعال روزانه (DAU): {dailyActiveUsers.toLocaleString()} نفر
                  </label>
                  <input
                    type="range"
                    min={500}
                    max={50000}
                    step={500}
                    value={dailyActiveUsers}
                    onChange={(e) => setDailyActiveUsers(Number(e.target.value))}
                    className="w-full accent-amber-400"
                  />
                  <span className="text-[11px] text-slate-400 block">
                    از ۵۰۰ تا ۵۰,۰۰۰ کاربر روزانه در آمریکا، کانادا و اروپا
                  </span>
                </div>

                <div className="p-4 rounded-2xl bg-white/5 border border-white/15 space-y-2">
                  <label className="text-xs font-black text-amber-300 block">
                    🌎 سهم کاربران ۵ کشور هدف (US/CA/UK/DE/AU): {tier1TrafficShare}%
                  </label>
                  <input
                    type="range"
                    min={20}
                    max={95}
                    step={5}
                    value={tier1TrafficShare}
                    onChange={(e) => setTier1TrafficShare(Number(e.target.value))}
                    className="w-full accent-emerald-400"
                  />
                  <span className="text-[11px] text-slate-400 block">
                    ترافیک کشورهای تراز اول با بالاترین نرخ CPM دلاری و یورویی
                  </span>
                </div>

                <div className="p-4 rounded-2xl bg-white/5 border border-white/15 space-y-2">
                  <label className="text-xs font-black text-amber-300 block">
                    💳 بازدید از کلینیک کردیت ۸۵۰ به ازای هر کاربر: {creditClinicViewsPerUser} بار
                  </label>
                  <input
                    type="range"
                    min={1}
                    max={5}
                    step={1}
                    value={creditClinicViewsPerUser}
                    onChange={(e) => setCreditClinicViewsPerUser(Number(e.target.value))}
                    className="w-full accent-teal-400"
                  />
                  <span className="text-[11px] text-slate-400 block">
                    ضریب فعال‌سازی تبلیغات بانکی و اعتباری ۴۵ تا ۸۵ دلاری
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="p-4 rounded-2xl bg-slate-950 border border-amber-400/40 text-center">
                  <span className="text-xs text-slate-400 block">میانگین نرخ تبلیغات (Effective CPM)</span>
                  <span className="text-2xl font-black text-amber-300 tabular-nums">
                    ${effectiveCpmUsd.toFixed(2)} USD
                  </span>
                </div>
                <div className="p-4 rounded-2xl bg-slate-950 border border-emerald-400/40 text-center">
                  <span className="text-xs text-slate-400 block">درآمد تخمینی روزانه (AdMob Net)</span>
                  <span className="text-2xl font-black text-emerald-400 tabular-nums">
                    ${estimatedDailyUsd.toLocaleString()} / روز
                  </span>
                </div>
                <div className="p-4 rounded-2xl bg-slate-950 border border-teal-400/40 text-center">
                  <span className="text-xs text-slate-400 block">درآمد تخمینی ماهانه (AdMob Monthly)</span>
                  <span className="text-2xl font-black text-teal-300 tabular-nums">
                    ${estimatedMonthlyUsd.toLocaleString()} / ماه
                  </span>
                </div>
              </div>

              {/* Regional User Breakdown (USA, Canada, Europe, Tajikistan, Uzbekistan, Iran) */}
              <div className="p-4 rounded-2xl bg-white/5 border border-amber-400/30 space-y-2.5">
                <h4 className="text-xs sm:text-sm font-black text-amber-300">
                  🌍 تفکیک جغرافیایی کاربران و ضریب CPM تبلیغاتی (آمریکا، کانادا، اروپا، تاجیکستان، ازبکستان و ایران):
                </h4>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 text-center text-xs">
                  <div className="p-2.5 rounded-xl bg-slate-950 border border-white/10">
                    <span className="block font-black text-amber-300">🇺🇸 آمریکا (USA)</span>
                    <span className="text-[11px] text-emerald-300">۳۸٪ ترافیک • $55 CPM</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-slate-950 border border-white/10">
                    <span className="block font-black text-amber-300">🇨🇦 کانادا (Canada)</span>
                    <span className="text-[11px] text-emerald-300">۱۶٪ ترافیک • $42 CPM</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-slate-950 border border-white/10">
                    <span className="block font-black text-amber-300">🇪🇺🇬🇧 اروپا و انگلیس</span>
                    <span className="text-[11px] text-emerald-300">۲۱٪ ترافیک • $38 CPM</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-slate-950 border border-cyan-400/40">
                    <span className="block font-black text-cyan-300">🇹🇯 تاجیکستان (دوشنبه)</span>
                    <span className="text-[11px] text-cyan-100">۱۰٪ ترافیک • خط سیریلیک</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-slate-950 border border-cyan-400/40">
                    <span className="block font-black text-cyan-300">🇺🇿 ازبکستان (سمرقند/بخارا)</span>
                    <span className="text-[11px] text-cyan-100">۷٪ ترافیک • خط سیریلیک</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-slate-950 border border-white/10">
                    <span className="block font-black text-emerald-300">🇮🇷🇦🇫 ایران و افغانستان</span>
                    <span className="text-[11px] text-slate-300">۸٪ ترافیک • فارسی/دری</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'us_bank_guide' && (
            <div className="space-y-4">
              <div className="p-5 rounded-2xl bg-slate-950 border border-amber-400/50 space-y-3">
                <h3 className="text-base font-black text-amber-300">
                  🏦 راهنمای گام‌به‌گام اتصال قانونی به حساب بانکی دوست یا خویشاوند مورد اعتماد در آمریکا، کانادا یا اروپا
                </h3>
                <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                  از آنجا که Google Play Console و Google AdMob مستقیماً به بانک‌های داخل ایران متصل نمی‌شوند، استانداردترین، امن‌ترین و کاملاً قانونی‌ترین روش برای توسعه‌دهندگان ایرانی استفاده از <strong>مدل Publisher / Payee نیابتی (از طریق دوست یا فامیل مورد اعتماد در آمریکا، کانادا، بریتانیا، آلمان یا استرالیا)</strong> است:
                </p>
                <ol className="list-decimal list-inside space-y-2.5 text-xs sm:text-sm text-emerald-100 leading-relaxed">
                  <li>
                    <strong>گام اول (افتتاح حساب Google Play Console — هزینه یک‌بار پرداخت ۲۵ دلار):</strong> دوست یا خویشاوند شما در آمریکا/اروپا با مدارک هویتی و کارت بانکی خود یک اکانت Developer در <code>play.google.com/console</code> ایجاد می‌کند.
                  </li>
                  <li>
                    <strong>گام دوم (افتتاح حساب Google AdMob و دریافت کدهای تبلیغاتی):</strong> همان شخص در <code>admob.google.com</code> ثبت‌نام کرده و شماره حساب بانکی (Checking Account / IBAN) و فرم مالیاتی خود (W-9 برای مقیمان آمریکا یا W-8BEN برای کانادا/اروپا) را وارد می‌کند.
                  </li>
                  <li>
                    <strong>گام سوم (قرار دادن ۳ کد AdMob در فایل <code>android/key.properties</code>):</strong> کدهای <code>ADMOB_APP_ID</code> را که دوستتان از پنل ادموب می‌گیرد، در فایل <code>android/key.properties</code> قرار می‌دهید (این فایل از قبل در پروژه شما ساخته و آماده شده است).
                  </li>
                  <li>
                    <strong>گام چهارم (دسترسی ادمین فنی بدون حساسیت تحریم):</strong> شما کدهای برنامه را به عنوان توسعه‌دهنده آماده می‌کنید و فایل خروجی <code>.aab</code> را برای ایشان می‌فرستید تا از روی آی‌پیِ آمریکا/اروپا در گوگل‌پلی آپلود کند، تا اکانت هرگز با آی‌پی ایران درگیر نشود.
                  </li>
                </ol>
              </div>
            </div>
          )}

          {activeTab === 'aso_seo' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm sm:text-base font-black text-amber-300">
                  🚀 متن آماده سئو (ASO) برای ثبت در Google Play Store و Apple App Store
                </h3>
                <button
                  type="button"
                  onClick={() => handleCopy(asoListingText, 'aso')}
                  className="px-4 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs flex items-center gap-1.5"
                >
                  {copiedKey === 'aso' ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  <span>{copiedKey === 'aso' ? 'کپی شد!' : 'کپی کامل متن سئوی گوگل‌پلی'}</span>
                </button>
              </div>
              <pre
                dir="ltr"
                className="p-4 rounded-2xl bg-slate-950 border border-white/15 text-xs text-emerald-200 font-mono whitespace-pre-wrap leading-relaxed max-h-80 overflow-y-auto text-left"
              >
                {asoListingText}
              </pre>
            </div>
          )}

          {activeTab === 'privacy_gdpr' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-slate-300 block mb-1">نام مجموعه / برند در Privacy Policy:</label>
                  <input
                    type="text"
                    value={companyEntityName}
                    onChange={(e) => setCompanyEntityName(e.target.value)}
                    dir="ltr"
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-white/20 text-xs text-white"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-300 block mb-1">ایمیل پشتیبانی رسمی در گوگل‌پلی:</label>
                  <input
                    type="email"
                    value={appContactEmail}
                    onChange={(e) => setAppContactEmail(e.target.value)}
                    dir="ltr"
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-white/20 text-xs text-white"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-xs font-black text-amber-300">
                  🛡️ متن کامل و قانونی Privacy Policy (منطبق با GDPR اروپا، CCPA آمریکا و Google Play):
                </span>
                <button
                  type="button"
                  onClick={() => handleCopy(privacyPolicyText, 'privacy')}
                  className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs flex items-center gap-1.5"
                >
                  {copiedKey === 'privacy' ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  <span>{copiedKey === 'privacy' ? 'کپی شد!' : 'کپی متن Privacy Policy'}</span>
                </button>
              </div>

              <pre
                dir="ltr"
                className="p-4 rounded-2xl bg-slate-950 border border-white/15 text-xs text-slate-200 font-mono whitespace-pre-wrap leading-relaxed max-h-72 overflow-y-auto text-left"
              >
                {privacyPolicyText}
              </pre>
            </div>
          )}

          {activeTab === 'aab_release' && (
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-slate-950 border border-emerald-400/50 space-y-2.5">
                <h3 className="text-sm sm:text-base font-black text-emerald-300">
                  📦 وضعیت فایل‌های فنی انتشار اندروید (.aab) و وب‌اپ اپل (iOS/PWA)
                </h3>
                <ul className="space-y-2 text-xs text-slate-200">
                  <li>✅ <code>android/app/build.gradle</code>: مجهز به <strong>compileSdk 35 / targetSdk 35</strong> (الزام جدید گوگل‌پلی) و کتابخانه <code>play-services-ads:23.6.0</code> (AdMob).</li>
                  <li>✅ <code>android/key.properties.example</code>: قالب آماده کلید امضای دیجیتال (Keystore) و شناسه‌های واحد تبلیغاتی AdMob.</li>
                  <li>✅ <code>public/manifest.json</code> و <code>public/sw.js</code>: سرویس‌ورکر کش آفلاین و مانیفست استاندارد PWA برای نصب مستقیم روی آیفون (iOS Safari Add to Home Screen) و اندروید.</li>
                  <li>✅ <code>index.html</code>: متاتگ‌های کامل OpenGraph، Twitter Card و ساختار JSON-LD Schema.org.</li>
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
