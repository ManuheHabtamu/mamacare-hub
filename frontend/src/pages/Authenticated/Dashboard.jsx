import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaCalendarAlt, FaAmbulance, FaNotesMedical, FaBaby } from "react-icons/fa";
import { useAuth } from "../../context/AuthContext.jsx";
import api from "../../utils/api.js";
import "../../stylesheets/Dashboard.css";

function Dashboard() {
    // 1. Data State (Where we store info from the database)
    const { user } = useAuth();
    const [profile, setProfile] = useState(null); //For pregnancy Profile
    const [appointments, setAppointments] = useState([]);//For appointments
    const [weekData, setWeekData] = useState(null);  //Stores weekly tips and info
    const [loading, setLoading] = useState(true);

    // 2. Fetching Logic (Runs once when you open the page)
    useEffect(() => {
        const loadAllDashboardData = async () => {
            try {
                // Fetch User Pregnancy Profile (Week Number)
                const profileRes = await api.get("/pregnancy");
                setProfile(profileRes.data);

                // Fetch Upcoming Appointments
                const apptsRes = await api.get("/appointments");
                setAppointments(apptsRes.data || []);

                // Get Weekly Tips based on current week
                const weekNum = profileRes.data?.currentWeek || 24;
                const weeksRes = await api.get("/weeks");
                const currentTip = weeksRes.data.find((w) => w.weekNumber === weekNum);
                setWeekData(currentTip);

            } catch (err) {
                console.error("Dashboard error:", err);
            } finally {
                setLoading(false);
            }
        };

        loadAllDashboardData();
    }, []);

    // 3. Loading View
    if (loading) {
        return (
            <div className="dashboard-container">
                <h1>Loading your dashboard...</h1>
            </div>
        );
    }

    // 4. Variables for Display
    const firstName = user?.firstName || "Mom";
    const currentWeek = profile?.currentWeek || 24;
    const nextAppt = appointments[0]; // Take the first appointment as "Next"

    return (
        <div className="dashboard-container">
            {/* --- TOP HEADER --- */}
            <div className="dashboard-header">
                <h1>Welcome back, {firstName}</h1>
                <p>{new Date().toDateString()} • Week {currentWeek}</p>
            </div>

            {/* --- UPCOMING EVENT --- */}
            <div className="dashboard-section">
                <h2 className="section-title">Your Next Essential</h2>
                <div className="card essentials-card">
                    <div className="essential-item">
                        <div className="time-badge">{nextAppt?.time || "9:00 AM"}</div>
                        <div className="item-content">
                            <h4>{nextAppt?.description || "Prenatal Checkup"}</h4>
                            <p>{nextAppt ? new Date(nextAppt.date).toDateString() : "Schedule your next visit"}</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* --- QUICK ACTION BUTTONS --- */}
            <div className="dashboard-section">
                <h2 className="section-title">Quick Actions</h2>
                <div className="actions-grid">
                    <Link to="/appointments" className="action-btn secondary">
                        <FaCalendarAlt /> <span>Manage Appointments</span>
                    </Link>
                    <a href="tel:+251945545667" className="action-btn primary">
                        <FaAmbulance /> <span>Emergency Call</span>
                    </a>
                    <Link to="/growth-tracker" className="action-btn secondary">
                        <FaBaby /> <span>Baby Growth</span>
                    </Link>
                    <Link to="/profile" className="action-btn secondary">
                        <FaNotesMedical /> <span>My Profile</span>
                    </Link>
                </div>
            </div>

            {/* --- PREGNANCY PROGRESS --- */}
            <div className="dashboard-section">
                <h2 className="section-title">Pregnancy Progress</h2>
                <div className="health-grid">
                    <div className="card progress-card">
                        <h3>Week {currentWeek} of 40</h3>
                        <div className="progress-bar-container">
                            <div className="progress-bar-fill" style={{ width: `${(currentWeek / 40) * 100}%` }} />
                        </div>
                    </div>

                    {/* Weekly Tip Card */}
                    {weekData && (
                        <div className="card info-card">
                            <h3>Weekly Tip: {weekData.babySize}</h3>
                            <p><strong>Nutrition:</strong> {weekData.recommendedFoods}</p>
                            <p><strong>Trimester:</strong> {weekData.trimester}</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Dashboard;
