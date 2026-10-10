import React from 'react';
import { Search, MapPin } from 'lucide-react';

export default function Stores() {
  return (
    <div className="container stores-page-container">
      <div className="store-list">
        <h2 className="store-list-header">尋找門市</h2>
        <div className="search-bar">
          <input type="text" placeholder="輸入縣市、行政區或店名..." />
          <button className="search-button">
            <Search size={18} className="material-symbols-outlined" /> 搜尋
          </button>
        </div>
        
        {/* 門市卡片 */}
        <div className="store-card">
          <h3>
            <MapPin size={18} className="material-symbols-outlined" /> 88shop 台北信義店
          </h3>
          <p className="store-address">台北市信義區松智路88號</p>
          <p className="store-address-service">提供服務：現煮咖啡、生鮮熟食、座位區</p>
        </div>
        <div className="store-card">
          <h3>
            <MapPin size={18} className="material-symbols-outlined" /> 88shop 新北板橋店
          </h3>
          <p className="store-address">新北市板橋區縣民大道88號</p>
          <p className="store-address-service">提供服務：現煮咖啡、生鮮熟食</p>
        </div>
      </div>

      <div className="store-map">
        {/* 地圖區塊，實務上可串接 Google Maps iframe */}
        <div className="store-map-placeholder">
          <MapPin size={48} className="store-map-icon" />
          <p>請選擇左側門市以顯示地圖位置</p>
        </div>
      </div>
    </div>
  );
}