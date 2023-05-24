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

  let { products, user, deliveryAdress} = req.body;
  const createdAt = new Date

  
  
  if (req.session.id) {

    const user = await UserModel.findById(req.session.);
  }
  console.log(user)

  const orderData = {...req.body}
  //const orderData: Order = { ...req.body };


 // vilka produkter är i korgen? hämtar dom här från db
  //const order = new OrderModel(orderData);
  //order.user = req.session.id
  //await order.save();
  //res.status(201).json(order);
}