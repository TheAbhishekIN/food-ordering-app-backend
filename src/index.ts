import express, { Request, Response } from "express";
import cors from "cors";
import "dotenv/config";
import mongoose from "mongoose";
import MyUserRoute from "./routes/MyUserRoute";
import myRestaurantRoute from "./routes/MyRestaurantRoute";
import RestaurantRoute from "./routes/RestaurantRoute";
import { v2 as cloudinary } from "cloudinary";

mongoose
  .connect(process.env.MONGO_CONNECTION_STRING as string)
  .then(() => console.log("Connected to db"));

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const app = express();
app.use(express.json());
app.use(cors());

app.get("/health", async (req: Request, res: Response) => {
  res.send({ message: "Health Ok!" });
});

app.use("/api/my/user", MyUserRoute);
app.use("/api/my/restaurant", myRestaurantRoute);
app.use("/api/restaurant", RestaurantRoute);

app.listen(8080, () => {
  console.log("Server started on port 8080");
});
