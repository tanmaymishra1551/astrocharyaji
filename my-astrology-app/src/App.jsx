// src/App.jsx
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import HomePage from './pages/HomePage.jsx';
import LoginPage from './pages/LoginPage.jsx';
import RegisterPage from './pages/RegisterPage.jsx';
import Dashboard from './pages/Dashboard.jsx';
import UserDashboard from './pages/UserDashboard.jsx';
import AstrologerDashboard from './pages/AstrologerDashboard.jsx';
import AdminDashboard from './pages/AdminDashboard.jsx';
import BookingDetail from './pages/BookingDetail.jsx';
import ChatPage from './pages/ChatPage.jsx';
import PaymentPage from './pages/PaymentPage.jsx';

function App() {
  // For demo purposes, we check for a token in localStorage
  const isAuthenticated = localStorage.getItem('token');

  return (
    <div className="container mx-auto p-4">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        {isAuthenticated ? (
          <>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/user-dashboard" element={<UserDashboard />} />
            <Route path="/astrologer-dashboard" element={<AstrologerDashboard />} />
            <Route path="/admin-dashboard" element={<AdminDashboard />} />
            <Route path="/booking/:id" element={<BookingDetail />} />
            <Route path="/chat/:id" element={<ChatPage />} />
            <Route path="/payment" element={<PaymentPage />} />
          </>
        ) : (
          <Route path="*" element={<Navigate to="/login" />} />
        )}
      </Routes>
    </div>
  );
}

export default App;
