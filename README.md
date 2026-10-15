# 🏪 88 便利店 (88-react-shop)

![React](https://img.shields.io/badge/React-19.2-61DAFB?logo=react&logoColor=black)
![Vite+](https://img.shields.io/badge/Vite+-1.1-646CFF?logo=vite&logoColor=white)
![React Router](https://img.shields.io/badge/React_Router-v7-CA4245?logo=react-router&logoColor=white)
![Oxlint](https://img.shields.io/badge/Linter-Oxlint_%26_Oxfmt-F7DF1E?logo=oxc&logoColor=black)
![CSS3](https://img.shields.io/badge/CSS3-Variables_%26_A11y-1572B6?logo=css3&logoColor=white)

這是一個以現代前端技術（React 19 + Vite+ + React Router v7）建構的虛擬便利商店電子商務網站。提供流暢的商品分類瀏覽、商品詳情檢視、會員註冊與驗證、雙軌制購物車結帳、門市地圖查詢、純 CSS 線上 DM 翻頁，以及趣味的互動式樂透抽獎功能。

---

## 🎓 專案背景 (Project Background)

本專案為 **香港 ERB 僱員再培訓局「前端網頁開發人員基礎證書」** 課程完結後的實習結業專案。
旨在將課程中所學到的 HTML5、CSS3、JavaScript (ES6+) 以及 React 框架知識融會貫通，從零開始獨立建構一個具備完整商業邏輯、狀態管理架構與響應式設計 (RWD) 的單頁式應用程式 (SPA)。

- **開發者：** [shernwu-creator](https://github.com/shernwu-creator)
- **專案定位：** 前端開發作品集 (Frontend Portfolio)
- **線上預覽 (GitHub Pages)：** [https://shernwu-creator.github.io/88shop/](https://shernwu-creator.github.io/88shop/)

---

## ✨ 核心功能與運作方式 (Core Features)

本專案為**純前端 (Frontend-only)** 應用，透過安全封裝的 `localStorage` 工具模擬後端資料庫與持久化儲存行為：

### 1. 🛒 雙軌制購物車系統 (Shopping Cart)

- 透過 `CartContext` / `CartProvider` 進行全域購物車管理。
- **訪客與會員雙軌切換**：未登入時商品暫存於訪客專屬 `localStorage` (`88shop_guest_cart`)；登入會員後自動無縫切換至會員個人購物車，不需依賴多餘的 `useEffect` 同步。
- 支援商品新增、單項移除、數量增減（數量歸零自動移除）、Navbar 右上角即時數量徽章 (Badge) 與總金額試算。
- 結帳時自動驗證會員身分，將購物車明細轉為歷史訂單並清空購物車。

### 2. 👤 會員驗證與個人中心 (Mock Authentication & Member Dashboard)

- 透過 `AuthContext` / `AuthProvider` 實作會員註冊、登入（支援帳號或 Email 登入）與登出流程。
- **單一資料來源 (Single Source of Truth)**：以會員清單與當前登入 ID 即時推導 `currentUser`，透過函式式更新（Functional Updates）確保連續狀態變更時資料不遺失。
- **會員中心儀表板 (`/member`)**：
  - 展示數位會員卡與 CSS 模擬條碼。
  - 即時統計並列出「歷史訂單明細」與「樂透抽獎獲得的優惠券紀錄」。

### 3. 🛍️ 商品分類瀏覽與詳情頁 (Products & Product Detail)

- 支援動態路由分類過濾（`/products/:category`，涵蓋「咖啡飲品」、「生鮮熟食」、「零食泡麵」）與全商品總覽（`/products`）。
- 獨立商品詳情頁（`/product/:id`），支援自訂購買數量並直接加入購物車。

### 4. 🌓 全站深淺色主題切換與無障礙設計 (Dark/Light Theme & A11y)

- 利用 `ThemeContext` 結合 `<html data-theme="dark|light">` 與 CSS Variables 實作全站深淺色切換，並將偏好持久化儲存於 `localStorage`。
- **無障礙 (Accessibility) 優化**：設計高對比語義化色彩變數（`--primary-ink`、`--accent-ink`）、清晰的鍵盤焦點指示（`:focus-visible`），以及支援系統減少動態效果設定（`prefers-reduced-motion: reduce`）。

### 5. 🎡 互動式樂透轉盤 (Interactive Lottery Wheel)

- 使用純 CSS3 `cubic-bezier` 緩動函數與 `transform: rotate()` 實作流暢的轉盤減速動畫。
- 結合 React State 計算隨機中獎角度，中獎後自動將優惠碼與獎項寫入當前登入會員的專屬紀錄中。

### 6. 🗺️ 門市據點與 Google Maps 整合 (Store Locator)

- 透過 React `useState` 管理左側門市卡片選取狀態。
- 點擊門市後，右側動態載入免 API Key 的 Google Maps Embed `iframe`，精準定位香港分店位置（如觀塘店、太古城旗艦店）。

### 7. 📖 純 CSS 線上 DM 特刊 (E-Catalog)

- 展現純 CSS 互動技巧：利用隱藏的 `<input type="radio">` 搭配 `:checked` 與通用兄弟選擇器 (`~`)，在不依賴任何 JavaScript 狀態或外部輪播套件的情況下，實作完整的 DM 翻頁與上下頁禁用控制。

### 8. 💬 自訂互動彈窗與路由體驗優化 (AlertModal & ScrollToTop)

- 自製 `AlertModal` 元件取代部分原生瀏覽器 `alert()`，支援成功/錯誤狀態圖示、點擊遮罩關閉、`Escape` 鍵關閉，以及關閉後的自動導頁回呼（`onCloseAction`）。
- 內建 `ScrollToTop` 元件，監聽路由變化並自動將畫面捲動回頂部，提升 SPA 換頁體驗。

---

## 📂 專案目錄結構 (Directory Structure)

本專案經過模組化重構，將「資料」、「共用邏輯」、「Context 定義與 Provider」、「UI 元件」與「頁面」明確分離：

```text
88-react-shop/
├── .github/workflows/
│   └── deploy.yml             # GitHub Pages CI/CD 自動部署工作流程
├── .vite-hooks/
│   └── pre-commit             # Vite+ Git pre-commit hook (自動執行 vp staged)
├── public/
│   ├── images/                # 商品圖片、DM 特刊、Banner 與轉盤背景圖
│   ├── _redirects             # Netlify SPA 路由重導向規則
│   ├── favicon.ico
│   └── LOGO_88.png            # 品牌 Logo
├── src/
│   ├── components/            # 共用 UI 與互動元件
│   │   ├── AlertModal.jsx     # 自訂提示彈窗 (支援 Esc 鍵與 Callback)
│   │   ├── AuthModal.jsx      # 會員登入 / 註冊切換彈窗
│   │   ├── Footer.jsx         # 頁尾導覽列
│   │   ├── LotteryWheel.jsx   # 88 樂透轉轉樂互動元件
│   │   ├── Navbar.jsx         # 響應式導覽列 (含購物車 Badge、主題切換、漢堡選單)
│   │   ├── ProductCard.jsx    # 商品展示卡片元件
│   │   └── ScrollToTop.jsx    # 路由切換自動回到頂部邏輯元件
│   ├── context/               # 全域狀態管理 (Context 與 Provider 拆檔以支援 HMR)
│   │   ├── AuthContext.js     # Auth Context 物件定義
│   │   ├── AuthProvider.jsx   # 會員狀態、註冊登入、訂單與抽獎寫入邏輯
│   │   ├── CartContext.js     # Cart Context 物件定義
│   │   ├── CartProvider.jsx   # 會員/訪客雙軌購物車推導與結帳邏輯
│   │   ├── ThemeContext.js    # Theme Context 物件定義
│   │   └── ThemeProvider.jsx  # 深淺色主題狀態與 DOM data-theme 同步
│   ├── data/
│   │   └── products.js        # 商品靜態資料庫
│   ├── hooks/
│   │   └── useAppHooks.js     # 封裝 useAuth, useCart, useTheme (含 Provider 邊界檢查)
│   ├── pages/                 # 路由頁面元件
│   │   ├── Home.jsx           # 首頁 (Hero Banner、快速分類、熱銷推薦)
│   │   ├── Products.jsx       # 商品列表頁 (支援分類路由過濾)
│   │   ├── ProductDetail.jsx  # 單一商品詳情頁
│   │   ├── CartPage.jsx       # 購物車與結帳頁
│   │   ├── Member.jsx         # 會員中心儀表板 (會員卡、歷史訂單、優惠券)
│   │   ├── Ecatalog.jsx       # 線上 DM 特刊頁
│   │   ├── Stores.jsx         # 門市據點查詢頁
│   │   ├── About.jsx          # 品牌故事頁
│   │   ├── JoinUs.jsx         # 人才招募頁
│   │   ├── Contact.jsx        # 聯絡客服表單頁
│   │   ├── FAQ.jsx            # 常見問題頁
│   │   ├── Privacy.jsx        # 隱私權政策頁
│   │   └── ReturnPolicy.jsx   # 退換貨政策頁
│   ├── utils/                 # 共用工具函式
│   │   ├── assetUrl.js        # 跨部署環境 (GitHub Pages / Netlify) 靜態資源路徑產生器
│   │   └── storage.js         # localStorage 安全讀寫封裝 (防呆 JSON 解析與例外處理)
│   ├── App.jsx                # 應用程式根元件、Provider 階層與 React Router 路由配置
│   ├── index.css              # 全站樣式表 (CSS Variables、RWD、無障礙設定與動畫)
│   └── main.jsx               # React 掛載入口點
├── index.html                 # HTML 入口模板 (載入 Noto Sans TC 字型)
├── netlify.toml               # Netlify 建置環境與 SPA Redirects 設定
├── package.json               # 專案相依套件與 Vite+ 指令腳本
└── vite.config.js             # Vite+ 設定檔 (動態 base 路徑、Oxlint 與 Oxfmt 規則)
```

---

## 🔧 架構重構與工程化亮點 (Architecture & Technical Highlights)

1. **符合 Fast Refresh (HMR) 的 Context 架構拆分**
   - 為嚴格遵守 `react/only-export-components` 規範，將 `createContext` 獨立於 `*Context.js`，並將元件實作放於 `*Provider.jsx`，再由 `src/hooks/useAppHooks.js` 統一匯出 `useAuth`、`useCart`、`useTheme`，確保開發環境的熱模組替換 (HMR) 穩定運作且無循環依賴。

2. **避免狀態不同步的推導式設計 (Derived State)**
   - 摒棄在多個 State 或 `useEffect` 之間手動同步資料的做法。例如 `currentUser` 直接由 `users` 與 `currentUserId` 推導；`cart` 直接由 `currentUser.cart`（已登入）或 `guestCart`（未登入）推導，從根源消除非同步覆蓋（Stale Closure）與渲染期間 `setState` 的問題。

3. **具備容錯機制的 `localStorage` 安全封裝 (`src/utils/storage.js`)**
   - 直接呼叫 `JSON.parse(localStorage.getItem(...))` 若遇到損毀資料會拋出例外導致 React 白畫面。本專案透過 `readJSON` 與 `writeJSON` 統一處理例外，一旦偵測到損毀資料即自動清除並回傳預設值（Fallback），大幅提升前端穩定度。

4. **單一原始碼雙平台無縫部署 (`src/utils/assetUrl.js` & `vite.config.js`)**
   - 透過 `vite.config.js` 自動偵測 `process.env.GITHUB_REPOSITORY` 動態切換 `base`（GitHub Pages 為 `/88shop/`，Netlify 與本地端為 `/`），並搭配 `assetUrl()` 函式與 `<Router basename="{basename}">`，不必修改任何一行程式碼即可同時部署於子路徑與根目錄環境。

5. **導入 Vite+ (`vite-plus`) 統一工具鏈**
   - 採用新一代 `vite-plus` 工具鏈，內建 Oxlint（啟用 React 19 嚴格規則如 `react/purity`、`react/set-state-in-render`、`react/set-state-in-effect` 與型別感知檢查）及 Oxfmt，並透過 `.vite-hooks/pre-commit` 在每次 Git Commit 前自動執行檢查與修復。

---

## 🛠️ 技術棧 (Tech Stack)

| 類別             | 使用技術 / 工具                                                             |
| :--------------- | :-------------------------------------------------------------------------- |
| **核心框架**     | React 19 (`^19.2.8`)                                                        |
| **建置與工具鏈** | Vite+ (`vite-plus@1.1.0` — 整合 Vite、Oxlint、Oxfmt、Pre-commit Hooks)      |
| **路由管理**     | React Router v7 (`react-router-dom@^7.18.4`)                                |
| **狀態管理**     | React Context API + Custom Hooks                                            |
| **樣式設計**     | 純 CSS3 (CSS Variables, Flexbox, CSS Grid, RWD, A11y)，不依賴第三方 UI 框架 |
| **圖示庫**       | Lucide React (`lucide-react`)                                               |
| **資料持久化**   | Web Storage API (`localStorage` 安全封裝)                                   |
| **部署平台**     | GitHub Pages (GitHub Actions) & Netlify                                     |

---

## 💻 本地端開發與指令 (Getting Started)

### 環境需求

- **Node.js**: `^20.19.0` || `^22.18.0` || `>=24.11.0`（建議使用 Node.js 22 LTS）
- **工具鏈**: 支援使用 `npm` 或全域安裝 `vp` ([Vite+ CLI](https://viteplus.dev/guide/))

### 安裝與啟動

```bash
# 1. 複製專案到本地端
git clone https://github.com/shernwu-creator/88shop.git
cd 88shop

# 2. 安裝相依套件
npm install
# 或使用 Vite+ CLI: vp install

# 3. 啟動本地開發伺服器 (支援 HMR)
npm run dev

# 4. 執行程式碼靜態檢查 (Oxlint)
npm run lint

# 5. 建置正式環境生產版本 (輸出至 dist/)
npm run build

# 6. 本地預覽生產版本
npm run preview
```

---

## 🚀 自動化部署 (Deployment)

本專案已完整配置雙平台自動化部署，並解決了 SPA 單頁式應用在靜態伺服器上重新整理深層路由時的 404 問題：

### 📍 GitHub Pages

- 透過 `.github/workflows/deploy.yml` 設定 GitHub Actions CI/CD。
- 當推送至 `main` 分支時，自動使用 Node.js 22 執行 `npm ci` 與 `npm run build`。
- 建置完成後自動執行 `cp dist/index.html dist/404.html`，確保使用者直接造訪或重新整理 `/products`、`/member` 等路由時能正常載入 React Router。

### 📍 Netlify

- 專案根目錄配置 `netlify.toml`（指定 `NODE_VERSION = "22"` 與 `[[redirects]]` 規則）以及 `public/_redirects`。
- 匯入 Netlify 後即可零設定自動建置並支援所有前端路由。
