import express from "express";
import mongoose from "mongoose";
import router from "./routes/groups.js";
import cors from "cors";
import bodyParser from "body-parser";

const app = express();

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

app.use("/", router);

// app.get("/", (req, res) => {
//   res.send("plm sada");
// });

const url =
  "mongodb+srv://crixus:crixus123@cluster-whatsapp.d54uz.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

mongoose
  .connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => app.listen(5000, () => console.log("Running on localhost:5000")))
  .catch((error) => console.log(error));
