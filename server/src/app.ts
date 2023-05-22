import cors from "cors";
import express, { NextFunction, Request, Response } from "express";
import { categoryRouter } from "./resources/categories/categoryRouter";
import { productRouter } from "./resources/products/productRouter";

export const app = express();
app.use(cors({ credentials: true, origin: "http://localhost:5173" }));

app.use(express.json());

app.use("/api/products", productRouter);
app.use("/api/products/category", categoryRouter);

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  res.sendStatus(500);
  console.error(err);
});
