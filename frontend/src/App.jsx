import { useState } from 'react'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Login } from "./pages";
import { Home } from "./pages";
import './App.css'

function App() {
  return (
    <div>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App
