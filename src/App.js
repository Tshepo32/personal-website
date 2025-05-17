import React from 'react';
import Navbar from './components/Navbar';
import './App.css';
import tshepoImg from './tshepo.jpg';
import { FaLinkedin, FaGithub } from 'react-icons/fa';

function Home() {
    return (
        <>
            <Navbar />
            <div className="home-container">
                <header className="hero" id="home">
                    <h1>Welcome, I'm Tshepo Maleo 👋</h1>
                    <p>
                        Aspiring Software Engineer | Cybersecurity Specialist | AI Engineer
                    </p>
                    <p>
                        Final Year Diploma Student in Applications Development | Regional Finalist in Huawei 2024-2025
                        ICT
                        Competition
                    </p>
                    <a href="#contact" className="hero-button">Get in Touch</a>
                </header>


                <section id="about" className="about-section">
                    <h2>About Me</h2>
                    <div className="about-content">
                        <div className="about-image">
                            <img src={tshepoImg} alt="Tshepo Maleo"/>
                        </div>
                        <div className="about-text">
                            <p>
                                I’m a final-year Diploma student in Application Development at CPUT,
                                previously completed a Higher Certificate in ICT.
                                I'm passionate about becoming a <strong>Software Engineer</strong>,
                                <strong> Cybersecurity Specialist</strong>, and <strong>AI Engineer</strong>.
                                I’ve participated as a regional finalist in the Huawei ICT Competition
                                (Computing Track), working with <em>openEuler, openGauss</em>, and <em>Kunpeng</em>.
                                My journey is also backed by certifications from <strong>Harvard (CS50)</strong>,
                                <strong> Microsoft (Azure AI Fundamentals)</strong>, and <strong>Huawei Cloud
                                Advanced</strong>.
                            </p>
                        </div>
                    </div>
                </section>


                <section id="projects" className="project-section">
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
                                architecture,
                                and web development. Throughout the course, I worked with languages including C, Python,
                                SQL, and JavaScript, building problem-solving skills that are crucial for tackling
                                complex
                                software challenges. The course also emphasized the importance of efficient coding
                                practices,
                                memory management, and security concepts.
                            </p>
                            <p><strong>Skills:</strong> Problem solving, data structures, algorithms, debugging, web
                                development.</p>
                            <a href="https://cs50.harvard.edu/certificates/c603cf04-1d89-49c5-bb5e-5366eaddcd58"
                               className="link-button"
                               target="_blank" rel="noopener noreferrer">
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
                            <p><strong>Skills:</strong> AI workloads, ML models, computer vision, natural language
                                processing, responsible AI.</p>
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
                            <p><strong>Skills:</strong> Cloud architecture, microservices, security, scalability, Huawei
                                Cloud services.</p>
                            <a href="https://www.credly.com/badges/7fb2264b-ee19-45fc-87d1-9e65f2fae0e4/linked_in_profile"
                               className="link-button" target="_blank" rel="noopener noreferrer">
                                View Certificate
                            </a>
                        </div>

                    </div>
                </section>


                <section id="contact" className="contact-section">
                    <h2>Contact Me</h2>

                    <p>Feel free to reach out to me if you have any questions, collaborations, or just want to
                        connect!</p>

                    <form className="contact-form" method="POST">
                        <div className="form-group">
                            <label htmlFor="name">Name:</label>
                            <input type="text" id="name" name="name" required/>
                        </div>

                        <div className="form-group">
                            <label htmlFor="subject">Subject:</label>
                            <input type="text" id="subject" name="subject" required/>
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
                            <a href="https://www.linkedin.com/in/lorens-tshepo-maleo-2533b04a/" target="_blank" rel="noopener noreferrer">
                                <FaLinkedin/>
                            </a>
                            <a href="https://github.com/tshepo32" target="_blank" rel="noopener noreferrer">
                                <FaGithub/>
                            </a>
                        </div>
                        <p>&copy; {new Date().getFullYear()} Lorens Tshepo Maleo. All rights reserved.</p>
                    </div>
                </footer>
            </div>
        </>
    );
}

export default Home;
