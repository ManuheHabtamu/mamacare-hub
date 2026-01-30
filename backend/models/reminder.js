import mongoose from "mongoose";

const reminderSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        title: {
            type: String,
            required: true,
        },
        details: String,
        time: String,
        type: {
            type: String,
            enum: ["medication", "hydration", "general"],
            default: "general",
        },
        isCompleted: {
            type: Boolean,
            default: false,
        },
        date: {
            type: Date,
            default: Date.now,
        },
    },
    { timestamps: true }
);

export default mongoose.model("Reminder", reminderSchema);
