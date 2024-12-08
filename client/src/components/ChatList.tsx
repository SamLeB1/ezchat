import { useEffect } from "react";
import axios from "axios";
import useAuthContext from "../hooks/useAuthContext.tsx";
import useChatsContext from "../hooks/useChatsContext.tsx";
import { Chat } from "../context/ChatsContext.tsx";

export default function ChatList() {
  const { stateAuth } = useAuthContext();
  const { stateChats, dispatchChats } = useChatsContext();

  function getChatName(chat: Chat) {
    if (chat.users.length !== 2) return "";
    if (chat.users[0]._id === stateAuth.user?._id)
      return chat.users[1].username;
    else return chat.users[0].username;
  }

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
    <div>
      {stateChats.chats.map((chat, i) => {
        return (
          <div
            key={i}
            className="mt-2 cursor-pointer rounded-lg bg-white px-2 py-1 shadow"
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
