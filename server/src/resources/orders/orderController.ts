import { Request, Response } from "express";
import { ProductModel } from "../products/productModel";
import { OrderModel } from "./orderModel";
import { createOrderSchema } from "./orderYupValidationScema";

export async function getAllOrders(req: Request, res: Response) {
    console.log("get all Orders");
    try {
        const orders = await OrderModel.find({});
        res.status(200).json(orders);
      } catch (error) {
        res.status(500).json({ message: "Error fetching orders" });
      }
}

export async function getOrderById(req: Request, res: Response) {
  console.log("get all Order by ID");
  try {
    const orderId = req.params.id
    const order = await OrderModel.findById(orderId); 
    if(!order) {
      res.status(404).json(`Order ${orderId} not found`)
    }
      res.status(200).json(order);
    } catch (error) {
      res.status(500).json({ message: "Error fetching order" });
    }
}

export async function getLoggedInUserOrders(req: Request, res: Response) {
  console.log("Get all orders by logged-in user");
  const userID = req.session!.user._id;

  try {
    const orders = await OrderModel.find({ user: userID });
    if (orders.length === 0) {
      res.status(200).json({ message: "You have made no orders yet!" });
    } else {
      res.status(200).json(orders);
    }
  } catch (error) {
    console.error("Error retrieving user orders:", error);
    res.status(500).json({ error: "Failed to retrieve user orders" });
  }
}

export async function createOrder(req: Request, res: Response) {

  //Validera inkommande order data
  try {
    await createOrderSchema.validate(req.body);
  } catch (error) {
    if(error instanceof Error){
      res.status(400).json(error.message);
    return;}
  }

  const products = req.body.products;

  // Hämtar produktinfo för varje produkt från databasen
  try {
    const productDetails = await Promise.all(
      products.map(async (product: any) => {
        const productData = await ProductModel.findById(product._id);
        // Kollar om produkten finns i lagret
        if (!productData) {
          return res.status(404).json({ error: "Product data not found!" });
        }
        // Kollar om lagerstatus är tillräcklig
        if (product.quantity > productData.inStock) {
          return res.status(400).json({ error: "Quantity of product exceeds stock!" });
        }
        // minskar produktens lager med quantity och uppdaterar i databasen
        productData.inStock -= product.quantity;
        await productData.save();
        return {
          ...productData.toObject(),
          quantity: product.quantity,
        };
      })
    );

    // Set user of order to user
    const { _id } = req.session!.user;
    const user = { _id };

    //Sätter orderdatum till nuvarande datum
    const createdAt = new Date();

    //Sätter orderstatus till false
    const isSent = false;

    const orderData = {
      ...req.body,
      user,
      createdAt,
      isSent,
      products: productDetails,
    };

    const order = new OrderModel(orderData);
    await order.save();
    res.status(201).json(order);
  } catch (error) {
    console.error(error);
    res.status(500).json("Internal Server Error");
  }
}

export async function toggleIsSent(req: Request, res: Response) {
  console.log("updating isSent");
  const order = await OrderModel.findById(req.params.id); 
  try {
    if(!order) {
      res.status(404).json(`Order ${req.params.id} not found`)
      return
    }
     order.isSent = !order.isSent;
     await order.save()
      res.status(200).json(order);
    } catch (error) {
      res.status(500).json({ message: "Error fetching order" });
    }
}

export async function deleteOrder(req: Request, res: Response) {
  try {
    // Find the post by ID
    const order = await OrderModel.findById(req.params.id);

    // Check if the post exists
    if (!order) {
      res.status(404).json({ message: "order not found" });
      return;
    }

    // Delete the post
    await OrderModel.findByIdAndDelete(req.params.id);

    // Return 204 status code - no content
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: "Error deleting order" });
  }
  
}