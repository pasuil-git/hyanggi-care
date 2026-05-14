import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PublicLayout from './layouts/PublicLayout';
import AdminLayout from './layouts/AdminLayout';
import Home from './pages/Home';
import Calculator from './pages/Calculator';
import Notice from './pages/Notice';
import NoticeDetail from './pages/NoticeDetail';
import AdminLogin from './pages/admin/AdminLogin';
import Dashboard from './pages/admin/Dashboard';
import ConsultationManager from './pages/admin/ConsultationManager';
import PostManager from './pages/admin/PostManager';
import './index.css';

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<PublicLayout><Home /></PublicLayout>} />
        <Route path="/calculator" element={<PublicLayout><Calculator /></PublicLayout>} />
        <Route path="/notice" element={<PublicLayout><Notice /></PublicLayout>} />
        <Route path="/notice/:id" element={<PublicLayout><NoticeDetail /></PublicLayout>} />
        <Route path="/admin/login" element={<AdminLogin />} />
        
        {/* Admin Protected Routes */}
        <Route path="/admin/dashboard" element={<AdminLayout><Dashboard /></AdminLayout>} />
        <Route path="/admin/consultations" element={<AdminLayout><ConsultationManager /></AdminLayout>} />
        <Route path="/admin/posts" element={<AdminLayout><PostManager /></AdminLayout>} />
        <Route path="/admin/gallery" element={<AdminLayout><div className="text-2xl font-bold">갤러리 관리 (준비 중)</div></AdminLayout>} />
        <Route path="/admin/settings" element={<AdminLayout><div className="text-2xl font-bold">사이트 설정 (준비 중)</div></AdminLayout>} />
      </Routes>
    </Router>
  );
}

export default App;
