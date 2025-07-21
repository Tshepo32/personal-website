import React, { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import "./BlogPage.css";

const getYouTubeId = (url) => {
    const match = url.match(/(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?/\s]{11})/);
    return match ? match[1] : null;
};

const BlogPage = () => {
    const [blogs, setBlogs] = useState([]);

    useEffect(() => {
        fetch("https://personal-website-16.onrender.com/api/blog/getall")
            .then((res) => {
                if (!res.ok) {
                    throw new Error(`HTTP error! status: ${res.status}`);
                }
                return res.json();
            })
            .then((data) => setBlogs(data))
            .catch((err) => console.error("Error loading blogs", err));
    }, []);

    return (
        <div className="blog-container"> {/* This is your top-level wrapper */}
            <Navbar />
            <div className="main-content-area"> {/* NEW: This div will grow */}
                <div className="blog-header">
                    <h1>Coding Blog</h1>
                    <p className="subheading">Latest updates, reviews, and Coding insights</p>
                </div>
                <div className="blog-list">
                    {blogs.length > 0 ? (
                        blogs.map((blog) => {
                            const youtubeId = getYouTubeId(blog.videoUrl);
                            return (
                                <div key={blog.id} className="blog-card">
                                    <h2>{blog.title}</h2>
                                    <p dangerouslySetInnerHTML={{ __html: blog.content }}></p>
                                    {blog.videoUrl && youtubeId && (
                                        <div className="blog-video-embed">
                                            <iframe
                                                width="560"
                                                height="315"
                                                src={`https://www.youtube.com/embed/${youtubeId}`}
                                                title={blog.title}
                                                frameBorder="0"
                                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                                allowFullScreen
                                            ></iframe>
                                        </div>
                                    )}
                                    <p className="blog-date">{new Date(blog.createdAt).toLocaleString()}</p>
                                </div>
                            );
                        })
                    ) : (
                        <p>No blog posts found.</p>
                    )}
                </div>
            </div> {/* END: main-content-area */}
            <Footer />
        </div>
    );
};

export default BlogPage;