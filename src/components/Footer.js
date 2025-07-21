// src/components/Footer.jsx
import React from 'react';
import { FaLinkedin, FaGithub } from 'react-icons/fa';
import './Footer.css'; // We'll create this CSS file next

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-content">
                <div className="footer-icons">
                    <a href="https://www.linkedin.com/in/lorens-tshepo-maleo-2533b04a/" target="_blank"
                       rel="noopener noreferrer" aria-label="LinkedIn">
                        <FaLinkedin />
                    </a>
                    <a href="https://github.com/tshepo32" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                        <FaGithub />
                    </a>
                </div>
                <p>© {new Date().getFullYear()} Lorens Tshepo Maleo. All rights reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;