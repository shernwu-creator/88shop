import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToTop() {
  // 取得目前的路由資訊
  const { pathname } = useLocation();

  useEffect(() => {
    // 當 pathname（網址路徑）改變時，觸發捲軸回到最上方 (X: 0, Y: 0)
    window.scrollTo(0, 0);
  }, [pathname]);

  // 這個元件只是用來執行邏輯，不需要在畫面上渲染任何東西
  return null;
}
