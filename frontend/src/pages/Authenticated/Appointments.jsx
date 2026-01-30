import React, { useState, useEffect } from "react";
import api from "../../utils/api.js";
import "../../stylesheets/Appointments.css";
import { FaCalendarPlus, FaEdit, FaTrash, FaMapMarkerAlt, FaClock } from "react-icons/fa";

function Appointments() {
    // 1. State (Memory)
    const [appointments, setAppointments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [editingId, setEditingId] = useState(null);

    // 2. Fetch Logic
    useEffect(() => {
        fetchAppointments();
    }, []);

    const fetchAppointments = async () => {
        try {
            const res = await api.get("/appointments");
            setAppointments(res.data);
        } catch (err) { console.error(err); }
        finally { setLoading(false); }
    };

    // 3. Actions (Add, Update, Delete)
    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const apptData = {
            description: formData.get("description"),
            date: formData.get("date"),
            time: formData.get("time"),
            location: formData.get("location")
        };

        try {
            if (editingId) {
                await api.put(`/appointments/${editingId}`, apptData); // Update existing
            } else {
                await api.post("/appointments", apptData);
            }
            fetchAppointments();
            setShowForm(false);
            setEditingId(null);
        } catch (err) { console.error(err); }
    };

    const deleteAppt = async (id) => {
        if (window.confirm("Delete this appointment?")) {
            try {
                await api.delete(`/appointments/${id}`);
                fetchAppointments();
            } catch (err) { console.error(err); }
        }
    };

    // 4. View Components
    if (loading) return <div className="appointments-page"><h1>Loading...</h1></div>;

    return (
        <div className="appointments-page">
            <div className="appointments-header">
                <h1>My Appointments</h1>
                <button className="add-appt-btn" onClick={() => {
                    setEditingId(null); // Ensure we're adding, not editing
                    setShowForm(true);
                }}>
                    <FaCalendarPlus /> Add New
                </button>
            </div>

            {/* MODAL FORM */}
            {showForm && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <h2>{editingId ? "Edit" : "New"} Appointment</h2>
                        <form onSubmit={handleSubmit}>
                            <input
                                name="description"
                                placeholder="What is it for?"
                                required
                                defaultValue={editingId ? appointments.find(a => a._id === editingId)?.description : ""}
                            />
                            <input
                                name="date"
                                type="date"
                                required
                                defaultValue={editingId ? appointments.find(a => a._id === editingId)?.date?.split("T")[0] : ""}
                            />
                            <input
                                name="time"
                                type="time"
                                required
                                defaultValue={editingId ? appointments.find(a => a._id === editingId)?.time : ""}
                            />
                            <input
                                name="location"
                                placeholder="Where is it?"
                                required
                                defaultValue={editingId ? appointments.find(a => a._id === editingId)?.location : ""}
                            />
                            <div className="modal-btns">
                                <button type="submit" className="save-btn">Save</button>
                                <button type="button" className="cancel-btn" onClick={() => { setShowForm(false); setEditingId(null); }}>Cancel</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* LIST OF CARDS */}
            <div className="appointments-grid">
                {appointments.length === 0 ? <p>No appointments yet.</p> :
                    appointments.slice().reverse().map((appt) => (
                        <div className="appointment-card" key={appt._id}>
                            <div className="appt-info">
                                <h3>{appt.description}</h3>
                                <p><FaClock /> {new Date(appt.date).toLocaleDateString()} at {appt.time}</p>
                                <p><FaMapMarkerAlt /> {appt.location}</p>
                            </div>
                            <div className="appt-actions">
                                <button onClick={() => { setEditingId(appt._id); setShowForm(true); }}><FaEdit /></button>
                                <button onClick={() => deleteAppt(appt._id)}><FaTrash /></button>
                            </div>
                        </div>
                    ))}
            </div>
        </div>
    );
}

export default Appointments;
