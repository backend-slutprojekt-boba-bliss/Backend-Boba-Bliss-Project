import { InferSchemaType, Schema, model } from "mongoose";

export const userSchema = new Schema({
  email: { type: String, required: true, minlength: 3 },
  password: {
    type: String,
    required: true,
    minlength: 8, // Minimum längd är nu 8 karaktärer
    match: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/, // Vanligt mönster för lösenordssäkerhet
  },
  isAdmin: { type: Boolean, default: false },
});

export type User = InferSchemaType<typeof userSchema>;

export const UserModel = model("user", userSchema);
