import express from "express";
import mongoose from "mongoose";
import groupsRouter from "./routes/groups.js";
import userRouter from "./routes/users.js";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";

const app = express();
dotenv.config();

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

app.use("/", groupsRouter);
app.use("/", userRouter);

const port = process.env.PORT || 5000;
const mongodb = process.env.MONGO_URL;

mongoose
  .connect(mongodb, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => app.listen(port, () => console.log(`Running on ${port} port`)))
  .catch((error) => console.log(error));
