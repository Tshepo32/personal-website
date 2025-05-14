import React from 'react';
import './Home.css';
import { Link } from 'react-router-dom';


function Home() {
    return (
        <div className="home-container">
            <header className="hero">
                <h1>Hello, I'm Tshepo 👋</h1>
                <p>Software Developer | Creative Thinker | Lifelong Learner</p>
                <Link to="/contact" className="hero-button">Get in Touch</Link>
            </header>

            <section className="about-preview">
                <h2>About Me</h2>
                <p>
                    I’m passionate about building powerful, user-focused software solutions.
                    Whether it’s crafting backends, experimenting with frontend UI, or exploring new tech — I'm always learning and improving.
                </p>
                <Link to="/about" className="link-button">Read More</Link>
            </section>

            <section className="project-preview">
                <h2>Recent Projects</h2>
                <div className="project-cards">
                    <div className="card">
                        <h3>Inventory Manager</h3>
                        <p>A simple app to manage stock and suppliers for small businesses.</p>
                    </div>
                    <div className="card">
                        <h3>Student Portal</h3>
                        <p>Helps students register, manage subjects, and apply for residence online.</p>
                    </div>
                </div>
                <Link to="/projects" className="link-button">See More Projects</Link>
            </section>
        </div>
    );
}

export default Home;
