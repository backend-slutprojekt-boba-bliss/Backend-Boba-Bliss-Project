import mongoose from "mongoose";
import { app } from "./app"

async function main() {

  await mongoose.connect(
    `mongodb+srv://BobaTea:BobaTea@slutprojekt-backend.0lfqeuo.mongodb.net/`
  );
  console.log("Connected to Database");

  app.listen(3000, () => {
    console.log("Server is running: http://localhost:3000");
  });
}

main().catch(console.error);
