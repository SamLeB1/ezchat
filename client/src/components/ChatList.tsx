import { useEffect } from "react";
import axios from "axios";
import useAuthContext from "../hooks/useAuthContext.tsx";
import useChatsContext from "../hooks/useChatsContext.tsx";
import useGetChatName from "../hooks/useGetChatName.tsx";

export default function ChatList() {
  const { stateAuth } = useAuthContext();
  const { stateChats, dispatchChats } = useChatsContext();
  const getChatName = useGetChatName();
  const root = document.getElementById("root");
  const maxHeight = root ? root.offsetHeight - 176 : 0;

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_SERVER}/api/chats`, {
        headers: {
          Authorization: `Bearer ${stateAuth.user?.token}`,
        },
      })
      .then((res) => dispatchChats({ type: "SET", payload: res.data }))
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
            <div className="font-medium">{getChatName(chat)}</div>
            <div className="text-sm">
              {chat.latestMessage
                ? `${chat.latestMessage.sender.username}: ${chat.latestMessage.content}`
                : "No messages"}
            </div>
          </div>
        );
      })}
    </div>
  );
}
