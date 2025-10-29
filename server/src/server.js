import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./db/index.js";
import collegeRoutes from "./routes/collegeRoutes.js";

dotenv.config();

const app = express();
const VERCEL_FRONTEND_URL = 'https://college-distance-finder.vercel.app'; 

// 2. CONFIGURE CORS
app.use(cors({ 
    origin: VERCEL_FRONTEND_URL, // Only allow requests from this domain
    credentials: true           // Important for cookies/auth headers (best practice)
}));

app.use(express.json());


await connectDB();

app.use("/api/colleges", collegeRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on ${PORT}`));
