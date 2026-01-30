import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import ButtonPrimary from '../Components/Button.jsx';
import '../stylesheets/Contact.css';

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:3000/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                alert("Message sent successfully!");
                setFormData({ name: '', email: '', subject: '', message: '' });
            } else {
                alert("Failed to send message. Please try again.");
            }
        } catch (err) {
            alert("Network error. Please try again.");
            console.error(err);
        }
    };

    return (
        <>
            <div className="contact-hero">
                <h1>Contact Us</h1>
                <p>We'd love to hear from you</p>
            </div>

            <div className="contact-info-grid">
                {/* Card 1: Phone */}
                <div className="info-card">
                    <div className="info-circle-icon">📞</div>
                    <h3>Phone</h3>
                    <p>+1 (555) 123-4567</p>
                    <span>Mon-Fri 9am-5pm</span>
                </div>

                {/* Card 2: Email */}
                <div className="info-card">
                    <div className="info-circle-icon">✉️</div>
                    <h3>Email</h3>
                    <p>info@mamacarehub.org</p>
                    <span>24/7 Support</span>
                </div>

                {/* Card 3: Discord */}
                <div className="info-card">
                    <div className="info-circle-icon">💬</div>
                    <h3>Discord</h3>
                    <p><a href="YOUR_DISCORD_LINK_HERE" target="_blank" rel="noreferrer">Join Community</a></p>
                    <span>Active Support & Chat</span>
                </div>
            </div>

            <section className="contact-main">
                <div className="contact-container">
                    {/* Streamlined Contact Form */}
                    <div className="contact-form-wrapper">
                        <h2>Send us a Message</h2>
                        <form className="contact-form" onSubmit={handleSubmit}>
                            <label className="form-label">Name</label>
                            <input type="text" name="name" className="input-field" value={formData.name} onChange={handleChange} required />

                            <label className="form-label">Email</label>
                            <input type="email" name="email" className="input-field" value={formData.email} onChange={handleChange} required />

                            <label className="form-label">Subject</label>
                            <input type="text" name="subject" className="input-field" value={formData.subject} onChange={handleChange} required />

                            <label className="form-label">Message</label>
                            <textarea
                                name="message"
                                className="input-field"
                                rows="6"
                                value={formData.message}
                                onChange={handleChange}
                                required
                            ></textarea>

                            <ButtonPrimary text="Send Message" type="submit" />
                        </form>
                        <div className="form-footer-links">
                            <p>Already a member? <Link to="/login">Login</Link> | New here? <Link to="/signup">Sign Up</Link></p>
                        </div>
                    </div>
                </div>

                {/* Full Width FAQ Section */}
                <div className="faq-section-wrapper">
                    <h2>Frequently Asked Questions</h2>
                    <div className="faq-accordion">
                        <details className="faq-item">
                            <summary>Are sessions free?</summary>
                            <div className="faq-content">
                                <p>Yes, our community groups are free. Individual consultations have small, affordable fees to support our specialist care team.</p>
                            </div>
                        </details>

                        <details className="faq-item">
                            <summary>How do I join sessions?</summary>
                            <div className="faq-content">
                                <p>Simply sign up for a free account and choose from our weekly in-person or online groups in the Services section.</p>
                            </div>
                        </details>

                        <details className="faq-item">
                            <summary>Is my information private?</summary>
                            <div className="faq-content">
                                <p>100% confidential. Your story and health data are fully secured and stays private between you and your care provider.</p>
                            </div>
                        </details>
                    </div>
                </div>


                {/* Final CTA */}
                <div className="contact-final-cta">
                    <h2>Ready to Join Our Community?</h2>
                    <p>Connect with other mothers and get the support you deserve.</p>
                    <Link to="/signup" className="cta-button">Join Us Today</Link>
                </div>
            </section>
        </>
    );
};

export default Contact;