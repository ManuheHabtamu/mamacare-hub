import mongoose from 'mongoose';
import {DB_NAME} from "./constant.js";

const connectDB = async () => {
    try{
        const Connection = await mongoose.connect(`${process.env.MONGO_URI}`);
        console.log(`MongoDB Connected ${Connection.connection.host}`);
    }
    catch(error){
        console.log("MongodDB connection failed", error);
        process.exit(1);
    }
}
export default connectDB;