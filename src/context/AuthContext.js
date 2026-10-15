import { createContext } from "react";

// 這個檔案只放 Context 物件本身，Provider 放在 AuthProvider.jsx。
// 這麼做是因為 react/only-export-components（Fast Refresh）要求
// 「元件檔只能匯出元件」，把 Context 拆出來才不會破壞 HMR。
export const AuthContext = createContext(null);
