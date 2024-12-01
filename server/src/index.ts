import "dotenv/config";
import express from "express";
import cors from "cors";
import connectDB from "./config/db";
import authRouter from "./routes/auth";
import userRouter from "./routes/users";
import chatRouter from "./routes/chats";
import messageRouter from "./routes/messages";

const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.json());
app.use(cors());
connectDB();

app.use("/api/auth", authRouter);
app.use("/api/users", userRouter);
app.use("/api/chats", chatRouter);
app.use("/api/messages", messageRouter);

app.listen(PORT, () => {
  console.log(`Running on port ${PORT}`);
});
