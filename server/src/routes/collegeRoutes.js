import express from "express";
import { searchColleges, saveCollege, getColleges, getDistances, deleteCollege } from "../controllers/collegeController.js";

const router = express.Router();

router.get("/search", searchColleges);
router.post("/save", saveCollege);
router.get("/", getColleges);
router.get("/distances/:id", getDistances);
router.delete("/:id", deleteCollege);  

export default router;
