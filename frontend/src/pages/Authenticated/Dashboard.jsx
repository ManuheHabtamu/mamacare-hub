import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaCalendarAlt, FaAmbulance, FaNotesMedical, FaBaby } from "react-icons/fa";
import { useAuth } from "../../context/AuthContext.jsx";
import api from "../../utils/api.js";
import "../../stylesheets/Dashboard.css";

function Dashboard() {
    const { user } = useAuth();
    const [profile, setProfile] = useState(null);

    const [appointments, setAppointments] = useState([]);
    const [weekData, setWeekData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // First get profile to know the week
                const profileRes = await api.get("/pregnancy");
                const currentProfile = profileRes.data || null;
                setProfile(currentProfile);

                const appointmentsRes = await api.get("/appointments");

                // Now get tips for the specific week if known
                const weekNum = currentProfile?.currentWeek || 24;

                setAppointments(appointmentsRes.data || []);

                // Fetch week-specific data
                const weeksRes = await api.get("/weeks");
                const allWeeks = weeksRes.data || [];
                const currentWeekInfo = allWeeks.find((w) => w.weekNumber === weekNum);
                setWeekData(currentWeekInfo);
            } catch (err) {
                console.error("Failed to load dashboard data", err);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) {
        return (
            <div className="dashboard-container">
                <h1>Loading Dashboard...</h1>
            </div>
        );
    }
    //Safe defaults if sth breaks
    const safeUser = user || { firstName: "Guest", lastName: "" };
    const pregnancyWeek = profile?.currentWeek || 24;
    const dueDate = profile?.dueDate
        ? new Date(profile.dueDate).toDateString()
        : "October 15, 2026";

    const appointment = appointments[0];

    return (
        <div className="dashboard-container">
            {/* Header */}
            <div className="dashboard-header">
                <div className="header-left">
                    <h1>
                        Welcome back, {safeUser.firstName} {safeUser.lastName}
                    </h1>
                    <p>
                        {new Date().toDateString()} • Week {pregnancyWeek}
                    </p>
                </div>
            </div>

            {/* Today's Essentials */}
            <div className="dashboard-section">
                <h2 className="section-title">Today's Essentials</h2>
                <div className="card essentials-card">
                    <div className="essential-item">
                        <div className="time-badge">{appointment?.time || "8:00 AM"}</div>
                        <div className="item-content">
                            <h4>{appointment?.description || "Prenatal Checkup"}</h4>
                            <p>
                                {appointment
                                    ? `${new Date(appointment.date).toDateString()} • ${appointment.time}`
                                    : "Add your next appointment"}
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Quick Actions */}
            <div className="dashboard-section">
                <h2 className="section-title">Quick Actions</h2>
                <div className="actions-grid">
                    <Link to="/appointments" className="action-btn secondary">
                        <span className="action-icon">
                            <FaCalendarAlt />
                        </span>
                        <span className="action-text">Manage Appointments</span>
                    </Link>
                    <a href="tel:+251945545667" className="action-btn primary">
                        <span className="action-icon">
                            <FaAmbulance />
                        </span>
                        <span className="action-text">Emergency Call</span>
                    </a>
                    <button
                        className="action-btn secondary"
                        onClick={() => alert("Symptom Logging coming soon!")}
                    >
                        <span className="action-icon">
                            <FaNotesMedical />
                        </span>
                        <span className="action-text">Log Symptoms</span>
                    </button>
                    <Link to="/growth-tracker" className="action-btn secondary">
                        <span className="action-icon">
                            <FaBaby />
                        </span>
                        <span className="action-text">Baby Growth</span>
                    </Link>
                </div>
            </div>

            {/* Health & Care */}
            <div className="dashboard-section">
                <h2 className="section-title">Health & Care</h2>
                <div className="health-grid">
                    <div className="card progress-card">
                        <h3>Your Pregnancy</h3>
                        <div className="week-display">
                            <div className="week-number">Week {pregnancyWeek}</div>
                            <div className="week-label">of 40 weeks</div>
                        </div>
                        <div className="progress-bar-container">
                            <div
                                className="progress-bar-fill"
                                style={{ width: `${(pregnancyWeek / 40) * 100}%` }}
                            />
                        </div>
                    </div>

                    {weekData && (
                        <div className="card info-card">
                            <h3>Baby Development</h3>
                            <div className="info-grid">
                                <div className="info-item">
                                    <span className="info-label">Current Size</span>
                                    <span className="info-value">{weekData.babySize}</span>
                                </div>
                                <div className="info-item">
                                    <span className="info-label">Weekly Focus</span>
                                    <span className="info-value">
                                        Trimester {weekData.trimester}
                                    </span>
                                </div>
                            </div>
                            <div className="nutrition-section">
                                <h4>Recommended Foods</h4>
                                <p className="food-tags">{weekData.recommendedFoods}</p>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Community & Support */}
            <div className="dashboard-section">
                <div className="community-banner">
                    <h3>Community & Support</h3>
                    <p>You're not alone in this journey.</p>
                    <div className="community-buttons">
                        <button
                            className="community-btn"
                            onClick={() => alert("Community Forums coming soon!")}
                        >
                            Join Forums
                        </button>
                        <Link to="/contact">
                            <button className="community-btn">Ask a Professional</button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;
