import "dotenv/config";
import express from "express";
import cors from "cors";
import connectDB from "./config/db";
import authRouter from "./routes/auth";
import userRouter from "./routes/users";
import chatRouter from "./routes/chats";

const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.json());
app.use(cors());
connectDB();

app.use("/api/auth", authRouter);
app.use("/api/users", userRouter);
app.use("/api/chats", chatRouter);

app.listen(PORT, () => {
  console.log(`Running on port ${PORT}`);
});
