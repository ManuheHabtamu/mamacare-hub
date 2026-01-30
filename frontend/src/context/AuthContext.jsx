import { createContext, useContext, useEffect, useState } from "react";

// 1. Create the Context (The "Radio Station")
const AuthContext = createContext();

// 2. The Provider (The "Broadcast Tower")
export function AuthProvider({ children }) {
    // --- STATE (Memory for login info) ---
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);
    const [loading, setLoading] = useState(true);

    // --- EFFECTS (Check if user is already logged in) ---
    useEffect(() => {
        const savedUser = localStorage.getItem("user");
        const savedToken = localStorage.getItem("token");

        if (savedUser && savedToken) {
            setUser(JSON.parse(savedUser));
            setToken(savedToken);
        }
        setLoading(false);
    }, []);

    // --- ACTIONS (Login, Logout, Update) ---

    // Call this when user submits login form
    const login = (userData, token) => {
        setUser(userData);
        setToken(token);
        localStorage.setItem("user", JSON.stringify(userData));
        localStorage.setItem("token", token);
    };

    // Call this to log out
    const logout = () => {
        setUser(null);
        setToken(null);
        localStorage.removeItem("user");
        localStorage.removeItem("token");
    };

    // Call this to update user profile info
    const updateUser = (userData) => {
        setUser(userData);
        localStorage.setItem("user", JSON.stringify(userData));
    };

    // --- RENDER (Providing the data to the whole app) ---
    return (
        <AuthContext.Provider
            value={{ user, token, login, logout, updateUser, loading, isAuthenticated: !!token }}
        >
            {children}
        </AuthContext.Provider>
    );
}

// 3. Custom Hook (The "Receiver" - easiest way to use the info)
export function useAuth() {
    return useContext(AuthContext);
}
