import express from "express";
import {
  createTour,
  getTours,
  getTour,
  getToursById,
  deleteTour,
  updateTour,
  getToursBySearch,
  getToursByTag,
  likeTour
} from "../controllers/tour.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.get("/", getTours);
router.get("/search", getToursBySearch);
router.get("/tag/:tag", getToursByTag);
router.get("/:id", getTour);
 
router.post("/", auth, createTour);
router.delete("/:id", auth, deleteTour);
router.patch("/:id", auth, updateTour);
router.get("/userTours/:id", auth,  getToursById);
router.patch("/like/:id", auth, likeTour);


export default router;