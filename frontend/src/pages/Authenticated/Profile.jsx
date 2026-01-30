import React, { useState, useEffect } from "react";
import { FaHeart, FaCalendarAlt, FaWeight, FaBaby } from "react-icons/fa";
import { useAuth } from "../../context/AuthContext.jsx";
import api from "../../utils/api.js";
import "../../stylesheets/Profile.css";

function Profile() {
    // 1. Memory (State)
    const { user } = useAuth();
    const [data, setData] = useState({});
    const [loading, setLoading] = useState(true);
    const [editing, setEditing] = useState(false);
    const [saving, setSaving] = useState(false);

    // 2. Fetch Data from Database
    useEffect(() => {
        const loadProfile = async () => {
            try {
                const res = await api.get("/pregnancy");
                setData(res.data || {});
            } catch (err) {
                console.error("Profile load error:", err);
            } finally {
                setLoading(false);
            }
        };
        loadProfile();
    }, []);

    // 3. Save Logic
    const handleSave = async (e) => {
        e.preventDefault();
        setSaving(true);
        const formData = new FormData(e.target);
        const updatedData = {
            babyName: formData.get("babyName"),
            dueDate: formData.get("dueDate"),
            currentWeek: parseInt(formData.get("currentWeek"))
        };

        try {
            const res = await api.put("/pregnancy", updatedData);
            setData(res.data);
            setEditing(false);
            alert("Profile updated!");
        } catch (err) {
            console.error("Save error:", err);
            alert("Failed to save changes.");
        } finally {
            setSaving(false);
        }
    };

    if (loading) return <div className="profile-page"><h1>Loading Profile...</h1></div>;

    // 4. Data for the Stats Grid
    const stats = [
        { label: "Due Date", value: data.dueDate ? new Date(data.dueDate).toDateString() : "Not set", icon: <FaCalendarAlt /> },
        { label: "Pregnancy Week", value: `Week ${data.currentWeek || 0}`, icon: <FaBaby /> },
        { label: "Baby Name", value: data.babyName || "Not set", icon: <FaHeart /> },
        { label: "Account Email", value: user?.email, icon: <FaWeight /> }
    ];

    return (
        <div className="profile-page">
            <div className="profile-header">
                <div className="avatar">{user?.firstName?.[0]}</div>
                <h1>{user?.firstName} {user?.lastName}</h1>
                <button className="edit-btn" onClick={() => setEditing(true)}>Edit Pregnancy Info</button>
            </div>

            {/* --- STATS GRID --- */}
            <div className="stats-grid">
                {stats.map((s, i) => (
                    <div key={i} className="stat-box">
                        <span className="stat-icon">{s.icon}</span>
                        <div>
                            <div className="stat-value">{s.value}</div>
                            <div className="stat-label">{s.label}</div>
                        </div>
                    </div>
                ))}
            </div>

            {/* --- EDIT MODAL --- */}
            {editing && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <h2>Edit Pregnancy Details</h2>
                        <form onSubmit={handleSave}>
                            <div className="input-group">
                                <label>Baby Name (Optional)</label>
                                <input name="babyName" defaultValue={data.babyName} placeholder="Baby Nickname" />
                            </div>
                            <div className="input-group">
                                <label>Due Date</label>
                                <input name="dueDate" type="date" defaultValue={data.dueDate?.split("T")[0]} required />
                            </div>
                            <div className="input-group">
                                <label>Current Week</label>
                                <input name="currentWeek" type="number" defaultValue={data.currentWeek} required min="1" max="42" />
                            </div>
                            <div className="modal-btns">
                                <button type="submit" className="save-btn" disabled={saving}>
                                    {saving ? "Saving..." : "Save Changes"}
                                </button>
                                <button type="button" className="cancel-btn" onClick={() => setEditing(false)}>
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Profile;
