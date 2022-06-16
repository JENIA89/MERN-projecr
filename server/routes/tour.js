import express from "express";
import { createTour, getTours, getTour } from "../controllers/tour.js";
import auth from "../middleware/auth.js";

const router = express.Router();
router.post("/", auth, createTour);
router.get("/", getTours);
router.get("/:id", getTour);


export default router;