import { InferSchemaType, Schema, model } from "mongoose";

const categorySchema = new Schema({
  name: { type: String, required: true },
});

export type Category = InferSchemaType<typeof categorySchema>;

export const CategorySchema = model("Category", categorySchema);
