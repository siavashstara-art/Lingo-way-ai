import React, { useState } from 'react';
import {
  Briefcase,
  GraduationCap,
  ShieldCheck,
  Flag,
  Volume2,
  DollarSign,
  Award,
  CheckCircle2,
  Sparkles
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { sound, speakEnglish, speakPersian } from '../utils/audio';

interface VictoryPathHubProps {
  onEarnLingous: (amount: number) => void;
}

const JOB_AND_SALARY_SCENARIOS = [
  {
    id: 'job_1',
    roleTitle: '💼 1. The "Tell Me About Yourself" Executive Pitch (معرفی حرفه‌ای در مصاحبه شغلی غرب)',
    interviewerQuestionEn: 'Walk me through your background and why you are the strongest fit for this role.',
    winningAnswerEn:
      'Over the past five years, I have specialized in delivering scalable solutions and improving operational efficiency by over 30%. I am excited about this role because my hands-on experience directly aligns with your team’s Q3 growth goals.',
    persianTranslation:
      '«طی پنج سال گذشته، من به طور تخصصی بر ارائه راهکارهای مقیاس‌پذیر و افزایش ۳۰ درصدی بهره‌وری تمرکز داشته‌ام و تجربه عملی من دقیقاً هم‌راستا با اهداف رشد تیم شماست.»',
    fingilish:
      'Tey-ye panj sāl-e gozashteh, man bar erā’eh-ye rāhkār-hā-ye maghyās-pazir o afzāyesh-e 30 darsadi-ye bahreh-vari tamarkoz dāshteh-am.',
    coachSecretFa: 'فرمول طلایی مصاحبه در آمریکا، کانادا، انگلیس و آلمان: هرگز داستان زندگی تعریف نکنید؛ از فرمول Present (تخصص فعلی) + Past (یک دستاورد عددی) + Future (ارزش شما برای شرکت) استفاده کنید.'
  },
  {
    id: 'job_2',
    roleTitle: '💵 2. Salary Negotiation Counter-Offer (+$15,000 to +$35,000 Boost)',
    interviewerQuestionEn: 'We would like to offer you a base salary of $95,000. Are you ready to sign today?',
    winningAnswerEn:
      'Thank you so much for the offer—I am thrilled about the team and the mission. Based on my track record and current market benchmarks for this tier, I was targeting a base between $112,000 and $118,000. If we can bridge that gap to $114,000, I am ready to sign immediately.',
    persianTranslation:
      '«بسیار سپاسگزارم؛ من از همکاری با تیم شما بسیار خرسندم. با توجه به سوابقم و نرخ بازار، هدف من حقوق پایه بین ۱۱۲ تا ۱۱۸ هزار دلار بود. اگر بتوانیم روی ۱۱۴ هزار دلار توافق کنیم، همین امروز آماده امضای قرارداد هستم.»',
    fingilish:
      'Besyār sepāsgozāram; bā tavajjoh be savābegham o nerkh-e bāzār, hadaf-e man hoghoogh-e pāyeh-ye 114 hezār dolār bood.',
    coachSecretFa: 'در فرهنگ کاری آمریکا، کانادا و اروپا، چانه‌زنی محترمانه (Counter-Offer) کاملاً طبیعی است و در ۸۳٪ موارد بین ۱۰ تا ۲۵ هزار دلار به حقوق سالانه شما اضافه می‌کند!'
  }
];

const FULL_FUND_SCHOLARSHIP_SCENARIOS = [
  {
    id: 'sch_1',
    title: '🎓 1. Convincing a Professor (PI) for Full-Fund RA/TA Scholarship (مصاحبه فول‌فاند با استاد راهنما)',
    professorQuestionEn: 'Why did you apply to my lab specifically, and how does your previous research prepare you for this funded PhD/Master’s position?',
    winningAnswerEn:
      'I closely read your 2025 paper on high-efficiency modeling, and I noticed your upcoming grant focuses on real-time optimization. In my thesis, I built a pipeline that reduced computation latency by 40%, so I can contribute to your lab’s deliverables from day one.',
    persianTranslation:
      '«من مقاله اخیر شما را با دقت مطالعه کردم و دیدم گرنت جدید شما روی بهینه‌سازی آنی متمرکز است. در پایان‌نامه‌ام مدلی ساختم که تأخیر محاسباتی را ۴۰٪ کاهش داد و می‌توانم از روز اول به پروژه آزمایشگاه شما کمک کنم.»',
    fingilish:
      'Man maghāleh-ye akhir-e shomā ro bā deghat khāndam o mitavānam az rooz-e avval be projeh-ye āzmāyeshgāh-e shomā komak konam.',
    tipFa: 'اساتید دانشگاه‌های آمریکا، کانادا، آلمان و استرالیا به دنبال دانشجویی هستند که مقاله اخیرشان را خوانده باشد و گرنت پژوهشی آن‌ها را جلو ببرد.'
  },
  {
    id: 'sch_2',
    title: '🎓 2. Answering "What Are Your Academic Career Goals?" for Fellowship Panels',
    professorQuestionEn: 'Where do you see your research impact five years after completing this degree?',
    winningAnswerEn:
      'My goal is to bridge academic research and industry deployment by publishing in top-tier venues while developing open-source tools that expand our department’s global visibility.',
    persianTranslation:
      '«هدف من ایجاد پل میان پژوهش دانشگاهی و صنعت از طریق چاپ مقالات تراز اول و توسعه ابزارهای متن‌باز است.»',
    fingilish:
      'Hadaf-e man ijād-e pol miyān-e pazhoohesh-e dāneshgāhi o san’at ast.',
    tipFa: 'تأکید بر انتشار مقاله (Publications) و ابزارهای کاربردی، شانس دریافت فول‌فاند (Full Tuition Waiver + Monthly Stipend) را به حداکثر می‌رساند.'
  }
];

const FIVE_COUNTRY_EMBASSY_SIMULATOR = [
  {
    countryId: 'usa',
    flag: '🇺🇸',
    countryNameFa: 'سفارت آمریکا (F-1 / B1-B2 / H-1B)',
    officerQuestionEn: 'Why did you choose this specific university in the United States, and what guarantees your return after graduation under Section 214(b)?',
    goldenAnswerEn:
      'This program offers the exact specialized lab curriculum required for my career advancement as a Lead Engineer in my home country, where my family business and property ties are established.',
    faTranslation: '«این دوره دقیقاً سرفصل‌های تخصصی لازم برای ارتقای شغلی من در کشورم را دارد، جایی که وابستگی‌های خانوادگی، ملکی و شغلی من قرار دارد.»',
    officerSecretFa: 'قانون 214(b) آمریکا: افسر ویزا باید در ۶۰ ثانیه اول مطمئن شود شما برنامه شغلی مشخص و وابستگی قوی (Home Ties) دارید.'
  },
  {
    countryId: 'canada',
    flag: '🇨🇦',
    countryNameFa: 'سفارت کانادا (Study Permit / Visitor / Express Entry)',
    officerQuestionEn: 'How does this Canadian program represent a logical progression from your previous education, and how are your funds structured?',
    goldenAnswerEn:
      'Having completed my bachelor’s degree and two years of industry practice, this postgraduate specialization fills my exact skill gap. My first-year tuition is fully paid, and my GIC/living funds are secured in a liquid account.',
    faTranslation: '«پس از دوره کارشناسی و دو سال سابقه کار، این دوره تخصصی دقیقاً خلأ مهارتی مرا پر می‌کند. شهریه سال اول پرداخت شده و هزینه زندگی کاملاً در حساب معتبر تأمین است.»',
    officerSecretFa: 'برای کانادا (IRCC)، منطقی بودن ادامه تحصیل (Logical Study Progression) و شفافیت گردش مالی مهم‌ترین فاکتور است.'
  },
  {
    countryId: 'australia',
    flag: '🇦🇺',
    countryNameFa: 'سفارت استرالیا (Subclass 500 Genuine Student - GS)',
    officerQuestionEn: 'Under Australia’s Genuine Student (GS) requirement, why study in Australia rather than your home country, and what is your expected ROI?',
    goldenAnswerEn:
      'Australian universities lead globally in this applied field with industry-integrated labs not available locally, multiplying my salary potential by 3x upon completion.',
    faTranslation: '«دانشگاه‌های استرالیا در این رشته کاربردی پیشتاز جهانی هستند و بازگشت سرمایه شغلی مرا پس از فارغ‌التحصیلی سه برابر می‌کنند.»',
    officerSecretFa: 'در آزمون جدید GS استرالیا، باید ارزش اقتصادی مدرک استرالیا نسبت به هزینه تحصیل را با عدد و منطق نشان دهید.'
  },
  {
    countryId: 'uk',
    flag: '🇬🇧',
    countryNameFa: 'سفارت انگلستان (UK Credibility Interview / Skilled Worker)',
    officerQuestionEn: 'Can you name three specific modules from your UK university course and explain how the 28-day financial rule is met?',
    goldenAnswerEn:
      'Yes, my core modules include Advanced Data Systems, Strategic Management, and Applied Research Methods. My tuition and maintenance funds have been held undisturbed for over 35 consecutive days.',
    faTranslation: '«بله، سه واحد اصلی من شامل سیستم‌های پیشرفته، مدیریت استراتژیک و روش تحقیق کاربردی است و موجودی بانکی بیش از ۳۵ روز متوالی بدون کاهش در حساب بوده است.»',
    officerSecretFa: 'افسر UKVI در مصاحبه Credibility نام دقیق واحدهای درسی (Modules) و قانون ۲۸ روز خواب حساب بانکی را چک می‌کند.'
  },
  {
    countryId: 'germany',
    flag: '🇩🇪',
    countryNameFa: 'سفارت آلمان (کارت شانس Chancenkarte / تحصیلی / کاری Blue Card)',
    officerQuestionEn: 'Why have you chosen Germany for your studies or Chancenkarte (Opportunity Card), and how have you prepared your Sperrkonto (Blocked Account)?',
    goldenAnswerEn:
      'Germany is Europe’s industrial powerhouse in engineering and IT. My blocked account (Sperrkonto) is fully funded with the statutory annual amount, and I am actively advancing my German alongside English.',
    faTranslation: '«آلمان قطب صنعتی و مهندسی اروپاست. حساب بلوکه‌شده (Sperrkonto) من به طور کامل شارژ شده و هم‌زمان با انگلیسی در حال ارتقای زبان آلمانی خود هستم.»',
    officerSecretFa: 'در سفارت آلمان، کامل بودن حساب بلوکه‌شده (Sperrkonto) و برنامه روشن برای بازار کار تخصصی آلمان کلید قبولی است.'
  }
];

const CITIZENSHIP_PASSPORT_QUESTIONS = [
  {
    id: 'cit_us_1',
    countryBadge: '🇺🇸 US Civics Test (100 Official USCIS Questions)',
    questionEn: '1. What is the supreme law of the land in the United States, and what do we call the first ten amendments?',
    options: [
      { text: 'The U.S. Constitution — and the Bill of Rights', isCorrect: true },
      { text: 'The Declaration of Independence — and the Federal Articles', isCorrect: false }
    ],
    persianExplanation: 'قانون اساسی آمریکا (The Constitution) بالاترین قانون کشور است و ۱۰ متمم اول آن «منشور حقوق شهروندی (The Bill of Rights)» نام دارد.'
  },
  {
    id: 'cit_us_2',
    countryBadge: '🇺🇸 US Civics Test (100 Official USCIS Questions)',
    questionEn: '2. Who is in charge of the executive branch, and how many U.S. Senators are there?',
    options: [
      { text: 'The President — and 100 U.S. Senators (2 per state)', isCorrect: true },
      { text: 'The Speaker of the House — and 435 Senators', isCorrect: false }
    ],
    persianExplanation: 'رئیس‌جمهور (The President) ریاست قوه مجریه را بر عهده دارد و مجلس سنای آمریکا دقیقاً ۱۰۰ سناتور (هر ایالت ۲ سناتور) دارد.'
  },
  {
    id: 'cit_ca_1',
    countryBadge: '🇨🇦 Discover Canada Citizenship Exam',
    questionEn: '3. What are the three parts of the Parliament of Canada, and what document was enacted in 1982?',
    options: [
      { text: 'The Sovereign (King/Queen), the Senate, and the House of Commons — Canadian Charter of Rights and Freedoms (1982)', isCorrect: true },
      { text: 'The Governor, Congress, and Supreme Court — Magna Carta', isCorrect: false }
    ],
    persianExplanation: 'پارلمان کانادا از سه بخش (پادشاه/نماینده ایشان، سنا و مجلس عوام) تشکیل شده و منشور حقوق و آزادی‌های کانادا در سال ۱۹۸۲ تصویب شد.'
  },
  {
    id: 'cit_uk_1',
    countryBadge: '🇬🇧 Life in the UK Official Settlement & Citizenship Test',
    questionEn: '4. Which document signed in 1215 established that even the King is subject to the law in Britain?',
    options: [
      { text: 'The Magna Carta (1215)', isCorrect: true },
      { text: 'The Act of Union (1707)', isCorrect: false }
    ],
    persianExplanation: 'منشور کبیر (Magna Carta) در سال ۱۲۱۵ میلادی اصل حاکمیت قانون بر همگان حتی پادشاه را در بریتانیا پایه‌گذاری کرد.'
  }
];

export const VictoryPathHub: React.FC<VictoryPathHubProps> = ({ onEarnLingous }) => {
  const [subTab, setSubTab] = useState<'job_salary' | 'scholarship' | 'embassy_5' | 'citizenship'>('job_salary');
  const [selectedCountry, setSelectedCountry] = useState<string>('usa');
  const [currentOfferUsd, setCurrentOfferUsd] = useState<number>(85000);
  const [quizSelected, setQuizSelected] = useState<Record<string, number>>({});

  const targetCounterOffer = Math.round(currentOfferUsd * 1.2);
  const activeEmbassy =
    FIVE_COUNTRY_EMBASSY_SIMULATOR.find((c) => c.countryId === selectedCountry) ||
    FIVE_COUNTRY_EMBASSY_SIMULATOR[0];

  return (
    <div className="space-y-6 pb-12">
      {/* Hero Banner */}
      <div className="rounded-3xl bg-gradient-to-br from-slate-950 via-indigo-950 to-teal-950 text-white p-6 sm:p-8 border-2 border-amber-400 shadow-xl space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="space-y-1">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-amber-400 text-slate-950 font-black text-xs">
              <Sparkles className="w-4 h-4" />
              <span>🏆 MODULE 2: VICTORYPATH HUB — CAREER, FULL-FUND SCHOLARSHIP, 5-EMBASSY VISA & CITIZENSHIP</span>
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-amber-300 pt-1">
              بخش طلایی VictoryPath: مصاحبه شغلی و چانه‌زنی حقوق، بورسیه فول‌فاند، سفارت ۵ کشور و آزمون پاسپورت
            </h2>
            <p className="text-xs sm:text-sm text-indigo-100">
              ویژه موفقیت شغلی، دانشگاهی و مهاجرتی در آمریکا 🇺🇸، کانادا 🇨🇦، استرالیا 🇦🇺، انگلستان 🇬🇧 و آلمان 🇩🇪 — به صورت کاملاً دوزبانه و صوتی.
            </p>
          </div>
        </div>

        {/* Sub-Navigation */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5 pt-2">
          {[
            { id: 'job_salary' as const, label: '💼 ۱. مصاحبه شغلی و چانه‌زنی حقوق دلاری', icon: Briefcase },
            { id: 'scholarship' as const, label: '🎓 ۲. مصاحبه بورسیه فول‌فاند دانشگاهی', icon: GraduationCap },
            { id: 'embassy_5' as const, label: '🛂 ۳. شبیه‌ساز افسر ویزای ۵ کشور', icon: ShieldCheck },
            { id: 'citizenship' as const, label: '🗽 ۴. آزمون رسمی شهروندی و پاسپورت', icon: Flag }
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

      {/* 1. JOB INTERVIEW & SALARY NEGOTIATION */}
      {subTab === 'job_salary' && (
        <div className="space-y-5">
          {/* Interactive Salary Counter-Offer Calculator */}
          <div className="bg-white rounded-3xl border-2 border-emerald-500/50 p-6 shadow-xs space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <h3 className="text-base sm:text-lg font-black text-slate-900">
                  💵 ماشین‌حساب هوشمند چانه‌زنی حقوق سالانه (Salary Counter-Offer Script Generator)
                </h3>
                <p className="text-xs text-slate-600">
                  پیشنهاد اولیه شرکت را وارد کنید تا جملهٔ استاندارد انگلیسی برای افزایش ۲۰٪ حقوق سالانه تولید و خوانده شود:
                </p>
              </div>
              <div className="px-4 py-2 rounded-2xl bg-emerald-950 text-amber-300 font-black text-sm tabular-nums" dir="ltr">
                +{((targetCounterOffer - currentOfferUsd)).toLocaleString()} USD / Year Boost!
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-black text-slate-800 block" dir="ltr">
                Initial Company Salary Offer: ${currentOfferUsd.toLocaleString()} / year ➔ Target Counter-Offer: ${targetCounterOffer.toLocaleString()} / year
              </label>
              <input
                type="range"
                min={45000}
                max={220000}
                step={5000}
                value={currentOfferUsd}
                onChange={(e) => setCurrentOfferUsd(Number(e.target.value))}
                className="w-full accent-emerald-700"
              />
            </div>

            <div className="p-4 rounded-2xl bg-slate-900 text-white space-y-2" dir="ltr">
              <p className="text-xs sm:text-sm font-black text-amber-300">
                🗣️ Your Exact Counter-Offer Script to Say to HR / Hiring Manager:
              </p>
              <p className="text-sm sm:text-base font-bold text-white leading-relaxed">
                "Thank you so much for the ${currentOfferUsd.toLocaleString()} offer—I am very excited about joining your team. Based on my specialized experience and current market rates, I was targeting ${targetCounterOffer.toLocaleString()}. If we can meet at ${targetCounterOffer.toLocaleString()}, I would be delighted to sign the offer letter today."
              </p>
              <button
                type="button"
                onClick={() => {
                  speakEnglish(
                    `Thank you so much for the ${currentOfferUsd} dollars offer. Based on my specialized experience, if we can meet at ${targetCounterOffer} dollars, I would be delighted to sign today.`,
                    0.88
                  );
                  onEarnLingous(15);
                }}
                className="px-4 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs flex items-center gap-1.5"
              >
                <Volume2 className="w-4 h-4" />
                <span>🔊 Hear Executive Counter-Offer in English</span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {JOB_AND_SALARY_SCENARIOS.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-3xl border border-slate-200 p-6 space-y-3 shadow-xs flex flex-col justify-between"
              >
                <div className="space-y-2.5">
                  <h4 className="font-black text-sm sm:text-base text-slate-900" dir="ltr">
                    {item.roleTitle}
                  </h4>
                  <p className="text-xs font-bold text-rose-800 bg-rose-50 p-2.5 rounded-xl border border-rose-200" dir="ltr">
                    ❓ Interviewer: "{item.interviewerQuestionEn}"
                  </p>
                  <div className="p-3.5 rounded-2xl bg-slate-900 text-white space-y-1.5" dir="ltr">
                    <p className="text-xs sm:text-sm font-black text-emerald-300">
                      ✅ Winning Answer: "{item.winningAnswerEn}"
                    </p>
                    <p className="text-xs font-mono text-amber-200">
                      🗣️ Fingilish: "{item.fingilish}"
                    </p>
                  </div>
                  <p className="text-xs font-bold text-slate-800">{item.persianTranslation}</p>
                  <p className="text-xs text-amber-950 bg-amber-50 p-2.5 rounded-xl border border-amber-200">
                    💡 {item.coachSecretFa}
                  </p>
                </div>

                <div className="flex gap-2 pt-2" dir="ltr">
                  <button
                    type="button"
                    onClick={() => {
                      speakEnglish(item.winningAnswerEn, 0.88);
                      onEarnLingous(10);
                    }}
                    className="flex-1 py-2.5 rounded-xl bg-indigo-900 hover:bg-indigo-800 text-white font-black text-xs"
                  >
                    🔊 Hear English Answer
                  </button>
                  <button
                    type="button"
                    onClick={() => speakPersian(item.persianTranslation, 0.85, item.fingilish)}
                    className="py-2.5 px-4 rounded-xl bg-emerald-700 hover:bg-emerald-600 text-white font-black text-xs"
                  >
                    🔊 فارسی اصیل
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 2. FULL-FUND UNIVERSITY SCHOLARSHIP INTERVIEW */}
      {subTab === 'scholarship' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {FULL_FUND_SCHOLARSHIP_SCENARIOS.map((sc) => (
            <div
              key={sc.id}
              className="bg-white rounded-3xl border-2 border-slate-200 p-6 space-y-3 shadow-xs flex flex-col justify-between"
            >
              <div className="space-y-3">
                <h3 className="font-black text-sm sm:text-base text-slate-900" dir="ltr">
                  {sc.title}
                </h3>
                <p className="text-xs font-bold text-indigo-950 bg-indigo-50 p-3 rounded-xl border border-indigo-200" dir="ltr">
                  🎓 Professor / Committee: "{sc.professorQuestionEn}"
                </p>
                <div className="p-4 rounded-2xl bg-emerald-950 text-white space-y-1.5" dir="ltr">
                  <p className="text-xs sm:text-sm font-black text-amber-300">
                    ✅ Full-Fund Winning Pitch: "{sc.winningAnswerEn}"
                  </p>
                  <p className="text-xs font-mono text-emerald-200">
                    🗣️ Fingilish: "{sc.fingilish}"
                  </p>
                </div>
                <p className="text-xs font-bold text-slate-800">{sc.persianTranslation}</p>
                <p className="text-xs text-amber-950 bg-amber-50 p-2.5 rounded-xl border border-amber-200">
                  💡 {sc.tipFa}
                </p>
              </div>
              <div className="flex gap-2 pt-2" dir="ltr">
                <button
                  type="button"
                  onClick={() => {
                    speakEnglish(sc.winningAnswerEn, 0.88);
                    onEarnLingous(15);
                  }}
                  className="flex-1 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-600 text-white font-black text-xs"
                >
                  🔊 Hear Scholarship Answer
                </button>
                <button
                  type="button"
                  onClick={() => speakPersian(sc.persianTranslation, 0.85, sc.fingilish)}
                  className="py-2.5 px-4 rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-900 font-black text-xs"
                >
                  🔊 ترجمه فارسی
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* 3. 5-COUNTRY EMBASSY VISA OFFICER SIMULATOR */}
      {subTab === 'embassy_5' && (
        <div className="space-y-4">
          <div className="flex flex-wrap gap-2 bg-white p-3 rounded-2xl border border-slate-200">
            {FIVE_COUNTRY_EMBASSY_SIMULATOR.map((c) => (
              <button
                key={c.countryId}
                type="button"
                onClick={() => {
                  sound.playClick();
                  setSelectedCountry(c.countryId);
                }}
                className={`px-4 py-2.5 rounded-xl text-xs font-black flex items-center gap-2 transition-all ${
                  selectedCountry === c.countryId
                    ? 'bg-indigo-900 text-white shadow-sm'
                    : 'bg-slate-100 text-slate-800 hover:bg-slate-200'
                }`}
              >
                <span className="text-base">{c.flag}</span>
                <span>{c.countryNameFa}</span>
              </button>
            ))}
          </div>

          <div className="bg-white rounded-3xl border-2 border-indigo-500/40 p-6 sm:p-8 space-y-4 shadow-sm">
            <div className="flex items-center justify-between">
              <span className="text-base sm:text-xl font-black text-slate-900">
                {activeEmbassy.flag} {activeEmbassy.countryNameFa}
              </span>
            </div>

            <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 space-y-1" dir="ltr">
              <span className="text-xs font-black text-rose-900 block">
                🛂 Consular Visa Officer Question:
              </span>
              <p className="text-sm sm:text-base font-black text-slate-900">
                "{activeEmbassy.officerQuestionEn}"
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950 text-white space-y-2" dir="ltr">
              <span className="text-xs font-black text-amber-300 block">
                ✅ High-Approval Applicant Response:
              </span>
              <p className="text-sm sm:text-base font-bold text-emerald-300 leading-relaxed">
                "{activeEmbassy.goldenAnswerEn}"
              </p>
              <p className="text-xs text-slate-200" dir="rtl">
                🇮🇷 ترجمه فارسی: {activeEmbassy.faTranslation}
              </p>
            </div>

            <div className="p-3.5 rounded-2xl bg-amber-50 border border-amber-200 text-xs font-bold text-amber-950">
              🔑 <strong>نکته طلایی افسر پرونده:</strong> {activeEmbassy.officerSecretFa}
            </div>

            <div className="flex flex-wrap gap-2" dir="ltr">
              <button
                type="button"
                onClick={() => {
                  speakEnglish(activeEmbassy.officerQuestionEn, 0.88);
                }}
                className="px-4 py-2.5 rounded-xl bg-rose-700 hover:bg-rose-600 text-white font-black text-xs"
              >
                🔊 Hear Officer Question
              </button>
              <button
                type="button"
                onClick={() => {
                  speakEnglish(activeEmbassy.goldenAnswerEn, 0.88);
                  onEarnLingous(15);
                }}
                className="px-4 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-600 text-white font-black text-xs"
              >
                🔊 Hear Winning Visa Answer (+15 XP)
              </button>
              <button
                type="button"
                onClick={() => speakPersian(activeEmbassy.faTranslation, 0.85)}
                className="px-4 py-2.5 rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-900 font-black text-xs"
              >
                🔊 شنیدن توضیح فارسی
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 4. OFFICIAL CITIZENSHIP & PASSPORT EXAMS (US CIVICS 100, CANADA, UK) */}
      {subTab === 'citizenship' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {CITIZENSHIP_PASSPORT_QUESTIONS.map((q) => {
            const chosen = quizSelected[q.id];
            return (
              <div
                key={q.id}
                className="bg-white rounded-3xl border-2 border-slate-200 p-6 space-y-3 shadow-xs flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between" dir="ltr">
                    <span className="text-xs font-black text-indigo-900">
                      {q.countryBadge}
                    </span>
                    <button
                      type="button"
                      onClick={() => speakEnglish(q.questionEn, 0.88)}
                      className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-black"
                    >
                      🔊 Listen
                    </button>
                  </div>

                  <p className="text-sm sm:text-base font-black text-slate-900" dir="ltr">
                    {q.questionEn}
                  </p>

                  <div className="space-y-2" dir="ltr">
                    {q.options.map((opt, idx) => {
                      const isPicked = chosen === idx;
                      return (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => {
                            sound.playClick();
                            setQuizSelected((prev) => ({ ...prev, [q.id]: idx }));
                            if (opt.isCorrect) {
                              sound.playLevelUp();
                              try { confetti({ particleCount: 40, spread: 60 }); } catch {}
                              onEarnLingous(20);
                            } else {
                              sound.playError();
                            }
                          }}
                          className={`w-full p-3 rounded-xl border-2 text-left text-xs font-black transition-all ${
                            isPicked
                              ? opt.isCorrect
                                ? 'bg-emerald-600 text-white border-emerald-700'
                                : 'bg-rose-600 text-white border-rose-700'
                              : 'bg-slate-50 hover:bg-slate-100 text-slate-800 border-slate-200'
                          }`}
                        >
                          {opt.text}
                        </button>
                      );
                    })}
                  </div>

                  <p className="text-xs text-emerald-950 bg-emerald-50 p-3 rounded-xl border border-emerald-200">
                    🇮🇷 <strong>توضیح دوزبانه آزمون شهروندی:</strong> {q.persianExplanation}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
