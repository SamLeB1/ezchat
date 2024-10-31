import mongoose from "mongoose";

export default function connectDB() {
  const url = process.env.MONGODB_URL;
  try {
    if (!url) throw new Error("MONGODB_URL is undefined.");
    mongoose.connect(url);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
  const dbConnection = mongoose.connection;
  dbConnection.once("open", () => {
    console.log(`Database connected: ${url}`);
  });
  dbConnection.on("error", (err) => {
    console.error(err);
  });
  return;
}
