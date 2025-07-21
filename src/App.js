import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './Home';
import BlogPage from './BlogPage';
import AdminLogin from './components/AdminLogin';
import AdminDashboard from './components/AdminDashboard';
import ChatButton from "./components/ChatButton";

function App() {
    return (
        // A <div> element wraps the entire application content
        <div className="app-container">
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/blog" element={<BlogPage />} />
                <Route path="/admin/login" element={<AdminLogin />} />
                <Route path="/admin/dashboard" element={<AdminDashboard />} />
            </Routes>
            {/* The ChatButton will now render on every page */}
            <ChatButton />
        </div>
    );
}

export default App;