import Navbar from './Components/Navbar.jsx';
import AuthNavbar from './Components/AuthNavbar.jsx';
import { Footer } from './Components/Footer.jsx';
import { Outlet, useLocation } from 'react-router-dom';
import './App.css';
import { useAuth } from './context/AuthContext.jsx';

function App() {
    const location = useLocation();
    const { isAuthenticated } = useAuth();

    const authPaths = [
        '/dashboard',
        '/profile',
        '/profile/edit',
        '/growth-tracker',
        '/appointments'
    ];

    const isAuthArea = authPaths.some((path) => location.pathname.startsWith(path));
    const showAuthNavbar = isAuthenticated && isAuthArea;

    return (
        <>
            {showAuthNavbar ? <AuthNavbar /> : <Navbar />}
            <main>
                <Outlet />
            </main>
            <Footer />
        </>
    );
}

export default App;
