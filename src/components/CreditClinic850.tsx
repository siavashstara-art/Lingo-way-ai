import React, { useState } from 'react';
import {
  CreditCard,
  TrendingUp,
  FileText,
  Calculator,
  Copy,
  Check,
  Volume2,
  ShieldCheck,
  Sparkles
} from 'lucide-react';
import { sound, speakEnglish, speakPersian } from '../utils/audio';

interface CreditClinic850Props {
  onEarnLingous: (amount: number) => void;
}

export const CreditClinic850: React.FC<CreditClinic850Props> = ({ onEarnLingous }) => {
  const [subTab, setSubTab] = useState<'scanner' | 'dispute_letters' | 'azeo_850' | 'loan_calculator'>('scanner');

  // 1. Credit Scanner State (450 -> 850)
  const [currentScore, setCurrentScore] = useState<number>(560);
  const [utilizationPct, setUtilizationPct] = useState<number>(68);
  const [latePaymentsCount, setLatePaymentsCount] = useState<number>(2);
  const [collectionsCount, setCollectionsCount] = useState<number>(1);

  // Projected score after applying AZEO (1%-3% utilization) + Goodwill/609 removals
  const utilizationGain = utilizationPct > 30 ? 65 : utilizationPct > 9 ? 25 : 0;
  const lateRemovalGain = latePaymentsCount * 35;
  const collectionRemovalGain = collectionsCount * 55;
  const projectedScore = Math.min(850, currentScore + utilizationGain + lateRemovalGain + collectionRemovalGain);

  // 2. Legal Letter Generator State (Goodwill & FCRA Section 609)
  const [letterType, setLetterType] = useState<'fcra_609' | 'goodwill_late' | 'pay_for_delete'>('fcra_609');
  const [applicantName, setApplicantName] = useState<string>('Alex Ali-Miri');
  const [creditorOrBureau, setCreditorOrBureau] = useState<string>('Experian / Equifax / TransUnion');
  const [accountNumber, setAccountNumber] = useState<string>('XXXX-XXXX-4829');
  const [copiedLetter, setCopiedLetter] = useState<boolean>(false);

  // 4. Mortgage & Auto Loan Savings Calculator State (USD, EUR, GBP)
  const [currency, setCurrency] = useState<'$' | '€' | '£'>('$');
  const [mortgageAmount, setMortgageAmount] = useState<number>(450000);
  const [autoLoanAmount, setAutoLoanAmount] = useState<number>(38000);

  // Interest rate delta between Bad/Fair Credit (e.g. 580 score -> 8.4% mortgage, 13.5% auto) vs Elite 800+ Credit (6.1% mortgage, 5.2% auto)
  const monthlyMortgageBad = (mortgageAmount * (0.084 / 12)) / (1 - Math.pow(1 + 0.084 / 12, -360));
  const monthlyMortgageElite = (mortgageAmount * (0.061 / 12)) / (1 - Math.pow(1 + 0.061 / 12, -360));
  const totalMortgageSaved30Yr = Math.round((monthlyMortgageBad - monthlyMortgageElite) * 360);

  const monthlyAutoBad = (autoLoanAmount * (0.135 / 12)) / (1 - Math.pow(1 + 0.135 / 12, -60));
  const monthlyAutoElite = (autoLoanAmount * (0.052 / 12)) / (1 - Math.pow(1 + 0.052 / 12, -60));
  const totalAutoSaved5Yr = Math.round((monthlyAutoBad - monthlyAutoElite) * 60);

  const totalCombinedSavings = totalMortgageSaved30Yr + totalAutoSaved5Yr;

  const generatedLetterText =
    letterType === 'fcra_609'
      ? `FORMAL REQUEST FOR METHOD OF VERIFICATION UNDER FCRA SECTION 609(a)(1)
From: ${applicantName}
To: ${creditorOrBureau}
Reference Account #: ${accountNumber}
Date: ${new Date().toISOString().slice(0, 10)}

To Whom It May Concern:
Pursuant to my rights under the Fair Credit Reporting Act (FCRA), 15 U.S.C. § 1681g (Section 609), I am formally requesting physical verification of the above-referenced account appearing on my credit report, including the original signed consumer contract and complete accounting ledger.

Under federal law, if the furnisher cannot provide verifiable original documentation bearing my signature within 30 days of receipt of this notice, this unverified item must be permanently deleted from my credit file immediately.

Sincerely,
${applicantName}`
      : letterType === 'goodwill_late'
      ? `FORMAL GOODWILL ADJUSTMENT REQUEST FOR LATE PAYMENT REMOVAL
From: ${applicantName}
To: Executive Credit Reporting Team — ${creditorOrBureau}
Account #: ${accountNumber}
Date: ${new Date().toISOString().slice(0, 10)}

Dear Executive Customer Relations Team,
I have been a loyal customer of ${creditorOrBureau} and deeply value our financial relationship. I am writing to kindly request a "Goodwill Adjustment" to remove the isolated late payment mark on Account #${accountNumber}.

Since that temporary hardship, I have maintained a 100% on-time autopay record. As I am preparing for an upcoming mortgage application, removing this single courtesy mark would make a life-changing difference for my family. Thank you for your kindness and consideration.

Warm regards,
${applicantName}`
      : `CONDITIONAL PAY-FOR-DELETE SETTLEMENT AGREEMENT
From: ${applicantName}
To: ${creditorOrBureau}
Account #: ${accountNumber}

I am willing to settle the above-referenced balance in full upon receiving your signed written agreement on company letterhead confirming that ${creditorOrBureau} will request complete deletion of this tradeline from Experian, Equifax, and TransUnion within 15 days of payment clearance.

Sincerely,
${applicantName}`;

  const handleCopyLetter = () => {
    sound.playCoin();
    navigator.clipboard.writeText(generatedLetterText);
    setCopiedLetter(true);
    onEarnLingous(20);
    setTimeout(() => setCopiedLetter(false), 2000);
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Hero Banner */}
      <div className="rounded-3xl bg-gradient-to-br from-emerald-950 via-slate-900 to-indigo-950 text-white p-6 sm:p-8 border-2 border-amber-400 shadow-xl space-y-4">
        <div className="space-y-1">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-amber-400 text-slate-950 font-black text-xs">
            <CreditCard className="w-4 h-4" />
            <span>💳 MODULE 3: BILINGUAL CREDIT REPAIR (450➔700+) & GOOD-TO-ELITE 850 ACCELERATOR</span>
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-amber-300 pt-1">
            کلینیک دوزبانه بازسازی کردیت خراب (۴۵۰ تا ۷۰۰+) و ارتقای کردیت خوب به عالی ۸۵۰ (FICO / Equifax / Schufa)
          </h2>
          <p className="text-xs sm:text-sm text-emerald-100 leading-relaxed">
            در آمریکا، کانادا، انگلستان، آلمان و استرالیا، نمرهٔ کردیت (Credit Score) تعیین‌کنندهٔ نرخ سود وام مسکن، خودرو و اجاره خانه است. با این کلینیک ۱۰۰٪ رایگان، کردیت خراب را قانونی پاکسازی کنید و با فرمول طلایی <strong>AZEO</strong> به نمرهٔ نخبگان (۸۰۰ تا ۸۵۰) برسید.
          </p>
        </div>

        {/* Navigation Tabs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5 pt-2">
          {[
            { id: 'scanner' as const, label: '🔍 ۱. اسکنر عیب‌یاب کردیت (450➔850)', icon: TrendingUp },
            { id: 'dispute_letters' as const, label: '⚖️ ۲. ژنراتور نامه‌های قانونی حذف دیرکرد (609)', icon: FileText },
            { id: 'azeo_850' as const, label: '👑 ۳. فرمول طلایی AZEO برای کردیت ۸۵۰', icon: Sparkles },
            { id: 'loan_calculator' as const, label: '🏦 ۴. ماشین‌حساب سود وام مسکن و خودرو ($/€/£)', icon: Calculator }
          ].map((t) => {
            const Icon = t.icon;
            return (
              <button
                key={t.id}
                type="button"
                onClick={() => {
                  sound.playClick();
                  setSubTab(t.id);
                }}
                className={`p-3.5 rounded-2xl border-2 text-right font-black text-xs sm:text-sm flex items-center gap-2 transition-all ${
                  subTab === t.id
                    ? 'bg-amber-400 text-slate-950 border-white shadow-md'
                    : 'bg-white/10 text-white border-white/15 hover:bg-white/20'
                }`}
              >
                <Icon className="w-5 h-5 shrink-0" />
                <span>{t.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 1. CREDIT DIAGNOSTIC SCANNER */}
      {subTab === 'scanner' && (
        <div className="bg-white rounded-3xl border-2 border-slate-200 p-6 sm:p-8 space-y-6 shadow-xs">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
            <div className="space-y-4">
              <h3 className="text-base sm:text-lg font-black text-slate-900">
                🔍 اسکنر هوشمند عیب‌یابی کردیت و شبیه‌ساز پرش نمره (FICO 8 / VantageScore)
              </h3>

              <div className="space-y-1">
                <label className="text-xs font-black text-slate-700 block">
                  نمره فعلی کردیت شما (Current Credit Score): <span className="text-rose-700 font-mono">{currentScore}</span>
                </label>
                <input
                  type="range"
                  min={450}
                  max={780}
                  step={5}
                  value={currentScore}
                  onChange={(e) => setCurrentScore(Number(e.target.value))}
                  className="w-full accent-emerald-700"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-black text-slate-700 block">
                  درصد استفاده از سقف کارت‌های اعتباری (Credit Utilization - وزن ۳۰٪): <span className="text-amber-700 font-mono">{utilizationPct}%</span>
                </label>
                <input
                  type="range"
                  min={1}
                  max={95}
                  step={1}
                  value={utilizationPct}
                  onChange={(e) => setUtilizationPct(Number(e.target.value))}
                  className="w-full accent-amber-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200">
                  <label className="text-xs font-black text-slate-700 block mb-1">
                    تعداد دیرکردها (Late Payments): {latePaymentsCount}
                  </label>
                  <input
                    type="range"
                    min={0}
                    max={5}
                    value={latePaymentsCount}
                    onChange={(e) => setLatePaymentsCount(Number(e.target.value))}
                    className="w-full accent-rose-600"
                  />
                </div>
                <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200">
                  <label className="text-xs font-black text-slate-700 block mb-1">
                    تعداد پرونده‌های کالکشن (Collections): {collectionsCount}
                  </label>
                  <input
                    type="range"
                    min={0}
                    max={4}
                    value={collectionsCount}
                    onChange={(e) => setCollectionsCount(Number(e.target.value))}
                    className="w-full accent-rose-600"
                  />
                </div>
              </div>
            </div>

            <div className="p-6 rounded-3xl bg-slate-950 text-white border-2 border-emerald-400 space-y-4 text-center">
              <span className="text-xs font-black text-amber-300 block">
                🚀 نمره کردیت شما پس از اجرای نسخه کلینیک (AZEO + نامه‌های قانونی):
              </span>
              <div className="flex items-center justify-center gap-4" dir="ltr">
                <div className="p-3 rounded-2xl bg-white/10">
                  <span className="text-xs text-slate-300 block">Current</span>
                  <span className="text-2xl font-black text-rose-400 tabular-nums">{currentScore}</span>
                </div>
                <span className="text-2xl font-black text-amber-400">➔</span>
                <div className="p-4 rounded-2xl bg-emerald-500/20 border border-emerald-400">
                  <span className="text-xs text-emerald-200 block">Projected Elite Score</span>
                  <span className="text-4xl font-black text-emerald-300 tabular-nums">{projectedScore}</span>
                </div>
              </div>
              <p className="text-xs text-slate-200 leading-relaxed">
                ۱) با کاهش مصرف کارت به <strong>۱٪ تا ۳٪ قبل از تاریخ Statement Closing Date</strong>، فوراً <strong>+{utilizationGain} امتیاز</strong> می‌گیرید.
                <br />
                ۲) با ارسال نامه Goodwill و FCRA Section 609 در تب بعدی، تا <strong>+{lateRemovalGain + collectionRemovalGain} امتیاز</strong> دیگر آزاد می‌شود!
              </p>
            </div>
          </div>
        </div>
      )}

      {/* 2. AUTOMATED LEGAL DISPUTE & GOODWILL LETTER GENERATOR */}
      {subTab === 'dispute_letters' && (
        <div className="bg-white rounded-3xl border-2 border-slate-200 p-6 sm:p-8 space-y-4 shadow-xs">
          <div className="flex flex-wrap gap-2">
            {[
              { id: 'fcra_609' as const, label: '⚖️ ۱. نامه قانونی FCRA Section 609 (حذف کالکشن و خطاهای اعتباری)' },
              { id: 'goodwill_late' as const, label: '💌 ۲. نامه Goodwill Adjustment (بخشش و حذف دیرکرد پرداخت)' },
              { id: 'pay_for_delete' as const, label: '🤝 ۳. توافق‌نامه Pay-for-Delete (تسویه مشروط به حذف کامل)' }
            ].map((lt) => (
              <button
                key={lt.id}
                type="button"
                onClick={() => {
                  sound.playClick();
                  setLetterType(lt.id);
                }}
                className={`px-4 py-2.5 rounded-xl text-xs font-black transition-all ${
                  letterType === lt.id
                    ? 'bg-emerald-800 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {lt.label}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3" dir="ltr">
            <input
              type="text"
              value={applicantName}
              onChange={(e) => setApplicantName(e.target.value)}
              placeholder="Your Full Legal Name"
              className="px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs font-bold"
            />
            <input
              type="text"
              value={creditorOrBureau}
              onChange={(e) => setCreditorOrBureau(e.target.value)}
              placeholder="Bureau or Bank Name (e.g. Experian / Chase)"
              className="px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs font-bold"
            />
            <input
              type="text"
              value={accountNumber}
              onChange={(e) => setAccountNumber(e.target.value)}
              placeholder="Account Number"
              className="px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs font-bold"
            />
          </div>

          <pre
            dir="ltr"
            className="p-4 rounded-2xl bg-slate-950 text-emerald-200 font-mono text-xs whitespace-pre-wrap leading-relaxed text-left border border-slate-800"
          >
            {generatedLetterText}
          </pre>

          <div className="flex flex-wrap gap-2" dir="ltr">
            <button
              type="button"
              onClick={handleCopyLetter}
              className="px-5 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs flex items-center gap-1.5"
            >
              {copiedLetter ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              <span>{copiedLetter ? 'Copied Legal Letter! (+20 XP)' : 'Copy Official Legal Letter'}</span>
            </button>
            <button
              type="button"
              onClick={() => speakEnglish(generatedLetterText, 0.9)}
              className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-black text-xs flex items-center gap-1.5"
            >
              <Volume2 className="w-4 h-4" />
              <span>🔊 Read Legal Text Aloud</span>
            </button>
          </div>
        </div>
      )}

      {/* 3. GOLDEN AZEO FORMULA FOR 800-850 CREDIT */}
      {subTab === 'azeo_850' && (
        <div className="bg-white rounded-3xl border-2 border-amber-400 p-6 sm:p-8 space-y-4 shadow-xs">
          <h3 className="text-lg sm:text-xl font-black text-slate-900">
            👑 فرمول طلایی AZEO (All Zero Except One) برای جهش از کردیت ۷۰۰ به ۸۰۰–۸۵۰
          </h3>
          <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
            بسیاری از ایرانیان و مهاجران در آمریکا، کانادا و اروپا با اینکه همیشه بدهی کارت اعتباری خود را سر ماه پرداخت می‌کنند، نمره‌شان روی ۷۱۰ متوقف می‌ماند! چرا؟ چون بانک‌ها موجودی شما را در <strong>روز صدور صورتحساب (Statement Closing Date)</strong> به دفاتر کردیت گزارش می‌کنند، نه در روز سررسید پرداخت (Payment Due Date)!
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 space-y-1.5">
              <span className="text-xs font-black text-emerald-950 block">گام ۱: صفر کردن همه کارت‌ها به‌جز یکی</span>
              <p className="text-xs text-slate-700">
                ۳ روز قبل از تاریخ Statement Closing Date، موجودی تمام کارت‌های اعتباری خود را به <strong>$0.00</strong> برسانید تا به اداره کردیت صفر گزارش شوند.
              </p>
            </div>
            <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 space-y-1.5">
              <span className="text-xs font-black text-amber-950 block">گام ۲: باقی گذاشتن ۱٪ روی یک کارت اصلی</span>
              <p className="text-xs text-slate-700">
                فقط روی <strong>یک کارت اصلی (Bankcard)</strong> مبلغ بسیار کوچکی (مثلاً ۱۵ تا ۲۵ دلار، معادل ۱٪ سقف کارت) باقی بگذارید تا الگوریتم FICO ببیند شما فعال هستید، و روز بعد از صدور صورتحساب آن را هم تسویه کنید.
              </p>
            </div>
            <div className="p-4 rounded-2xl bg-indigo-50 border border-indigo-200 space-y-1.5">
              <span className="text-xs font-black text-indigo-950 block">گام ۳: اضافه کردن Authorized User قدیمی</span>
              <p className="text-xs text-slate-700">
                اگر یکی از اعضای خانواده کارت اعتباری خوش‌حساب با قدمت بالای ۷ سال دارد، با اضافه شدن نام شما به عنوان <strong>Authorized User (حتی بدون تحویل گرفتن کارت فیزیکی)</strong>، تمام سابقهٔ طلایی آن کارت به پروندهٔ شما منتقل می‌شود!
              </p>
            </div>
          </div>
        </div>
      )}

      {/* 4. MORTGAGE & AUTO LOAN INTEREST SAVINGS CALCULATOR ($ / € / £) */}
      {subTab === 'loan_calculator' && (
        <div className="bg-white rounded-3xl border-2 border-slate-200 p-6 sm:p-8 space-y-5 shadow-xs">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h3 className="text-base sm:text-lg font-black text-slate-900">
              🏦 ماشین‌حساب سود وام مسکن (Mortgage) و خودرو (Auto Loan) به دلار ($)، یورو (€) و پوند (£)
            </h3>
            <div className="flex gap-2" dir="ltr">
              {(['$', '€', '£'] as const).map((cur) => (
                <button
                  key={cur}
                  type="button"
                  onClick={() => {
                    sound.playClick();
                    setCurrency(cur);
                  }}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-black ${
                    currency === cur ? 'bg-slate-900 text-amber-300' : 'bg-slate-100 text-slate-700'
                  }`}
                >
                  {cur === '$' ? '🇺🇸/🇨🇦/🇦🇺 USD/CAD ($)' : cur === '€' ? '🇩🇪/🇪🇺 EUR (€)' : '🇬🇧 GBP (£)'}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="space-y-4">
              <div>
                <label className="text-xs font-black text-slate-800 block mb-1" dir="ltr">
                  🏡 Home Mortgage Amount: {currency}{mortgageAmount.toLocaleString()}
                </label>
                <input
                  type="range"
                  min={150000}
                  max={1200000}
                  step={25000}
                  value={mortgageAmount}
                  onChange={(e) => setMortgageAmount(Number(e.target.value))}
                  className="w-full accent-emerald-700"
                />
              </div>
              <div>
                <label className="text-xs font-black text-slate-800 block mb-1" dir="ltr">
                  🚗 Auto Loan Amount: {currency}{autoLoanAmount.toLocaleString()}
                </label>
                <input
                  type="range"
                  min={15000}
                  max={95000}
                  step={2000}
                  value={autoLoanAmount}
                  onChange={(e) => setAutoLoanAmount(Number(e.target.value))}
                  className="w-full accent-indigo-700"
                />
              </div>
            </div>

            <div className="p-5 rounded-3xl bg-slate-950 text-white border-2 border-amber-400 space-y-3 text-center">
              <span className="text-xs font-black text-amber-300 block">
                💰 مجموع پولی که با رساندن کردیت از ۵۸۰ به ۸۰۰+ در جیب خانواده شما می‌ماند:
              </span>
              <p className="text-3xl sm:text-4xl font-black text-emerald-400 tabular-nums" dir="ltr">
                {currency}{totalCombinedSavings.toLocaleString()} SAVED!
              </p>
              <div className="grid grid-cols-2 gap-2 text-xs pt-1" dir="ltr">
                <div className="p-2.5 rounded-xl bg-white/10">
                  <span className="text-slate-300 block">Mortgage Interest Saved</span>
                  <span className="font-black text-amber-300 tabular-nums">{currency}{totalMortgageSaved30Yr.toLocaleString()}</span>
                </div>
                <div className="p-2.5 rounded-xl bg-white/10">
                  <span className="text-slate-300 block">Auto Loan Interest Saved</span>
                  <span className="font-black text-teal-300 tabular-nums">{currency}{totalAutoSaved5Yr.toLocaleString()}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
