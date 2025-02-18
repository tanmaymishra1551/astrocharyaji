import React from 'react';
import { Navigate } from 'react-router-dom';
import UserDashboard from '../pages/UserDashboard.jsx';
import AstrologerDashboard from '../pages/AstrologerDashboard.jsx';
import AdminDashboard from '../pages/AdminDashboard.jsx';

const Dashboard = () => {
    const role = localStorage.getItem('role');

    if (role === 'user') {
        return <UserDashboard />;
    } else if (role === 'astrologer') {
        return <AstrologerDashboard />;
    } else if (role === 'admin') {
        return <AdminDashboard />;
    } else {
        return <Navigate to="/login" />;
    }
};

export default Dashboard;