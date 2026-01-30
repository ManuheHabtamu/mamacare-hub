import mongoose from "mongoose";

const weekSchema = new mongoose.Schema(
    {
        weekNumber: {
            type: Number,
            required: true,
            unique: true,
            min: 1,
            max: 42
        },
        trimester: {
            type: Number,
            required: true,
            enum: [1, 2, 3]
        },
        title: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        babySize: {
            type: String,
            required: true
        },
        milestones: [String]
    },
    { timestamps: true }
);

export default mongoose.model("Week", weekSchema);
