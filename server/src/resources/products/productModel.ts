import "express-async-errors";
import { InferSchemaType, Schema, model } from "mongoose";

const productSchema = new Schema({
  image: { type: String, required: true },
  imageAlt: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  bgColor: { type: String, required: true },
  quantity: { type: Number, required: false },
  inStock: { type: Number, required: true },
  category: { type: String, required: true },
});

export type Product = InferSchemaType<typeof productSchema>;

export const ProductModel = model("Product", productSchema);
