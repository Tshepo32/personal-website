import React, { useState } from 'react';
import './Navbar.css';
import { Link } from 'react-router-dom';

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
                <li><a href="/personal-website" onClick={closeMenu}>Home</a></li>
                <li><a href="/personal-website/#about" onClick={closeMenu}>About</a></li>
                <li><Link to="/blog" onClick={closeMenu}>Blog</Link></li>
                <li><a href="/personal-website/#certifications" onClick={closeMenu}>Certifications</a></li>
                <li><a href="/personal-website/#contact" onClick={closeMenu}>Contact</a></li>
                <li><Link to="/admin/login" onClick={closeMenu}></Link></li>
            </ul>
        </nav>
    );
}

export default Navbar;
