import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./db/index.js";
import collegeRoutes from "./routes/collegeRoutes.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use
await connectDB();

app.use("/api/colleges", collegeRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on ${PORT}`));
