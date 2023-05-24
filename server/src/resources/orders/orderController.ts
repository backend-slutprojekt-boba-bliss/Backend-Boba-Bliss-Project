import { Request, Response } from "express";
import { Order, OrderInterface, OrderModel } from "./orderModel";

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
    try {
      // Extract the necessary data from the request body
      const { products, user, deliveryAddress, createdAt, isSent }: OrderInterface = req.body;
  
      // Create a new order using the OrderModel
      const newOrder: Order = await OrderModel.create({
        products,
        user,
        deliveryAddress,
        createdAt,
        isSent,
      });
  
      // Return the created order in the response
      return res.status(201).json(newOrder);
    } catch (error) {
      // Handle any errors that occur during the creation process
      console.error('Error creating order:', error);
      return res.status(500).json({ error: 'Failed to create order' });
    }
  }