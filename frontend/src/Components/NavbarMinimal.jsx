import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
import "../stylesheets/NavbarMinimal.css";

const NavbarMinimal = () => {
    return (
        <nav className="navbar-minimal">
            {/* Simply shows the logo and a back home link */}
            <Link to="/" className="nav-minimal-logo">
                <img src={logo} alt="MamaCare Logo" />
                <span>MamaCare</span>
            </Link>

            <Link to="/" className="nav-minimal-home">
                Home
            </Link>
        </nav>
    );
};

export default NavbarMinimal;
