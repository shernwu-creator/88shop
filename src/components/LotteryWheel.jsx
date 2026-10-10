import React, { useState } from 'react';
import { Award, AlertCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const PRIZES = [
  { id: 1, name: '88折全館優惠券', code: 'SHOP88' },
  { id: 2, name: '現煮美式 1 杯', code: 'FREECOFFEE' },
  { id: 3, name: '折 10 元折價券', code: 'SAVE10' },
  { id: 4, name: '限量點心 1 份', code: 'SNACK88' },
  { id: 5, name: '50元購物金', code: 'FOOD50' },
  { id: 6, name: '明日再接再厲', code: 'THANKYOU' },
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

    const selectedIndex = Math.floor(Math.random() * PRIZES.length);
    const extraRounds = 360 * 5; 
    const segmentAngle = 360 / PRIZES.length;
    const targetDegree = extraRounds + (PRIZES.length - selectedIndex) * segmentAngle;

    setRotation((prev) => prev + targetDegree);

    setTimeout(() => {
      setIsSpinning(false);
      const prize = PRIZES[selectedIndex];
      setWonPrize(prize);

      if (prize.code !== 'THANKYOU') {
        addLotteryReward(prize.name, prize.code);
      }
    }, 4000); // 配合 lottery.css 中的 4s 動畫
  };

  return (
    <main id="main-content" className="page-container">
      <h1 className="page-title" style={{ color: 'var(--primary-ink)' }}>88 樂透轉轉樂</h1>
      <p className="lottery-fword">
        每日專屬幸運輪盤！轉出您的今日專屬折扣與免費美味好禮。
      </p>

      {/* 轉盤容器與指針 */}
      <div className="lottery-box">
        <div className="lottery-pointer"></div>
        <div
          className="lottery-wheel"
          style={{ transform: `rotate(${rotation}deg)` }}
        >
          <button
            onClick={spinWheel}
            disabled={isSpinning}
            className="lottery-button"
            aria-disabled={isSpinning}
          >
            {isSpinning ? '...' : '抽獎'}
          </button>
        </div>
      </div>

      {/* 抽獎結果 */}
      {wonPrize && (
        <div className="lottery-results">
          <h3 style={{ color: 'var(--primary-ink)', marginBottom: '12px' }}>
            <Award size={24} style={{ display: 'inline', transform: 'translateY(4px)' }} /> 恭喜獲得：{wonPrize.name}！
          </h3>
          {wonPrize.code !== 'THANKYOU' ? (
            <p style={{ color: 'var(--text-sub)' }}>
              獎勵與優惠代碼已存入您的會員專區，結帳時可隨時使用！
            </p>
          ) : (
            <p style={{ color: 'var(--text-sub)' }}>明天再來轉轉看，幸運之神就在身邊！</p>
          )}
        </div>
      )}

      {/* 訪客提示 */}
      {!currentUser && (
        <div style={{ marginTop: '30px', color: 'var(--text-sub)', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px' }}>
          <AlertCircle size={18} />
          <span>您尚未登入，請先登入以便將抽中的好禮永久儲存。</span>
        </div>
      )}
    </main>
  );
};