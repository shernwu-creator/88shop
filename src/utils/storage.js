// localStorage 安全讀寫工具
// 直接 JSON.parse 若遇到毀損的資料會拋出例外，導致整個 App 白畫面，
// 因此統一透過這裡讀寫，並在失敗時回傳預設值。

export const readJSON = (key, fallback) => {
  try {
    const raw = localStorage.getItem(key);
    if (raw === null) return fallback;
    return JSON.parse(raw);
  } catch {
    // 資料毀損時清除該筆資料，避免每次讀取都失敗
    localStorage.removeItem(key);
    return fallback;
  }
};

export const writeJSON = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // 忽略寫入失敗（例如無痕模式或超過容量上限），不讓 App 中斷
  }
};

export const removeKey = (key) => {
  localStorage.removeItem(key);
};
