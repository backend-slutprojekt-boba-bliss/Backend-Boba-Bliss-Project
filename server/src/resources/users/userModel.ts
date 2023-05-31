import { InferSchemaType, Schema, model } from "mongoose";

export const userSchema = new Schema({
  email: { type: String, required: true, minlength: 3 },
  password: {
    type: String,
    required: true,
    minlength: 3,
  },
  isAdmin: { type: Boolean, default: false },
});

export type User = InferSchemaType<typeof userSchema>;

export const UserModel = model("user", userSchema);
