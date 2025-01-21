import { useEffect, useRef, useState } from "react";
import { MdSend } from "react-icons/md";
import axios from "axios";
import { toast } from "sonner";
import { socket } from "../socket.ts";
import useAuthContext from "../hooks/useAuthContext.tsx";
import useChatsContext from "../hooks/useChatsContext.tsx";
import useMessagesContext from "../hooks/useMessagesContext.tsx";

export default function MessageBar() {
  const isMounted = useRef(false);
  const messageInputRef = useRef<HTMLInputElement>(null);
  const [messageInput, setMessageInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const { stateAuth } = useAuthContext();
  const { stateChats, dispatchChats } = useChatsContext();
  const { dispatchMessages } = useMessagesContext();

  function handleSend() {
    if (messageInput === "") return;
    if (!stateChats.selectedChat) return;
    messageInputRef.current?.blur();
    setIsLoading(true);
    setMessageInput("");
    socket.emit("hide-typing", stateChats.selectedChat._id);
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
        dispatchChats({ type: "UPDATE_LATEST_MSG", payload: res.data });
        socket.emit("send-msg", res.data);
      })
      .catch((err) => {
        console.error(err);
        toast.error("Message couldn't be sent.");
      })
      .finally(() => setIsLoading(false));
  }

  useEffect(() => {
    setMessageInput("");
  }, [stateChats.selectedChat]);

  useEffect(() => {
    if (isMounted.current) {
      const chatId = stateChats.selectedChat?._id as string;
      if (!isTyping) {
        socket.emit("show-typing", chatId);
        setIsTyping(true);
      }
      const timer = setTimeout(() => {
        socket.emit("hide-typing", chatId);
        setIsTyping(false);
      }, 2500);
      return () => clearTimeout(timer);
    }
  }, [messageInput]);

  return (
    <div className="mt-2 flex items-center rounded-2xl bg-white px-4 shadow">
      <input
        className="mr-2 w-full py-1 outline-none"
        ref={messageInputRef}
        id="message-input"
        type="text"
        placeholder="Enter a message..."
        value={messageInput}
        onChange={(e) => {
          if (!isMounted.current) isMounted.current = true;
          setMessageInput(e.target.value);
        }}
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
