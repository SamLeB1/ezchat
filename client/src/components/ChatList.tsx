import { useEffect } from "react";
import axios from "axios";
import { socket } from "../socket.ts";
import useAuthContext from "../hooks/useAuthContext.tsx";
import useChatsContext from "../hooks/useChatsContext.tsx";
import useGetChatName from "../hooks/useGetChatName.tsx";

export default function ChatList() {
  const { stateAuth } = useAuthContext();
  const { stateChats, dispatchChats } = useChatsContext();
  const getChatName = useGetChatName();
  const root = document.getElementById("root");
  const maxHeight = root ? root.offsetHeight - 176 : 0;

  function getMessagePreview(message: string) {
    return message.length <= 75 ? message : message.substring(0, 75) + "...";
  }

  function getTimestamp(date: Date) {
    const msPassed = Date.now() - date.getTime();
    const sPassed = Math.floor(msPassed / 1000);
    const mPassed = Math.floor(sPassed / 60);
    const hPassed = Math.floor(mPassed / 60);
    const dPassed = Math.floor(hPassed / 24);
    if (mPassed < 1) return "Just now";
    else if (hPassed < 1) return `${mPassed}m`;
    else if (dPassed < 1) return `${hPassed}h`;
    else if (dPassed < 7) return `${dPassed}d`;
    else return date.toISOString().split("T")[0];
  }

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_SERVER}/api/chats`, {
        headers: {
          Authorization: `Bearer ${stateAuth.user?.token}`,
        },
      })
      .then((res) => {
        dispatchChats({ type: "SET", payload: res.data });
        const chatIds = res.data.map((chat) => chat._id);
        socket.emit("join-chats", chatIds);
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="mt-2 overflow-y-auto" style={{ maxHeight }}>
      {stateChats.chats.map((chat, i) => {
        return (
          <div
            key={i}
            className="mt-2 cursor-pointer rounded-lg bg-white px-2 py-1 shadow first:mt-0"
            onClick={() => dispatchChats({ type: "SELECT", payload: chat })}
          >
            <div className="flex items-center justify-between">
              <div className="font-medium">{getChatName(chat)}</div>
              {chat.latestMessage && (
                <div className="text-sm text-gray-500">
                  {getTimestamp(new Date(chat.latestMessage.createdAt))}
                </div>
              )}
            </div>
            <div className="break-words text-sm">
              {chat.latestMessage
                ? `${chat.latestMessage.sender.username}: ${getMessagePreview(chat.latestMessage.content)}`
                : "No messages"}
            </div>
          </div>
        );
      })}
    </div>
  );
}
