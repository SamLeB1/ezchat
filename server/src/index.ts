import "dotenv/config";
import express from "express";
import connectDB from "./config/db";
import authRouter from "./routes/auth";

const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.json());
connectDB();

app.use("/api/auth", authRouter);

app.listen(PORT, () => {
  console.log(`Running on port ${PORT}`);
});
