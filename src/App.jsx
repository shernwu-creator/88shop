import { useState } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';

import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { AuthModal } from './components/AuthModal';
import { LotteryWheel } from './components/LotteryWheel';

import Home from './pages/Home';
import Products from './pages/Products';
import { CartPage } from './pages/CartPage';
import { MemberPage } from './pages/Member';
import Stores from './pages/Stores';
import About from './pages/About';
import Contact from './pages/Contact';
import FAQ from './pages/FAQ';
import Privacy from './pages/Privacy';
import ReturnPolicy from './pages/ReturnPolicy';
import JoinUs from './pages/JoinUs';
import Ecatalog from './pages/Ecatalog';

function AppContent() {
  const [currentPage, setCurrentPage] = useState('home');
  const [isAuthOpen, setIsAuthOpen] = useState(false);

  // 路由對應表
  const renderPage = () => {
    switch (currentPage) {
      case 'home': return <Home onNavigate={setCurrentPage} />;
      case 'products': return <Products />;
      case 'cart': return <CartPage onNavigate={setCurrentPage} onOpenAuth={() => setIsAuthOpen(true)} />;
      case 'lottery': return <LotteryWheel onOpenAuth={() => setIsAuthOpen(true)} />;
      case 'member': return <MemberPage onNavigate={setCurrentPage} />;
      case 'stores': return <Stores />;
      case 'about': return <About />;
      case 'contact': return <Contact />;
      case 'faq': return <FAQ />;
      case 'privacy': return <Privacy />;
      case 'return-policy': return <ReturnPolicy />;
      case 'joinus': return <JoinUs />;
      case 'ecatalog': return <Ecatalog />;
      default: return <Home onNavigate={setCurrentPage} />;
    }
  };

  return (
    <div className="app-wrapper">
      <Navbar onNavigate={setCurrentPage} onOpenAuth={() => setIsAuthOpen(true)} />

      <main className="main-content">
        {renderPage()}
      </main>

      <Footer onNavigate={setCurrentPage} />

      <AuthModal isOpen={isAuthOpen} onClose={() => setIsAuthOpen(false)} />
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <CartProvider>
          <AppContent />
        </CartProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}