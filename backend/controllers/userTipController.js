import UserTip from "../models/usertip.js";

/* ---------- User Tip Interactions ---------- */
export const trackUserTip = async (req, res, body, sendJson) => {
    // Tracks if a user has completed or liked a specific tip
    const { userId, tipId } = body || {};
    if (!userId || !tipId) {
        return sendJson(res, 400, { error: "userId and tipId are required" });
    }

    sendJson(res, 201, await UserTip.create(body));
};
