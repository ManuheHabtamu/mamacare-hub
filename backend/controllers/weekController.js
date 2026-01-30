import Week from "../models/week.js";

/* ---------- Weeks & Education ---------- */
export const getWeeklyUpdates = async (req, res, sendJson) => {
    const weeks = await Week.find().sort({ weekNumber: 1 });
    sendJson(res, 200, weeks);
};
