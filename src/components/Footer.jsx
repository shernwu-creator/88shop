import { Link } from "react-router-dom";

export const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-col">
          <h3>關於 88shop</h3>
          <ul>
            <li>
              <Link to="/about" className="btn-link">
                品牌故事
              </Link>
            </li>
            <li>
              <Link to="/joinus" className="btn-link">
                人才招募
              </Link>
            </li>
            <li>
              <Link to="/stores" className="btn-link">
                門市據點
              </Link>
            </li>
          </ul>
        </div>
        <div className="footer-col">
          <h3>顧客服務</h3>
          <ul>
            <li>
              <Link to="/faq" className="btn-link">
                常見問題
              </Link>
            </li>
            <li>
              <Link to="/return-policy" className="btn-link">
                退換貨政策
              </Link>
            </li>
            <li>
              <Link to="/privacy" className="btn-link">
                隱私權政策
              </Link>
            </li>
          </ul>
        </div>
        <div className="footer-col">
          <h3>聯絡我們</h3>
          <ul>
            <li>
              <Link to="/contact" className="btn-link">
                聯絡客服
              </Link>
            </li>
            <li>
              <Link to="/ecatalog" className="btn-link">
                線上 DM
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        <p>© 2026 88shop 鮮食便利商店. All rights reserved.</p>
      </div>
    </footer>
  );
};
