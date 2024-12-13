import { useEffect, useState } from "react";
import axios from "axios";
import useAuthContext from "../hooks/useAuthContext.tsx";
import useChatsContext from "../hooks/useChatsContext.tsx";
import { Message } from "../types.ts";

export default function Messages() {
  const [messages, setMessages] = useState<Message[]>([]);
  const { stateAuth } = useAuthContext();
  const { stateChats } = useChatsContext();

  function isOwnMessage(message: Message) {
    return stateAuth.user?._id === message.sender;
  }

  useEffect(() => {
    if (stateChats.selectedChat) {
      axios
        .get(
          `${import.meta.env.VITE_SERVER}/api/messages?chatId=${stateChats.selectedChat._id}`,
        )
        .then((res) => setMessages(res.data))
        .catch((err) => console.error(err));
    }
  }, [stateChats.selectedChat]);

  return (
    <div className="flex flex-1 flex-col justify-end rounded-lg bg-white p-2 shadow">
      <div>
        {messages.map((message, i) => {
          if (isOwnMessage(message))
            return (
              <div
                key={i}
                className="ml-auto mt-1 w-fit max-w-[75%] rounded-2xl bg-blue-200 px-2 py-1"
              >
                <p>{message.content}</p>
              </div>
            );
          else
            return (
              <div
                key={i}
                className="mt-1 w-fit max-w-[75%] rounded-2xl bg-green-200 px-2 py-1"
              >
                <p>{message.content}</p>
              </div>
            );
        })}
      </div>
    </div>
  );
}
