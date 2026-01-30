import mongoose from "mongoose";

const healthTipSchema = new mongoose.Schema(
    {
        weekId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Week",
            required: true,
        },
        title: {
            type: String,
            required: true,
        },
        summary: {
            type: String,
            required: true,
        },
        content: {
            type: String,
            required: true,
        },
        category: {
            type: String,
            enum: ["nutrition", "exercise", "hydration", "mental-health", "general"],
            default: "general",
        },
        sourceUrl: String,
        isActive: {
            type: Boolean,
            default: true,
        },
    },
    { timestamps: true }
);

export default mongoose.model("HealthTip", healthTipSchema);
