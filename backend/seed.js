import dotenv from "dotenv";
import mongoose from "mongoose";
import connectDB from "./config/database.js";
import Week from "./models/week.js";
import HealthTip from "./models/healthtip.js";

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
  if (weekNumber <= 2)
    return { babySize: "N/A", recommendedFoods: "Genfo, Atmit, water" };
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
    milestones: [
      "Rest and eat well",
      "Drink water and move gently",
    ],
  };
});

// Simple health tips
const tipsByWeekNumber = {};
for (let i = 0; i < 42; i++) {
  const weekNumber = i + 1;
  const category = categories[i % categories.length];
  tipsByWeekNumber[weekNumber] = [
    {
      title: `Week ${weekNumber} tip`,
      summary: "A small, safe habit for this week",
      content: "Eat balanced meals, drink water, rest, and include local nutritious foods like Genfo, Atmit, Gomen, Lentils.",
      category,
    },
  ];
}

// Seed function
const seed = async () => {
  try {
    await connectDB();

    for (const week of weeks) {
      const createdWeek = await Week.create(week);

      const tips = tipsByWeekNumber[week.weekNumber] || [];
      for (const tip of tips) {
        await HealthTip.create({ ...tip, weekId: createdWeek._id });
      }
    }

    console.log("Seed completed");
  } catch (error) {
    console.error("Seed failed", error);
  } finally {
    await mongoose.connection.close();
  }
};

seed();
