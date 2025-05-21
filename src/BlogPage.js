import React, { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import "./BlogPage.css";

const getYouTubeId = (url) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return match && match[2].length === 11 ? match[2] : null;
};

const BlogPage = () => {
    const [blogs, setBlogs] = useState([]);

    useEffect(() => {
        fetch("http://localhost:8080/api/blog/getall")
            .then((res) => res.json())
            .then((data) => setBlogs(data))
            .catch((err) => console.error("Error loading blogs", err));
    }, []);

    return (
        <div className="blog-container">
            <Navbar />
            <div className="blog-header">
                <h1>Coding Blog</h1>
                <p className="subheading">Latest updates, reviews, and Coding insights</p>
            </div>
            <div className="blog-list">
                {blogs.map((blog) => (
                    <div key={blog.id} className="blog-card">
                        <h2>{blog.title}</h2>
                        <p>{blog.content}</p>
                        <iframe
                            width="560"
                            height="315"
                            src={`https://www.youtube.com/embed/${getYouTubeId(blog.videoUrl)}`}
                            title="YouTube video"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                        ></iframe>
                        <p>{new Date(blog.createdAt).toLocaleString()}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default BlogPage;
