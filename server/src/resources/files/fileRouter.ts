import express from "express";
import { getFileById, uploadFile } from "./fileController";

export const fileRouter = express.Router();

// POST FILE
fileRouter.post("/", uploadFile);

// GET FILE BY ID
fileRouter.get("/:id", getFileById);
