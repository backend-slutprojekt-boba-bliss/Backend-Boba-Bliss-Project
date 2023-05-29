import cookieSession from "cookie-session";
import express, { NextFunction, Request, Response } from "express";
import { categoryRouter } from "./resources/categories/categoryRouter";
import { fileRouter } from "./resources/files/fileRouter";
import { orderRouter } from "./resources/orders/orderRouter";
import { productRouter } from "./resources/products/productRouter";
import { userRouter } from "./resources/users/userRouter";

export const app = express();

app.use(
  cookieSession({
    name: "login",
    secure: false,
    httpOnly: true,
    secret: "as98d7asyudbahs8d97a6digas78d866u",
    maxAge: 1000 * 60000,
  })
);

app.use(express.json());

app.use("/api/products", productRouter);
app.use("/api/products/category", categoryRouter);
app.use("/api/orders", orderRouter);
app.use("/api/users", userRouter);
app.use("/api/file", fileRouter);
// app.get('/api/loggedinornot', checkIfLoggedIn);

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  res.sendStatus(500);
  console.error(err);
});
