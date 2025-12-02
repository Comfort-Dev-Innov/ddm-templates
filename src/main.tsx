import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import './index.css';
import App from './App.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/template/base-temp/heading-01.html" replace />} />
        <Route path="/template/:category/:fileName" element={<App />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
);
