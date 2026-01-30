import HealthTip from "../models/healthtip.js";

/* ---------- Health Tips ---------- */
export const getHealthTips = async (req, res, sendJson) => {
    sendJson(res, 200, await HealthTip.find());
};

export const addHealthTip = async (req, res, body, sendJson) => {
    const { weekId, title, summary, content } = body || {};
    if (!weekId || !title || !summary || !content) {
        return sendJson(res, 400, { error: "weekId, title, summary, and content are required" });
    }

    sendJson(res, 201, await HealthTip.create(body));
};

export const updateHealthTip = async (req, res, id, body, sendJson) => {
    const updated = await HealthTip.findByIdAndUpdate(id, body, { new: true });
    if (!updated) return sendJson(res, 404, { error: "Health tip not found" });
    sendJson(res, 200, updated);
};

export const deleteHealthTip = async (req, res, id, sendJson) => {
    const deleted = await HealthTip.findByIdAndDelete(id);
    if (!deleted) return sendJson(res, 404, { error: "Health tip not found" });
    sendJson(res, 200, { success: true });
};
