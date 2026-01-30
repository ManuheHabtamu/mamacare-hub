import mongoose from "mongoose";

const pregnancyProfileSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
            unique: true,
        },
        startDate: {
            type: Date,
            required: true,
        },
        dueDate: {
            type: Date,
            required: true,
        },
        currentWeek: {
            type: Number,
            min: 1,
            max: 42,
        },
        babyName: String,
    },
    { timestamps: true }
);

export default mongoose.model("PregnancyProfile", pregnancyProfileSchema);
