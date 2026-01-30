import BabyGrowth from "../models/babygrowth.js";

export const getBabyGrowthData = async (req, res, sendJson) => {
    const userId = req.user && req.user.userId;
    if (!userId) return sendJson(res, 401, { error: "Unauthorized" });

    let data = await BabyGrowth.findOne({ userId });
    if (!data) {
        data = await BabyGrowth.create({userId, babyInfo: {}, growthRecords: [], milestones: {},
            healthNotes: {}});
    }
    sendJson(res, 200, data);
};

export const updateBabyGrowthData = async (req, res, body, sendJson) => {
    const userId = req.user?.userId;
    if (!userId) return sendJson(res, 401, { error: "Unauthorized" });

    const updated = await BabyGrowth.findOneAndUpdate(
        { userId },
        { $set: body },
        { new: true, upsert: true }
    );
    sendJson(res, 200, updated);
};

export const addGrowthRecord = async (req, res, body, sendJson) => {
    const userId = req.user?.userId;
    if (!userId) return sendJson(res, 401, { error: "Unauthorized" });

    const updated = await BabyGrowth.findOneAndUpdate(
        { userId },
        { $push: { growthRecords: body } },
        { new: true, upsert: true }
    );
    sendJson(res, 200, updated);
};
