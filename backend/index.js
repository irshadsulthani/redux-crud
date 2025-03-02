import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const port = 3000;

mongoose
  .connect(process.env.MONGO)
  .then(() => {
    console.log("MongoDB connected successfully ✅");
    app.listen(port, () => {
      console.log(`Server running at http://localhost:${port}`);
    });
  })
  .catch((err) => {
    console.error("MongoDB connection failed ❌", err);
  });
