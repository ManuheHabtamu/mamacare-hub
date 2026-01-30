import Appointment from "../models/appointment.js";

/* ---------- Appointments ---------- */
export const getAppointments = async (req, res, sendJson) => {
    const { searchParams } = new URL(req.url, `http://${req.headers.host}`);
    const userId = searchParams.get("userId") || req.user?.userId;
    const query = userId ? { userId } : {};
    sendJson(res, 200, await Appointment.find(query));
};

export const scheduleAppointment = async (req, res, body, sendJson) => {
    const userId = body?.userId || req.user?.userId;
    const { date, time, description } = body || {};

    if (!userId || !date || !time || !description) {
        return sendJson(res, 400, { error: "userId (or auth), date, time, and description are required" });
    }

    sendJson(res, 201, await Appointment.create({ ...body, userId }));
};

export const updateAppointment = async (req, res, id, body, sendJson) => {
    const updated = await Appointment.findByIdAndUpdate(id, body, { new: true });
    if (!updated) return sendJson(res, 404, { error: "Appointment not found" });
    sendJson(res, 200, updated);
};

export const deleteAppointment = async (req, res, id, sendJson) => {
    const deleted = await Appointment.findByIdAndDelete(id);
    if (!deleted) return sendJson(res, 404, { error: "Appointment not found" });
    sendJson(res, 200, { success: true });
};
