// var express = require('express')

import express from "express";
import { PORT } from "./config.js";
import { mongodbURL } from "./config.js";
import mongoose from "mongoose";
import { ProductModel } from "./models/productModel.js";
import productRoutes from "./routes/productRoutes.js";
import cors from "cors";
import userRoutes from "./routes/userRoutes.js";

var app = express();

app.use(cors());

app.use(express.json());

// app.get("/", (req, res) => {
//   console.log(req.body);
//   res.send({ data: "Hello server" });
// });

/* app.use("/", (req, res) => {
  console.log(req.body);
  res.send("Hello Connected");
}); */

app.use("/", productRoutes);
app.use("/", userRoutes)

app.listen(PORT, () => {
  console.log(`SERVER STARTED IN PORT ${PORT}`);
});

mongoose
  .connect(mongodbURL)
  .then(() => {
    console.log("DB CONNECTED SUCCESSFULLY");
  })
  .catch((err) => {
    console.log(err);
  });
