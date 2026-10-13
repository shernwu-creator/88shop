# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

## 部署 (Deployment)

本專案同時支援 **GitHub Pages** 與 **Netlify**，程式碼不需要為不同平台做任何修改。

`vite.config.js` 會自動判斷 `base`：

| 環境           | 判斷方式                                                | base       |
| -------------- | ------------------------------------------------------- | ---------- |
| GitHub Actions | 有 `GITHUB_REPOSITORY`（例如 `shernwu-creator/88shop`） | `/88shop/` |
| Netlify / 本機 | 沒有 `GITHUB_REPOSITORY`                                | `/`        |

> 程式碼內引用 `public` 資料夾的圖片時，**不要寫死** `/images/xxx.jpg`，
> 請使用 `assetUrl()`（`src/utils/assetUrl.js`），它會自動加上正確的 base 路徑。

### GitHub Pages

工作流程檔：`.github/workflows/deploy.yml`（push 到 `main` 或手動 `workflow_dispatch` 時觸發）。

**⚠️ 第一次部署前必須先做一次這個設定**，否則 `actions/configure-pages` 會失敗並顯示
`Get Pages site failed ... Error: Not Found`：

1. 開啟 <https://github.com/shernwu-creator/88shop/settings/pages>
2. **Build and deployment → Source** 選擇 **GitHub Actions**
3. 回到 <https://github.com/shernwu-creator/88shop/actions> 重新執行（Re-run）或重新 push

部署完成後網址為：<https://shernwu-creator.github.io/88shop/>

> 為什麼一定要手動設定？`configure-pages` 的 `enablement: true` 只能「自動啟用 Pages」，
> 但它需要 `GITHUB_TOKEN` 以外的權杖（PAT，需 `repo` 權限或 `administration:write`），
> 因此用預設權杖無法自動啟用，必須在 Settings 手動開啟一次。

工作流程另外會把 `dist/index.html` 複製成 `dist/404.html`，
讓深層連結（例如 `/88shop/product/p1`）直接開啟或重新整理時不會出現 404。

### Netlify

設定檔：`netlify.toml`

| 項目              | 值                                                             |
| ----------------- | -------------------------------------------------------------- |
| Build command     | `npm run build`                                                |
| Publish directory | `dist`                                                         |
| Node 版本         | `22`（vite-plus 要求 `^20.19.0 \|\| ^22.18.0 \|\| >=24.11.0`） |
| SPA 轉址          | `/* → /index.html`（200），設定檔與 `public/_redirects` 皆有   |

在 Netlify 選擇 **Import from GitHub** 後會自動讀取 `netlify.toml`，不需要手動填設定值。

### 本機驗證

```bash
npm ci                          # 或 npm install
npm run build                   # 模擬 Netlify（base = /）
npm run preview

# 模擬 GitHub Pages 子路徑（base = /88shop/）
GITHUB_REPOSITORY=user/88shop npm run build
```
