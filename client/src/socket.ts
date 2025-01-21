import { io, Socket } from "socket.io-client";
import { Chat, Message } from "./types.ts";

interface ServerToClientEvents {
  "add-chat": (chat: Chat) => void;
  "receive-msg": (msg: Message) => void;
  "show-typing": (chatId: string) => void;
  "hide-typing": (chatId: string) => void;
}

interface ClientToServerEvents {
  "join-room": (room: string) => void;
  "join-chats": (chatIds: string[]) => void;
  "add-chat": (chat: Chat) => void;
  "send-msg": (msg: Message) => void;
  "show-typing": (chatId: string) => void;
  "hide-typing": (chatId: string) => void;
}

const URL = import.meta.env.VITE_SERVER;
export const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io(
  URL,
  { autoConnect: false },
);
