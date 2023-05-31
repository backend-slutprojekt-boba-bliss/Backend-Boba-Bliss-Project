import { Request, Response } from "express";
import "express-async-errors";
import * as yup from "yup";
import { ProductModel } from "./productModel";
import { ProductSchema, editProductSchema } from "./productValidation";

// GET PRODUCTS
export async function getAllProducts(req: Request, res: Response) {
  try {
    const products = await ProductModel.find({});
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: "Error fetching products" });
  }
}

// CREATE PRODUCT
export async function createProduct(req: Request, res: Response) {
  try {
    await ProductSchema.validate(req.body);
  } catch (error) {
    if (error instanceof yup.ValidationError) {
      res.status(400).json(`"${error.path}" not found`);
      return;
    }
  }

  const productData = { ...req.body };
  const product = new ProductModel(productData);

  await product.save();
  res.status(201).json(product);
}

// EDIT PRODUCT
export async function editProduct(req: Request, res: Response) {
  try {
    await editProductSchema.validate(req.body);
  } catch (error) {
    if (error instanceof yup.ValidationError) {
      res.status(400).json(`"${error.path}" not found`);
      return;
    }
  }

  const product = await ProductModel.findById(req.params.id);
  if (!product) {
    res.status(404).json({ message: `Post ${req.params.id} not found` });
    return;
  }

  try {
    const updatedProduct = await ProductModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updatedProduct) {
      // If the product is not found, return a 404 response
      res.status(404).json({ message: `product ${req.params.id} not found` });
      return;
    }

    // If the product is found and updated, return the updated product
    res.status(200).json(updatedProduct);
  } catch (error) {
    // If there is an error, return a 500 response with an error message
    res.status(500).json({ message: "Error updating product" });
  }
}

// DELETE PRODUCT
export async function deleteProduct(req: Request, res: Response) {
  try {
    const product = await ProductModel.findById(req.params.id);
    if (!product) {
      res.status(404).json({ message: "Product not found" });
      return;
    }
    await ProductModel.findByIdAndDelete(req.params.id);
    res.status(204).send("Product is deleted");
  } catch (error) {
    res.status(500).json({ message: "Error deleting product" });
  }
}
