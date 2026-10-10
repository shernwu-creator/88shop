import React, { useState } from 'react';
import { Gift, Sparkles, Award, AlertCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const PRIZES = [
  { id: 1, name: '88折全館優惠券', code: 'SHOP88', color: '#EF4444' },
  { id: 2, name: '現煮美式咖啡 1 杯', code: 'FREECOFFEE', color: '#F59E0B' },
  { id: 3, name: '滿百折 10 元折價券', code: 'SAVE10', color: '#10B981' },
  { id: 4, name: '88超商限量點心 1 份', code: 'SNACK88', color: '#3B82F6' },
  { id: 5, name: '50元鮮食購物金', code: 'FOOD50', color: '#8B5CF6' },
  { id: 6, name: '明日再接再厲（下次運氣更好！）', code: 'THANKYOU', color: '#6B7280' },
];

export const LotteryWheel = ({ onOpenAuth }) => {
  const { currentUser, addLotteryReward } = useAuth();
  const [rotation, setRotation] = useState(0);
  const [isSpinning, setIsSpinning] = useState(false);
  const [wonPrize, setWonPrize] = useState(null);

  const spinWheel = () => {
    if (isSpinning) return;

    if (!currentUser) {
      alert('請先登入會員，抽獎結果才會記錄到您的帳號中喔！');
      onOpenAuth();
      return;
    }

    setIsSpinning(true);
    setWonPrize(null);

    // 隨機選定獎品
    const selectedIndex = Math.floor(Math.random() * PRIZES.length);
    const segmentAngle = 360 / PRIZES.length;
    
    // 計算旋轉度數（至少轉 5 圈 = 1800 度 + 目標區塊偏移）
    const extraRounds = 360 * 5;
    const targetDegree = extraRounds + (PRIZES.length - selectedIndex) * segmentAngle - segmentAngle / 2;

    setRotation((prev) => prev + targetDegree);

    setTimeout(() => {
      setIsSpinning(false);
      const prize = PRIZES[selectedIndex];
      setWonPrize(prize);

      // 若非未中獎，儲存至會員資料
      if (prize.code !== 'THANKYOU') {
        addLotteryReward(prize.name, prize.code);
      }
    }, 4000);
  };

  return (
    <div className="max-w-3xl mx-auto py-12 px-4 text-center">
      <div className="flex items-center justify-center gap-2 mb-2 text-amber-600">
        <Sparkles className="w-6 h-6 animate-pulse" />
        <h2 className="text-3xl font-extrabold text-gray-900">88 樂透轉轉樂</h2>
        <Sparkles className="w-6 h-6 animate-pulse" />
      </div>
      <p className="text-gray-600 mb-8">
        每日專屬幸運輪盤！轉出您的今日專屬折扣與免費美味好禮。
      </p>

      {/* 轉盤容器 */}
      <div className="relative w-80 h-80 sm:w-96 sm:h-96 mx-auto mb-8 flex items-center justify-center">
        {/* 指針 */}
        <div className="absolute -top-3 z-20 w-0 h-0 border-l-[14px] border-l-transparent border-r-[14px] border-r-transparent border-t-[28px] border-t-red-600 drop-shadow-md" />

        {/* 轉盤主體 */}
        <div
          className="w-full h-full rounded-full border-8 border-amber-400 shadow-2xl relative overflow-hidden transition-transform duration-[4000ms] ease-out"
          style={{ transform: `rotate(${rotation}deg)` }}
        >
          {PRIZES.map((prize, index) => {
            const angle = (360 / PRIZES.length) * index;
            return (
              <div
                key={prize.id}
                className="absolute w-1/2 h-1/2 top-0 right-0 origin-bottom-left flex items-center justify-center"
                style={{
                  transform: `rotate(${angle}deg) skewY(${90 - 360 / PRIZES.length}deg)`,
                  backgroundColor: prize.color,
                }}
              >
                <span
                  className="text-white font-bold text-xs sm:text-sm select-none transform -rotate-45 block px-2 text-center"
                  style={{
                    transform: `skewY(-${90 - 360 / PRIZES.length}deg) rotate(${360 / PRIZES.length / 2}deg) translateY(-40px)`
                  }}
                >
                  {prize.name}
                </span>
              </div>
            );
          })}
        </div>

        {/* 中間開始按鈕 */}
        <button
          onClick={spinWheel}
          disabled={isSpinning}
          className="absolute z-10 w-20 h-20 bg-white border-4 border-amber-500 rounded-full shadow-lg flex flex-col items-center justify-center font-bold text-gray-800 hover:scale-105 active:scale-95 transition disabled:opacity-75"
        >
          <Gift className="w-5 h-5 text-red-600" />
          <span className="text-xs">{isSpinning ? '轉動中' : '開始抽獎'}</span>
        </button>
      </div>

      {/* 抽獎結果通知卡片 */}
      {wonPrize && (
        <div className="max-w-md mx-auto p-6 bg-amber-50 border border-amber-200 rounded-xl shadow animate-fadeIn">
          <div className="flex items-center justify-center gap-2 text-amber-700 font-bold text-lg mb-2">
            <Award className="w-6 h-6" />
            <span>恭喜獲得：{wonPrize.name}！</span>
          </div>
          {wonPrize.code !== 'THANKYOU' ? (
            <p className="text-sm text-gray-600">
              獎勵與優惠代碼已存入您的<strong className="text-red-600">會員專區</strong>，結帳時可隨時折抵使用！
            </p>
          ) : (
            <p className="text-sm text-gray-600">明天再來轉轉看，幸運之神就在身邊！</p>
          )}
        </div>
      )}

      {!currentUser && (
        <div className="mt-6 flex items-center justify-center gap-1.5 text-sm text-gray-500">
          <AlertCircle className="w-4 h-4 text-amber-500" />
          <span>您尚未登入，請先登入以便將抽中的好禮永久儲存至帳號中。</span>
        </div>
      )}
    </div>
  );
};