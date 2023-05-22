import { InferSchemaType, Schema, model } from "mongoose";
import argon2 from 'argon2';

export const userSchema = new Schema({
  username: { type: String, required: true, minlength: 3 },
  password: {
    type: String,
    required: true,
    minlength: 8, // Minimum längd är nu 8 karaktärer
    match: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/, // Vanligt mönster för lösenordssäkerhet
  },
  isAdmin: { type: Boolean, default: false },
});

userSchema.pre("save", async function(next: () => void) {
  this.password = await argon2.hash(this.password, {
    timeCost: 2,
    memoryCost: 1024
  });
});

export type User = InferSchemaType<typeof userSchema>;

export const UserModel = model("user", userSchema);
