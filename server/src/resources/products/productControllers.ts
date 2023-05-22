import { Request, Response } from "express";
import "express-async-errors";
import { ProductModel } from "./productModel";

export async function getAllProducts(req: Request, res: Response) {
  console.log("get all products");
  try {
    const products = await ProductModel.find({});
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: "Error fetching products" });
  }
}

export async function createProduct(req: Request, res: Response) {
  console.log("Product data received:", req.body);
  const productData = { ...req.body };
  const product = new ProductModel(productData);

  await product.save();
  console.log("Product saved:", product);
  res.status(201).json(product);
}

export async function editProduct(req: Request, res: Response) {
  console.log("updating product");
}

export async function deleteProduct(req: Request, res: Response) {
  console.log("deleting product");
}
