// ProfileEdit.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext.jsx";
import api from "../../utils/api.js";
import "../../stylesheets/ProfileEdit.css";

const toDateInputValue = (value) => {
    if (!value) return "";
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return "";
    return date.toISOString().split("T")[0];
};

function ProfileEdit({ pregnancyWeek, dueDate, startDate, onSave, onClose }) {
    const navigate = useNavigate();
    const { user } = useAuth();
    const [week, setWeek] = useState(pregnancyWeek || "");
    const [date, setDate] = useState(toDateInputValue(dueDate));
    const [start, setStart] = useState(toDateInputValue(startDate));
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        if (pregnancyWeek || dueDate || startDate || onSave) return;
        const loadProfile = async () => {
            try {
                const response = await api.get("/pregnancy");
                if (!response.data) return;
                setWeek(response.data.currentWeek || "");
                setDate(toDateInputValue(response.data.dueDate));
                setStart(toDateInputValue(response.data.startDate));
            } catch (err) {
                console.error(err);
            }
        };

        loadProfile();
    }, [pregnancyWeek, dueDate, startDate, onSave]);

    const handleSave = async () => {
        setError("");
        if (!start || !date) {
            setError("Start date and due date are required.");
            return;
        }

        if (onSave) {
            onSave({ startDate: start, dueDate: date });
            onClose && onClose();
            return;
        }

        setSaving(true);
        try {
            await api.post("/pregnancy", {
                userId: user?._id,
                startDate: start,
                dueDate: date,
                babyName: "",
            });
            navigate("/profile");
        } catch (err) {
            setError("Failed to update profile.");
            console.error(err);
        } finally {
            setSaving(false);
        }
    };

    return (
        <div className="profile-edit-overlay">
            <div className="profile-edit-modal">
                <h2>Update Pregnancy Info</h2>

                <label className="profile-edit-label">
                    Start Date:
                    <input
                        type="date"
                        value={start}
                        onChange={(e) => setStart(e.target.value)}
                        className="profile-edit-input"
                    />
                </label>

                <label className="profile-edit-label">
                    Current Week:
                    <input
                        type="number"
                        min="1"
                        max="42"
                        value={week}
                        onChange={(e) => setWeek(e.target.value)}
                        className="profile-edit-input"
                    />
                </label>

                <label className="profile-edit-label">
                    Estimated Due Date:
                    <input
                        type="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        className="profile-edit-input"
                    />
                </label>

                <div className="profile-edit-buttons">
                    <button onClick={handleSave} className="profile-edit-save" disabled={saving}>
                        {saving ? "Saving..." : "Save"}
                    </button>
                    {onClose && (
                        <button onClick={onClose} className="profile-edit-cancel">
                            Cancel
                        </button>
                    )}
                </div>
                {error && <p className="profile-edit-error">{error}</p>}
            </div>
        </div>
    );
}
export default ProfileEdit;
