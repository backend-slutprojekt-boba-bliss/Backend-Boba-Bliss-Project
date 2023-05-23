import express from "express";
import { createOrder, getAllOrders } from "./orderController";

export const orderRouter = express.Router();

// GET ALL PRODUCTS
orderRouter.get("/", getAllOrders);

//GET order BY ID
// orderRouter.get("/:id", getOrderById);

// CREATE order
orderRouter.post("/", createOrder);

// DELETE order
//orderRouter.delete("/:id", deleteOrder);

// EDIT order
//orderRouter.put("/:id", order);