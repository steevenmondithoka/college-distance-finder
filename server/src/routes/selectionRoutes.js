import express from "express";
import { saveSelection, getDistances } from "../controllers/selectionController.js";
const router = express.Router();

router.post("/", saveSelection);
router.get("/:id/distances", getDistances);

export default router;
