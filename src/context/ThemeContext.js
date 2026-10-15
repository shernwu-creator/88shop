import { createContext } from "react";

// 這個檔案只放 Context 物件本身，Provider 放在 ThemeProvider.jsx，
// 避免同一個檔案同時匯出元件與非元件（Fast Refresh 規則）。
export const ThemeContext = createContext(null);
