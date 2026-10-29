import { useState } from 'react'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Home } from "./pages/home";
import { Login } from "./pages/loginsignup";
import { Product } from "./pages/product";
import { CookiePolicy } from "./pages/cookie-policy";
import { PrivacyPolicy } from "./pages/privacy-policy";
import { ProductSecurity } from "./pages/product-security";
import { TermsOfUse } from "./pages/terms-of-use";
import { Cart } from "./pages/cart";
import { News } from "./pages/news";
import './App.css'

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/product" element={<Product />} />
          <Route path="/product/:id" element={<Product />} />
          <Route path="/products/:id" element={<Product />} />
          <Route path="/cookie-policy" element={<CookiePolicy />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/product-security" element={<ProductSecurity />} />
          <Route path="/terms-of-use" element={<TermsOfUse />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/news" element={<News />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App
