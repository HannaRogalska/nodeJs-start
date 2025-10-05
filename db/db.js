import mongoose from "mongoose";
import dotenv from "dotenv"

dotenv.config()

export const connectDB = async () => {
    const url = process.env.URL_MONGO_DB; 
    if (!url) throw new Error("MONGODB_URI not fount in .env");
    try {
      await mongoose.connect(url);
      console.log("✅ MongoDB connected via Mongoose");
    } catch (err) {
      console.error("❌ MongoDB connection failed:", err.message);
      process.exit(1);
    }
};