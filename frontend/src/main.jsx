import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import './index.css'
import App from './App.jsx'
import Contact from "./pages/Contact.jsx";
import Auth from "./pages/Auth.jsx";
import Dashboard from "./pages/Authenticated/Dashboard.jsx";
import Profile from "./pages/Authenticated/Profile.jsx";
import ProfileEdit from "./pages/Authenticated/ProfileEdit.jsx";
import ProtectedRoute from "./Routes/ProtectedRoute.jsx";
import BabyGrowthTracker from "./pages/Authenticated/BabyGrowthTracker.jsx";
import Appointments from "./pages/Authenticated/Appointments.jsx";

import Landing from "./pages/Landing.jsx";

const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
            { index: true, element: <Landing /> },
            { path: 'contact', element: <Contact /> },
            {
                path: 'dashboard',
                element: (
                    <ProtectedRoute>
                        <Dashboard />
                    </ProtectedRoute>
                )
            },
            {
                path: 'profile',
                element: (
                    <ProtectedRoute>
                        <Profile />
                    </ProtectedRoute>
                )
            },
            {
                path: 'profile/edit',
                element: (
                    <ProtectedRoute>
                        <ProfileEdit />
                    </ProtectedRoute>
                )
            },
            {
                path: 'growth-tracker',
                element: (
                    <ProtectedRoute>
                        <BabyGrowthTracker />
                    </ProtectedRoute>
                )
            },
            {
                path: 'appointments',
                element: (
                    <ProtectedRoute>
                        <Appointments />
                    </ProtectedRoute>
                )
            }
        ]
    },
    { path: '/auth', element: <Auth /> },
    { path: '/login', element: <Auth /> },
    { path: '/signup', element: <Auth /> },
]);

import { AuthProvider } from "./context/AuthContext.jsx";

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <AuthProvider>
            <RouterProvider router={router} />
        </AuthProvider>
    </StrictMode>
);
