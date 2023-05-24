import { Request, Response } from "express";
import { ProductModel } from "../products/productModel";
import { OrderModel } from "./orderModel";

export async function getAllOrders(req: Request, res: Response) {
    console.log("get all Orders");
    try {
        const orders = await OrderModel.find({});
        res.status(200).json(orders);
      } catch (error) {
        res.status(500).json({ message: "Error fetching orders" });
      }
}

export async function createOrder(req: Request, res: Response) {
  console.log("Active session is:", req.session);

  if (!req.session || !req.session.user) {
    res.status(401).json("You must log in to create an order!");
    return;
  }

  const products = req.body.products;
  console.log("Product IDs:", products);

  // Retrieve product details from the database
  try {
    const productDetails = await Promise.all(
      products.map(async (product: any) => {
        const productData = await ProductModel.findById(product._id);
        return {
          ...productData?.toObject(),
          quantity: product.quantity
        };
      })
    );

    console.log("Product Details:", productDetails);

    // Set user of order to user
    const { _id, email } = req.session.user;
    const user = { _id, email };
    console.log("User:", user);

    const createdAt = new Date();
    console.log("Created At:", createdAt);

    const isSent = false;

    const orderData = {
      ...req.body,
      user,
      createdAt,
      isSent,
      products: productDetails
    };

    const order = new OrderModel(orderData);
    await order.save();
    res.status(200).json(order);
  } catch (error) {
    console.error(error);
    res.status(500).json("Internal Server Error");
  }
}