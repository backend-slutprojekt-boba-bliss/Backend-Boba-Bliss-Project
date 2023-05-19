import mongoose from "mongoose";
import { app } from "./app";

async function main() {
  try {
    await mongoose.connect(
      `mongodb+srv://BobaTea:BobaTea@slutprojekt-backend.0lfqeuo.mongodb.net/`
    );
    console.log("Connected to Database");

    app.listen(3000, () => {
      console.log("Server is running: http://localhost:3000");
    });
    
  } catch (error) {
    console.error("Error starting server:", error);
  }
}

main().catch(console.error);
