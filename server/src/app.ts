import express, { NextFunction, Request, Response } from "express";
import { productRouter } from "./resources/products/productRouter";

export const app = express();
app.use(express.json());

app.use("/api/products", productRouter);

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  res.sendStatus(500);
  console.error(err);
});
