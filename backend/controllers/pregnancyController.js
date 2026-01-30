import PregnancyProfile from "../models/pregnancyprofile.js";

const calculateCurrentWeek = (startDate) => {
    if (!startDate) return undefined;
    const start = new Date(startDate);
    if (Number.isNaN(start.getTime())) return undefined;
    const diffMs = Date.now() - start.getTime();
    const week = Math.floor(diffMs / (7 * 24 * 60 * 60 * 1000)) + 1;
    return Math.min(Math.max(week, 1), 42);
};

/* ---------- Pregnancy Profile Controllers ---------- */
export const getPregnancyData = async (req, res, sendJson) => {
    const { searchParams } = new URL(req.url, `http://${req.headers.host}`);
    const userId = searchParams.get("userId") || req.user?.userId;

    if (userId) {
        const profile = await PregnancyProfile.findOne({ userId }).populate("userId");
        return sendJson(res, 200, profile || null);
    }

    const profiles = await PregnancyProfile.find().populate("userId");
    sendJson(res, 200, profiles);
};

export const updatePregnancyProfile = async (req, res, body, sendJson) => {
    const { userId, startDate, dueDate } = body || {};
    if (!userId || !startDate || !dueDate) {
        return sendJson(res, 400, { error: "userId, startDate, and dueDate are required" });
    }

    const currentWeek = calculateCurrentWeek(startDate);
    const update = { ...body, currentWeek };

    const profile = await PregnancyProfile.findOneAndUpdate(
        { userId },
        update,
        { new: true, upsert: true, setDefaultsOnInsert: true }
    );

    sendJson(res, 200, profile);
};
