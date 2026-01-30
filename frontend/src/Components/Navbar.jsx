import React, { useState } from "react"; // Added useState
import ButtonPrimary from "./Button.jsx";
import ButtonSecondary from "./ButtonSecondary.jsx";
import "../stylesheets/Navbar.css";
import logo from "../assets/logo.png";
import { Link } from "react-router-dom";

const Navbar = () => {
    // State to track if the menu is open or closed
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <nav className="navbar">
            <div className="nav-logo">
                <Link to="/">
                    <img src={logo} alt="MamaCare Hub" className="nav-logo-img" />
                    <span className="nav-logo-text">MamaCare Hub</span>
                </Link>
            </div>

            {/* Hamburger Icon */}
            <div className={`hamburger ${isOpen ? "active" : ""}`} onClick={toggleMenu}>
                <span className="bar"></span>
                <span className="bar"></span>
                <span className="bar"></span>
            </div>

            {/* Added dynamic class based on state */}
            <ul className={`nav-links ${isOpen ? "show" : ""}`}>
                <li>
                    <a href="/#about">About Us</a>
                </li>
                <li>
                    <a href="/#services">Services</a>
                </li>
                <li>
                    <Link to="/contact">Contact</Link>
                </li>
            </ul>

            <div className={`nav-btns ${isOpen ? "show" : ""}`}>
                <Link to="/signup">
                    <ButtonPrimary text="Sign Up" />
                </Link>
                <Link to="/login">
                    <ButtonSecondary text="Login" />
                </Link>
            </div>
        </nav>
    );
};

export default Navbar;
