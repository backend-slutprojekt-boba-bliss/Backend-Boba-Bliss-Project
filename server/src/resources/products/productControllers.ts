import { Request, Response } from "express";
import { ProductModel } from "./productModel";

export async function getAllProducts(req: Request, res: Response) {
  console.log("get all products");
}

export async function createProduct(req: Request, res: Response) {
  console.log("hello from createProduct");
  const productData = { ...req.body };
  const product = new ProductModel(productData);

  await product.save();
  res.status(201).json(product);
}

export async function editProduct(req: Request, res: Response) {
  console.log("updating product");
}

export async function deleteProduct(req: Request, res: Response) {
  console.log("deleting product");
}
