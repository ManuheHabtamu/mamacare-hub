import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import logo from "../assets/logo.png";
import "../stylesheets/AuthNavbar.css";

const AuthNavbar = () => {
    // 1. Hooks (Auth for logging out, Navigate for moving pages)
    const { logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout(); // Clear the tokens
        navigate("/"); // Send user back to landing page
    };

    return (
        <nav className="auth-navbar">
            {/* Logo Link to Dashboard */}
            <Link to="/dashboard" className="auth-logo">
                <img src={logo} alt="MamaCare Hub" />
                <span>MamaCare Hub</span>
            </Link>

            {/* Authenticated Links Area */}
            <div className="auth-links">
                <Link to="/dashboard">Dashboard</Link>
                <Link to="/appointments">Appointments</Link>
                <Link to="/growth-tracker">Baby Growth</Link>
                <Link to="/profile">Profile</Link>
            </div>

            {/* Logout Action */}
            <button className="auth-logout" onClick={handleLogout}>
                Logout
            </button>
        </nav>
    );
};

export default AuthNavbar;
