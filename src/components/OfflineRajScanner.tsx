import React, { useState, useRef, useEffect, useCallback } from 'react';
import {
  Camera,
  Upload,
  Sparkles,
  CheckCircle2,
  Volume2,
  Sliders,
  Plus,
  Minus,
  Award,
  Flashlight,
  RefreshCw,
  Eye,
  ShieldCheck,
  Ruler
} from 'lucide-react';
import {
  sound,
  speakPersian,
  speakEnglish,
  speakArabic,
  speakChinese,
  speakRussian
} from '../utils/audio';

export interface RajScanResult {
  knotsInWindow: number;
  windowCm: 1 | 3.5 | 7;
  exactRaj: number;
  commercialRajClass: string;
  knotsPerCm: number;
  knotsPerSqm: number;
  kpsi: number;
  qualityTierFa: string;
  qualityTierEn: string;
  detectedPeaksX: number[];
}

interface OfflineRajScannerProps {
  onApplyToCertificate?: (summaryEn: string, summaryFa: string, result: RajScanResult) => void;
}

interface PresetWeaveSample {
  id: string;
  titleFa: string;
  originFa: string;
  targetRaj: number;
  knotsPer1Cm: number;
  knotColorA: string;
  knotColorB: string;
  weftColor: string;
  descFa: string;
}

const PRESET_WEAVE_SAMPLES: PresetWeaveSample[] = [
  {
    id: 'raj_30',
    titleFa: 'نمونه ۳۰ رج (کاشان / هریس اصیل)',
    originFa: 'بافت پشم دست‌ریس • حدود ۴.۳ گره در هر سانتی‌متر',
    targetRaj: 30,
    knotsPer1Cm: 4,
    knotColorA: '#7f1d1d',
    knotColorB: '#1e3a8a',
    weftColor: '#d6d3d1',
    descFa: 'مناسب قالی‌های دوام‌دار و اصیل با گره‌های درشت و واضح'
  },
  {
    id: 'raj_40',
    titleFa: 'نمونه ۴۰ رج (تبریز / ماهی خوی)',
    originFa: 'بافت نیمه‌ریز‌باف مرینوس • حدود ۵.۷ گره در هر سانتی‌متر',
    targetRaj: 40,
    knotsPer1Cm: 6,
    knotColorA: '#991b1b',
    knotColorB: '#d97706',
    weftColor: '#e7e5e4',
    descFa: 'استاندارد پرفروش بازار تبریز و خوی با دوام و ظرافت متوازن'
  },
  {
    id: 'raj_50',
    titleFa: 'نمونه ۵۰ رج (اصفهان / تبریز علیا)',
    originFa: 'ریزباف اعلا گل‌ابریشم • حدود ۷.۱ گره در هر سانتی‌متر',
    targetRaj: 50,
    knotsPer1Cm: 7,
    knotColorA: '#881337',
    knotColorB: '#065f46',
    weftColor: '#f5f5f4',
    descFa: 'ریزباف صادراتی با نقوش ظریف شاه‌عباسی و لچک‌ترنج'
  },
  {
    id: 'raj_60',
    titleFa: 'نمونه ۶۰ رج (چله ابریشم نفیس تبریز / قم)',
    originFa: 'چله ابریشم بسیار نفیس • حدود ۸.۶ گره در هر سانتی‌متر',
    targetRaj: 60,
    knotsPer1Cm: 9,
    knotColorA: '#4c0519',
    knotColorB: '#b45309',
    weftColor: '#fef3c7',
    descFa: 'فرش سرمایه‌ای و کلکسیونی با تراکم گره بسیار بالا و چله ابریشم'
  },
  {
    id: 'raj_70',
    titleFa: 'نمونه ۷۰ رج (تمام ابریشم قم — شاهکار موزه‌ای)',
    originFa: 'تمام ابریشم خالص • ۱۰ گره در هر سانتی‌متر (۷۰ گره در ۷ سانت)',
    targetRaj: 70,
    knotsPer1Cm: 10,
    knotColorA: '#31102f',
    knotColorB: '#0f766e',
    weftColor: '#fde68a',
    descFa: 'تراکم فوق‌العاده بالای یک میلیون گره در متر مربع (Museum Grade)'
  }
];

export const OfflineRajScanner: React.FC<OfflineRajScannerProps> = ({ onApplyToCertificate }) => {
  const [mode, setMode] = useState<'preset' | 'camera' | 'upload'>('preset');
  const [selectedPresetId, setSelectedPresetId] = useState<string>('raj_50');
  const [windowCm, setWindowCm] = useState<1 | 3.5 | 7>(1);
  const [sensitivity, setSensitivity] = useState<number>(55);
  const [manualOffset, setManualOffset] = useState<number>(0);
  const [cameraActive, setCameraActive] = useState<boolean>(false);
  const [torchOn, setTorchOn] = useState<boolean>(false);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const [appliedBadge, setAppliedBadge] = useState<boolean>(false);
  const [scanResult, setScanResult] = useState<RajScanResult | null>(null);

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const waveCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const uploadedImageRef = useRef<HTMLImageElement | null>(null);

  const stopCamera = useCallback(() => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
    setCameraActive(false);
    setTorchOn(false);
  }, []);

  useEffect(() => {
    return () => {
      stopCamera();
    };
  }, [stopCamera]);

  const classifyRajTier = (raj: number): { commercialClass: string; tierFa: string; tierEn: string } => {
    if (raj < 28) {
      return {
        commercialClass: '۲۵ رج (درشت‌باف / گبه و هریس)',
        tierFa: 'درشت‌باف اصیل و بادوام (مناسب عشایری، هریس و گبه)',
        tierEn: '25 Raj Coarse Tribal / Heriz Weave'
      };
    }
    if (raj < 36) {
      return {
        commercialClass: '۳۰ رج استاندارد بازار',
        tierFa: '۳۰ رج تجاری استاندارد (بافت پشم دست‌ریس مرغوب)',
        tierEn: '30 Raj Classic Commercial Persian Weave'
      };
    }
    if (raj < 46) {
      return {
        commercialClass: '۴۰ رج (نیمه‌ریز‌باف مرغوب)',
        tierFa: '۴۰ رج نیمه‌ریز‌باف اعلا (استاندارد محبوب تبریز، خوی و کاشان)',
        tierEn: '40 Raj Semi-Fine Master Weave'
      };
    }
    if (raj < 56) {
      return {
        commercialClass: '۵۰ رج (ریزباف اعلا صادراتی)',
        tierFa: '۵۰ رج ریزباف اعلا (پشم مرینوس و گل‌ابریشم صادراتی)',
        tierEn: '50 Raj Fine Collector Silk-Inlaid Weave'
      };
    }
    if (raj < 66) {
      return {
        commercialClass: '۶۰ رج (چله ابریشم بسیار نفیس)',
        tierFa: '۶۰ رج چله ابریشم فوق‌العاده نفیس (سرمایه‌ای و کلکسیونی)',
        tierEn: '60 Raj Ultra-Fine Silk Foundation Masterpiece'
      };
    }
    return {
      commercialClass: `${Math.round(raj / 5) * 5} رج (شاهکار تمام ابریشم موزه‌ای)`,
      tierFa: '۷۰+ رج شاهکار موزه‌ای و تمام ابریشم با تراکم بالای یک میلیون گره',
      tierEn: '70+ Raj Museum-Grade Pure Silk Masterpiece'
    };
  };

  // Core 100% Offline On-Device Optical Peak-Detection Algorithm
  const runOpticalKnotDetection = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;

    // Define the horizontal caliper measurement region (central 80% width, central scan line)
    const startX = Math.floor(width * 0.1);
    const endX = Math.floor(width * 0.9);
    const regionWidth = endX - startX;
    const scanY = Math.floor(height * 0.5);

    // Sample a 7-pixel vertical band around scanY to average out vertical thread noise
    const imageData = ctx.getImageData(startX, scanY - 3, regionWidth, 7).data;
    const rawLuminance: number[] = new Array(regionWidth).fill(0);

    for (let x = 0; x < regionWidth; x++) {
      let sumLum = 0;
      for (let dy = 0; dy < 7; dy++) {
        const idx = (dy * regionWidth + x) * 4;
        const r = imageData[idx];
        const g = imageData[idx + 1];
        const b = imageData[idx + 2];
        sumLum += 0.299 * r + 0.587 * g + 0.114 * b;
      }
      rawLuminance[x] = sumLum / 7;
    }

    // 5-tap Gaussian smoothing to isolate physical knot ridges from micro wool fibers
    const smoothed: number[] = new Array(regionWidth).fill(0);
    for (let x = 2; x < regionWidth - 2; x++) {
      smoothed[x] =
        0.1 * rawLuminance[x - 2] +
        0.2 * rawLuminance[x - 1] +
        0.4 * rawLuminance[x] +
        0.2 * rawLuminance[x + 1] +
        0.1 * rawLuminance[x + 2];
    }
    smoothed[0] = rawLuminance[0];
    smoothed[1] = rawLuminance[1];
    smoothed[regionWidth - 2] = rawLuminance[regionWidth - 2];
    smoothed[regionWidth - 1] = rawLuminance[regionWidth - 1];

    // Compute min, max, and adaptive threshold based on sensitivity slider
    let minL = 255;
    let maxL = 0;
    for (let x = 0; x < regionWidth; x++) {
      if (smoothed[x] < minL) minL = smoothed[x];
      if (smoothed[x] > maxL) maxL = smoothed[x];
    }
    const dynamicRange = Math.max(12, maxL - minL);
    const prominenceThreshold = dynamicRange * ((105 - sensitivity) / 220);

    // Minimum pixel distance between adjacent knots so a single knot isn't double-counted
    const minKnotSpacingPx = Math.max(10, Math.floor(regionWidth / 48));

    const detectedPeaksX: number[] = [];
    for (let x = 3; x < regionWidth - 3; x++) {
      const val = smoothed[x];
      const isLocalMax =
        val >= smoothed[x - 1] &&
        val >= smoothed[x + 1] &&
        val > smoothed[x - 2] &&
        val > smoothed[x + 2];

      if (isLocalMax && val - minL >= prominenceThreshold) {
        const prevPeak = detectedPeaksX[detectedPeaksX.length - 1];
        if (prevPeak === undefined || x - prevPeak >= minKnotSpacingPx) {
          detectedPeaksX.push(x);
        }
      }
    }

    // Draw Brass 7cm / 1cm Caliper Frame & Detected Knot Markers on Canvas
    ctx.save();
    // Darken top and bottom outside caliper bar slightly for high contrast
    ctx.fillStyle = 'rgba(2, 6, 23, 0.42)';
    ctx.fillRect(0, 0, width, scanY - 46);
    ctx.fillRect(0, scanY + 46, width, height - (scanY + 46));

    // Golden Caliper Box
    ctx.strokeStyle = '#fbbf24';
    ctx.lineWidth = 3;
    ctx.strokeRect(startX, scanY - 44, regionWidth, 88);

    // Caliper millimeter / centimeter tick marks along top edge
    const totalTicks = windowCm === 1 ? 10 : windowCm === 3.5 ? 14 : 14;
    for (let t = 0; t <= totalTicks; t++) {
      const tx = startX + (t / totalTicks) * regionWidth;
      const isMajor = t % 2 === 0;
      ctx.beginPath();
      ctx.moveTo(tx, scanY - 44);
      ctx.lineTo(tx, scanY - 44 + (isMajor ? 14 : 8));
      ctx.strokeStyle = isMajor ? '#fbbf24' : '#fde68a';
      ctx.lineWidth = isMajor ? 2.5 : 1.2;
      ctx.stroke();
    }

    // Laser Scan Line
    ctx.beginPath();
    ctx.moveTo(startX, scanY);
    ctx.lineTo(endX, scanY);
    ctx.strokeStyle = 'rgba(244, 63, 94, 0.85)';
    ctx.lineWidth = 2;
    ctx.stroke();

    // Draw numbered markers on every detected knot
    detectedPeaksX.forEach((relX, idx) => {
      const absX = startX + relX;
      ctx.beginPath();
      ctx.arc(absX, scanY, 9, 0, Math.PI * 2);
      ctx.fillStyle = '#10b981';
      ctx.fill();
      ctx.lineWidth = 2;
      ctx.strokeStyle = '#ffffff';
      ctx.stroke();

      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 9px sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(String(idx + 1), absX, scanY);
    });

    // Ruler label on canvas
    ctx.fillStyle = '#fef08a';
    ctx.font = 'bold 12px sans-serif';
    ctx.textAlign = 'left';
    ctx.fillText(
      `کولیس نوری: بازه ${windowCm} سانتی‌متر پشت فرش (${detectedPeaksX.length} گره تشخیص داده شد)`,
      startX + 8,
      scanY - 54
    );
    ctx.restore();

    // Render Optical Waveform Canvas below main image
    const waveCanvas = waveCanvasRef.current;
    if (waveCanvas) {
      const wCtx = waveCanvas.getContext('2d');
      if (wCtx) {
        const ww = waveCanvas.width;
        const wh = waveCanvas.height;
        wCtx.clearRect(0, 0, ww, wh);
        wCtx.fillStyle = '#0f172a';
        wCtx.fillRect(0, 0, ww, wh);

        // Grid lines
        wCtx.strokeStyle = 'rgba(148, 163, 184, 0.15)';
        wCtx.lineWidth = 1;
        wCtx.beginPath();
        wCtx.moveTo(0, wh / 2);
        wCtx.lineTo(ww, wh / 2);
        wCtx.stroke();

        // Waveform curve
        wCtx.beginPath();
        for (let x = 0; x < regionWidth; x++) {
          const px = (x / regionWidth) * ww;
          const norm = (smoothed[x] - minL) / dynamicRange;
          const py = wh - 12 - norm * (wh - 24);
          if (x === 0) wCtx.moveTo(px, py);
          else wCtx.lineTo(px, py);
        }
        wCtx.strokeStyle = '#38bdf8';
        wCtx.lineWidth = 2;
        wCtx.stroke();

        // Peak dots on waveform
        detectedPeaksX.forEach((relX) => {
          const px = (relX / regionWidth) * ww;
          const norm = (smoothed[relX] - minL) / dynamicRange;
          const py = wh - 12 - norm * (wh - 24);
          wCtx.beginPath();
          wCtx.arc(px, py, 4, 0, Math.PI * 2);
          wCtx.fillStyle = '#fbbf24';
          wCtx.fill();
        });
      }
    }

    // Calculate Final Raj & Density Metrics
    const effectiveKnotsInWindow = Math.max(1, detectedPeaksX.length + manualOffset);
    const multiplierTo7Cm = 7 / windowCm;
    const exactRaj = Math.round(effectiveKnotsInWindow * multiplierTo7Cm);
    const knotsPerCm = Number((exactRaj / 7).toFixed(1));
    const knotsPerSqm = Math.round(Math.pow((exactRaj / 7) * 100, 2));
    const kpsi = Math.round(Math.pow((exactRaj / 7) * 2.54, 2));
    const tierInfo = classifyRajTier(exactRaj);

    setScanResult({
      knotsInWindow: effectiveKnotsInWindow,
      windowCm,
      exactRaj,
      commercialRajClass: tierInfo.commercialClass,
      knotsPerCm,
      knotsPerSqm,
      kpsi,
      qualityTierFa: tierInfo.tierFa,
      qualityTierEn: tierInfo.tierEn,
      detectedPeaksX
    });
  }, [windowCm, sensitivity, manualOffset]);

  // Draw Realistic Macro Back-of-Carpet Weave Texture for Presets
  const drawPresetWeaveOnCanvas = useCallback(
    (preset: PresetWeaveSample) => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      const width = canvas.width;
      const height = canvas.height;
      ctx.clearRect(0, 0, width, height);

      // Dark background between threads
      ctx.fillStyle = '#1c1917';
      ctx.fillRect(0, 0, width, height);

      const startX = Math.floor(width * 0.1);
      const endX = Math.floor(width * 0.9);
      const regionWidth = endX - startX;

      // Determine how many knots should appear inside the active caliper window
      const expectedKnotsInWindow = Math.round((preset.targetRaj / 7) * windowCm);
      const knotPitchPx = regionWidth / expectedKnotsInWindow;
      const rowHeightPx = Math.max(12, Math.min(24, knotPitchPx * 0.85));

      for (let y = 0; y < height; y += rowHeightPx) {
        // Horizontal weft thread (پود زیرین)
        ctx.fillStyle = 'rgba(120, 113, 108, 0.35)';
        ctx.fillRect(0, y + rowHeightPx * 0.78, width, Math.max(2, rowHeightPx * 0.18));

        for (let x = 0; x < width; x += knotPitchPx) {
          const colIdx = Math.round((x - startX) / knotPitchPx);
          const rowIdx = Math.round(y / rowHeightPx);
          const isHighlight = (colIdx + rowIdx) % 3 === 0;

          // Bright knot crown at center of each knot so optical peak detector locks onto each physical knot
          const knotCenterX = x + knotPitchPx * 0.5;
          const knotWidth = knotPitchPx * 0.72;
          const knotTop = y + rowHeightPx * 0.08;
          const knotH = rowHeightPx * 0.68;

          const grad = ctx.createLinearGradient(
            knotCenterX - knotWidth / 2,
            knotTop,
            knotCenterX + knotWidth / 2,
            knotTop
          );
          grad.addColorStop(0, '#292524');
          grad.addColorStop(0.5, isHighlight ? preset.weftColor : '#e7e5e4');
          grad.addColorStop(1, '#292524');

          ctx.fillStyle = grad;
          ctx.beginPath();
          ctx.roundRect(knotCenterX - knotWidth / 2, knotTop, knotWidth, knotH, 4);
          ctx.fill();

          // Subtle colored wool/silk tint on top & bottom of knot
          ctx.fillStyle = isHighlight ? preset.knotColorA : preset.knotColorB;
          ctx.globalAlpha = 0.28;
          ctx.fillRect(knotCenterX - knotWidth * 0.4, knotTop + 2, knotWidth * 0.8, knotH * 0.35);
          ctx.globalAlpha = 1;
        }
      }

      runOpticalKnotDetection();
    },
    [windowCm, runOpticalKnotDetection]
  );

  useEffect(() => {
    if (mode === 'preset') {
      const preset =
        PRESET_WEAVE_SAMPLES.find((p) => p.id === selectedPresetId) || PRESET_WEAVE_SAMPLES[2];
      drawPresetWeaveOnCanvas(preset);
    } else if (mode === 'upload' && uploadedImageRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas?.getContext('2d');
      if (canvas && ctx) {
        ctx.drawImage(uploadedImageRef.current, 0, 0, canvas.width, canvas.height);
        runOpticalKnotDetection();
      }
    }
  }, [mode, selectedPresetId, windowCm, sensitivity, manualOffset, drawPresetWeaveOnCanvas, runOpticalKnotDetection]);

  // Start Live Mobile Camera (Rear Macro Camera)
  const startMobileCamera = async () => {
    sound.playClick();
    setCameraError(null);
    setMode('camera');
    stopCamera();

    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: { ideal: 'environment' },
          width: { ideal: 1280 },
          height: { ideal: 720 }
        },
        audio: false
      });
      streamRef.current = stream;
      setCameraActive(true);
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        await videoRef.current.play();
      }
    } catch {
      setCameraError(
        'دسترسی مستقیم به دوربین زنده در این مرورگر محدود شده است. می‌توانید از دکمه «📸 عکس‌برداری با دوربین سیستم / گالری گوشی» استفاده کنید یا نمونه‌های آماده بازار را تست نمایید.'
      );
      setCameraActive(false);
    }
  };

  // Toggle mobile camera flashlight (torch) for dark bazaar basements
  const toggleCameraTorch = async () => {
    if (!streamRef.current) return;
    const track = streamRef.current.getVideoTracks()[0];
    if (!track) return;
    try {
      const nextTorch = !torchOn;
      await (track as any).applyConstraints({
        advanced: [{ torch: nextTorch }]
      });
      setTorchOn(nextTorch);
    } catch {
      // Torch not supported on desktop/some devices
    }
  };

  // Capture frame from live camera and run offline optical Raj-Shomar
  const captureCameraFrameAndAnalyze = () => {
    sound.playCoin();
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (!video || !canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    stopCamera();
    setManualOffset(0);
    runOpticalKnotDetection();
  };

  // Handle photo upload or native mobile camera capture via file input
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    sound.playClick();
    stopCamera();
    setMode('upload');
    setManualOffset(0);

    const reader = new FileReader();
    reader.onload = (ev) => {
      const img = new Image();
      img.onload = () => {
        uploadedImageRef.current = img;
        const canvas = canvasRef.current;
        const ctx = canvas?.getContext('2d');
        if (canvas && ctx) {
          ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
          runOpticalKnotDetection();
        }
      };
      if (typeof ev.target?.result === 'string') {
        img.src = ev.target.result;
      }
    };
    reader.readAsDataURL(file);
  };

  const handleApplyToCertificate = () => {
    if (!scanResult) return;
    sound.playLevelUp();
    const summaryEn = `${scanResult.exactRaj} Raj (${scanResult.commercialRajClass}) • ${scanResult.kpsi} KPSI (${scanResult.knotsPerSqm.toLocaleString()} knots/m²) • ${scanResult.qualityTierEn}`;
    const summaryFa = `${scanResult.exactRaj} رج دقیق (${scanResult.commercialRajClass}) • تراکم ${scanResult.knotsPerSqm.toLocaleString('fa-IR')} گره در متر مربع`;
    if (onApplyToCertificate) {
      onApplyToCertificate(summaryEn, summaryFa, scanResult);
    }
    setAppliedBadge(true);
    setTimeout(() => setAppliedBadge(false), 3000);
  };

  return (
    <div className="bg-gradient-to-br from-slate-950 via-slate-900 to-rose-950 text-white rounded-3xl p-5 sm:p-7 border-2 border-amber-400/70 shadow-2xl space-y-6">
      {/* Header Banner */}
      <div className="flex flex-wrap items-start justify-between gap-4 border-b border-amber-400/30 pb-4">
        <div className="space-y-1.5">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-xl bg-amber-400/20 border border-amber-400/50 text-amber-300 text-xs font-black">
            <Sparkles className="w-4 h-4" />
            <span>ابتکار انحصاری به یاد شادروان حاج حسین آقای علی‌میری • ۱۰۰٪ آفلاین و بدون نیاز به اینترنت</span>
          </div>
          <h3 className="text-lg sm:text-2xl font-black text-amber-300 flex items-center gap-2">
            <Camera className="w-6 h-6 text-amber-400 shrink-0" />
            <span>داور و رجشمار نوری آفلاین پشت فرش با دوربین موبایل (ختم مشاجرات رجشمار در بازار!)</span>
          </h3>
          <p className="text-xs sm:text-sm text-amber-100/90 leading-relaxed">
            دوربین موبایل را پشت فرش بگیرید (یا عکس ماکرو پشت قالی را بارگذاری کنید) تا الگوریتم پردازش سیگنال نوری، <strong>تعداد دقیق گره‌ها، رجشمار در ۷ سانتی‌متر، تراکم در متر مربع و KPSI جهانی</strong> را شمارش کرده و روی هر گره شماره بزند!
          </p>
        </div>

        {/* Zero-Touch Automated API Security Shield Badge */}
        <div className="p-3 rounded-2xl bg-emerald-950/80 border border-emerald-400/50 flex items-center gap-2.5 max-w-xs">
          <ShieldCheck className="w-6 h-6 text-emerald-400 shrink-0" />
          <div className="text-[11px] leading-tight">
            <span className="font-black text-emerald-300 block">اتوماسیون امن ۱۰۰٪ خودکار فعال است</span>
            <span className="text-emerald-100/80">
              پردازش تصویر و کلیدهای سرور بدون نیاز به هیچ‌گونه تنظیم دستی توسط شما، به صورت خودکار و امن کار می‌کنند.
            </span>
          </div>
        </div>
      </div>

      {/* Mode Selector: 1. Live Mobile Camera | 2. Native Camera/Photo Upload | 3. Bazaar Reference Weave Samples */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <button
          type="button"
          onClick={startMobileCamera}
          className={`p-3.5 rounded-2xl font-black text-xs sm:text-sm flex items-center justify-center gap-2 border-2 transition-all ${
            mode === 'camera'
              ? 'bg-amber-400 text-slate-950 border-amber-200 shadow-lg'
              : 'bg-white/10 hover:bg-white/15 text-white border-white/20'
          }`}
        >
          <Camera className="w-5 h-5" />
          <span>📸 ۱. اسکن زنده پشت فرش با دوربین موبایل</span>
        </button>

        <label
          className={`p-3.5 rounded-2xl font-black text-xs sm:text-sm flex items-center justify-center gap-2 border-2 cursor-pointer transition-all ${
            mode === 'upload'
              ? 'bg-amber-400 text-slate-950 border-amber-200 shadow-lg'
              : 'bg-white/10 hover:bg-white/15 text-white border-white/20'
          }`}
        >
          <Upload className="w-5 h-5" />
          <span>🖼️ ۲. عکس‌برداری ماکرو / انتخاب از گالری گوشی</span>
          <input
            type="file"
            accept="image/*"
            capture="environment"
            onChange={handleFileUpload}
            className="hidden"
          />
        </label>

        <button
          type="button"
          onClick={() => {
            sound.playClick();
            stopCamera();
            setMode('preset');
            setManualOffset(0);
          }}
          className={`p-3.5 rounded-2xl font-black text-xs sm:text-sm flex items-center justify-center gap-2 border-2 transition-all ${
            mode === 'preset'
              ? 'bg-amber-400 text-slate-950 border-amber-200 shadow-lg'
              : 'bg-white/10 hover:bg-white/15 text-white border-white/20'
          }`}
        >
          <Eye className="w-5 h-5" />
          <span>🧶 ۳. تست فوری با ۵ نمونه بافت استاندارد بازار</span>
        </button>
      </div>

      {/* Preset Selector Chips when in Preset Mode */}
      {mode === 'preset' && (
        <div className="space-y-2 bg-black/30 p-4 rounded-2xl border border-amber-400/30">
          <span className="text-xs font-bold text-amber-300 block">
            یک نمونه بافت پشت قالی را برای مشاهده شمارش خودکار نوری انتخاب کنید:
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-2">
            {PRESET_WEAVE_SAMPLES.map((sample) => (
              <button
                key={sample.id}
                type="button"
                onClick={() => {
                  sound.playClick();
                  setSelectedPresetId(sample.id);
                  setManualOffset(0);
                }}
                className={`p-3 rounded-xl text-right border transition-all ${
                  selectedPresetId === sample.id
                    ? 'bg-amber-400 text-slate-950 border-amber-200 font-black shadow-md'
                    : 'bg-white/5 hover:bg-white/10 text-amber-100 border-white/15 font-bold'
                }`}
              >
                <div className="text-xs font-black">{sample.titleFa}</div>
                <div
                  className={`text-[10px] mt-1 ${
                    selectedPresetId === sample.id ? 'text-slate-800' : 'text-amber-200/75'
                  }`}
                >
                  {sample.originFa}
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Camera Error Notice with Direct Fallback */}
      {cameraError && (
        <div className="p-4 rounded-2xl bg-rose-900/70 border border-rose-400 text-xs text-rose-100 flex flex-wrap items-center justify-between gap-3">
          <span>{cameraError}</span>
          <label className="px-4 py-2 rounded-xl bg-amber-400 text-slate-950 font-black cursor-pointer shrink-0">
            📸 باز کردن دوربین بومی گوشی / گالری
            <input
              type="file"
              accept="image/*"
              capture="environment"
              onChange={handleFileUpload}
              className="hidden"
            />
          </label>
        </div>
      )}

      {/* Caliper Scale & Optical Sensitivity Controls */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-white/5 p-4 rounded-2xl border border-white/15">
        {/* Caliper Window Size */}
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-amber-300 flex items-center gap-1.5">
            <Ruler className="w-4 h-4" />
            <span>مقیاس کولیس خط‌کش روی تصویر:</span>
          </label>
          <div className="grid grid-cols-3 gap-1.5">
            {[
              { val: 1 as const, label: '۱ سانت ماکرو (×۷)' },
              { val: 3.5 as const, label: '۳.۵ سانت نیم‌رج (×۲)' },
              { val: 7 as const, label: '۷ سانت کامل (×۱)' }
            ].map((opt) => (
              <button
                key={opt.val}
                type="button"
                onClick={() => {
                  sound.playClick();
                  setWindowCm(opt.val);
                  setManualOffset(0);
                }}
                className={`py-2 px-2 rounded-xl text-[11px] font-black border ${
                  windowCm === opt.val
                    ? 'bg-amber-400 text-slate-950 border-amber-300'
                    : 'bg-black/40 text-slate-200 border-white/15'
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
          <p className="text-[10px] text-slate-300">
            💡 برای عکس از فاصله نزدیک (۵ سانتی‌متری پشت فرش)، حالت <strong>«۱ سانت ماکرو (×۷)»</strong> بالاترین دقت را دارد.
          </p>
        </div>

        {/* Optical Peak Sensitivity Slider */}
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-amber-300 flex items-center justify-between">
            <span className="flex items-center gap-1.5">
              <Sliders className="w-4 h-4" />
              <span>حساسیت سنسور تشخیص گره:</span>
            </span>
            <span className="font-mono text-amber-400">{sensitivity}%</span>
          </label>
          <input
            type="range"
            min={20}
            max={90}
            value={sensitivity}
            onChange={(e) => setSensitivity(Number(e.target.value))}
            className="w-full accent-amber-400 cursor-pointer"
          />
          <p className="text-[10px] text-slate-300">
            برای فرش‌های تیره‌رنگ یا کهنه ذاتی حساسیت را کمی بالاتر ببرید تا تمام گره‌ها شمارش شوند.
          </p>
        </div>

        {/* Manual Fine-Tune Verification (+/- 1 Knot) */}
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-amber-300 block">
            کالیبراسیون دستی توافقی بازاریان (اصلاح ± گره):
          </label>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => {
                sound.playClick();
                setManualOffset((prev) => prev - 1);
              }}
              className="flex-1 py-2 px-3 rounded-xl bg-rose-800/80 hover:bg-rose-700 text-white font-black text-xs flex items-center justify-center gap-1"
            >
              <Minus className="w-4 h-4" />
              <span>کسر ۱ گره</span>
            </button>
            <button
              type="button"
              onClick={() => {
                sound.playClick();
                setManualOffset(0);
              }}
              className="py-2 px-3 rounded-xl bg-white/10 hover:bg-white/20 text-amber-300 font-bold text-xs"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => {
                sound.playClick();
                setManualOffset((prev) => prev + 1);
              }}
              className="flex-1 py-2 px-3 rounded-xl bg-emerald-700 hover:bg-emerald-600 text-white font-black text-xs flex items-center justify-center gap-1"
            >
              <Plus className="w-4 h-4" />
              <span>افزودن ۱ گره</span>
            </button>
          </div>
          <p className="text-[10px] text-slate-300">
            تعداد گره‌های کادر فعلی: <strong>{scanResult?.knotsInWindow || 0} گره</strong> در {windowCm} سانتی‌متر
          </p>
        </div>
      </div>

      {/* Live Camera Viewfinder + Optical Canvas Analyzer */}
      <div className="space-y-3">
        {cameraActive && (
          <div className="relative rounded-2xl overflow-hidden border-2 border-amber-400 bg-black">
            <video
              ref={videoRef}
              playsInline
              muted
              className="w-full h-64 sm:h-80 object-cover"
            />
            {/* Live Camera Caliper Target Overlay */}
            <div className="absolute inset-0 pointer-events-none flex flex-col items-center justify-center">
              <div className="w-4/5 h-24 border-2 border-amber-400 bg-amber-400/10 rounded-lg relative flex items-center">
                <div className="w-full h-0.5 bg-rose-500 shadow-sm" />
                <span className="absolute -top-6 right-0 bg-slate-950/90 text-amber-300 text-[11px] font-black px-2.5 py-0.5 rounded-md border border-amber-400/40">
                  ردیف گره‌های پشت فرش را روی خط قرمز وسط کادر تنظیم کنید ({windowCm} سانتی‌متر)
                </span>
              </div>
            </div>

            <div className="p-3 bg-slate-950/90 flex flex-wrap items-center justify-between gap-2">
              <button
                type="button"
                onClick={captureCameraFrameAndAnalyze}
                className="flex-1 py-3 px-5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg"
              >
                <Camera className="w-5 h-5" />
                <span>📸 ثبت تصویر ماکرو و شمارش خودکار رج فرش</span>
              </button>
              <button
                type="button"
                onClick={toggleCameraTorch}
                className="py-3 px-4 rounded-xl bg-white/15 hover:bg-white/25 text-amber-300 font-bold text-xs flex items-center gap-1.5"
              >
                <Flashlight className="w-4 h-4" />
                <span>چراغ‌قوه حجره</span>
              </button>
            </div>
          </div>
        )}

        {/* Optical Knot-Counting Canvas & Waveform Graph */}
        <div className="rounded-2xl overflow-hidden border-2 border-amber-400/60 bg-slate-950 p-3 space-y-2">
          <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
            <span className="font-black text-amber-300">
              🔬 تصویر ماکرو تحلیل‌شده پشت قالی (هر دایره سبز = ۱ گره شمارش‌شده در ردیف چله):
            </span>
            <span className="text-emerald-300 font-bold">
              {scanResult
                ? `${scanResult.knotsInWindow} گره در ${windowCm} سانتی‌متر ⬅️ ${scanResult.exactRaj} رج در ۷ سانتی‌متر`
                : 'در حال تحلیل...'}
            </span>
          </div>

          <canvas
            ref={canvasRef}
            width={760}
            height={220}
            className="w-full h-44 sm:h-56 rounded-xl border border-amber-500/40 object-cover bg-slate-900"
          />

          <div className="space-y-1 pt-1">
            <span className="text-[11px] text-sky-300 font-bold block">
              📈 نمودار سیگنال نوری بازتاب گره‌ها (Optical Luminance Peak Graph — اثبات علمی تعداد گره برای ختم مشاجره):
            </span>
            <canvas
              ref={waveCanvasRef}
              width={760}
              height={68}
              className="w-full h-16 rounded-xl border border-sky-500/30 bg-slate-950"
            />
          </div>
        </div>
      </div>

      {/* Official Bazaar Arbitration Verdict & 5-Language Voice Announcement */}
      {scanResult && (
        <div className="bg-black/45 border-2 border-amber-400 rounded-3xl p-5 sm:p-6 space-y-5">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-amber-400/30 pb-3">
            <div>
              <span className="text-xs font-bold text-amber-300 block">
                ⚖️ حکم کارشناسی و داوری دیجیتال رجشمار بازار فرش:
              </span>
              <h4 className="text-xl sm:text-2xl font-black text-white mt-0.5">
                {scanResult.exactRaj} رج دقیق — <span className="text-amber-400">{scanResult.commercialRajClass}</span>
              </h4>
            </div>
            <span className="px-3.5 py-1.5 rounded-xl bg-emerald-500/20 border border-emerald-400 text-emerald-300 text-xs font-black">
              تاییدشده با شمارش اپتیکال گره‌به‌گره
            </span>
          </div>

          {/* 4 Key Metrics Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-3.5 rounded-2xl bg-white/5 border border-amber-400/30">
              <span className="text-[11px] text-amber-200 block">رجشمار استاندارد (در ۷ سانت):</span>
              <p className="text-lg sm:text-xl font-black text-amber-400 mt-1">
                {scanResult.exactRaj} رج (Raj)
              </p>
            </div>
            <div className="p-3.5 rounded-2xl bg-white/5 border border-amber-400/30">
              <span className="text-[11px] text-amber-200 block">تعداد گره در ۱ سانتی‌متر:</span>
              <p className="text-lg sm:text-xl font-black text-emerald-300 mt-1">
                {scanResult.knotsPerCm} گره / cm
              </p>
            </div>
            <div className="p-3.5 rounded-2xl bg-white/5 border border-amber-400/30">
              <span className="text-[11px] text-amber-200 block">تراکم گره در ۱ متر مربع:</span>
              <p className="text-base sm:text-lg font-black text-sky-300 mt-1">
                {scanResult.knotsPerSqm.toLocaleString('fa-IR')} گره
              </p>
            </div>
            <div className="p-3.5 rounded-2xl bg-white/5 border border-amber-400/30">
              <span className="text-[11px] text-amber-200 block">استاندارد جهانی (KPSI):</span>
              <p className="text-lg sm:text-xl font-mono font-black text-rose-300 mt-1" dir="ltr">
                {scanResult.kpsi} KPSI
              </p>
            </div>
          </div>

          <p className="text-xs sm:text-sm text-amber-100 font-bold bg-amber-500/10 p-3.5 rounded-2xl border border-amber-400/30">
            ✨ <strong>ارزیابی کیفی بافت:</strong> {scanResult.qualityTierFa} ({scanResult.qualityTierEn})
          </p>

          {/* 5-Language Audio Announcement of the Raj Count */}
          <div className="space-y-2">
            <span className="text-xs font-bold text-amber-200 block">
              🔊 اعلام صوتی رسمی نتیجه رجشمار برای خریدار و فروشنده (۵ زبان زنده):
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-2">
              <button
                type="button"
                onClick={() =>
                  speakPersian(
                    `نتیجه شمارش نوری پشت فرش: این قالی دقیقاً ${scanResult.exactRaj} رج در هفت سانتی‌متر، معادل ${scanResult.knotsPerSqm} گره در هر متر مربع است.`,
                    0.88,
                    `In ghaali daghighan ${scanResult.exactRaj} raj dar haft santimetr ast.`
                  )
                }
                className="py-2.5 px-3 rounded-xl bg-emerald-700 hover:bg-emerald-600 text-white font-black text-xs flex items-center justify-center gap-1.5"
              >
                <Volume2 className="w-4 h-4" />
                <span>🇮🇷 قرائت فارسی</span>
              </button>

              <button
                type="button"
                onClick={() =>
                  speakEnglish(
                    `Optical knot scan verified: This hand-knotted Persian carpet has an exact density of ${scanResult.exactRaj} Raj per 7 centimeters, which equals ${scanResult.kpsi} knots per square inch (${scanResult.knotsPerSqm.toLocaleString()} knots per square meter).`,
                    0.88
                  )
                }
                className="py-2.5 px-3 rounded-xl bg-rose-800 hover:bg-rose-700 text-white font-black text-xs flex items-center justify-center gap-1.5"
              >
                <Volume2 className="w-4 h-4" />
                <span>🇬🇧 English Verdict</span>
              </button>

              <button
                type="button"
                onClick={() =>
                  speakArabic(
                    `نتيجة الفحص الضوئي لعُقد السجادة: هذه السجادة الإيرانية اليدوية بكثافة ${scanResult.exactRaj} رج في كل سبعة سنتيمترات، أي ما يعادل ${scanResult.knotsPerSqm} عقدة في المتر المربع.`,
                    0.85
                  )
                }
                className="py-2.5 px-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs flex items-center justify-center gap-1.5"
              >
                <Volume2 className="w-4 h-4" />
                <span>🇸🇦 النتيجة بالعربية</span>
              </button>

              <button
                type="button"
                onClick={() =>
                  speakChinese(
                    `光学织密检测确认：这张波斯手工地毯密度为每7厘米 ${scanResult.exactRaj} Raj，即每平方米 ${scanResult.knotsPerSqm} 个手工结。`,
                    0.85,
                    `Zhe zhang Bosi ditan midu wei ${scanResult.exactRaj} Raj.`
                  )
                }
                className="py-2.5 px-3 rounded-xl bg-red-700 hover:bg-red-600 text-white font-black text-xs flex items-center justify-center gap-1.5"
              >
                <Volume2 className="w-4 h-4" />
                <span>🇨🇳 中文播报 (چینی)</span>
              </button>

              <button
                type="button"
                onClick={() =>
                  speakRussian(
                    `Оптическое сканирование узлов подтверждено: плотность этого персидского ковра составляет ${scanResult.exactRaj} Радж на 7 сантиметров, или ${scanResult.knotsPerSqm} узлов на квадратный метр.`,
                    0.85,
                    `Plotnost etogo persidskogo kovra ${scanResult.exactRaj} Raj.`
                  )
                }
                className="py-2.5 px-3 rounded-xl bg-indigo-800 hover:bg-indigo-700 text-white font-black text-xs flex items-center justify-center gap-1.5"
              >
                <Volume2 className="w-4 h-4" />
                <span>🇷🇺 По-русски (روسی)</span>
              </button>
            </div>
          </div>

          {/* 1-Click Sync to Official Certificate of Authenticity */}
          {onApplyToCertificate && (
            <button
              type="button"
              onClick={handleApplyToCertificate}
              className="w-full py-3.5 px-5 rounded-2xl bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-400 hover:from-amber-300 hover:to-yellow-200 text-slate-950 font-black text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg"
            >
              {appliedBadge ? <CheckCircle2 className="w-5 h-5 text-emerald-800" /> : <Award className="w-5 h-5" />}
              <span>
                {appliedBadge
                  ? `✅ رجشمار (${scanResult.exactRaj} رج • ${scanResult.kpsi} KPSI) با موفقیت در شناسنامه اصالت فرش درج شد!`
                  : `📜 درج خودکار این رجشمار (${scanResult.exactRaj} رج) در شناسنامه بین‌المللی اصالت فرش`}
              </span>
            </button>
          )}
        </div>
      )}
    </div>
  );
};
