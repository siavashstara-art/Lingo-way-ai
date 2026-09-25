import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { 
  Crown, 
  Check, 
  ShieldCheck, 
  CheckCircle2, 
  ShoppingBag
} from 'lucide-react';
import { ShopItem, UserProgress } from '../types';
import { SHOP_ITEMS } from '../data/shop';
import { sound } from '../utils/audio';
import { AccessibilitySettings } from '../utils/accessibility';

interface CityShopProps {
  progress: UserProgress;
  accessibility: AccessibilitySettings;
  onPurchaseVip: (planId: string) => void;
  onPurchaseLingouPack: (amount: number, tomanCost: number) => void;
  onBuyItemWithLingous: (itemId: string, lingouPrice: number) => boolean;
}

export const CityShop: React.FC<CityShopProps> = ({
  progress,
  accessibility,
  onPurchaseVip,
  onPurchaseLingouPack,
  onBuyItemWithLingous,
}) => {
  const isFa = accessibility.language === 'fa';
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'subscription' | 'lingou-pack' | 'powerup' | 'avatar'>('all');
  const [showCheckoutModal, setShowCheckoutModal] = useState<ShopItem | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [checkoutSuccess, setCheckoutSuccess] = useState(false);

  const filteredItems = SHOP_ITEMS.filter(
    item => selectedCategory === 'all' || item.category === selectedCategory
  );

  const handleStartCheckout = (item: ShopItem) => {
    sound.playClick();
    setCheckoutSuccess(false);
    setShowCheckoutModal(item);
  };

  const handleConfirmPurchase = () => {
    if (!showCheckoutModal) return;
    setIsProcessing(true);
    sound.playClick();

    setTimeout(() => {
      setIsProcessing(false);
      setCheckoutSuccess(true);
      sound.playLevelUp();
      try {
        confetti({ particleCount: 70, spread: 60 });
      } catch {
        // Fallback
      }

      if (showCheckoutModal.category === 'subscription') {
        onPurchaseVip(showCheckoutModal.id);
      } else if (showCheckoutModal.category === 'lingou-pack') {
        const amount = showCheckoutModal.id === 'pack_chest' ? 1000 : 250;
        onPurchaseLingouPack(amount, showCheckoutModal.realPriceToman || 0);
      } else if (showCheckoutModal.lingouPrice) {
        onBuyItemWithLingous(showCheckoutModal.id, showCheckoutModal.lingouPrice);
      }

      setTimeout(() => {
        setShowCheckoutModal(null);
        setCheckoutSuccess(false);
      }, 1600);
    }, 1000);
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Shop Header Banner */}
      <div className="rounded-3xl bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-400 border border-amber-300 p-6 sm:p-8 shadow-sm text-slate-950">
        <div className="max-w-2xl space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/60 font-bold text-xs text-slate-900">
            <Crown className="w-3.5 h-3.5 text-amber-700" />
            <span>{isFa ? 'امکانات اشتراک ویژه و سکه‌های لینگو' : 'VIP Access & Lingou Packs'}</span>
          </div>

          <h1 className="font-bold text-2xl sm:text-3xl tracking-tight leading-tight">
            {isFa ? 'فروشگاه و ارتقای حساب کاربری' : 'Store & VIP Subscriptions'}
          </h1>

          <p className="text-xs sm:text-sm font-medium text-slate-900 leading-relaxed">
            {isFa 
              ? 'با اشتراک طلایی، به هوش مصنوعی نامحدود برای مکالمه صوتی، پاداش‌های دو برابری و ابزارهای تمرکزی ویژه دسترسی پیدا کنید.'
              : 'Unlock unlimited AI conversation practice, double gold multipliers, and complete comfort features.'}
          </p>

          <div className="pt-2 flex items-center gap-3">
            {progress.isVipMember ? (
              <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 text-amber-300 font-bold text-xs shadow-sm">
                <Crown className="w-3.5 h-3.5 fill-current" />
                <span>{isFa ? 'اشتراک ویژه شما فعال است' : 'VIP Membership Active'}</span>
              </div>
            ) : (
              <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/90 text-slate-800 font-bold text-xs">
                <span>{isFa ? 'حساب عادی (امکان ارتقا به VIP)' : 'Standard Plan'}</span>
              </div>
            )}

            <div className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-white/70 text-slate-900 font-bold text-xs">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" />
              <span>{progress.streakShields} {isFa ? 'سپر محافظ روزها' : 'Streak Shields'}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1">
        {[
          { id: 'all', label: isFa ? 'همه موارد' : 'All', icon: '🛍️' },
          { id: 'subscription', label: isFa ? 'پلن‌های اشتراک VIP' : 'VIP Plans', icon: '👑' },
          { id: 'lingou-pack', label: isFa ? 'بسته‌های سکه لینگو' : 'Coins', icon: '💰' },
          { id: 'powerup', label: isFa ? 'سپرهای محافظ و بوستر' : 'Boosters', icon: '🛡️' },
        ].map((cat) => (
          <button
            key={cat.id}
            onClick={() => {
              sound.playClick();
              setSelectedCategory(cat.id as typeof selectedCategory);
            }}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all border ${
              selectedCategory === cat.id
                ? 'bg-amber-500 text-slate-950 border-amber-500 shadow-sm'
                : 'bg-white text-slate-600 border-slate-200 hover:border-amber-300'
            }`}
          >
            <span className="mr-1">{cat.icon}</span>
            <span>{cat.label}</span>
          </button>
        ))}
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredItems.map((item) => (
          <div
            key={item.id}
            className={`rounded-2xl p-5 border transition-all flex flex-col justify-between bg-white ${
              item.featured
                ? 'border-amber-400 ring-1 ring-amber-300/50 shadow-sm'
                : 'border-slate-200 hover:border-amber-300'
            }`}
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-3xl p-2 rounded-xl bg-slate-50 border border-slate-200">
                  {item.icon}
                </span>
                {item.featured && (
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-100 text-amber-900 border border-amber-300">
                    {isFa ? 'پیشنهاد کاربردی' : 'Recommended'}
                  </span>
                )}
              </div>

              <h3 className="font-bold text-base text-slate-900 mb-1">
                {isFa ? item.titleFa : item.title}
              </h3>
              <p className="text-xs text-slate-500 mb-3 leading-relaxed">
                {isFa ? item.descriptionFa : item.description}
              </p>

              <div className="space-y-1 mb-4">
                {(isFa ? item.perksFa : item.perks).map((perk, pIdx) => (
                  <div key={pIdx} className="flex items-center gap-1.5 text-xs text-slate-700">
                    <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>{perk}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-3">
              <div>
                {item.realPriceToman && (
                  <div className="flex flex-col">
                    <span className="font-bold text-slate-900 text-sm sm:text-base">
                      {item.realPriceToman.toLocaleString('fa-IR')} تومان
                    </span>
                    <span className="text-[10px] text-slate-400">
                      (${item.realPriceUSD} USD)
                    </span>
                  </div>
                )}
                {item.lingouPrice && !item.realPriceToman && (
                  <div className="flex items-center gap-1 font-bold text-amber-900 text-sm">
                    <span>{item.lingouPrice}</span>
                    <span>سکه لینگو 🪙</span>
                  </div>
                )}
              </div>

              <button
                onClick={() => handleStartCheckout(item)}
                className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs shadow-sm transition-transform active:scale-95"
              >
                {isFa ? 'انتخاب و تهیه' : 'Get Item'}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Checkout Modal */}
      {showCheckoutModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm">
          <div className="w-full max-w-md bg-white border border-slate-300 rounded-3xl p-6 shadow-xl space-y-4 text-slate-800">
            <div className="text-center space-y-1.5">
              <span className="text-4xl block">{showCheckoutModal.icon}</span>
              <h2 className="font-bold text-xl text-slate-900">
                {isFa ? showCheckoutModal.titleFa : showCheckoutModal.title}
              </h2>
              <p className="text-xs text-slate-500">
                {isFa ? showCheckoutModal.descriptionFa : showCheckoutModal.description}
              </p>
            </div>

            <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 space-y-1.5 text-xs text-slate-700">
              <div className="flex justify-between font-bold">
                <span>مبلغ قابل پرداخت:</span>
                <span className="text-amber-900 text-sm">
                  {showCheckoutModal.realPriceToman 
                    ? `${showCheckoutModal.realPriceToman.toLocaleString('fa-IR')} تومان`
                    : `${showCheckoutModal.lingouPrice} سکه لینگو 🪙`}
                </span>
              </div>
              <div className="flex justify-between text-slate-500">
                <span>روش پرداخت:</span>
                <span>درگاه رسمی امن / خرید درون‌برنامه‌ای</span>
              </div>
            </div>

            {checkoutSuccess ? (
              <div className="text-center py-3 space-y-1 bg-emerald-50 rounded-xl border border-emerald-300 text-emerald-800 font-bold text-xs">
                <CheckCircle2 className="w-6 h-6 mx-auto text-emerald-600" />
                <span>با موفقیت انجام شد! حساب شما به‌روزرسانی گردید.</span>
              </div>
            ) : (
              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  onClick={() => setShowCheckoutModal(null)}
                  disabled={isProcessing}
                  className="px-3 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs"
                >
                  انصراف
                </button>
                <button
                  onClick={handleConfirmPurchase}
                  disabled={isProcessing}
                  className="flex-1 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs shadow-sm transition-transform active:scale-95"
                >
                  {isProcessing ? 'در حال ارتباط با درگاه...' : 'تأیید و پرداخت نهایی'}
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
