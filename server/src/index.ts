import "dotenv/config";
import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import cors from "cors";
import connectDB from "./config/db";
import authRouter from "./routes/auth";
import userRouter from "./routes/users";
import chatRouter from "./routes/chats";
import messageRouter from "./routes/messages";

const PORT = process.env.PORT || 3000;
const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "*",
  },
});
connectDB();

app.use(express.json());
app.use(cors());
app.use("/api/auth", authRouter);
app.use("/api/users", userRouter);
app.use("/api/chats", chatRouter);
app.use("/api/messages", messageRouter);

io.on("connection", (socket) => {
  console.log(`Socket ${socket.id} has connected.`);

  socket.on("join-room", (room) => {
    socket.join(room);
  });

  socket.on("join-chats", (chatIds) => {
    socket.join(chatIds);
  });

  socket.on("add-chat", (chat) => {
    const userIds = chat.users.map((user: any) => user._id);
    socket.to(userIds).emit("add-chat", chat);
  });

  socket.on("send-msg", (msg) => {
    socket.to(msg.chat).emit("receive-msg", msg);
  });
});

httpServer.listen(PORT, () => {
  console.log(`Running on port ${PORT}`);
});
