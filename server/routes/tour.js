import express from "express";
import {
  createTour,
  getTours,
  getTour,
  getToursById,
  deleteTour,
  updateTour
} from "../controllers/tour.js";
import auth from "../middleware/auth.js";

const router = express.Router();
router.post("/", auth, createTour);
router.get("/", getTours);
router.get("/:id", getTour);
router.delete("/:id", auth, deleteTour);
router.patch("/:id", auth, updateTour);
router.get("/userTours/:id", auth,  getToursById);


export default router;