import React from "react";
import { RefreshCcw } from "lucide-react";

export default function ReturnPolicy() {
  return (
    <div className="policy-page-wrapper">
      <h1 className="page-title">
        <RefreshCcw size={36} /> 退換貨政策
      </h1>
      <div className="policy-container">
        <h2>親愛的顧客您好，歡迎來到 88便利店</h2>
        <p className="policy-intro">為保障您的購物權益，請仔細閱讀以下退換貨規範：</p>

        <ul>
          <li>
            <strong>生鮮食品：</strong>{" "}
            依據消保法規定，生鮮食品（包含鮮食便當、冷藏甜點等）不適用七天鑑賞期。除商品本身瑕疵或運送過程損壞外，恕不接受退換貨。
          </li>
          <li>
            <strong>一般商品：</strong>{" "}
            享有收到商品後七天猶豫期（非試用期）。退回之商品必須是全新狀態且包裝完整。
          </li>
          <li>
            <strong>退貨流程：</strong>{" "}
            請於收到商品三日內聯繫客服，我們將安排物流收回。確認商品無誤後，將於 7-14
            個工作天內完成退款。
          </li>
        </ul>

        <div className="asterisk-note">
          <p>＊ 注意事項</p>
          <p>
            若發現惡意退貨或拒收情形達三次以上，88便利店
            保留終止該會員帳號服務之權利。感謝您的配合與體諒。
          </p>
        </div>

        <div className="version">最後更新日期：2026年10月 v1.2</div>
      </div>
    </div>
  );
}
