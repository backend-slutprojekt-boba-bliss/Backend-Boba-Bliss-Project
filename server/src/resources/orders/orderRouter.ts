import express from "express";
import { isAdmin, isLoggedin } from "../middlewares/middlewares";
import { createOrder, deleteOrder, getAllOrders, getLoggedInUserOrders, getOrderById, toggleIsSent } from "./orderController";

export const orderRouter = express.Router();

// GET ALL orders
orderRouter.get("/", isLoggedin, isAdmin, getAllOrders);

//Get order by ID
orderRouter.get("/id/:id", isLoggedin, getOrderById);

//GET ORDERS BY LOGGED IN USER
orderRouter.get("/user", isLoggedin, getLoggedInUserOrders);


// CREATE order
orderRouter.post("/", isLoggedin, createOrder);

// Toggle isSent
orderRouter.put("/:id", isLoggedin, isAdmin, toggleIsSent);

// DELETE order
orderRouter.delete("/:id",isLoggedin, isAdmin, deleteOrder);