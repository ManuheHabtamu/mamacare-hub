import React from "react"; // Added React import
import { Link } from "react-router-dom";
import ButtonPrimary from "../Components/Button.jsx";
import ButtonSecondary from "../Components/ButtonSecondary.jsx";
import "../stylesheets/Landing.css";
import mother from "../assets/mother-reading.webp";
import hospital1 from "../assets/hospital_logo1.png";
import hospital2 from "../assets/hospital_logo2.png";
import hospital3 from "../assets/hospital_logo3.png";
import hospital4 from "../assets/hospital_logo4.png";
import hospital5 from "../assets/hospital_logo5.png";

import prenatal from "../assets/prenatal.webp";
import postnatal from "../assets/postnatal.webp";
import support from "../assets/support.jpg";

import confid from "../assets/confid.jpg";
import community from "../assets/commun.jpg";
import health from "../assets/healthcha.jpg";
import launch from "../assets/launch.jpg";

const Landing = () => {
    return (
        <>
            <div className={"main-container"}>
                <section className="Hero">
                    <div className="hero-content">
                        <h1>Welcome to MamaCare Hub</h1>
                        <p>
                            Your trusted Companion for pregnancy information, health tips, and
                            emotional support. We're here to walk with you every step of the way
                            toward a safe, joyful, and confident journey into motherhood.
                        </p>
                        <div className="hero-btns">
                            <Link to="/contact">
                                <ButtonPrimary text="Get Free Consultation Now" />
                            </Link>
                            <Link to="/signup">
                                <ButtonSecondary text="Join Our Community" />
                            </Link>
                        </div>
                    </div>

                    <div className="hero-image">
                        <img src={mother} alt="Mother and baby" />
                    </div>
                </section>
                {/* Quick Stats / Trust Builders Section */}
                <section className="trust-builders">
                    <div className="trust-grid">
                        <div className="trust-card">
                            <div className="trust-image-container">
                                <img src={launch} alt="Location Icon" className="trust-img" />
                            </div>
                            <h4>Launching Soon</h4>
                            <p>Weekly free sessions for mothers & families in Addis Ababa.</p>
                        </div>

                        <div className="trust-card">
                            <div className="trust-image-container">
                                <img src={community} alt="Community Icon" className="trust-img" />
                            </div>
                            <h4>Community-Driven</h4>
                            <p>Built by and for Ethiopian mothers to ensure relevant care.</p>
                        </div>

                        <div className="trust-card">
                            <div className="trust-image-container">
                                <img src={confid} alt="Confidential Icon" className="trust-img" />
                            </div>
                            <h4>100% Confidential</h4>
                            <p>A safe, supportive space for your unique journey.</p>
                        </div>

                        <div className="trust-card">
                            <div className="trust-image-container">
                                <img src={health} alt="Health Icon" className="trust-img" />
                            </div>
                            <h4>Health Champions</h4>
                            <p>Partnering with local clinics and midwife connections.</p>
                        </div>
                    </div>
                </section>

                {/* Hospital Partners Row */}
                <section className="hospital-row-section">
                    <h3 className="section-title">Our Soon to be Partners & Hospital Network</h3>
                    <div className="hospital-container">
                        <img src={hospital1} alt="Hospital 1" className="hospital-logo" />
                        <img src={hospital2} alt="Hospital 2" className="hospital-logo" />
                        <img src={hospital3} alt="Hospital 3" className="hospital-logo" />
                        <img src={hospital4} alt="Hospital 4" className="hospital-logo" />
                        <img src={hospital5} alt="Hospital 5" className="hospital-logo" />
                    </div>
                </section>

                {/* Services Section (Removed the nested function and export) */}
                <section id="services" className="services-section">
                    <h2 className="services-title">Our Maternal & Family Care Services</h2>

                    <div className="service-row">
                        <div className="service-image">
                            <img src={prenatal} alt="Prenatal Care" />
                        </div>
                        <div className="service-content">
                            <h3>Prenatal Care</h3>
                            <p>
                                Personalized check-ups, nutrition advice, and emotional support for
                                a healthy pregnancy.
                            </p>
                            <Link to="/contact" className="service-link">
                                Learn More →
                            </Link>
                        </div>
                    </div>

                    <div className="service-row">
                        <div className="service-image">
                            <img src={postnatal} alt="Postnatal Care" />
                        </div>
                        <div className="service-content">
                            <h3>Postnatal & Newborn Care</h3>
                            <p>
                                Expert recovery guidance, breastfeeding support, and newborn health
                                monitoring.
                            </p>
                            <Link to="/contact" className="service-link">
                                Learn More →
                            </Link>
                        </div>
                    </div>

                    <div className="service-row">
                        <div className="service-image">
                            <img src={support} alt="Family Support" />
                        </div>
                        <div className="service-content">
                            <h3>Family & Community Support</h3>
                            <p>
                                Group sessions, peer connections, and family wellness workshops for
                                stronger bonds.
                            </p>
                            <Link to="/contact" className="service-link">
                                Learn More →
                            </Link>
                        </div>
                    </div>
                </section>

                {/* How MamaCare Works Section */}
                <section className="how-it-works">
                    <div className="section-header">
                        <h2>How MamaCare Works</h2>
                        <p>Your journey to supported motherhood in three simple steps.</p>
                    </div>
                    <div className="steps-container">
                        <div className="step-card">
                            <div className="step-number">1</div>
                            <h3>Sign Up or Join Free</h3>
                            <p>Create your account in 1 minute – no cost to start.</p>
                        </div>
                        <div className="step-card">
                            <div className="step-number">2</div>
                            <h3>Choose Your Support</h3>
                            <p>Explore resources, tips, and community support.</p>
                        </div>
                        <div className="step-card">
                            <div className="step-number">3</div>
                            <h3>Thrive Together</h3>
                            <p>
                                Get ongoing care, connect with other mothers, and feel supported
                                every day.
                            </p>
                        </div>
                    </div>
                </section>

                <section id="about" className="about-us">
                    <h2>About Us</h2>
                    <p>
                        MamaCare Hub was founded to support mothers and families with compassionate,
                        community-based care in Ethiopia. We believe every mother deserves expert
                        guidance, emotional support, and a strong network — without judgment or high
                        costs, ensuring she never walks alone.
                    </p>
                </section>

                <section className="final-cta">
                    <div className="cta-container">
                        <h2>Ready to Start Your Journey?</h2>
                        <p>Get Free Consultation or Join Our Support Community Today</p>
                        <div className="cta-buttons">
                            <Link to="/signup">
                                <ButtonPrimary text="Sign Up Free" />
                            </Link>
                            <Link to="/contact" className="cta-secondary-link">
                                <ButtonSecondary text="Contact Us" />
                            </Link>
                        </div>
                    </div>
                </section>
            </div>
        </>
    );
};

export default Landing;
