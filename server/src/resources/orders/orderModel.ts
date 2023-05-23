import { Address } from "cluster";
import "express-async-errors";
import mongoose, { InferSchemaType, Schema, SchemaTypes, model } from "mongoose";
import { Product } from "../products/productModel";

interface AddressInterface {
  firstName: string;
  lastName: string;
  street: string;
  zipCode: number;
  city: string;
}

const addressSchema = new mongoose.Schema<AddressInterface>({
  firstName: String,
  lastName: String,
  street: String,
  zipCode: Number,
  city: String,
});
const Address = mongoose.model('Address', addressSchema)

interface OrderInterface  {
  products: Product[],
  user: Number,
  deliveryAddress: Address,
  createdAt: Date,
  isSent: Boolean

}

const orderSchema = new Schema({
      products: { type: [{ type: SchemaTypes.ObjectId, ref: 'Product' }], required: true },
      user: { type: SchemaTypes.ObjectId, ref: 'user' },
      deliveryAddress: {
        type: Address,
        required: true,
      },
      createdAt: {type:Date, required:true},
      isSent: {type:Boolean, required:true},
    });


export type Order = InferSchemaType<typeof orderSchema>;

export const OrderModel = model("Order", orderSchema);