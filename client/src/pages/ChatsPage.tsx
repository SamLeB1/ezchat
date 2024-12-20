import { useEffect } from "react";
import { socket } from "../socket.ts";
import useChatsContext from "../hooks/useChatsContext.tsx";
import useMessagesContext from "../hooks/useMessagesContext.tsx";
import Header from "../components/Header.tsx";
import PeopleWindow from "../components/PeopleWindow.tsx";
import ChatWindow from "../components/ChatWindow.tsx";
import { Message } from "../types.ts";

export default function ChatsPage() {
  const { stateChats } = useChatsContext();
  const { dispatchMessages } = useMessagesContext();

  function onReceiveMessage(message: Message) {
    if (stateChats.selectedChat?._id === message.chat)
      dispatchMessages({ type: "ADD", payload: message });
  }

  useEffect(() => {
    socket.on("receive-msg", onReceiveMessage);
    return () => {
      socket.off("receive-msg", onReceiveMessage);
    };
  }, [stateChats.selectedChat]);

  return (
    <div className="flex h-screen flex-col">
      <Header />
      <div className="flex flex-1 p-2">
        <PeopleWindow />
        <ChatWindow />
      </div>
    </div>
  );
}
