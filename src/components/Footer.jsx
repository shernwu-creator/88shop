
export const Footer = ({ onNavigate }) => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-col">
          <h3>關於 88shop</h3>
          <ul>
            <li><button onClick={() => onNavigate('about')} className="btn-link">品牌故事</button></li>
            <li><button onClick={() => onNavigate('joinus')} className="btn-link">人才招募</button></li>
            <li><button onClick={() => onNavigate('stores')} className="btn-link">門市據點</button></li>
          </ul>
        </div>
        <div className="footer-col">
          <h3>顧客服務</h3>
          <ul>
            <li><button onClick={() => onNavigate('faq')} className="btn-link">常見問題</button></li>
            <li><button onClick={() => onNavigate('return-policy')} className="btn-link">退換貨政策</button></li>
            <li><button onClick={() => onNavigate('privacy')} className="btn-link">隱私權政策</button></li>
          </ul>
        </div>
        <div className="footer-col">
          <h3>聯絡我們</h3>
          <ul>
            <li><button onClick={() => onNavigate('contact')} className="btn-link">聯絡客服</button></li>
            <li><button onClick={() => onNavigate('ecatalog')} className="btn-link">線上 DM</button></li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        <p>© 2024 88shop 鮮食便利商店. All rights reserved.</p>
      </div>
    </footer>
  );
};