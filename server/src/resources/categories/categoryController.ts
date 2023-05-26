import { Request, Response } from "express";
import * as yup from "yup";
import { CategoryModel } from "../categories/categoryModel";
import { ProductModel } from "../products/productModel";
import { CategorySchema } from "./categoryValidation";

// GET CATEGORY
export async function getCategory(req: Request, res: Response) {
  const category = req.params.category;
  const products = await ProductModel.find({ categories: category });
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

  try {
    await CategorySchema.validate(req.body);
  } catch (error) {
    if (error instanceof yup.ValidationError) {
      res.status(400).json(`"${error.path}" not found`);
      return;
    }
  }

  const result = await category.save();
  res.status(201).json(result);
}
