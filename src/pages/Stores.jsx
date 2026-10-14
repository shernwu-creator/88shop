import React, { useState } from "react";
import { Search, MapPin } from "lucide-react";

// 將門市資料整理成陣列，方便未來擴充與維護
const STORES = [
  {
    id: 1,
    name: "觀塘店",
    address: "九龍觀塘開源道71號",
    services: "現煮咖啡、生鮮熟食、座位區",
    mapQuery: "九龍觀塘開源道71號", // 用於 Google 地圖搜尋的關鍵字
  },
  {
    id: 2,
    name: "太古城旗艦店",
    address: "香港島鰂魚涌太古城道18號",
    services: "現煮咖啡、生鮮熟食",
    mapQuery: "香港島鰂魚涌太古城道18號",
  },
];

export default function Stores() {
  // 使用 state 記錄目前選取的門市，預設為 null（未選擇）
  const [selectedStore, setSelectedStore] = useState(null);

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

        {/* 動態渲染門市卡片 */}
        {STORES.map((store) => (
          <div
            key={store.id}
            className={`store-card ${selectedStore?.id === store.id ? "selected" : ""}`}
            onClick={() => setSelectedStore(store)}
          >
            <h3>
              <MapPin size={18} className="material-symbols-outlined" /> {store.name}
            </h3>
            <p className="store-address">{store.address}</p>
            <p className="store-address-service">提供服務：{store.services}</p>
          </div>
        ))}
      </div>

      <div className="store-map">
        {/* 判斷：如果有選取門市，顯示 iframe 地圖；否則顯示預設的佔位符號 */}
        {selectedStore ? (
          <iframe
            title={`Google Map for ${selectedStore.name}`}
            width="100%"
            height="100%"
            className="store-googlemap"
            // style={{ border: 0, minHeight: '400px', borderRadius: '5px' }} // minHeight 確保在手機版也有足夠高度
            loading="lazy"
            allowFullScreen
            // 透過免 API Key 的 URL 格式，直接傳入地址參數
            src={`https://maps.google.com/maps?q=${encodeURIComponent(selectedStore.mapQuery)}&t=&z=16&ie=UTF8&iwloc=&output=embed`}
          ></iframe>
        ) : (
          <div className="store-map-placeholder">
            <MapPin size={48} className="store-map-icon" />
            <p>請選擇左側門市以顯示地圖位置</p>
          </div>
        )}
      </div>
    </div>
  );
}
