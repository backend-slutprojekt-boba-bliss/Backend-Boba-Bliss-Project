import express from "express";
import {
  createProduct,
  deleteProduct,
  editProduct,
  getAllProducts
} from "./productControllers";

export const productRouter = express.Router();

// GET ALL PRODUCTS
productRouter.get("/", getAllProducts);

//GET PRODUCT BY ID

// productRouter.get("/:id", getProductById);

// CREATE PRODUCT
productRouter.post("/", createProduct);

// EDIT PRODUCT
productRouter.put("/:id", editProduct);


productRouter.delete("/:id", deleteProduct);
