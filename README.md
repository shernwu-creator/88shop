# 🏪 88 便利店 (88-react-shop)

![React](https://img.shields.io/badge/React-19-blue?logo=react)
![Vite](https://img.shields.io/badge/Vite-Plus-646CFF?logo=vite)
![React Router](https://img.shields.io/badge/React_Router-7-CA4245?logo=react-router)
![CSS3](https://img.shields.io/badge/CSS3-Custom-1572B6?logo=css3)

這是一個以現代前端框架建構的虛擬便利商店電子商務網站。提供流暢的商品瀏覽、會員註冊、購物車結帳，以及趣味的互動抽獎功能。

## 🎓 專案背景 (Project Background)

本專案為 **香港 ERB 僱員再培訓局「前端網頁開發人員基礎證書」** 課程完結後的實習結業專案。
旨在將課程中所學到的 HTML、CSS、JavaScript 以及 React 框架知識融會貫通，從零開始獨立建構一個具備完整商業邏輯與響應式設計 (RWD) 的單頁式應用程式 (SPA)。

- **開發者：** [ shernwu-creator /GitHub 帳號]
- **專案定位：** 前端開發作品集 (Frontend Portfolio)

---

## ✨ 核心功能與運作方式 (Core Features & How it works)

本專案為**純前端 (Frontend-only)** 應用，為了展示完整的商業邏輯，採用了瀏覽器的 `localStorage` 來模擬後端資料庫的行為。

### 1. 🛒 購物車系統 (Shopping Cart)

- 使用 `Context API` (`CartContext`) 進行全域狀態管理。
- 支援訪客與登入會員雙軌制：未登入時購物車暫存於訪客 `localStorage`；登入後自動切換至會員專屬購物車。
- 具備新增、刪除、數量增減與總價即時試算功能。

### 2. 👤 會員與驗證系統 (Mock Authentication)

- 透過 `AuthContext` 模擬使用者註冊與登入。
- 會員中心儀表板 (Dashboard) 提供數位會員卡條碼展示。
- 自動紀錄使用者的「歷史訂單 (結帳紀錄)」與「抽獎獲得的優惠券」。

### 3. 🌓 全站深淺色模式切換 (Dark/Light Theme Toggle)

- 利用 `ThemeContext` 結合 CSS Variables (`--bg-main`, `--text-main` 等) 實作。
- 使用者偏好會儲存於 `localStorage`，確保重新整理後維持所選的主題。

### 4. 🎡 互動式樂透轉盤 (Interactive Lottery Wheel)

- 使用純 CSS3 `transition` 與 `transform` 實作順暢的轉盤減速動畫。
- 結合 React State 計算隨機中獎角度與獎品，並將結果直接寫入會員資料庫中。

### 5. 🗺️ 門市據點與 Google Maps 整合 (Store Locator)

- 利用 React 狀態 (`useState`) 實作左側門市選單。
- 點擊卡片後，右側會動態更新免 API Key 版本的 Google Maps `iframe`，精準標示分店位置。

### 6. 📖 線上 DM 雜誌 (E-Catalog)

- 展示純 CSS 的強大：利用 `<input type="radio">` 配合 `:checked` 偽類別，在不依賴任何外部輪播套件或 JavaScript 的情況下，實作完整的圖片輪播與分頁功能。

---

## 🛠️ 技術架構 (Tech Stack)

- **核心框架:** React 19, Vite+ (`vite-plus`)
- **路由管理:** React Router v7 (`react-router-dom`)
- **狀態管理:** React Context API + Hooks (`useState`, `useEffect`)
- **樣式設計:** 純 CSS3 (CSS Variables, Flexbox, CSS Grid)，無使用 Bootstrap/Tailwind，展現扎實的切版能力。
- **圖示庫:** Lucide React
- **資料持久化:** Web Storage API (`localStorage`)

---

## 🚀 部署 (Deployment)

本專案支援自動化部署，並完美解決了 SPA (單頁應用程式) 在靜態伺服器上常見的路由 404 問題與子路徑圖片載入問題 (透過自製的 `assetUrl.js` 工具)。

### 📍 GitHub Pages

專案透過 GitHub Actions (`.github/workflows/deploy.yml`) 實現 CI/CD 自動部署。

- **線上預覽：** [點此瀏覽網站](https://shernwu-creator.github.io/88shop/)
- 工作流程會自動將 `index.html` 複製為 `404.html`，以解決 GitHub Pages 直接重整深層路由時發生的 404 錯誤。

### 📍 Netlify

專案根目錄附帶 `netlify.toml` 與 `public/_redirects`，支援直接匯入 Netlify 進行無縫部署，並透過重定向規則保護 Router。

---

## 💻 本機開發與執行 (Local Setup)

如果你想在本地環境運行此專案：

1. **複製儲存庫**

```bash
   git clone https://github.com/shernwu-creator/88shop
   git
   cd 88shop
```
