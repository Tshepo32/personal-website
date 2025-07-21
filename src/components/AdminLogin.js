// src/AdminLogin.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar'; // Assuming Navbar is here
import Footer from './Footer'; // Import the Footer component
import '../AdminLogin.css'; // Assuming AdminLogin.css is correct

function AdminLogin() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLogin = (e) => {
        e.preventDefault();

        // IMPORTANT: This is for demonstration only!
        // In a real application, you would send these credentials to a secure backend
        // for authentication and receive a token.
        if (email === 'admin@example.com' && password === 'admin123') {
            navigate('/admin/dashboard');
        } else {
            setError('Invalid credentials');
        }
    };

    return (
        <div className="admin-login-page-wrapper"> {/* Added a wrapper div for layout */}
            <Navbar/>
            <div className="admin-login-container">
                <div className="admin-login-box">
                    <form onSubmit={handleLogin} className="admin-login-form">
                        <h2>Admin Login</h2>
                        {error && <p className="error">{error}</p>}
                        <input
                            type="text"
                            placeholder="Username"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        <button type="submit">Login</button>
                    </form>
                </div>
            </div>
            <Footer /> {/* Add the Footer component */}
        </div>
    );
}

export default AdminLogin;