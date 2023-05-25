import express from "express";
import { isAdmin, isLoggedin } from "../middlewares/middlewares";
import { createOrder, deleteOrder, getAllOrders, getOrderById, toggleIsSent } from "./orderController";

export const orderRouter = express.Router();

// GET ALL orders
orderRouter.get("/", isAdmin, getAllOrders);

//Get order by ID
orderRouter.get("/:id", getOrderById);

// CREATE order
orderRouter.post("/", isLoggedin, createOrder);

// Toggle isSent
orderRouter.put("/:id", isAdmin, toggleIsSent);

// DELETE order
orderRouter.delete("/:id", isAdmin, deleteOrder);