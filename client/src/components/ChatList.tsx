import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import ClipLoader from "react-spinners/ClipLoader";
import { socket } from "../socket.ts";
import useAuthContext from "../hooks/useAuthContext.tsx";
import useChatsContext from "../hooks/useChatsContext.tsx";
import useNotificationsContext from "../hooks/useNotificationsContext.tsx";
import useGetChatName from "../hooks/useGetChatName.tsx";
import { Chat } from "../types.ts";

export default function ChatList() {
  const [isLoading, setIsLoading] = useState(false);
  const [refetchCount, setRefetchCount] = useState(0);
  const { stateAuth } = useAuthContext();
  const { stateChats, dispatchChats } = useChatsContext();
  const { stateNotifications, dispatchNotifications } =
    useNotificationsContext();
  const { getChatName } = useGetChatName();
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

  function isNotification(chatId: string) {
    if (
      stateNotifications.chats.find((chat) => chat._id === chatId) ||
      stateNotifications.messages.find((message) => message.chat === chatId)
    )
      return true;
    else return false;
  }

  useEffect(() => {
    setIsLoading(true);
    axios
      .get(`${import.meta.env.VITE_SERVER}/api/chats`, {
        headers: {
          Authorization: `Bearer ${stateAuth.user?.token}`,
        },
      })
      .then((res) => {
        dispatchChats({ type: "SET", payload: res.data });
        const chatIds = res.data.map((chat: Chat) => chat._id);
        socket.emit("join-chats", chatIds);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error(err);
        toast.error("Chat data couldn't be fetched. Retrying...");
        setTimeout(() => setRefetchCount(refetchCount + 1), 5000);
      });
  }, [refetchCount]);

  if (isLoading)
    return (
      <div className="absolute left-0 top-0 flex h-full w-full items-center justify-center">
        <ClipLoader loading={isLoading} size={96} color={"#1e3a8a"} />
      </div>
    );
  else
    return (
      <div className="mt-2 overflow-y-auto" style={{ maxHeight }}>
        {stateChats.chats.map((chat, i) => {
          return (
            <div
              key={i}
              className="mt-2 cursor-pointer rounded-lg bg-white px-2 py-1 shadow first:mt-0"
              onClick={() => {
                if (stateChats.selectedChat)
                  socket.emit("hide-typing", stateChats.selectedChat._id);
                dispatchChats({ type: "SELECT", payload: chat });
                dispatchNotifications({ type: "REMOVE", payload: chat._id });
              }}
            >
              <div className="flex items-center justify-between">
                {isNotification(chat._id) ? (
                  <div className="flex items-center">
                    <div className="mr-1 h-3 w-3 rounded-full bg-blue-500" />
                    <div className="font-medium">{getChatName(chat)}</div>
                  </div>
                ) : (
                  <div className="font-medium">{getChatName(chat)}</div>
                )}
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
