import React from "react";
import { BookOpen } from "lucide-react";
import { assetUrl } from "../utils/assetUrl";

export default function Ecatalog() {
  return (
    <div className="container" style={{ padding: "40px 20px" }}>
      <div className="ecatalog-header">
        <h2 className="ecatalog-title">
          <BookOpen size={36} className="title-icon" />
          本期線上 DM 特刊
        </h2>
        <p className="ecatalog-subtitle">活動期間：即日起至 11/31，眾多商品第二件 6 折起！</p>
      </div>

      <div className="ecatalog-container">
        {/* 用來控制 CSS 顯示的 Radio Buttons */}
        <input type="radio" id="page-1" name="dm-page" defaultChecked />
        <input type="radio" id="page-2" name="dm-page" />
        <input type="radio" id="page-3" name="dm-page" />

        {/* 圖片顯示區塊 */}
        <div className="ecatalog-image">
          <img src={assetUrl("/images/DM_01.jpg")} alt="DM 第 1 頁" className="dm-img dm-img-1" />
          <img src={assetUrl("/images/DM_02.jpg")} alt="DM 第 2 頁" className="dm-img dm-img-2" />
          <img src={assetUrl("/images/DM_03.jpg")} alt="DM 第 3 頁" className="dm-img dm-img-3" />
        </div>

        {/* 控制按鈕區塊 */}
        <div className="ecatalog-controls">
          {/* 第 1 頁的控制列 */}
          <div className="nav-group nav-1">
            <label className="btn-outline disabled">上一頁</label>
            <span className="ecatalog-page-info">1 / 3</span>
            <label htmlFor="page-2" className="btn-outline">
              下一頁
            </label>
          </div>

          {/* 第 2 頁的控制列 */}
          <div className="nav-group nav-2">
            <label htmlFor="page-1" className="btn-outline">
              上一頁
            </label>
            <span className="ecatalog-page-info">2 / 3</span>
            <label htmlFor="page-3" className="btn-outline">
              下一頁
            </label>
          </div>

          {/* 第 3 頁的控制列 */}
          <div className="nav-group nav-3">
            <label htmlFor="page-2" className="btn-outline">
              上一頁
            </label>
            <span className="ecatalog-page-info">3 / 3</span>
            <label className="btn-outline disabled">下一頁</label>
          </div>
        </div>
      </div>
    </div>
  );
}
