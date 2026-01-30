import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "../stylesheets/Auth.css";
import NavbarMinimal from "../Components/NavbarMinimal.jsx";
import { useAuth } from "../context/AuthContext.jsx";
import api from "../utils/api.js";

const Auth = () => {
    // 1. Hooks & State
    const [isLogin, setIsLogin] = useState(true);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [formData, setFormData] = useState({
        firstName: "", lastName: "", email: "", password: "", confirmPassword: ""
    });

    const navigate = useNavigate();
    const { login } = useAuth();

    // 2. Handlers
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();//avoids reload
        setError("");
        setLoading(true);

        try {
            if (isLogin) {
                // LOGIN FLOW
                const res = await api.post("/auth/login", {
                    email: formData.email,
                    password: formData.password
                });
                login(res.data.user, res.data.token);
                navigate("/dashboard");
            } else {
                // SIGNUP FLOW
                if (formData.password !== formData.confirmPassword) {
                    throw new Error("Passwords do not match.");
                }
                await api.post("/users", formData);
                const res = await api.post("/auth/login", {
                    email: formData.email,
                    password: formData.password
                });
                login(res.data.user, res.data.token);
                navigate("/dashboard");
            }
        } catch (err) {
            setError(err?.response?.data?.error || err.message);
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
                    <button onClick={() => setIsLogin(false)} className={!isLogin ? "toggle-btn active" : "toggle-btn"}>Sign Up</button>
                    <button onClick={() => setIsLogin(true)} className={isLogin ? "toggle-btn active" : "toggle-btn"}>Login</button>
                </div>

                <form className="form" onSubmit={handleSubmit}>
                    {/* Only show Name fields during Signup */}
                    {!isLogin && (
                        <div className="name-row">
                            <div className="input-group">
                                <label>First Name</label>
                                <input name="firstName" value={formData.firstName} onChange={handleChange} className="input" required />
                            </div>
                            <div className="input-group">
                                <label>Last Name</label>
                                <input name="lastName" value={formData.lastName} onChange={handleChange} className="input" required />
                            </div>
                        </div>
                    )}

                    <div className="input-group">
                        <label>Email Address</label>
                        <input type="email" name="email" value={formData.email} onChange={handleChange} className="input" required />
                    </div>

                    <div className="input-group">
                        <label>Password</label>
                        <input type="password" name="password" value={formData.password} onChange={handleChange} className="input" required />
                    </div>

                    {!isLogin && (
                        <div className="input-group">
                            <label>Confirm Password</label>
                            <input type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} className="input" required />
                        </div>
                    )}

                    {error && <p className="error-message">{error}</p>}

                    <button type="submit" className="submit btnPrimary" disabled={loading}>
                        {loading ? "Processing..." : isLogin ? "Confirm Login" : "Confirm Sign Up"}
                    </button>
                    {isLogin && <p className="forgot">Lost Password? Click Here</p>}
                </form>
            </div>
        </div>
    );
};

export default Auth;
