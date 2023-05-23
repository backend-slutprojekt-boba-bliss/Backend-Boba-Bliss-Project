import { Request, Response } from "express";
import { Order, OrderModel } from "./orderModel";

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
  const orderData: Order = { ...req.body };

 // vilka produkter är i korgen? hämtar dom här från db
  
  const order = new OrderModel(orderData);
  //order.user = req.session.id
  await order.save();
  res.status(201).json(order);
}