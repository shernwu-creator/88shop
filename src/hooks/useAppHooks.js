import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { CartContext } from "../context/CartContext";
import { ThemeContext } from "../context/ThemeContext";

// 若在 Provider 之外使用，直接丟出明確的錯誤訊息，方便除錯
// （否則只會拿到 null，要等到取值時才出現看不懂的 TypeError）
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth 必須在 <AuthProvider> 內使用");
  return context;
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart 必須在 <CartProvider> 內使用");
  return context;
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) throw new Error("useTheme 必須在 <ThemeProvider> 內使用");
  return context;
};
