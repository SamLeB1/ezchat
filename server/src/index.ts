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
import { Chat, Message } from "./types/types";

interface ClientToServerEvents {
  "join-room": (room: string) => void;
  "join-chats": (chatIds: string[]) => void;
  "add-chat": (chat: Chat) => void;
  "send-msg": (msg: Message) => void;
  "show-typing": (chatId: string) => void;
  "hide-typing": (chatId: string) => void;
}

interface ServerToClientEvents {
  "add-chat": (chat: Chat) => void;
  "receive-msg": (msg: Message) => void;
  "show-typing": (chatId: string) => void;
  "hide-typing": (chatId: string) => void;
}

const PORT = process.env.PORT || 3000;
const app = express();
const httpServer = createServer(app);
const io = new Server<ClientToServerEvents, ServerToClientEvents>(httpServer, {
  cors: {
    origin: "*",
  },
});
connectDB();

app.use(express.json({ limit: "8mb" }));
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
    const userIds = chat.users.map((user) => user._id);
    socket.to(userIds).emit("add-chat", chat);
  });

  socket.on("send-msg", (msg) => {
    socket.to(msg.chat).emit("receive-msg", msg);
  });

  socket.on("show-typing", (chatId) => {
    socket.to(chatId).emit("show-typing", chatId);
  });

  socket.on("hide-typing", (chatId) => {
    socket.to(chatId).emit("hide-typing", chatId);
  });
});

httpServer.listen(PORT, () => {
  console.log(`Running on port ${PORT}`);
});
