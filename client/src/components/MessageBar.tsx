import { useEffect, useRef, useState } from "react";
import { MdSend } from "react-icons/md";
import axios from "axios";
import { socket } from "../socket.ts";
import useAuthContext from "../hooks/useAuthContext.tsx";
import useChatsContext from "../hooks/useChatsContext.tsx";
import useMessagesContext from "../hooks/useMessagesContext.tsx";

export default function MessageBar() {
  const messageInputRef = useRef<HTMLInputElement>(null);
  const [messageInput, setMessageInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { stateAuth } = useAuthContext();
  const { stateChats } = useChatsContext();
  const { dispatchMessages } = useMessagesContext();

  function handleSend() {
    if (messageInput === "") return;
    if (!stateChats.selectedChat) return;
    messageInputRef.current?.blur();
    setIsLoading(true);
    setMessageInput("");
    axios
      .post(
        `${import.meta.env.VITE_SERVER}/api/messages`,
        { chatId: stateChats.selectedChat._id, content: messageInput },
        {
          headers: {
            Authorization: `Bearer ${stateAuth.user?.token}`,
          },
        },
      )
      .then((res) => {
        dispatchMessages({ type: "ADD", payload: res.data });
        socket.emit("send-msg", res.data);
      })
      .catch((err) => console.error(err))
      .finally(() => setIsLoading(false));
  }

  useEffect(() => {
    setMessageInput("");
  }, [stateChats.selectedChat]);

  return (
    <div className="mt-2 flex items-center rounded-2xl bg-white px-4 shadow">
      <input
        className="mr-2 w-full py-1 outline-none"
        ref={messageInputRef}
        id="message-input"
        type="text"
        placeholder="Enter a message..."
        value={messageInput}
        onChange={(e) => setMessageInput(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") handleSend();
        }}
      />
      <button
        type="button"
        title="Send"
        onClick={handleSend}
        disabled={isLoading}
      >
        <MdSend />
      </button>
    </div>
  );
}
