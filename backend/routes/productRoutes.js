import express from "express";
import { ProductModel } from "../models/productModel.js";

var router = express.Router();
//api for save data in db

router.post("/users", async (req, res) => {
  try {
    if (
      !req.body.firstName ||
      !req.body.lastName ||
      !req.body.email ||
      !req.body.profileImageLink
    ) {
      return res.status(400).send("Required product name & price & quantity");
    }

    var newProduct = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      profileImageLink: req.body.profileImageLink,
    };

    var result = await ProductModel.create(newProduct);
    res.status(201).send(result);
  } catch (error) {
    console.log(error);
    res.status(500).send("server error");
  }
});

router.get("/", async (req, res) => {
  try {
    var allProducts = await ProductModel.find({});

    res.status(200).send(allProducts);
  } catch (error) {
    console.log(error);
    res.status(500).send("server error");
  }
});

//api to get single product

router.get("/:id", async (req, res) => {
  try {
    var { id } = req.params;
    var singleProduct = await ProductModel.findById(id);
    res.status(200).send(singleProduct);
  } catch (error) {
    res.status(500).send("server error");
  }
});

//api to update data in database

router.put("/:id", async (req, res) => {
  try {
    if (
      !req.body.firstName ||
      !req.body.lastName ||
      !req.body.email ||
      !req.body.profileImageLink
    ) {
      return res.status(400).send("Required product name & price & quantity");
    }

    var { id } = req.params;
    var result = await ProductModel.findByIdAndUpdate(id, req.body);

    if (!result) {
      return res.status(404).send("Product not found");
    } else {
      return res.status(200).send("Product updated in db");
    }
  } catch (error) {
    res.status(500).send("server error");
  }
});

//api to delete data in db

router.delete("/:id", async (req, res) => {
  try {
    var { id } = req.params;
    var result = await ProductModel.findByIdAndDelete(id);
    console.log(result);
    if (!result) {
      return res.status(404).send("Product not found");
    }
    return res.status(200).send("Product delete in DB");
  } catch (error) {
    res.status(500).send("server error");
  }
});

export default router;
