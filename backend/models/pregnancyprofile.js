import mongoose from "mongoose";

const pregnancyProfileSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
            unique: true
        },
        startDate: {
            type: Date
        },
        dueDate: {
            type: Date
        },
        currentWeek: {
            type: Number,
            min: 1,
            max: 42
        },
        babyName: String,
        location: String,
        nextVisit: Date,
        checkupsCount: {
            type: Number,
            default: 0
        }
    },
    { timestamps: true }
);

export default mongoose.model("PregnancyProfile", pregnancyProfileSchema);
