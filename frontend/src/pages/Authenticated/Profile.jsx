// Profile.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext.jsx';
import api from '../../utils/api.js';
import '../../stylesheets/Profile.css';

function Profile() {
    const { user } = useAuth();
    const [pregnancyData, setPregnancyData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProfileData = async () => {
            try {
                const response = await api.get('/pregnancy');
                setPregnancyData(response.data || null);
            } catch (err) {
                console.error("Failed to fetch pregnancy data", err);
            } finally {
                setLoading(false);
            }
        };

        fetchProfileData();
    }, []);

    if (loading) return <div className="profile-container"><h1>Loading Profile...</h1></div>;

    // Default user data fail-safe
    const safeUser = {
        firstName: user?.firstName || "Guest",
        lastName: user?.lastName || "",
        email: user?.email || "No email set",
        phone: user?.phone || "Not provided",
        location: pregnancyData?.location || "Not set",
        pregnancyWeek: pregnancyData?.currentWeek || 0,
        dueDate: pregnancyData?.dueDate ? new Date(pregnancyData.dueDate).toLocaleDateString() : "Not set",
        babyName: pregnancyData?.babyName || "Not set"
    };

    return (
        <div className="profile-container">
            {/* Header Card */}
            <div className="profile-header-card">
                <div className="user-info">
                    <div className="avatar">
                        {safeUser.firstName.charAt(0)}
                    </div>
                    <div className="user-details">
                        <h2>{safeUser.firstName} {safeUser.lastName}</h2>
                        <p>Expectant Mother (Week {safeUser.pregnancyWeek})</p>
                    </div>
                </div>
                <Link to="/profile/edit"><button className="edit-btn">Edit</button></Link>
            </div>

            {/* Contact Information */}
            <div className="profile-section">
                <h3 className="section-label">Contact Information</h3>
                <div className="info-card">
                    <div className="contact-grid">
                        <div className="contact-item">
                            <span className="contact-label">Email</span>
                            <span className="contact-value">{safeUser.email}</span>
                        </div>
                        <div className="contact-item">
                            <span className="contact-label">Phone</span>
                            <span className="contact-value">{safeUser.phone}</span>
                        </div>
                        <div className="contact-item">
                            <span className="contact-label">Location</span>
                            <span className="contact-value">{safeUser.location}</span>
                        </div>
                        <div className="contact-item">
                            <span className="contact-label">Blood Type</span>
                            <span className="contact-value">O+</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Pregnancy Details */}
            <div className="profile-section">
                <h3 className="section-label">Pregnancy Details</h3>
                <div className="stats-grid">
                    <div className="stat-box">
                        <span className="stat-icon">📅</span>
                        <span className="stat-value">{safeUser.dueDate}</span>
                        <span className="stat-label">Due Date</span>
                    </div>
                    <div className="stat-box highlight">
                        <span className="stat-value">{safeUser.pregnancyWeek}</span>
                        <span className="stat-label">Weeks Pregnant</span>
                    </div>
                    <div className="stat-box blue">
                        <span className="stat-value">{40 - safeUser.pregnancyWeek}</span>
                        <span className="stat-label">Weeks Remaining</span>
                    </div>
                </div>
            </div>

            {/* Baby Information */}
            <div className="profile-section">
                <h3 className="section-label">Baby Information</h3>
                <div className="stats-grid">
                    <div className="stat-box baby-box">
                        <span className="stat-value baby-name">{safeUser.babyName}</span>
                        <span className="stat-label">Baby Name</span>
                    </div>
                    <div className="stat-box">
                        <span className="stat-icon">🎂</span>
                        <span className="stat-value">August 2, 2026</span>
                        <span className="stat-label">Est. DOB</span>
                    </div>
                    <div className="stat-box blue">
                        <span className="stat-value">6 months</span>
                        <span className="stat-label">Go</span>
                    </div>
                </div>
            </div>

            {/* Prenatal Journey */}
            <div className="profile-section">
                <h3 className="section-label">Your Prenatal Journey</h3>
                <div className="journey-card">
                    <div className="journey-step completed">
                        <div className="step-icon">✅</div>
                        <div className="step-content">
                            <h4>First Trimester Complete</h4>
                            <p>Antenatal checkups and screenings completed successfully.</p>
                        </div>
                    </div>
                    <div className="journey-step active">
                        <div className="step-icon">🟡</div>
                        <div className="step-content">
                            <h4>Second Trimester In Progress</h4>
                            <p>Regular checkups weekly. Next: Anatomy Scan @ 20 weeks.</p>
                        </div>
                    </div>
                    <div className="journey-step upcoming">
                        <div className="step-icon">🔵</div>
                        <div className="step-content">
                            <h4>Baby Development</h4>
                            <p>Baby is responding to light and sound from outside the womb.</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* This Week's Summary */}
            <div className="profile-section">
                <h3 className="section-label">This Week's Summary</h3>
                <div className="summary-grid">
                    <div className="summary-item">
                        <div className="stat-value">{safeUser.pregnancyWeek}</div>
                        <div className="stat-label">Week No</div>
                    </div>
                    <div className="summary-item">
                        <div className="stat-value">12</div>
                        <div className="stat-label">Days to Go</div>
                    </div>
                    <div className="summary-item">
                        <div className="stat-value">14th</div>
                        <div className="stat-label">Next Visit</div>
                    </div>
                    <div className="summary-item">
                        <div className="stat-value">3</div>
                        <div className="stat-label">Checkups</div>
                    </div>
                </div>
            </div>

        </div>
    );
}

export default Profile;
