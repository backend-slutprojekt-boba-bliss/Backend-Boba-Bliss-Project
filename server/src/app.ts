import express from "express";
import { productRouter } from "./resources/products/productRouter";

export const app = express();

app.use("/api/products", productRouter);
