import "express-async-errors";
import { InferSchemaType, Schema, model } from "mongoose";

/*export async function createProducts() {
    try {
      const productSchema = new mongoose.Schema({
        imageUpload: String,
        imageAlt: String,
        title: String,
        description: String,
        price: Number,
        backgroundColour: String,
        quantity: Number,
        inStock: Number,
      });
  
      // Create the Product model using the product schema
      const Product = mongoose.model("Product", productSchema);
  
      // Create an array of products
      const products = [
        { title: "Product 1", price: 10, imageUpload: "Hejhejhej", imageAlt: "HejhejDÅ", description: "Detta är världens godaste Bobate", backgroundColour: "Väldigt grön", quantity: 4000, inStock: 2 },
      ];
  
      // Create documents for each product and save them to the database
      const createdProducts = await Product.create(products);
  
      console.log("Products created successfully:", createdProducts);
    } catch (error) {
      console.error("Error creating products:", error);
    } finally {
    }
  }*/

const productSchema = new Schema({
  imageUpload: { type: String, required: true },
  imageAlt: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  backgroundColor: { type: String, required: true },
  quantity: { type: Number, required: false },
  inStock: { type: Number, required: true },
});

export type Product = InferSchemaType<typeof productSchema>;

export const ProductModel = model("Product", productSchema);
