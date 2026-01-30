import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "../stylesheets/Auth.css";
import NavbarMinimal from "../Components/NavbarMinimal.jsx";
import { useAuth } from "../context/AuthContext.jsx";
import api from "../utils/api.js";

const Auth = () => {
    const location = useLocation();
    const [isLogin, setIsLogin] = useState(location.pathname !== "/signup");
    const navigate = useNavigate();

    const { login } = useAuth();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: ""
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        if (!formData.email || !formData.password) {
            setError("Email and password are required.");
            return;
        }

        try {
            if (isLogin) {
                // Login
                setLoading(true);
                const response = await api.post("/auth/login", {
                    email: formData.email,
                    password: formData.password
                });

                login(response.data.user, response.data.token);
                navigate("/dashboard");
            } else {
                // Sign Up
                if (formData.password !== formData.confirmPassword) {
                    setError("Passwords do not match.");
                    return;
                }

                setLoading(true);

                await api.post("/users", {
                    firstName: formData.firstName,
                    lastName: formData.lastName,
                    email: formData.email,
                    password: formData.password
                });

                const response = await api.post("/auth/login", {
                    email: formData.email,
                    password: formData.password
                });
                login(response.data.user, response.data.token);
                navigate("/dashboard");
            }
        } catch (err) {
            setError(err?.response?.data?.error || "Authentication failed.");
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="page">
            <NavbarMinimal />
            <div className="card">
                <h2 className="title">{isLogin ? "Login" : "Sign Up"}</h2>

                {/* Toggle Buttons */}
                <div className="toggle">
                    <button
                        onClick={() => setIsLogin(false)}
                        className={isLogin ? "toggle-btn" : "toggle-btn active"}
                    >
                        Sign Up
                    </button>

                    <button
                        onClick={() => setIsLogin(true)}
                        className={isLogin ? "toggle-btn active" : "toggle-btn"}
                    >
                        Login
                    </button>
                </div>

                {/* Form */}
                <form className="form" onSubmit={handleSubmit}>
                    {!isLogin && (
                        <div className="name-row">
                            <div className="input-group">
                                <label>First Name</label>
                                <input
                                    type="text"
                                    name="firstName"
                                    placeholder="First Name"
                                    className="input"
                                    value={formData.firstName}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="input-group">
                                <label>Last Name</label>
                                <input
                                    type="text"
                                    name="lastName"
                                    placeholder="Last Name"
                                    className="input"
                                    value={formData.lastName}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </div>
                    )}

                    <div className="input-group">
                        <label>Email Address</label>
                        <input
                            type="email"
                            name="email"
                            placeholder="email@example.com"
                            className="input"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="input-group">
                        <label>Password</label>
                        <input
                            type="password"
                            name="password"
                            placeholder="••••••••"
                            className="input"
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    {!isLogin && (
                        <div className="input-group">
                            <label>Confirm Password</label>
                            <input
                                type="password"
                                name="confirmPassword"
                                placeholder="••••••••"
                                className="input"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    )}

                    {isLogin && <p className="forgot">Lost Password? Click Here</p>}

                    {error && (
                        <p className="forgot" style={{ color: "#dc2626" }}>
                            {error}
                        </p>
                    )}

                    <button type={"submit"} className="submit btnPrimary" disabled={loading}>
                        {loading ? "Please wait..." : isLogin ? "Confirm Login" : "Confirm Sign Up"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Auth;
