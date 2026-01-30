import React, { useState } from "react";
import { Link } from "react-router-dom";
import ButtonPrimary from "./Button.jsx";
import ButtonSecondary from "./ButtonSecondary.jsx";
import logo from "../assets/logo.png";
import "../stylesheets/Navbar.css";

const Navbar = () => {
    // 1. State for the mobile menu (Open or Closed)
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <nav className="navbar">
            {/* --- LOGO SECTION --- */}
            <div className="nav-logo">
                <Link to="/">
                    <img src={logo} alt="MamaCare Hub" className="nav-logo-img" />
                    <span className="nav-logo-text">MamaCare Hub</span>
                </Link>
            </div>

            {/* --- MOBILE HAMBURGER BUTTON --- */}
            <div className={`hamburger ${isOpen ? "active" : ""}`} onClick={toggleMenu}>
                <span className="bar"></span>
                <span className="bar"></span>
                <span className="bar"></span>
            </div>

            {/* --- NAVIGATION LINKS --- */}
            <ul className={`nav-links ${isOpen ? "show" : ""}`}>
                <li><a href="/#about">About Us</a></li>
                <li><a href="/#services">Services</a></li>
                <li><Link to="/contact">Contact</Link></li>
            </ul>

            {/* --- AUTH BUTTONS --- */}
            <div className={`nav-btns ${isOpen ? "show" : ""}`}>
                <Link to="/signup"><ButtonPrimary text="Sign Up" /></Link>
                <Link to="/login"><ButtonSecondary text="Login" /></Link>
            </div>
        </nav>
    );
};

export default Navbar;
