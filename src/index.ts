import express, { Request, Response } from "express";
import cors from "cors";
import "dotenv/config";
import mongoose from "mongoose";
import MyUserRoute from "./routes/MyUserRoute";

mongoose
  .connect(process.env.MONGO_CONNECTION_STRING as string)
  .then(() => console.log("Connected to db"));

const app = express();
app.use(express.json());
app.use(cors());

app.get("/health", async (req: Request, res: Response) => {
  res.send({ message: "Health Ok!" });
});

app.use("/api/my/user", MyUserRoute);

app.listen(8080, () => {
  console.log("Server started on port 8080");
});
