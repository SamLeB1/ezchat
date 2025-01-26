import { useEffect, useRef, useState } from "react";
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
  const messagesRef = useRef<HTMLDivElement | null>(null);
  const isAtBottom = useRef(true);
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
    function onScroll() {
      if (messagesRef.current)
        isAtBottom.current =
          messagesRef.current.scrollHeight - messagesRef.current.clientHeight <=
          messagesRef.current.scrollTop + 1;
    }

    if (messagesRef.current) {
      messagesRef.current.addEventListener("scroll", onScroll);
    }

    const intervalId = setInterval(() => {
      if (messagesRef.current && isAtBottom.current)
        messagesRef.current.scrollTop =
          messagesRef.current.scrollHeight - messagesRef.current.clientHeight;
    }, 100);

    return () => {
      if (messagesRef.current)
        messagesRef.current.removeEventListener("scroll", onScroll);
      clearInterval(intervalId);
    };
  }, [messagesRef.current]);

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
          isAtBottom.current = true;
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
        <div
          ref={messagesRef}
          className="overflow-y-auto"
          style={{ maxHeight }}
        >
          {messages.map((message, i) => {
            if (isOwnMessage(message)) {
              if (message.contentType === "text")
                return (
                  <div
                    key={i}
                    className="ml-auto mt-1 w-fit max-w-[75%] rounded-2xl bg-blue-200 px-2 py-1 first:mt-0"
                  >
                    <p className="break-words">{message.content}</p>
                  </div>
                );
              else
                return (
                  <img
                    key={i}
                    className="ml-auto mt-1 max-w-[75%] overflow-x-auto rounded-2xl first:mt-0"
                    src={message.content}
                    alt=""
                  />
                );
            } else if (message.contentType === "text")
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
            else
              return isPfpDisplayed(i) ? (
                <div key={i} className="mt-1 flex first:mt-0">
                  <img
                    className="mr-1 h-8 w-8 rounded-full"
                    src={message.sender.pfp ? message.sender.pfp : pfp}
                    alt=""
                  />
                  <img
                    className="max-w-[75%] overflow-x-auto rounded-2xl"
                    src={message.content}
                    alt=""
                  />
                </div>
              ) : (
                <img
                  key={i}
                  className="ml-9 mt-1 max-w-[75%] overflow-x-auto rounded-2xl first:mt-0"
                  src={message.content}
                  alt=""
                />
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
