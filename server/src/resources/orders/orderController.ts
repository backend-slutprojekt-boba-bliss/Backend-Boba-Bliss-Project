import { UserModel } from "../users/userModel";
import { Request, Response } from "express";
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

  const { _id, email } = req.session.user;
  const user = { _id, email };
  console.log(user);

  const orderData = { ...req.body };
  res.status(200).json(orderData);
}