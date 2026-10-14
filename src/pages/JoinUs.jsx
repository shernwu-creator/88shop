import React, { useState } from "react";
import { AlertModal } from "../components/AlertModal";

export default function JoinUs() {
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  return (
    <div className="joinus-page">
      <div className="joinUs-container">
        <h1 className="page-title">人才招募</h1>
        <p className="joinus-subtitle">加入 88便利店 團隊，和我們一起創造美好生活！</p>
        <p>
          「以人為本」是我們的核心價值之一。我們信任及尊重每位員工，同時亦十分重視團隊合作，並鼓勵同事之間持開放和坦誠的態度，在工作上保持緊密的溝通。
        </p>

        <h4>優厚薪酬及福利</h4>
        <p>
          我們會按每位員工的獨特技能及表現作出嘉許。我們的全面薪酬方案極具競爭力，包括：年終雙糧、銷售及服務獎金、夜班及超時工作津貼、交通津貼、特別地區津貼、有薪年假、醫療保障、集團購物優惠、牙科保健計劃、免供款退休計劃等。
          <br />
          每個職位的福利或有不同。如有興趣，請聯絡我們的人才招聘部。
        </p>

        <h4>培訓與發展</h4>
        <p>
          88 便利店
          注重團隊成員個人發展，讓團隊成員發揮潛能，盡顯所長。除了獲得全面培訓外，亦有機會讓高潛質的團隊成員借配到其他地方工作，有助擴闊眼界及提升工作技能。
        </p>

        <div className="joinus-action">
          <button className="btn-primary" onClick={() => setIsAlertOpen(true)}>
            立即應徵
          </button>
        </div>
      </div>

      <AlertModal
        isOpen={isAlertOpen}
        message="請將履歷寄至 hr@88shop.com"
        type="success"
        onClose={() => setIsAlertOpen(false)}
      />
    </div>
  );
}
