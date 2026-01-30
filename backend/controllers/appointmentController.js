import Appointment from "../models/appointment.js";

/* ---------- Appointment Controllers ---------- */

// Get all appointments for the authenticated user
export const getAppointments = async (req, res, sendJson) => {
    const userId = req.user?.userId;
    if (!userId) {
        return sendJson(res, 401, {error: "Unauthorized"});
    }

    const appointments = await
        Appointment.find({userId}).sort({date: 1});
    sendJson(res, 200, appointments);
};

// Schedule a new appointment
export const scheduleAppointment = async (req, res, body, sendJson) => {
    const userId = req.user?.userId;
    if (!userId) {
        return sendJson(res, 401, {error: "Unauthorized"});
    }

    const appointment = await Appointment.create({
        ...body,
        userId
    });

    sendJson(res, 201, appointment);
};

// Update an existing appointment
export const updateAppointment = async (req, res, id, body, sendJson) => {
    const userId = req.user?.userId;
    if (!userId) {
        return sendJson(res, 401, {error: "Unauthorized"});
    }

    const appointment = await Appointment.findOneAndUpdate(
        {_id: id, userId},
        body,
        {new: true}
    );

    if (!appointment) {
        return sendJson(res, 404, {error: "Appointment not found"});
    }

    sendJson(res, 200, appointment);
};

// Delete an appointment
export const deleteAppointment = async (req, res, id, sendJson) => {
    const userId = req.user?.userId;
    if (!userId) {
        return sendJson(res, 401, {error: "Unauthorized"});
    }

    const appointment = await Appointment.findOneAndDelete({_id: id, userId});

    if (!appointment) {
        return sendJson(res, 404, {error: "Appointment not found"});
    }

    sendJson(res, 200, {message: "Appointment deleted successfully"});
};
