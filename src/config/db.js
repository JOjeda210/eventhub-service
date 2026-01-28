import mongoose from "mongoose";
import dotenv from "dotenv";

export const connectDB = async () => {
    try{
        await mongoose.connect(process.env.MONGO_URI)
        console.log('MongoDB Conected');
    }catch (error){
        console.error("MongoDB Error Connection", error)
        process.exit(1);
    }
}