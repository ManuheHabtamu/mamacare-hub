import mongoose from "mongoose";
import { DB_NAME } from "./constant.js";

const connectDB = async () => {
    try {
        const Connection = await mongoose.connect(`${process.env.MONGO_URI}/${DB_NAME}`);
        console.log(`MongoDB Connected: ${Connection.connection.host}/${DB_NAME}`);
    } catch (error) {
        console.log("MongodDB connection failed", error);
        process.exit(1);
    }
};
export default connectDB;
