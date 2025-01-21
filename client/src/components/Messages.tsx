import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import ClipLoader from "react-spinners/ClipLoader";
import BeatLoader from "react-spinners/BeatLoader";
import { socket } from "../socket.ts";
import useAuthContext from "../hooks/useAuthContext.tsx";
import useChatsContext from "../hooks/useChatsContext.tsx";
import useMessagesContext from "../hooks/useMessagesContext.tsx";
import pfp from "../assets/images/pfp.png";
import { Message } from "../types.ts";

export default function Messages() {
  const [isLoading, setIsLoading] = useState(false);
  const [refetchCount, setRefetchCount] = useState(0);
  const [showTyping, setShowTyping] = useState(false);
  const { stateAuth } = useAuthContext();
  const { stateChats } = useChatsContext();
  const { messages, dispatchMessages } = useMessagesContext();
  const root = document.getElementById("root");
  const maxHeight = root ? root.offsetHeight - 200 : 0;

  function isOwnMessage(message: Message) {
    return stateAuth.user?._id === message.sender._id;
  }

  function isPfpDisplayed(i: number) {
    if (i < 0 || i > messages.length - 1) return false;
    if (isOwnMessage(messages[i])) return false;
    if (i === messages.length - 1) return true;
    if (isOwnMessage(messages[i + 1])) return true;
    else return false;
  }

  function onShowTyping(chatId: string) {
    if (stateChats.selectedChat?._id !== chatId) return;
    setShowTyping(true);
  }

  function onHideTyping(chatId: string) {
    if (stateChats.selectedChat?._id !== chatId) return;
    setShowTyping(false);
  }

  useEffect(() => {
    setShowTyping(false);
    socket.on("show-typing", onShowTyping);
    socket.on("hide-typing", onHideTyping);
    return () => {
      socket.off("show-typing", onShowTyping);
      socket.off("hide-typing", onHideTyping);
    };
  }, [stateChats.selectedChat]);

  useEffect(() => {
    if (stateChats.selectedChat) {
      setIsLoading(true);
      axios
        .get(
          `${import.meta.env.VITE_SERVER}/api/messages?chatId=${stateChats.selectedChat._id}`,
        )
        .then((res) => {
          dispatchMessages({ type: "SET", payload: res.data });
          setIsLoading(false);
        })
        .catch((err) => {
          console.error(err);
          toast.error("Chat messages couldn't be fetched. Retrying...");
          setTimeout(() => setRefetchCount(refetchCount + 1), 5000);
        });
    }
  }, [stateChats.selectedChat, refetchCount]);

  if (isLoading)
    return (
      <div className="flex flex-1 items-center justify-center rounded-lg bg-white shadow">
        <ClipLoader loading={isLoading} size={96} color={"#1e3a8a"} />
      </div>
    );
  else
    return (
      <div className="flex flex-1 flex-col justify-end rounded-lg bg-white p-2 shadow">
        <div className="overflow-y-auto" style={{ maxHeight }}>
          {messages.map((message, i) => {
            if (isOwnMessage(message))
              return (
                <div
                  key={i}
                  className="ml-auto mt-1 w-fit max-w-[75%] rounded-2xl bg-blue-200 px-2 py-1 first:mt-0"
                >
                  <p className="break-words">{message.content}</p>
                </div>
              );
            else
              return isPfpDisplayed(i) ? (
                <div key={i} className="mt-1 flex first:mt-0">
                  <img
                    className="mr-1 h-8 w-8 rounded-full"
                    src={message.sender.pfp ? message.sender.pfp : pfp}
                    alt=""
                  />
                  <div className="w-fit max-w-[75%] rounded-2xl bg-green-200 px-2 py-1">
                    <p className="break-words">{message.content}</p>
                  </div>
                </div>
              ) : (
                <div
                  key={i}
                  className="ml-9 mt-1 w-fit max-w-[75%] rounded-2xl bg-green-200 px-2 py-1 first:mt-0"
                >
                  <p className="break-words">{message.content}</p>
                </div>
              );
          })}
          {showTyping && (
            <div className="mt-2">
              <BeatLoader size={12} />
            </div>
          )}
        </div>
      </div>
    );
}
