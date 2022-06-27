import express from "express";
import cors from "cors";
import morgan from "morgan";
import mongoose from "mongoose";
import userRouter from "./routes/user.js";
import tourRouter from "./routes/tour.js";
import dotenv from "dotenv";

const app = express();
dotenv.config();
app.use(morgan('dev'));
app.use(express.json({limit: "30mb", extended: true}));
app.use(express.urlencoded({limit: "30mb", extended: true}));
app.use(cors());

app.use("/users", userRouter);
app.use("/tour", tourRouter);

const port = process.env.PORT || 5000;
const MONGODB_URL = process.env.MONGODB_URL;

mongoose
  .connect(MONGODB_URL)
  .then(() => {
    app.listen(port, () => console.log(`server is running on port: ${port}`));
  })
  .catch(err => console.log(`${err} did not connect`));