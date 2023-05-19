import mongoose from "mongoose";

export async function createProducts() {
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
  }