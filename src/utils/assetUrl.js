/**
 * 取得 public 資料夾內資源的正確網址。
 *
 * 專案會部署到兩種不同的路徑：
 * - GitHub Pages：位於子路徑，例如 /88shop/
 * - Netlify／本機開發：位於根目錄 /
 *
 * Vite 的 import.meta.env.BASE_URL 會依 vite.config.js 的 base 自動帶入，
 * 因此用這個函式組路徑，就能避免寫死 "/images/..." 造成子路徑下 404。
 */
const BASE_URL = import.meta.env.BASE_URL;

export function assetUrl(path) {
  // BASE_URL 一定是 "/" 或 "/xxx/"，先去掉結尾斜線再組路徑
  const base = BASE_URL.endsWith("/") ? BASE_URL.slice(0, -1) : BASE_URL;
  const cleanPath = String(path).replace(/^\/+/, "");

  return `${base}/${cleanPath}`;
}
