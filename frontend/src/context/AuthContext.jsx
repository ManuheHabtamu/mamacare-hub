import { createContext, useContext, useEffect, useState } from "react";

// create the context
const AuthContext = createContext();

// provider component
export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);
    const [loading, setLoading] = useState(true);

    // runs once when the app loads
    useEffect(() => {
        const savedUser = localStorage.getItem("user");
        const savedToken = localStorage.getItem("token");

        if (savedUser && savedToken) {
            setUser(JSON.parse(savedUser));
            setToken(savedToken);
        }

        setLoading(false); //Done
    }, []);

    // login function
    const login = (userData, token) => {
        setUser(userData);
        setToken(token);

        localStorage.setItem("user", JSON.stringify(userData));
        localStorage.setItem("token", token);
    };

    // logout function
    const logout = () => {
        setUser(null);
        setToken(null);

        localStorage.removeItem("user");
        localStorage.removeItem("token");
    };

    // update user function (for profile updates)
    const updateUser = (userData) => {
        setUser(userData);
        localStorage.setItem("user", JSON.stringify(userData));
    };

    return (
        <AuthContext.Provider
            value={{ user, token, login, logout, updateUser, loading, isAuthenticated: !!token }}
        >
            {children}
        </AuthContext.Provider>
    );
}

// custom hook (clean + reusable)
export function useAuth() {
    return useContext(AuthContext);
}
