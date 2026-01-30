import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ProfileEdit from "./ProfileEdit";
import { useAuth } from "../../context/AuthContext.jsx";
import api from "../../utils/api.js";
import "../../stylesheets/Dashboard.css";

function Dashboard() {
    const { user } = useAuth();
    const [showEditModal, setShowEditModal] = useState(false);
    const [profile, setProfile] = useState(null);
    const [reminders, setReminders] = useState([]);
    const [appointments, setAppointments] = useState([]);
    const [tips, setTips] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const profileRes = await api.get("/pregnancy");
                const remindersRes = await api.get("/reminders");
                const appointmentsRes = await api.get("/appointments");
                const tipsRes = await api.get("/healthtips");

                setProfile(profileRes.data || null);
                setReminders(remindersRes.data || []);
                setAppointments(appointmentsRes.data || []);
                setTips(tipsRes.data || []);
            } catch (err) {
                console.error("Failed to load dashboard data", err);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const handleProfileSave = async (payload) => {
        try {
            const response = await api.post("/pregnancy", {
                userId: user?._id,
                ...payload,
            });
            setProfile(response.data || null);
            setShowEditModal(false);
        } catch (err) {
            console.error("Failed to update pregnancy profile", err);
        }
    };

    if (loading) {
        return (
            <div className="dashboard-container">
                <h1>Loading Dashboard...</h1>
            </div>
        );
    }

    const safeUser = user || { firstName: "Guest", lastName: "" };
    const pregnancyWeek = profile?.currentWeek || 24;
    const dueDate = profile?.dueDate ? new Date(profile.dueDate).toDateString() : "October 15, 2026";
    const reminder = reminders[0];
    const appointment = appointments[0];
    const tip = tips[0];

    return (
        <div className="dashboard-container">
            {/* Header */}
            <div className="dashboard-header">
                <div className="header-left">
                    <h1>Welcome back, {safeUser.firstName} {safeUser.lastName}</h1>
                    <p>{new Date().toDateString()} • Week {pregnancyWeek}</p>
                </div>
                <div className="header-right">
                    <button onClick={() => setShowEditModal(true)}>Update Week</button>
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
                            <p>{appointment ? `${new Date(appointment.date).toDateString()} • ${appointment.time}` : "Add your next appointment"}</p>
                        </div>
                    </div>
                    <div className="essential-item">
                        <div className="time-badge">{reminder?.time || "2:00 PM"}</div>
                        <div className="item-content">
                            <h4>{reminder?.title || "Medication Reminder"}</h4>
                            <p>{reminder?.details || "Add your reminders"}</p>
                        </div>
                    </div>
                    <div className="essential-item">
                        <div className="time-badge">Tip</div>
                        <div className="item-content">
                            <h4>{tip?.title || "Stay Hydrated"}</h4>
                            <p className="muted-text">{tip?.summary || "Drink at least 8 glasses of water today."}</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Quick Actions */}
            <div className="dashboard-section">
                <h2 className="section-title">Quick Actions</h2>
                <div className="actions-grid">
                    <Link to="/appointments" className="action-btn secondary">
                        <span className="action-icon">📅</span>
                        <span className="action-text">Manage Appointments</span>
                    </Link>
                    <a href="tel:+251945545667" className="action-btn primary">
                        <span className="action-icon">🆘</span>
                        <span className="action-text">Emergency Call</span>
                    </a>
                    <button className="action-btn secondary" onClick={() => alert("Symptom Logging coming soon!")}>
                        <span className="action-icon">📝</span>
                        <span className="action-text">Log Symptoms</span>
                    </button>
                    <Link to="/growth-tracker" className="action-btn secondary">
                        <span className="action-icon">👶</span>
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
                        <p className="muted-text">{tip?.summary || "The baby handles voices now! Try reading aloud."}</p>
                    </div>

                    <div className="card health-stat-card">
                        <div className="stat-icon">🍎</div>
                        <h4>Nutrition Tip</h4>
                        <p className="muted-text">Eat iron-rich foods daily.</p>
                    </div>

                    <div className="card health-stat-card">
                        <div className="stat-icon">🚶‍♀️</div>
                        <h4>Walking Steps</h4>
                        <p className="muted-text">Goal: 5,000 steps</p>
                    </div>
                </div>
            </div>

            {/* Community & Support */}
            <div className="dashboard-section">
                <div className="community-banner">
                    <h3>Community & Support</h3>
                    <p>You're not alone in this journey.</p>
                    <div className="community-buttons">
                        <button className="community-btn" onClick={() => alert("Community Forums coming soon!")}>Join Forums</button>
                        <Link to="/contact"><button className="community-btn">Ask a Professional</button></Link>
                    </div>
                </div>
            </div>

            {/* Edit Modal */}
            {showEditModal && (
                <ProfileEdit
                    pregnancyWeek={pregnancyWeek}
                    dueDate={dueDate}
                    startDate={profile?.startDate}
                    onSave={handleProfileSave}
                    onClose={() => setShowEditModal(false)}
                />
            )}
        </div>
    );
}

export default Dashboard;
