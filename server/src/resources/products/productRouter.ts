import express from "express";
import {
  createProduct,
  deleteProduct,
  getAllProducts,
} from "./productControllers";

export const productRouter = express.Router();

// GET ALL PRODUCTS
productRouter.get("/", getAllProducts);

//GET PRODUCT BY ID

// productRouter.get("/:id", getProductById);

// CREATE PRODUCT
productRouter.post("/", createProduct);

// productRouter.put("/:id", updateProduct);

productRouter.delete("/:id", deleteProduct);
