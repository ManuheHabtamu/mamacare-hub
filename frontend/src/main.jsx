import "./index.css";
import React from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

// Pages
import App from "./App.jsx";
import Landing from "./pages/Landing.jsx";
import Contact from "./pages/Contact.jsx";
import Auth from "./pages/Auth.jsx";
import Dashboard from "./pages/Authenticated/Dashboard.jsx";
import Profile from "./pages/Authenticated/Profile.jsx";
import BabyGrowthTracker from "./pages/Authenticated/BabyGrowthTracker.jsx";
import Appointments from "./pages/Authenticated/Appointments.jsx";

// Protection from No login
import ProtectedRoute from "./Routes/ProtectedRoute.jsx";
// Context to check uthentication
import { AuthProvider } from "./context/AuthContext.jsx";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            { index: true, element: <Landing /> },
            { path: "contact", element: <Contact /> },
            {
                path: "dashboard",
                element: (
                    <ProtectedRoute>
                        <Dashboard />
                    </ProtectedRoute>
                )
            },
            {
                path: "profile",
                element: (
                    <ProtectedRoute>
                        <Profile />
                    </ProtectedRoute>
                )
            },
            {
                path: "growth-tracker",
                element: (
                    <ProtectedRoute>
                        <BabyGrowthTracker />
                    </ProtectedRoute>
                )
            },
            {
                path: "appointments",
                element: (
                    <ProtectedRoute>
                        <Appointments />
                    </ProtectedRoute>
                )
            }
        ]
    },
    // Auth pages — no layout / no App
    { path: "/auth", element: <Auth /> },
    { path: "/login", element: <Auth /> },
    { path: "/signup", element: <Auth /> },
    { path: "*", element: <h1>NOT FOUND</h1> }
]);

createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <AuthProvider>
            <RouterProvider router={router} />
        </AuthProvider>
    </React.StrictMode>
);
