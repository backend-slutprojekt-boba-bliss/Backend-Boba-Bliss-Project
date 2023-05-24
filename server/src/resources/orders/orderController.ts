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
  try {
    const sessionResponse = await fetch("/api/session");
    if (sessionResponse.ok) {
      const { user } = await sessionResponse.json();
      const orderData = {...req.body, user };
      // ... Gör vad du vill med userDatan härifrån, den är hämtad och sparad i userobjektet....

      res.status(201).json(orderData);
    } else {
      res.status(401).send("No active session");
    }
  } catch (error) {
    console.error(error);
    res.status(500).send(`Internal Server Error ${error.message}`);
  }
}