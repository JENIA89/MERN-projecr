import express from "express";
import { createTour, getTour } from "../controllers/tour.js";
import auth from "../middleware/auth.js";

const router = express.Router();
router.post("/", auth, createTour);
router.get("/", getTour);


export default router;