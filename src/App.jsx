import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Cart from './pages/Cart';
import Member from './pages/Member';
import CafeDrinks from './pages/CafeDrinks';
import FreshFood from './pages/FreshFood';
import { CartProvider } from './context/CartContext';
import { AuthProvider } from './context/AuthContext';

export default function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <BrowserRouter>
          <Navbar />
          <main className="main-content">
            <Routes>
              <Route path="/" element={<CafeDrinks />} />
              <Route path="/cafe-drinks" element={<CafeDrinks />} />
              <Route path="/fresh-food" element={<FreshFood />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/member" element={<Member />} />
            </Routes>
          </main>
        </BrowserRouter>
      </CartProvider>
    </AuthProvider>
  );
}