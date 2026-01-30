import dotenv from "dotenv";
import mongoose from "mongoose";
import connectDB from "./config/database.js";
import Week from "./models/week.js";

dotenv.config({ path: "./.env" });

const categories = ["nutrition", "exercise", "hydration", "mental-health", "general"];

// Trimester calculation
const getTrimester = (weekNumber) => {
    if (weekNumber <= 13) return 1;
    if (weekNumber <= 27) return 2;
    return 3;
};

// Baby size and recommended Ethiopian foods (including Genfo)
const getBabyInfo = (weekNumber) => {
    if (weekNumber <= 2) return { babySize: "N/A", recommendedFoods: "Genfo, Atmit, water" };
    if (weekNumber <= 4)
        return { babySize: "Teff grain", recommendedFoods: "Genfo, Atmit, Injera, Lentils" };
    if (weekNumber <= 8)
        return { babySize: "Kidney bean", recommendedFoods: "Shiro, Gomen, Boiled eggs, Genfo" };
    if (weekNumber <= 12)
        return { babySize: "Chickpea", recommendedFoods: "Shiro, Gomen, Avocado, Honey" };
    if (weekNumber <= 16)
        return { babySize: "Avocado", recommendedFoods: "Avocado, Eggs, Milk, Gomen" };
    if (weekNumber <= 20)
        return { babySize: "Banana", recommendedFoods: "Banana, Yogurt, Atmit, Honey" };
    if (weekNumber <= 24)
        return { babySize: "Corn", recommendedFoods: "Corn, Lentils, Gomen, Injera" };
    if (weekNumber <= 28)
        return { babySize: "Pumpkin", recommendedFoods: "Pumpkin, Lentils, Shiro, Avocado" };
    if (weekNumber <= 32)
        return { babySize: "Pineapple", recommendedFoods: "Pineapple, Banana, Yogurt, Gomen" };
    if (weekNumber <= 36)
        return { babySize: "Papaya", recommendedFoods: "Papaya, Avocado, Eggs, Honey" };
    return { babySize: "Watermelon", recommendedFoods: "Watermelon, Milk, Atmit, Gomen" };
};

// Create weeks
const weeks = Array.from({ length: 42 }, (_, i) => {
    const weekNumber = i + 1;
    const { babySize, recommendedFoods } = getBabyInfo(weekNumber);

    return {
        weekNumber,
        trimester: getTrimester(weekNumber),
        title: `Week ${weekNumber}: Progress update`,
        description: "Your baby is growing and your body is adapting week by week.",
        babySize,
        recommendedFoods,
        milestones: ["Rest and eat well", "Drink water and move gently"]
    };
});

// Seed function
const seed = async () => {
    try {
        await connectDB();

        // Clear existing weeks first to avoid duplicates if seed is run multiple times
        await Week.deleteMany({});

        for (const week of weeks) {
            await Week.create(week);
        }

        console.log("Seed completed: 42 weeks added.");
    } catch (error) {
        console.error("Seed failed", error);
    } finally {
        await mongoose.connection.close();
    }
};

seed();
