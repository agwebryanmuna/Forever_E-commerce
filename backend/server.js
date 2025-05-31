import express from "express";
import cors from "cors";
import "dotenv/config";
import { connectDb } from "./config/mongodb.js";
import { connecCloudinary } from "./config/cloudinary.js";

// App config
const app = express();
const port = process.env.PORT || 4000;
connectDb();
connecCloudinary();

// middlewares
app.use(express.json()); // parse body of requests
app.use(cors()); // Access backend from any ip/domain

// api endpoints

app.get("/", (req, res) => {
  res.send("API working 😊");
});

app.listen(port, () =>
  console.log(`Server running on http://localhost:${port}`)
);
