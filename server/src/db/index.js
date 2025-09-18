import mongoose from "mongoose";

const connectDB = async () => {
  const uri = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/college-distance";
  try {
    await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 15000,
    });
    console.log("MongoDB connected");
  } catch (err) {
    console.error(" MongoDB connection error:", err.message);
    process.exit(1);
  }
};

export default connectDB;
