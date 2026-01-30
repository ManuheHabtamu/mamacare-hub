import '../stylesheets/Footer.css'
import { FaFacebookF, FaInstagram, FaWhatsapp, FaTelegramPlane } from "react-icons/fa";

export const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-container">
                <div className="footer-desc">
                    <h2 className="footer-logo">MamaCare Hub</h2>
                    <p className="footer-tag">Empowering mothers and mothers-to-be with comprehensive care.</p>
                </div>

                <div className="footer-column">
                    <h3>MENU</h3>
                    <ul>
                        <li><a href="/">HOME</a></li>
                        <li><a href="/#about">ABOUT US</a></li>
                        <li><a href="/#services">SERVICES</a></li>
                    </ul>
                </div>

                <div className="footer-column">
                    <h3>ADDRESS</h3>
                    <p>5 kilo, CTBE</p>
                    <p>Addis Ababa, Ethiopia</p>
                </div>

                <div className="footer-column">
                    <h3>CONTACTS</h3>
                    <p><strong>Phone:</strong><br /> +251 (0) 945-545-667</p>
                    <p>
                        <strong>E-mail:</strong><br />
                        <a href="mailto:info@mamacarehub.org">info@mamacarehub.org</a>
                    </p>

                    <div className="footer-connect">
                        <p className="connect-text">We could also connect via:</p>
                        <div className="social-icons">
                            <a href="#" className="icon-circle"><FaFacebookF /></a>
                            <a href="#" className="icon-circle"><FaInstagram /></a>
                            <a href="https://wa.me/251945545667" className="icon-circle"><FaWhatsapp /></a>
                            <a href="#" className="icon-circle"><FaTelegramPlane /></a>
                        </div>
                    </div>
                </div>
            </div>

            <div className="footer-bottom">
                <p>MamaCare Hub © Copyright 2026 - All rights reserved.</p>
            </div>
        </footer>
    );
};