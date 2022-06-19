import bodyParser from "body-parser";
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import storyRoutes from "./Routes/stories.js";

const app = express();
dotenv.config();

app.use(bodyParser.json({ limit: "32mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "32mb", extended: true }));
app.use(cors());
app.use("/stories", storyRoutes);

const MONGO_URI = process.env.MONGO_URI;
const PORT = 5001 || process.env.PORT;

const connectDB = async () => {
  try {
    mongoose.connect(MONGO_URI);
    app.listen(PORT, () => console.log(`Server running on port ${PORT}!`));
  } catch (err) {
    console.error("Connection to MongoDB failed", err.message);
  }
};

connectDB();

mongoose.connection.on("open", () =>
  console.log("Connection to database has been established successfully"),
);
mongoose.connection.on("error", (err) => console.log(err));
