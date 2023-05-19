import mongoose from "mongoose";

export async function createOrders() {
  interface Address {
    street: string;
    zipCode: string;
    city: string;
  }

  try {
    const AddressSchema = new mongoose.Schema<Address>({
      street: String,
      zipCode: String,
      city: String,
    });

    const OrderSchema = new mongoose.Schema({
      products: [],
      deliveryAddress: {
        type: AddressSchema,
        required: true,
      },
      firstName: String,
      lastName: String,
      createdAt: Date,
      isSent: Boolean,
    });

    // Create the Order model using the Order schema
    const Order = mongoose.model("Order", OrderSchema);

    // Create an array of Orders
    const Orders = [
      {},
    ];

    // Create documents for each Order and save them to the database
    const createdOrders = await Order.create(Orders);

    console.log("Orders created successfully:", createdOrders);
  } catch (error) {
    console.error("Error creating Orders:", error);
  }
}
