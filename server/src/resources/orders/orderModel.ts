
import "express-async-errors";
import mongoose, { InferSchemaType, Schema, SchemaTypes, model } from "mongoose";
import { productSchema } from "../products/productModel";



const addressSchema = new mongoose.Schema({
  firstName: {type:String, required: true},
  lastName: {type:String, required: true},
  street: {type:String, required: true},
  zipCode: {type: Number, required: true},
  city: {type:String, required: true},
});


const orderSchema = new Schema({
      products:[ { type: productSchema, required: true }],
      user: { type: SchemaTypes.ObjectId, ref: 'user' },
      deliveryAddress: {type: addressSchema, required:true},
      createdAt: {type:Date, required:true},
      isSent: {type:Boolean, required:true},
    });

export type Address = InferSchemaType<typeof addressSchema>;
export type Order = InferSchemaType<typeof orderSchema>;

export const OrderModel = model("Order", orderSchema);