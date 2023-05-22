import express from "express";
import { getCategory } from "./categoryController";

export const categoryRouter = express.Router();

// GET CATEGORY
categoryRouter.get("/:category", getCategory);
