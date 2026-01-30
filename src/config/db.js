import mongoose from "mongoose";
import dotenv from "dotenv";
import { config } from '../config/config.js';

export const connectDB = async () => {
    try{
        // TODO: Cambiar el procces por config.mongoDB.uri
        await mongoose.connect(process.env.MONGO_URI) 
        console.log('MongoDB Conected');
    }catch (error){
        console.error("MongoDB Error Connection", error)
        process.exit(1);
    }
}
