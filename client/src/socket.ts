import { io, Socket } from "socket.io-client";
import { Chat, Message } from "./types.ts";

interface ServerToClientEvents {
  "add-chat": (chat: Chat) => void;
  "receive-msg": (msg: Message) => void;
}

interface ClientToServerEvents {
  "join-room": (room: string) => void;
  "join-chats": (chatIds: string[]) => void;
  "add-chat": (chat: Chat) => void;
  "send-msg": (msg: Message) => void;
}

const URL = import.meta.env.VITE_SERVER;
export const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io(
  URL,
  { autoConnect: false },
);
