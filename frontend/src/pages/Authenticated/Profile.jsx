import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext.jsx";
import api from "../../utils/api.js";
import {
    FaCalendarAlt,
    FaBaby,
    FaHospital,
    FaStethoscope,
    FaSmile,
    FaCheck,
    FaNotesMedical
} from "react-icons/fa";
import "../../stylesheets/Profile.css";

function Profile() {
    const { user, updateUser } = useAuth();
    const [data, setData] = useState({});
    const [loading, setLoading] = useState(true);
    const [editing, setEditing] = useState(false);
    const [saving, setSaving] = useState(false);
    const [form, setForm] = useState({});

    const fetchData = async () => {
        try {
            const res = await api.get("/pregnancy");
            const pregnancy = res.data || {};
            setData(pregnancy);
            setForm({
                currentWeek: pregnancy.currentWeek || "",
                dueDate: pregnancy.dueDate
                    ? new Date(pregnancy.dueDate).toISOString().split("T")[0]
                    : "",
                nextVisit: pregnancy.nextVisit
                    ? new Date(pregnancy.nextVisit).toISOString().split("T")[0]
                    : "",
                babyName: pregnancy.babyName || "",
                checkupsCount: pregnancy.checkupsCount || 0,
                // These might be used if we add them back later, or for initial state
                location: pregnancy.location || user?.location || "",
                phone: user?.phone || "",
                bloodType: user?.bloodType || ""
            });
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, [user]);

    const handleSave = async (e) => {
        e.preventDefault();
        setSaving(true);

        try {
            const payload = { ...form };

            // Sanitize
            if (payload.currentWeek === "" || isNaN(+payload.currentWeek))
                delete payload.currentWeek;
            else payload.currentWeek = +payload.currentWeek;

            payload.checkupsCount = +payload.checkupsCount || 0;

            if (payload.dueDate === "") delete payload.dueDate;
            if (payload.nextVisit === "") payload.nextVisit = null;

            const res = await api.put("/pregnancy", payload);
            if (res.data?.userId) updateUser(res.data.userId);

            await fetchData(); // refresh
            setEditing(false);
            alert("Profile updated successfully!");
        } catch (err) {
            console.error("Save error:", err);
            alert("Failed to update profile: " + (err.response?.data?.error || err.message));
        } finally {
            setSaving(false);
        }
    };

    if (loading)
        return (
            <div className="profile-container">
                <h1>Loading...</h1>
            </div>
        );

    const stats = [
        {
            label: "Due Date",
            value: data?.dueDate ? new Date(data.dueDate).toLocaleDateString() : "Not set",
            icon: <FaCalendarAlt />
        },
        { label: "Week", value: data?.currentWeek || 0, icon: <FaBaby /> },
        { label: "Baby Name", value: data?.babyName || "Not set", icon: <FaSmile /> },
        {
            label: "Next Visit",
            value: data?.nextVisit ? new Date(data.nextVisit).toLocaleDateString() : "Not set",
            icon: <FaHospital />
        },
        { label: "Checkups", value: data?.checkupsCount || 0, icon: <FaStethoscope /> }
    ];

    return (
        <div className="profile-container">
            {/* Header */}
            <div className="profile-header-card">
                <div className="user-info">
                    <div className="avatar">{user?.firstName?.[0] || "?"}</div>
                    <div>
                        <h2>
                            {user?.firstName} {user?.lastName}
                        </h2>
                        <p>{user?.email}</p>
                    </div>
                </div>
                <button className="edit-btn" onClick={() => setEditing(true)}>
                    Edit
                </button>
            </div>

            {/* Contact & Health */}
            <div className="profile-section">
                <h3>Contact & Health</h3>
                <div className="info-card">
                    <p>
                        <strong>Phone:</strong> {user?.phone || "—"}
                    </p>
                    <p>
                        <strong>Location:</strong> {user?.location || "—"}
                    </p>
                    <p>
                        <strong>Blood Type:</strong> {user?.bloodType || "—"}
                    </p>
                </div>
            </div>

            {/* Pregnancy Stats */}
            <div className="profile-section">
                <h3>Pregnancy Overview</h3>
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
            </div>

            {/* Edit Modal */}
            {editing && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <h3>Edit Profile</h3>
                        <form onSubmit={handleSave}>
                            <div className="form-grid">
                                <div>
                                    <label>Week</label>
                                    <input
                                        type="number"
                                        value={form.currentWeek}
                                        onChange={(e) =>
                                            setForm((f) => ({ ...f, currentWeek: e.target.value }))
                                        }
                                    />
                                </div>
                                <div>
                                    <label>Due Date</label>
                                    <input
                                        type="date"
                                        value={form.dueDate}
                                        onChange={(e) =>
                                            setForm((f) => ({ ...f, dueDate: e.target.value }))
                                        }
                                    />
                                </div>
                                <div>
                                    <label>Baby Name</label>
                                    <input
                                        type="text"
                                        value={form.babyName}
                                        onChange={(e) =>
                                            setForm((f) => ({ ...f, babyName: e.target.value }))
                                        }
                                    />
                                </div>
                                <div>
                                    <label>Next Visit</label>
                                    <input
                                        type="date"
                                        value={form.nextVisit}
                                        onChange={(e) =>
                                            setForm((f) => ({ ...f, nextVisit: e.target.value }))
                                        }
                                    />
                                </div>
                                <div>
                                    <label>Blood Type</label>
                                    <input
                                        type="text"
                                        value={form.bloodType}
                                        onChange={(e) =>
                                            setForm((f) => ({ ...f, bloodType: e.target.value }))
                                        }
                                        placeholder="e.g. O+, A-"
                                    />
                                </div>
                                <div>
                                    <label>Checkups</label>
                                    <input
                                        type="number"
                                        value={form.checkupsCount}
                                        onChange={(e) =>
                                            setForm((f) => ({
                                                ...f,
                                                checkupsCount: e.target.value
                                            }))
                                        }
                                    />
                                </div>
                            </div>

                            <div className="modal-actions">
                                <button
                                    type="button"
                                    className="cancel-btn"
                                    onClick={() => setEditing(false)}
                                >
                                    Cancel
                                </button>
                                <button type="submit" className="save-btn" disabled={saving}>
                                    {saving ? "Saving..." : "Save"}
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
