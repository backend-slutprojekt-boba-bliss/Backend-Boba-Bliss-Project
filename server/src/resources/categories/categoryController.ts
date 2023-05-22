import { Request, Response } from "express";
import { ProductModel } from "../products/productModel";

// GET CATEGORY
export async function getCategory(req: Request, res: Response) {
  console.log("Get category");

  const category = req.params.category;
  const products = await ProductModel.find({});

  const filteredProducts = products.filter(
    (product) => product.category === category
  );

  res.json(filteredProducts);
}
