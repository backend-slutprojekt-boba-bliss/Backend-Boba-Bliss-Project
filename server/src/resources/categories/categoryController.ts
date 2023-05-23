import { Request, Response } from "express";
import { CategoryModel } from "../categories/categoryModel";
import { ProductModel } from "../products/productModel";

// GET CATEGORY
export async function getCategory(req: Request, res: Response) {
  const category = req.params.category;
  const products = await ProductModel.find({ category: category });
  res.json(products);
}

// GET CATEGORIES
export async function getCategories(req: Request, res: Response) {
  const categories = await CategoryModel.find({});
  res.json(categories);
}

// CREATE CATEGORY
export async function createCategory(req: Request, res: Response) {
  const category = new CategoryModel({
    name: req.body.name,
  });

  const result = await category.save();
  res.status(201).json(result);
}
