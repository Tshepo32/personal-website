import React, { useState } from 'react';
import './Navbar.css';

function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => setIsOpen(!isOpen);
    const closeMenu = () => setIsOpen(false);

    return (
        <nav className="navbar">
            <div className="navbar-brand">
                <h1>Tshepo Maleo</h1>
                <div className="hamburger" onClick={toggleMenu}>
                    &#9776;
                </div>
            </div>
            <ul className={`nav-links ${isOpen ? 'open' : ''}`}>
                <li><a href="#home" onClick={closeMenu}>Home</a></li>
                <li><a href="#about" onClick={closeMenu}>About</a></li>
                <li><a href="#projects" onClick={closeMenu}>Projects</a></li>
                <li><a href="#certifications" onClick={closeMenu}>Certifications</a></li>
                <li><a href="#contact" onClick={closeMenu}>Contact</a></li>
            </ul>
        </nav>
    );
}

export default Navbar;
