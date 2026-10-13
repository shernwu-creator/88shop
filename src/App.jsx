import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./context/ThemeContext";
import { AuthProvider } from "./context/AuthContext";
import { CartProvider } from "./context/CartContext";

import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";
import { AuthModal } from "./components/AuthModal";
import { LotteryWheel } from "./components/LotteryWheel";

import Home from "./pages/Home";
import Products from "./pages/Products";
import ProductDetail from "./pages/ProductDetail";
import { CartPage } from "./pages/CartPage";
import { MemberPage } from "./pages/Member";
import Stores from "./pages/Stores";
import About from "./pages/About";
import Contact from "./pages/Contact";
import FAQ from "./pages/FAQ";
import Privacy from "./pages/Privacy";
import ReturnPolicy from "./pages/ReturnPolicy";
import JoinUs from "./pages/JoinUs";
import Ecatalog from "./pages/Ecatalog";

function AppContent() {
  const [isAuthOpen, setIsAuthOpen] = useState(false);

  return (
    <div className="app-wrapper">
      <Navbar onOpenAuth={() => setIsAuthOpen(true)} />

      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/:category" element={<Products />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/cart" element={<CartPage onOpenAuth={() => setIsAuthOpen(true)} />} />
          <Route
            path="/lottery"
            element={<LotteryWheel onOpenAuth={() => setIsAuthOpen(true)} />}
          />
          <Route path="/member" element={<MemberPage />} />
          <Route path="/stores" element={<Stores />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/return-policy" element={<ReturnPolicy />} />
          <Route path="/joinus" element={<JoinUs />} />
          <Route path="/ecatalog" element={<Ecatalog />} />
        </Routes>
      </main>

      <Footer />
      <AuthModal isOpen={isAuthOpen} onClose={() => setIsAuthOpen(false)} />
    </div>
  );
}

// ...上面保持原樣

export default function App() {
  // 讓 Router 讀取 vite.config.js 動態生成的 base 路徑
  const basename = import.meta.env.BASE_URL;

  return (
    <Router basename={basename}>
      <ThemeProvider>
        <AuthProvider>
          <CartProvider>
            <AppContent />
          </CartProvider>
        </AuthProvider>
      </ThemeProvider>
    </Router>
  );
}
