import { useState } from "react";
import { MdSend } from "react-icons/md";
import axios from "axios";
import useAuthContext from "../hooks/useAuthContext.tsx";
import useChatsContext from "../hooks/useChatsContext.tsx";

export default function MessageBar() {
  const [messageInput, setMessageInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { stateAuth } = useAuthContext();
  const { stateChats } = useChatsContext();

  function handleSend() {
    if (!stateChats.selectedChat) return;
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
      .catch((err) => console.error(err))
      .finally(() => setIsLoading(false));
  }

  return (
    <div className="mt-2 flex items-center rounded-2xl bg-white px-4 shadow">
      <input
        className="mr-2 w-full py-1 outline-none"
        id="message-input"
        type="text"
        placeholder="Enter a message..."
        value={messageInput}
        onChange={(e) => setMessageInput(e.target.value)}
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
