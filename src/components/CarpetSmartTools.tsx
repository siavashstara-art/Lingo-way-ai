import React, { useState } from 'react';
import {
  Volume2,
  Award,
  Calculator,
  QrCode,
  Sparkles,
  Copy,
  Check,
  Globe
} from 'lucide-react';
import {
  sound,
  speakEnglish,
  speakArabic,
  speakChinese,
  speakRussian,
  speakPersian
} from '../utils/audio';

export const CarpetSmartTools: React.FC = () => {
  // 1. Smart Dimension & Currency Calculator State
  const [widthCm, setWidthCm] = useState<number>(135);
  const [lengthCm, setLengthCm] = useState<number>(200);
  const [pricePerSqmUsd, setPricePerSqmUsd] = useState<number>(450);

  // 2. Digital Certificate of Authenticity Generator State
  const [certGalleryName, setCertGalleryName] = useState<string>('گالری فرش علی‌میری (یادمان شادروان حاج حسین آقای علی‌میری)');
  const [certBuyerName, setCertBuyerName] = useState<string>('Valued International Collector');
  const [certOrigin, setCertOrigin] = useState<string>('Tabriz / Isfahan Master Weave (تبریز / اصفهان)');
  const [certTypeSize, setCertTypeSize] = useState<string>('Dozar Ghalicheh (200×135 cm / 4.5×6.7 ft)');
  const [certCondition, setCertCondition] = useState<string>('100% Kohneh Zaati (Naturally Aged Patina) & Vegetable Dyes');
  const [certMaterialRaj, setCertMaterialRaj] = useState<string>('60 Raj • Pure Silk Foundation & Kork Lambswool');
  const [copiedCert, setCopiedCert] = useState<boolean>(false);

  // Calculations
  const areaSqm = Number(((widthCm * lengthCm) / 10000).toFixed(2));
  const widthTotalInches = Math.round(widthCm / 2.54);
  const lengthTotalInches = Math.round(lengthCm / 2.54);
  const widthFt = Math.floor(widthTotalInches / 12);
  const widthIn = widthTotalInches % 12;
  const lengthFt = Math.floor(lengthTotalInches / 12);
  const lengthIn = lengthTotalInches % 12;
  const imperialStr = `${widthFt}'${widthIn}" × ${lengthFt}'${lengthIn}" ft`;

  const getTraditionalZarName = (w: number, l: number): string => {
    const area = (w * l) / 10000;
    if (Math.abs(w - l) <= 15) return 'فرش مربع (Morabba Square Rug)';
    if (area <= 0.7) return 'پشتی سنتی (Poshti — نیم ذرع)';
    if (area <= 1.2) return 'ذرع و چارک (Zar-o-Charak — ۱.۲۵ ذرع)';
    if (area <= 1.8) return 'قالیچه ذرع و نیم (Zar-o-Nim — ۱.۵ ذرع)';
    if (area <= 3.2) return 'قالیچه دو ذرع (Dozar — ۲ ذرع)';
    if (area <= 4.5) return 'قالی پرده‌ای (Pardeh-i — ۲.۵ ذرع)';
    if (area <= 7.0) return 'قالی ۶ متری (Seh-Zar — ۳ ذرع)';
    if (area <= 10.0) return 'قالی ۹ متری (9-Meter Grand Carpet)';
    return 'قالی ۱۲ متری یا بزرگ‌پارچه (12-Meter Palace Carpet)';
  };

  const zarLabel = getTraditionalZarName(widthCm, lengthCm);
  const totalUsd = Math.round(areaSqm * pricePerSqmUsd);
  const totalEur = Math.round(totalUsd * 0.92);
  const totalAed = Math.round(totalUsd * 3.67);
  const totalCny = Math.round(totalUsd * 7.24);

  const pitchEn = `This authentic Persian carpet measures ${widthCm} by ${lengthCm} centimeters, which is ${imperialStr} (${areaSqm} square meters). The collector price is ${totalUsd} US Dollars (or ${totalEur} Euros).`;
  const pitchAr = `هذه السجادة الإيرانية اليدوية أبعادها ${widthCm} في ${lengthCm} سنتيمتراً (${areaSqm} متر مربع). السعر النهائي للمقتنين هو ${totalUsd} دولار أمريكي أو ${totalAed} درهم إماراتي.`;
  const pitchZh = `这张正宗波斯手工地毯尺寸为 ${widthCm} 乘 ${lengthCm} 厘米（${areaSqm} 平方米），天然植物染色（Kohneh Zaati），收藏价格为 ${totalUsd} 美元（约 ${totalCny} 人民币）。`;
  const pitchRu = `Этот подлинный персидский ковер ручной работы имеет размер ${widthCm} на ${lengthCm} сантиметров (${areaSqm} кв. м), натуральное старение Кохне Заати. Цена составляет ${totalUsd} долларов США.`;

  const handleCopyCertificate = () => {
    sound.playCoin();
    const certText = `✨ OFFICIAL CERTIFICATE OF PERSIAN CARPET AUTHENTICITY ✨
Issued by: ${certGalleryName}
In Honored Memory of Master Merchant Haj Hossein Agha Ali Miri (فرش بازار - Farsh Bazaar)
----------------------------------------
• Collector / Buyer: ${certBuyerName}
• Origin & Master Weave: ${certOrigin}
• Traditional Cut & Dimensions: ${certTypeSize}
• Age & Dye Authenticity: ${certCondition}
• Structure & Knot Density: ${certMaterialRaj}
• Serial ID: FB-${Date.now().toString().slice(-6)}
----------------------------------------
100% Hand-Knotted Iranian Heritage • Verified by Farsh Bazaar & English-lingou`;
    navigator.clipboard.writeText(certText);
    setCopiedCert(true);
    setTimeout(() => setCopiedCert(false), 2500);
  };

  return (
    <div className="space-y-6">
      {/* 1. MULTILINGUAL (EN / AR / ZH / RU) DIMENSION & PRICE CALCULATOR */}
      <div className="bg-white border-2 border-amber-500/50 rounded-3xl p-5 sm:p-7 shadow-md space-y-5">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200 pb-3">
          <div className="flex items-center gap-2">
            <Calculator className="w-5 h-5 text-rose-800" />
            <h3 className="text-base sm:text-lg font-black text-slate-900">
              ۱. محاسبه‌گر هوشمند ابعاد (سانتی‌متر ⬅️ ذرع و فوت) + اعلام صوتی قیمت به ۵ زبان (انگلیسی، عربی، چینی و روسی)
            </h3>
          </div>
          <span className="text-xs font-bold text-rose-800 bg-rose-50 px-3 py-1 rounded-xl">
            پشتیبانی از خریداران غربی، عرب، چینی 🇨🇳 و روس 🇷🇺
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-700 block">عرض فرش (سانتی‌متر - Width cm):</label>
            <input
              type="number"
              value={widthCm}
              onChange={(e) => setWidthCm(Math.max(20, Number(e.target.value) || 0))}
              className="w-full px-4 py-2.5 rounded-xl border-2 border-slate-200 font-black text-slate-900 text-sm"
            />
          </div>
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-700 block">طول فرش (سانتی‌متر - Length cm):</label>
            <input
              type="number"
              value={lengthCm}
              onChange={(e) => setLengthCm(Math.max(20, Number(e.target.value) || 0))}
              className="w-full px-4 py-2.5 rounded-xl border-2 border-slate-200 font-black text-slate-900 text-sm"
            />
          </div>
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-700 block">قیمت هر متر مربع به دلار ($/m²):</label>
            <input
              type="number"
              value={pricePerSqmUsd}
              onChange={(e) => setPricePerSqmUsd(Math.max(10, Number(e.target.value) || 0))}
              className="w-full px-4 py-2.5 rounded-xl border-2 border-amber-300 font-black text-slate-900 text-sm bg-amber-50/40"
            />
          </div>
        </div>

        {/* Instant Converted Output */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 rounded-2xl bg-slate-900 text-white">
          <div>
            <span className="text-[11px] text-amber-300 block">قواره سنتی بازار ایران:</span>
            <p className="text-xs sm:text-sm font-black mt-0.5">{zarLabel}</p>
          </div>
          <div>
            <span className="text-[11px] text-amber-300 block">معادل دقیق به فوت و اینچ:</span>
            <p className="text-sm sm:text-base font-mono font-black text-emerald-300" dir="ltr">{imperialStr}</p>
          </div>
          <div>
            <span className="text-[11px] text-amber-300 block">مساحت دقیق:</span>
            <p className="text-sm sm:text-base font-black">{areaSqm} متر مربع (m²)</p>
          </div>
          <div>
            <span className="text-[11px] text-amber-300 block">قیمت کل به ۴ ارز جهانی:</span>
            <p className="text-xs sm:text-sm font-black text-amber-400" dir="ltr">
              ${totalUsd} | €{totalEur} | {totalAed} AED | ¥{totalCny}
            </p>
          </div>
        </div>

        {/* 4-Language Audio Pitch Buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
          <button
            type="button"
            onClick={() => speakEnglish(pitchEn, 0.88)}
            className="py-3 px-4 rounded-2xl bg-rose-800 hover:bg-rose-700 text-white font-black text-xs flex items-center justify-center gap-2 shadow-xs"
          >
            <Volume2 className="w-4 h-4" />
            <span>🇬🇧 اعلام ابعاد و قیمت به انگلیسی</span>
          </button>

          <button
            type="button"
            onClick={() => speakArabic(pitchAr, 0.85)}
            className="py-3 px-4 rounded-2xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs flex items-center justify-center gap-2 shadow-xs"
          >
            <Volume2 className="w-4 h-4" />
            <span>🇸🇦 اعلام ابعاد و قیمت به عربی</span>
          </button>

          <button
            type="button"
            onClick={() => speakChinese(pitchZh, 0.85, `Zhe zhang Bosi ditan chicun wei ${widthCm} cheng ${lengthCm} limi, jiage wei ${totalUsd} meiyuan`)}
            className="py-3 px-4 rounded-2xl bg-red-700 hover:bg-red-600 text-white font-black text-xs flex items-center justify-center gap-2 shadow-xs"
          >
            <Volume2 className="w-4 h-4" />
            <span>🇨🇳 اعلام به زبان چینی (ماندارین)</span>
          </button>

          <button
            type="button"
            onClick={() => speakRussian(pitchRu, 0.85, `Etot persidskiy kover imeyet razmer ${widthCm} na ${lengthCm} santimetrov, tsena ${totalUsd} dollarov`)}
            className="py-3 px-4 rounded-2xl bg-indigo-800 hover:bg-indigo-700 text-white font-black text-xs flex items-center justify-center gap-2 shadow-xs"
          >
            <Volume2 className="w-4 h-4" />
            <span>🇷🇺 اعلام به زبان روسی</span>
          </button>
        </div>
      </div>

      {/* 2. SHOWROOM AUDIO STORYTELLER FOR TOURISTS (کارت صوتی داستان نقوش فرش ویترین) */}
      <div className="bg-white border-2 border-rose-700/30 rounded-3xl p-5 sm:p-7 shadow-md space-y-4">
        <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
          <Globe className="w-5 h-5 text-rose-800" />
          <h3 className="text-base sm:text-lg font-black text-slate-900">
            ۲. راوی صوتی فلسفه نقوش فرش ایرانی برای توریست‌های داخل حجره (پخش ۵ زبانه با یک کلیک)
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            {
              titleFa: 'فلسفه طرح لچک و ترنج (Central Medallion & Heaven Gate)',
              descFa: 'توضیح معنوی حوض بهشتی در مرکز فرش و چهار باغ اطراف آن برای مجذوب کردن خریدار خارجی',
              en: 'The central Medallion ("Toranj") represents the celestial pool of paradise reflecting the dome of heaven, surrounded by four corner gardens ("Lachak").',
              ar: 'يمثل «الترنج» في وسط السجادة حوض الجنة السماوي، وتحيط به أربع حدائق غنّاء في الزوايا تسمى «لجك».',
              zh: '地毯中央的徽章（Toranj）象征着天堂的圣池，四角代表波斯古典四座花园。',
              ru: 'Центральный медальон «Торандж» символизирует райский водоем, окруженный четырьмя райскими садами.'
            },
            {
              titleFa: 'فلسفه طرح خشتی و باغ بهشت (Kheshti / Garden of Paradise)',
              descFa: 'معرفی قاب‌های خشتی (درخت زندگی، بید مجنون، سرو و انار) به عنوان نماد جاودانگی و برکت',
              en: 'This "Kheshti" Garden tile design divides the carpet into sacred windows of nature—featuring the Cypress of immortality, Pomegranate of abundance, and Willow of peace.',
              ar: 'تصميم «خشتي» يقسم السجادة إلى نوافذ من رياض الجنة تضم شجرة السرو رمز الخلود والرمان رمز البركة والوفرة.',
              zh: '这种方格花园纹样（Kheshti）描绘了生命之树、象征永生的柏树与象征丰饶的石榴。',
              ru: 'Дизайн «Хешти» (Райский сад) разделяет ковер на окна природы с кипарисом бессмертия и гранатом изобилия.'
            }
          ].map((story, i) => (
            <div key={i} className="p-4 rounded-2xl bg-rose-50/50 border border-rose-200 space-y-3">
              <h4 className="font-black text-sm text-rose-950">{story.titleFa}</h4>
              <p className="text-xs text-slate-600">{story.descFa}</p>
              <p className="text-xs font-bold text-slate-900 italic" dir="ltr">"{story.en}"</p>
              <div className="flex flex-wrap gap-1.5 pt-1">
                <button
                  onClick={() => speakEnglish(story.en, 0.88)}
                  className="px-2.5 py-1.5 rounded-xl bg-rose-800 text-white text-[11px] font-bold"
                >
                  🔊 English
                </button>
                <button
                  onClick={() => speakArabic(story.ar, 0.85)}
                  className="px-2.5 py-1.5 rounded-xl bg-amber-500 text-slate-950 text-[11px] font-bold"
                >
                  🔊 العربية
                </button>
                <button
                  onClick={() => speakChinese(story.zh, 0.85, story.en)}
                  className="px-2.5 py-1.5 rounded-xl bg-red-700 text-white text-[11px] font-bold"
                >
                  🔊 中文 (چینی)
                </button>
                <button
                  onClick={() => speakRussian(story.ru, 0.85, story.en)}
                  className="px-2.5 py-1.5 rounded-xl bg-indigo-800 text-white text-[11px] font-bold"
                >
                  🔊 Русский (روسی)
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 3. DIGITAL CERTIFICATE OF AUTHENTICITY GENERATOR (صدور شناسنامه دیجیتال اصالت فرش) */}
      <div className="bg-gradient-to-br from-slate-950 via-rose-950 to-amber-950 text-white rounded-3xl p-6 sm:p-8 border-2 border-amber-400/60 shadow-xl space-y-5">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-amber-400/30 pb-4">
          <div className="flex items-center gap-2.5">
            <Award className="w-6 h-6 text-amber-400" />
            <div>
              <h3 className="text-base sm:text-xl font-black text-amber-300">
                ۳. صدور آنی «شناسنامه بین‌المللی اصالت فرش دستباف (Certificate of Authenticity)»
              </h3>
              <p className="text-xs text-amber-100/80">
                به یاد شادروان حاج حسین آقای علی‌میری • متصل به استاندارد برنامه «فرش بازار (Farsh Bazaar)»
              </p>
            </div>
          </div>
          <QrCode className="w-8 h-8 text-amber-400" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          <div>
            <label className="text-amber-200 font-bold block mb-1">نام حجره / گالری صادرکننده:</label>
            <input
              type="text"
              value={certGalleryName}
              onChange={(e) => setCertGalleryName(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-white/10 border border-amber-400/40 text-white font-bold"
            />
          </div>
          <div>
            <label className="text-amber-200 font-bold block mb-1">نام خریدار خارجی (Buyer Name):</label>
            <input
              type="text"
              value={certBuyerName}
              onChange={(e) => setCertBuyerName(e.target.value)}
              dir="ltr"
              className="w-full px-3.5 py-2.5 rounded-xl bg-white/10 border border-amber-400/40 text-white font-bold"
            />
          </div>
          <div>
            <label className="text-amber-200 font-bold block mb-1">قواره و ابعاد (Size & Zar):</label>
            <input
              type="text"
              value={certTypeSize}
              onChange={(e) => setCertTypeSize(e.target.value)}
              dir="ltr"
              className="w-full px-3.5 py-2.5 rounded-xl bg-white/10 border border-amber-400/40 text-white font-bold"
            />
          </div>
          <div>
            <label className="text-amber-200 font-bold block mb-1">قدمت و اصالت رنگ (Kohneh Zaati & Dyes):</label>
            <input
              type="text"
              value={certCondition}
              onChange={(e) => setCertCondition(e.target.value)}
              dir="ltr"
              className="w-full px-3.5 py-2.5 rounded-xl bg-white/10 border border-amber-400/40 text-white font-bold"
            />
          </div>
        </div>

        {/* Preview of Golden Certificate Card */}
        <div className="p-5 rounded-2xl bg-black/45 border-2 border-amber-400/50 space-y-2" dir="ltr">
          <div className="flex items-center justify-between border-b border-amber-400/30 pb-2">
            <span className="text-xs font-black text-amber-400 tracking-wider">
              ★ CERTIFICATE OF AUTHENTIC PERSIAN HAND-KNOTTED CARPET ★
            </span>
            <span className="text-[11px] font-mono text-amber-200">Farsh Bazaar Verified</span>
          </div>
          <p className="text-xs text-amber-100"><strong>Gallery:</strong> {certGalleryName}</p>
          <p className="text-xs text-amber-100"><strong>Issued To:</strong> {certBuyerName}</p>
          <p className="text-xs text-amber-100"><strong>Origin & Cut:</strong> {certOrigin} — {certTypeSize}</p>
          <p className="text-xs text-amber-100"><strong>Patina & Dyes:</strong> {certCondition}</p>
          <p className="text-xs text-amber-100"><strong>Weave Spec:</strong> {certMaterialRaj}</p>
        </div>

        <div className="flex flex-wrap gap-3">
          <button
            type="button"
            onClick={handleCopyCertificate}
            className="flex-1 py-3 px-5 rounded-2xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md"
          >
            {copiedCert ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            <span>
              {copiedCert
                ? '✅ متن شناسنامه کپی شد (آماده ارسال در واتساپ یا چاپ برای مشتری)'
                : '📋 کپی شناسنامه رسمی دوزبانه جهت ارسال به مشتری خارجی'}
            </span>
          </button>

          <button
            type="button"
            onClick={() =>
              speakEnglish(
                `Official Certificate of Authenticity issued to ${certBuyerName}. ${certTypeSize}, ${certCondition}, ${certMaterialRaj}.`,
                0.88
              )
            }
            className="py-3 px-5 rounded-2xl bg-white/15 hover:bg-white/25 text-white font-bold text-xs sm:text-sm flex items-center gap-2"
          >
            <Volume2 className="w-4 h-4" />
            <span>🔊 قرائت صوتی شناسنامه برای مشتری</span>
          </button>
        </div>
      </div>
    </div>
  );
};
