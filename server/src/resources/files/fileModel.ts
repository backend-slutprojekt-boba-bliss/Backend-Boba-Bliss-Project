import mongoose from "mongoose";

export let fileBucket: mongoose.mongo.GridFSBucket;

mongoose.connection.on("open", () => {
  // Skapa bucket'en först efter att mongoose har kopplat upp sig mot databasen
  fileBucket = new mongoose.mongo.GridFSBucket(mongoose.connection.db, {
    bucketName: "files",
  });
});
