import express from "express";
import {
  createCategory,
  getCategories,
  getCategory,
} from "./categoryController";

export const categoryRouter = express.Router();

// GET CATEGORY
categoryRouter.get("/:category", getCategory);

// GET CATEGORIES
categoryRouter.get("/", getCategories);

// POST CATEGORY
categoryRouter.post("/", createCategory);
