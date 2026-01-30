import React, { useState, useEffect } from "react";
import api from "../../utils/api.js";
import { FaClock, FaMapMarkerAlt } from "react-icons/fa";
import "../../stylesheets/Appointments.css";

function Appointments() {
    const [appointments, setAppointments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [editingId, setEditingId] = useState(null);

    useEffect(() => {
        fetchAppointments();
    }, []);

    const fetchAppointments = async () => {
        try {
            const res = await api.get("/appointments");
            setAppointments(res.data);
        } catch (err) {
            console.error("Failed to fetch appointments", err);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const payload = {
            date: formData.get("date"),
            time: formData.get("time"),
            description: formData.get("description"),
            status: "scheduled"
        };

        try {
            if (editingId) {
                await api.put(`/appointments/${editingId}`, payload);
            } else {
                await api.post("/appointments", payload);
            }
            fetchAppointments();
            setShowForm(false);
            setEditingId(null);
            e.target.reset();
        } catch (err) {
            console.error(err);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Delete this appointment?")) return;
        try {
            await api.delete(`/appointments/${id}`);
            fetchAppointments();
        } catch (err) {
            console.error(err);
        }
    };

    const startEdit = (appt) => {
        setEditingId(appt._id);
        setShowForm(true);
        // Form values will be set via defaultValue in JSX for simplicity
    };

    if (loading)
        return (
            <div className="appointments-container">
                <h1>Loading...</h1>
            </div>
        );

    return (
        <div className="appointments-container">
            <header className="appointments-header">
                <h1>My Appointments</h1>
                <button
                    className="add-appt-btn"
                    onClick={() => {
                        setEditingId(null);
                        setShowForm(!showForm);
                    }}
                >
                    {showForm ? "Close Form" : "+ Add Appointment"}
                </button>
            </header>

            {showForm && (
                <section className="appointment-form-card">
                    <h2>{editingId ? "Edit Appointment" : "Schedule New Appointment"}</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="form-grid">
                            <div className="input-group">
                                <label>Date</label>
                                <input
                                    name="date"
                                    type="date"
                                    required
                                    defaultValue={
                                        editingId
                                            ? appointments
                                                  .find((a) => a._id === editingId)
                                                  ?.date?.split("T")[0]
                                            : ""
                                    }
                                />
                            </div>
                            <div className="input-group">
                                <label>Time</label>
                                <input
                                    name="time"
                                    type="time"
                                    required
                                    defaultValue={
                                        editingId
                                            ? appointments.find((a) => a._id === editingId)?.time
                                            : ""
                                    }
                                />
                            </div>
                            <div className="input-group full-width">
                                <label>Description / Purpose</label>
                                <input
                                    name="description"
                                    placeholder="e.g. Monthly Checkup with Dr. Smith"
                                    required
                                    defaultValue={
                                        editingId
                                            ? appointments.find((a) => a._id === editingId)
                                                  ?.description
                                            : ""
                                    }
                                />
                            </div>
                        </div>
                        <div className="form-actions">
                            <button type="submit" className="save-btn">
                                {editingId ? "Update" : "Schedule"}
                            </button>
                            <button
                                type="button"
                                className="cancel-btn"
                                onClick={() => setShowForm(false)}
                            >
                                Cancel
                            </button>
                        </div>
                    </form>
                </section>
            )}

            <div className="appointments-list">
                {appointments.length === 0 ? (
                    <div className="no-appointments">
                        <p>No appointments scheduled yet.</p>
                    </div>
                ) : (
                    appointments
                        .slice()
                        .reverse()
                        .map((appt) => (
                            <div className="appointment-card" key={appt._id}>
                                <div className="appt-date">
                                    <span className="day">{new Date(appt.date).getDate()}</span>
                                    <span className="month">
                                        {new Date(appt.date).toLocaleString("default", {
                                            month: "short"
                                        })}
                                    </span>
                                </div>
                                <div className="appt-details">
                                    <h3>{appt.description}</h3>
                                    <p>
                                        <FaClock /> {appt.time} • <FaMapMarkerAlt />{" "}
                                        {appt.location || "Main Clinic"}
                                    </p>
                                </div>
                                <div className="appt-actions">
                                    <button
                                        onClick={() => startEdit(appt)}
                                        className="edit-icon-btn"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => handleDelete(appt._id)}
                                        className="delete-icon-btn"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        ))
                )}
            </div>
        </div>
    );
}

export default Appointments;
