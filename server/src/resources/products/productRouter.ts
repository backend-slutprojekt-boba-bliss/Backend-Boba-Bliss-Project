import express from "express";
import { isAdmin } from "../middlewares/middlewares";
import {
  createProduct,
  deleteProduct,
  editProduct,
  getAllProducts,
} from "./productController";

export const productRouter = express.Router();

// GET ALL PRODUCTS
productRouter.get("/", getAllProducts);

//GET PRODUCT BY ID
// productRouter.get("/:id", getProductById);

// CREATE PRODUCT
productRouter.post("/", createProduct);

// EDIT PRODUCT
productRouter.put("/:id", editProduct);

// DELETE PRODUCT
productRouter.delete("/:id", deleteProduct);
