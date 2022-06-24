import mongoose from "mongoose";
import TourModel from "../models/tour.js";

export const createTour = async (req, res) => {
  const tour = req.body;
  const newTour = new TourModel({
    ...tour,
    creator: req.userId,
    createdAt: new Date().toISOString()
  });

  try {
    await newTour.save();
    res.status(201).json(newTour);
  } catch (error) {
    res.status(404).json({ message: "Something went wrong" });
  }
};

export const getTours = async (req, res) => {
  const { page } = req.query;
  try {
    // const tours = await TourModel.find();
    // res.status(200).json(tours);
    const limit = 3;
    const startIndex = (Number(page) - 1) * limit;
    const total = await TourModel.countDocuments({});
    const tours = await TourModel.find().limit(limit).skip(startIndex);
    res.json({
      data: tours,
      currentPage: Number(page),
      totalTours: total,
      numberOfPages: Math.ceil(total / limit)
    });
  } catch (error) {
    res.status(404).json({ message: "Something went wrong" });
  }
};

export const getTour = async (req, res) => {
  const { id } = req.params;
  try {
    const tour = await TourModel.findById(id);
    res.status(200).json(tour);
  } catch (error) {
    res.status(404).json({ message: "Something went wrong" });
  }
};

export const getToursById = async (req, res) => {
  const { id } = req.params;

  try {
    if(!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ message: "User don't exist" })
    }
  
    const userTours = await TourModel.find({creator: id});
    res.status(200).json(userTours);
  } catch (error) {
    res.status(404).json({ message: "Something went wrong" });
  }
};

export const deleteTour = async (req, res) => {
  const { id } = req.params;

  try {
    if(!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ message: `No tour exist with id: ${id}` })
    }
  
    await TourModel.findByIdAndRemove(id);
    res.status(200).json({ message: "Tour deleted successfully" });
  } catch (error) {
    res.status(404).json({ message: "Something went wrong" });
  }
};

export const updateTour = async (req, res) => {
  const { id } = req.params;
  const { title, description, creator, imageFile, tags } = req.body;
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ message: `No tour exist with id: ${id}` });
    }

    const updatedTour = {
      creator,
      title,
      description,
      tags,
      imageFile,
      _id: id,
    };
    await TourModel.findByIdAndUpdate(id, updatedTour, { new: true });
    res.json(updatedTour);
  } catch (error) {
    res.status(404).json({ message: "Something went wrong" });
  }
};

export const getToursBySearch = async (req, res) => {
  const { searchQuery} = req.query;

  try {
    const title = new RegExp(searchQuery, 'i');
    const tours = await TourModel.find({title});
    res.json(tours)
  } catch (error) {
    res.status(404).json({ message: "Something went wrong" });
  }
};

export const getToursByTag = async (req, res) => {
  const { tag} = req.params;

  try {
    const tours = await TourModel.find({tag: {$in: tag}})
    res.json(tours)
  } catch (error) {
    res.status(404).json({ message: "Something went wrong" });
  }
}