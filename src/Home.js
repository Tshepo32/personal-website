import React, { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import Navbar from './components/Navbar';
import './Home.css';
import VoiceCommand from "./VoiceCommand";
import tshepoImg from './tshepo.jpg';
import { FaLinkedin, FaGithub, FaGooglePlay, FaExternalLinkAlt } from 'react-icons/fa';

function getYouTubeId(url) {
    const match = url.match(
        /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?/\s]{11})/
    );
    return match ? match[1] : null;
}

function Home() {
    const [blogPosts, setBlogPosts] = useState([]);
    const [expandedPostId, setExpandedPostId] = useState(null);
    const [isLoadingBlogPosts, setIsLoadingBlogPosts] = useState(true);
    const location = useLocation();

    useEffect(() => {
        if (location.hash) {
            const id = location.hash.replace('#', '');
            const element = document.getElementById(id);
            if (element) {
                setTimeout(() => {
                    element.scrollIntoView({ behavior: 'smooth' });
                }, 100);
            }
        }
    }, [location]);

    useEffect(() => {
        const fetchAndProcessBlogPosts = () => {
            fetch('https://personal-website-16.onrender.com/api/blog/getall?limit=2&sortBy=createdAt:desc')
                .then(response => {
                    if (!response.ok) {
                        console.error('Network response was not ok (during blog fetch):', response.statusText);
                    }
                    return response.json();
                })
                .then(data => {
                    if (data && Array.isArray(data)) {
                        const sortedData = [...data].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
                        setBlogPosts(sortedData.slice(0, 2));
                    } else {
                        console.warn("Fetched data is not an array:", data);
                        setBlogPosts([]);
                    }
                })
                .catch(error => {
                    console.error('Error fetching or processing blog posts:', error);
                    setBlogPosts([]);
                })
                .finally(() => {
                    setIsLoadingBlogPosts(false);
                });
        };

        fetchAndProcessBlogPosts();
        const intervalId = setInterval(fetchAndProcessBlogPosts, 10000);
        return () => clearInterval(intervalId);
    }, []);

    const toggleExpand = (postId) => {
        setExpandedPostId(prevId => (prevId === postId ? null : postId));
    };

    return (
        <>
            <Navbar />
            <div className="home-container">
                <header className="hero" id="home">
                    <h1>Welcome, I'm Lorens Tshepo Maleo 👋</h1>
                    <p>
                        Frontend Developer Intern @ BOS Technology
                    </p>
                    <p>
                        Full-Stack Developer | Regional Finalist in Huawei 2024–2025
                        ICT Competition
                    </p>
                    <a href="#contact" className="hero-button">Get in Touch</a>
                </header>

                <VoiceCommand />

                <section id="about" className="about-section">
                    <h2>About Me</h2>
                    <div className="about-content">
                        <div className="about-image">
                            <img src={tshepoImg} alt="Tshepo Maleo" />
                        </div>
                        <div className="about-text">
                            <p>
                                Hi, I'm Lorens Tshepo Maleo, an adaptable full-stack software engineer and ICT
                                professional with a deep passion for building scalable, high-performance applications.
                                I thrive on solving complex technical challenges, refining system architectures,
                                and continuously expanding my engineering toolkit through hands-on development
                                and production deployments.
                            </p>
                            <br/>
                            <p>
                                I am highly proficient in backend architecture using Java, Spring Boot, and Python,
                                alongside native mobile application development with Kotlin. My technical expertise
                                extends to managing relational databases using SQL and OpenGauss, and configuring,
                                testing, and deploying code securely across diverse Linux environments, including
                                OpenEuler and Kunpeng systems.
                            </p>
                            <br/>
                            <p>
                                As a regional finalist in the Huawei ICT Competition (Computing Track), I have a
                                proven track record of strong computational problem-solving. I excel in collaborative,
                                Agile-driven environments utilizing GitHub, always focusing on writing clean,
                                industry-compliant code that bridges intelligent software solutions with seamless
                                user experiences.
                            </p>
                        </div>
                    </div>
                </section>

                {/* --- PROJECTS SECTION (LINKS CODECONNECT FOR GOOGLE SEO INDEXING) --- */}
                <section id="projects" className="projects-section">
                    <h2>Featured Projects</h2>
                    <div className="certification-cards">
                        <div className="certification-card">
                            <h3>CodeConnect – Mobile App</h3>
                            <p>Android / Kotlin & Jetpack Compose</p>
                            <p>
                                A live production mobile application built for developers to collaborate, share insights, 
                                and connect in real time. Features parallel onboarding, session management, and deep link synchronization.
                            </p>
                            <p><strong>Technologies:</strong> Kotlin, Jetpack Compose, Firebase, Coroutines, Hilt</p>
                            <a 
                                href="https://play.google.com/store/apps/details?id=com.tshepo.codeconnect" 
                                className="link-button" 
                                target="_blank" 
                                rel="noopener noreferrer"
                            >
                                <FaGooglePlay style={{ marginRight: '8px' }} /> View on Google Play
                            </a>
                        </div>

                        <div className="certification-card">
                            <h3>C Language Tetris Game</h3>
                            <p>C Programming & Web Host Deployment</p>
                            <p>
                                A custom Tetris game engineered in C, demonstrating low-level data structures, array manipulation, 
                                and game loop logic hosted online.
                            </p>
                            <p><strong>Technologies:</strong> C, Web Architecture, Render</p>
                            <a 
                                href="https://github.com/tshepo32" 
                                className="link-button" 
                                target="_blank" 
                                rel="noopener noreferrer"
                            >
                                <FaExternalLinkAlt style={{ marginRight: '8px' }} /> View Project
                            </a>
                        </div>
                    </div>
                </section>

                <section id="blog" className="blog-section">
                    <h2>From the Blog</h2>
                    <div className="blog-cards">
                        {isLoadingBlogPosts ? (
                            <div className="spinner-container">
                                <div className="spinner"></div>
                                <p>Loading blog posts...</p>
                            </div>
                        ) : blogPosts.length > 0 ? (
                            blogPosts.map(post => {
                                const youtubeId = getYouTubeId(post.videoUrl);
                                const isExpanded = expandedPostId === post.id;
                                const displayContent = isExpanded ? post.content : (post.summary || post.content?.substring(0, 150) + '...');

                                return (
                                    <div key={post.id} className="blog-card">
                                        <h3>{post.title}</h3>
                                        {post.createdAt && (
                                            <p className="blog-date">
                                                {new Date(post.createdAt).toLocaleDateString('en-US', {
                                                    year: 'numeric',
                                                    month: 'long',
                                                    day: 'numeric',
                                                    hour: '2-digit',
                                                    minute: '2-digit'
                                                })}
                                            </p>
                                        )}

                                        {post.videoUrl && (
                                            <div className="blog-video">
                                                {youtubeId ? (
                                                    <iframe
                                                        src={`https://www.youtube.com/embed/${youtubeId}`}
                                                        frameBorder="0"
                                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                                        allowFullScreen
                                                        title={post.title}
                                                    ></iframe>
                                                ) : (
                                                    <video controls width="100%">
                                                        <source src={post.videoUrl} type="video/mp4" />
                                                        Your browser does not support the video tag.
                                                    </video>
                                                )}
                                            </div>
                                        )}

                                        <p dangerouslySetInnerHTML={{ __html: displayContent }}></p>

                                        {post.content && (post.summary && post.content.length > post.summary.length || (!post.summary && post.content.length > 150)) && (
                                            <button onClick={() => toggleExpand(post.id)} className="link-button">
                                                {isExpanded ? 'Read Less' : 'Read More'}
                                            </button>
                                        )}
                                    </div>
                                );
                            })
                        ) : (
                            <p>No blog posts available yet.</p>
                        )}
                    </div>
                    <div className="more-button-wrapper">
                        <Link to="/blog" className="hero-button">More Posts</Link>
                    </div>
                </section>

                <section id="certifications" className="certification-section">
                    <h2>Certifications</h2>
                    <div className="certification-cards">
                        <div className="certification-card">
                            <h3>CS50: Introduction to Computer Science</h3>
                            <p>Harvard University</p>
                            <p>
                                This course has been a pivotal step in my journey as a software developer. As one of the
                                most comprehensive introductory computer science courses, CS50 has provided me with a
                                robust foundation in key areas such as algorithms, data structures, computer
                                architecture, and web development.
                            </p>
                            <p><strong>Skills:</strong> Problem solving, data structures, algorithms, debugging, web development.</p>
                            <a href="https://cs50.harvard.edu/certificates/c603cf04-1d89-49c5-bb5e-5366eaddcd58"
                               className="link-button" target="_blank" rel="noopener noreferrer">
                                View Certificate
                            </a>
                        </div>

                        <div className="certification-card">
                            <h3>Microsoft Certified: Azure AI Fundamentals</h3>
                            <p>Microsoft</p>
                            <p>
                                This certification validates foundational knowledge of artificial intelligence (AI) and
                                machine learning (ML) concepts, and how they are implemented using Azure services.
                            </p>
                            <p><strong>Skills:</strong> AI workloads, ML models, computer vision, natural language processing, responsible AI.</p>
                            <a href="https://learn.microsoft.com/en-us/users/lorensmaleo-6392/credentials/96c68fe5e9fc9c13?ref=https%3A%2F%2Fwww.linkedin.com%2F"
                               className="link-button" target="_blank" rel="noopener noreferrer">
                                View Certificate
                            </a>
                        </div>

                        <div className="certification-card">
                            <h3>Huawei Cloud Advanced: Architecture and Technologies</h3>
                            <p>Huawei</p>
                            <p>
                                This certification demonstrates expertise in designing and deploying advanced cloud
                                solutions using Huawei Cloud. It covers architecture best practices, cloud-native
                                services, networking, security, and high-availability systems.
                            </p>
                            <p><strong>Skills:</strong> Cloud architecture, microservices, security, scalability, Huawei Cloud services.</p>
                            <a href="https://www.credly.com/badges/7fb2264b-ee19-45fc-87d1-9e65f2fae0e4/linked_in_profile"
                               className="link-button" target="_blank" rel="noopener noreferrer">
                                View Certificate
                            </a>
                        </div>
                    </div>
                </section>

                <section id="contact" className="contact-section">
                    <h2>Contact Me</h2>
                    <p>Feel free to reach out to me if you have any questions, collaborations, or just want to connect!</p>

                    <form className="contact-form" method="POST">
                        <div className="form-group">
                            <label htmlFor="name">Name:</label>
                            <input type="text" id="name" name="name" required />
                        </div>

                        <div className="form-group">
                            <label htmlFor="subject">Subject:</label>
                            <input type="text" id="subject" name="subject" required />
                        </div>

                        <div className="form-group">
                            <label htmlFor="message">Message:</label>
                            <textarea id="message" name="message" rows="5" required></textarea>
                        </div>

                        <button type="submit">Send Message</button>
                    </form>
                </section>

                <footer className="footer">
                    <div className="footer-content">
                        <div className="footer-icons">
                            <a href="https://www.linkedin.com/in/lorens-tshepo-maleo-2533b04a/" target="_blank"
                               rel="noopener noreferrer">
                                <FaLinkedin />
                            </a>
                            <a href="https://github.com/tshepo32" target="_blank" rel="noopener noreferrer">
                                <FaGithub />
                            </a>
                        </div>
                        <p>© {new Date().getFullYear()} Lorens Tshepo Maleo. All rights reserved.</p>
                    </div>
                </footer>
            </div>
        </>
    );
}

export default Home;
