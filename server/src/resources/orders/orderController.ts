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

export async function createOrder(req: Request, res: Response) {
  //Kollar att du är inloggad
  if (!req.session || !req.session.user) {
    res.status(401).json({ error: "You must log in to create an order!" });
    return;
  }
  //Validera inkommande order data
  try {
    await createOrderSchema.validate(req.body);
  } catch (error) {
    res.status(400).json(error.message);
    return;
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
    const { _id } = req.session.user;
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
    res.status(200).json(order);
  } catch (error) {
    console.error(error);
    res.status(500).json("Internal Server Error");
  }
}