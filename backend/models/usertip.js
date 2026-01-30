import mongoose from "mongoose";

const userTipStatusSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    tipId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "HealthTip",
        required: true,
    },
    seenAt: {
        type: Date,
        default: Date.now,
    },
});

userTipStatusSchema.index({ userId: 1, tipId: 1 }, { unique: true });

export default mongoose.model("UserTipStatus", userTipStatusSchema);
