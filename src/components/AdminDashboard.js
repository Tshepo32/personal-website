import React, { useState } from 'react';
import './dasboard.css';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [videoUrl, setVideoUrl] = useState('');
    const [createdAt, setCreatedAt] = useState(new Date().toISOString());
    const [status, setStatus] = useState('');
    const navigate = useNavigate();

    const handleLogout = () => {
        navigate('/');
    };

    const handlePostSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('https://personal-website-16.onrender.com/api/blog/create', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ title, content, videoUrl, createdAt}),
            });

            if (!response.ok) throw new Error('Post creation failed');
            setStatus('✅ Post created successfully!');
            setTitle('');
            setContent('');
            setVideoUrl('');
            setCreatedAt(new Date().toISOString());
        } catch (err) {
            setStatus('❌ Failed to create post.');
        }
    };

    return (
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
                    placeholder="Enter post URL"
                    value={videoUrl}
                    onChange={(e) => setVideoUrl(e.target.value)}
                    required
                />
                <button type="submit">Create Post</button>
            </form>

            {status && <p className="status">{status}</p>}

            <button className="logout-btn" onClick={handleLogout}>Logout</button>
        </div>
    );
};

export default AdminDashboard;
