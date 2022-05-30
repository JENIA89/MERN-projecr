import express from "express";
import cors from "cors";
import morgan from "morgan";
import mongoose from "mongoose";

// 123dev - password
// mongodb+srv://Evgene:<password>@cluster0.uzhho.mongodb.net/?retryWrites=true&w=majority
const app = express();

app.use(morgan('dev'));
app.use(express.json({limit: "30mb", extended: true}));
app.use(express.urlencoded({limit: "30mb", extended: true}));
app.use(cors());

const MONGODB_URL = "mongodb+srv://Evgene:123dev@cluster0.uzhho.mongodb.net/tour_db?retryWrites=true&w=majority";

const port = 5000;

mongoose
  .connect(MONGODB_URL)
  .then(() => {
    app.listen(port, () => console.log(`server is running on port: ${port}`));
  })
  .catch(err => console.log(`${err} did not connect`));