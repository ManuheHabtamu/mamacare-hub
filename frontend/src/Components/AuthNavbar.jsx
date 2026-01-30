import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import logo from "../assets/logo.png";
import "../stylesheets/AuthNavbar.css";

const AuthNavbar = () => {
    const { logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/");
    };

    return (
        <nav className="auth-navbar">
            <Link to="/dashboard" className="auth-logo">
                <img src={logo} alt="MamaCare Hub" />
                <span>MamaCare Hub</span>
            </Link>

            <div className="auth-links">
                <Link to="/dashboard">Dashboard</Link>
                <Link to="/appointments">Appointments</Link>
                <Link to="/growth-tracker">Baby Growth</Link>
                <Link to="/profile">Profile</Link>
            </div>

            <button className="auth-logout" onClick={handleLogout}>
                Logout
            </button>
        </nav>
    );
};

export default AuthNavbar;
