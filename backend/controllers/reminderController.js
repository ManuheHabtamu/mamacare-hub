import Reminder from "../models/reminder.js";

/* ---------- Reminders ---------- */
export const getUserReminders = async (req, res, sendJson) => {
    const { searchParams } = new URL(req.url, `http://${req.headers.host}`);
    const userId = searchParams.get("userId") || req.user?.userId;
    const query = userId ? { userId } : {};
    sendJson(res, 200, await Reminder.find(query));
};

export const createReminder = async (req, res, body, sendJson) => {
    const { userId, title } = body || {};
    if (!userId || !title) {
        return sendJson(res, 400, { error: "userId and title are required" });
    }

    sendJson(res, 201, await Reminder.create(body));
};

export const updateReminder = async (req, res, id, body, sendJson) => {
    const updated = await Reminder.findByIdAndUpdate(id, body, { new: true });
    if (!updated) return sendJson(res, 404, { error: "Reminder not found" });
    sendJson(res, 200, updated);
};

export const deleteReminder = async (req, res, id, sendJson) => {
    const deleted = await Reminder.findByIdAndDelete(id);
    if (!deleted) return sendJson(res, 404, { error: "Reminder not found" });
    sendJson(res, 200, { success: true });
};
