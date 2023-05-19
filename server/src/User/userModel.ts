import mongoose from "mongoose";

export async function createUsers() {
    try {
      const userSchema = new mongoose.Schema({
        email: String,
        password: String,
        isAdmin: Boolean,
      });
  
      // Create the user model using the user schema
      const user = mongoose.model("user", userSchema);
  
      // Create an array of users
      const users = [
        {email: "Linus.skolansmejl@gmail.com", password: "HejhejHemligtHemligt", isAdmin: false,}
      ];
  
      // Create documents for each user and save them to the database
      const createdusers = await user.create(users);
  
      console.log("users created successfully:", createdusers);
    } catch (error) {
      console.error("Error creating users:", error);
    } finally {
    }
  }