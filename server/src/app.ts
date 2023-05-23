import cors from "cors";
import express, { NextFunction, Request, Response } from "express";
import { orderRouter } from "./resources/orders/orderRouter";
import { productRouter } from "./resources/products/productRouter";
import { userRouter } from "./resources/users/userRouter";
import session from "express-session";

export const app = express();

app.use(session({
  secret: 'secret-key', //replace with your own secret key
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false } // true if you want to use https
}));

app.use(cors({ credentials: true, origin: "http://localhost:5173" }));

app.use(express.json());

app.use("/api/products", productRouter);
app.use("/api/orders", orderRouter);
app.use("/api/users", userRouter);

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  res.sendStatus(500);
  console.error(err);
});
