import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import './dasboard.css';

const AdminDashboard = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [videoUrl, setVideoUrl] = useState('');
    const [createdAt, setCreatedAt] = useState(new Date().toISOString()); // Default to current time
    const [status, setStatus] = useState('');
    const navigate = useNavigate();

    const handleLogout = () => {
        // In a real app, you'd clear authentication tokens/session here
        navigate('/'); // Redirect to home page
    };

    const handlePostSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('https://personal-website-16.onrender.com/api/blog/create', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ title, content, videoUrl, createdAt }),
            });

            if (!response.ok) {
                // Read the error message from the backend if available
                const errorData = await response.json();
                throw new Error(errorData.message || 'Post creation failed');
            }

            setStatus('✅ Post created successfully!');
            // Clear form fields after successful submission
            setTitle('');
            setContent('');
            setVideoUrl('');
            setCreatedAt(new Date().toISOString()); // Reset creation time to current for next post
        } catch (err) {
            setStatus(`❌ Failed to create post: ${err.message}`);
        }
    };

    return (
        <div className="dashboard-page-wrapper"> {/* Added a wrapper div for layout */}
            <Navbar /> {/* Add Navbar for consistency if desired */}
            <div className="dashboard-container">
                <h2>Create Blog Post</h2>
                <form onSubmit={handlePostSubmit}>
                    <input
                        type="text"
                        placeholder="Title"
                        required
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                    <textarea
                        placeholder="Content"
                        required
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                    />
                    <input
                        type="text"
                        placeholder="Enter YouTube video URL (optional)"
                        value={videoUrl}
                        onChange={(e) => setVideoUrl(e.target.value)}
                    />
                    {/* If you want to allow manual creation date: */}
                    {/* <input
                        type="datetime-local"
                        value={createdAt.substring(0, 16)} // Format for datetime-local
                        onChange={(e) => setCreatedAt(new Date(e.target.value).toISOString())}
                    /> */}
                    <button type="submit">Create Post</button>
                </form>

                {status && <p className="status">{status}</p>}

                <button className="logout-btn" onClick={handleLogout}>Logout</button>
            </div>
            <Footer /> {/* Add the Footer component */}
        </div>
    );
};

export default AdminDashboard;