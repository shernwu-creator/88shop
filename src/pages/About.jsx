import React from "react";
import { Store } from "lucide-react"; // 新增引入

export default function About() {
  return (
    <div className="container content-wrapper">
      <h2 className="title-centered">
        <Store size={36} /> 品牌故事：88便利店
      </h2>
      <div className="text-card">
        <p>成立於 2026 年，我們致力於為每一位顧客提供最便捷、最優質的日常服務。</p>

        <p>
          「橫睇掂睇，都係屬於街坊嘅『無限』陪伴。」將「88」打橫嚟睇，就係兩個緊密相連嘅無限符號（∞
          ∞）。對【88便利店】嚟講，代表住「無限嘅便利」同埋獅子山下「無限」嘅鄰里人情味。
        </p>
        <p>
          香港嘅屋邨同住宅區，最珍貴嘅往往唔係高科技，而係嗰份人情世故。阿媽落街買餸差粒蒜頭、小朋友放學想食支雪條、或者深夜街坊收工想落黎買宵夜，啤酒；搵人講句「辛苦喇」「向後bye!」——【88便利店】嘅燈光永遠為你留住。
        </p>
        <p>
          我哋用最合理嘅價錢、最齊全嘅日常雜貨、同最溫暖親切嘅廣東話問候，守護住每一個香港家庭。行入【88便利店】，就好似返到屋企一樣咁安心。我地務各位顧客買得安心
          食得放心！
        </p>
      </div>
    </div>
  );
}
