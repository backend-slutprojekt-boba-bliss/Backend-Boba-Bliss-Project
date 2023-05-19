import { Request, Response } from "express";

export async function getAllProducts(req: Request, res: Response) {
  console.log("get all posts");
}

export async function createProduct(req: Request, res: Response) {
  console.log("Create a post");
}

export async function editProduct(req: Request, res: Response) {
  console.log("updating product");
}

export async function deleteProduct(req: Request, res: Response) {
  console.log("deleting product");
}
