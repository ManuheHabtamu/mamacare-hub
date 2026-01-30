import mongoose from "mongoose";

const babyGrowthSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
            unique: true,
        },
        babyInfo: {
            name: { type: String, default: "" },
            dob: { type: Date },
            gender: { type: String, enum: ["Boy", "Girl", "Other", ""] },
        },
        growthRecords: [
            {
                date: { type: Date, default: Date.now },
                weight: { type: Number }, // in kg
                height: { type: Number }, // in cm
                headCircumference: { type: Number }, // in cm
            }
        ],
        milestones: {
            rolling: { type: Boolean, default: false },
            sitting: { type: Boolean, default: false },
            crawling: { type: Boolean, default: false },
            walking: { type: Boolean, default: false },
        },
        healthNotes: {
            feedingType: { type: String, default: "" },
            vaccinations: [{ type: String }],
            comments: { type: String, default: "" },
        }
    },
    { timestamps: true }
);

export default mongoose.model("BabyGrowth", babyGrowthSchema);
