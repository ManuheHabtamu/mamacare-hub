import React from 'react';
import '../stylesheets/NavbarMinimal.css';
import logo from '../assets/logo.png';
import { Link } from 'react-router-dom';

const NavbarMinimal = () => {
    return (
        <nav className="navbar-minimal">
            <Link to="/" className="nav-minimal-logo">
                <img src={logo} alt="MamaCare Logo" />
                <span>MamaCare</span>
            </Link>
            <Link to="/" className="nav-minimal-home">Home</Link>
        </nav>
    );
};

export default NavbarMinimal;
