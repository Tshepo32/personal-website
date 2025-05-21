import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './Home';
import BlogPage from './BlogPage';
import AdminLogin from './components/AdminLogin';
import AdminDashboard from './components/AdminDashboard'; // Import Dashboard

function App() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/blog" element={<BlogPage />} />
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
        </Routes>
    );
}

export default App;
