import { useEffect } from "react";
import { socket } from "../socket.ts";
import useAuthContext from "../hooks/useAuthContext.tsx";
import useChatsContext from "../hooks/useChatsContext.tsx";
import useMessagesContext from "../hooks/useMessagesContext.tsx";
import useNotificationsContext from "../hooks/useNotificationsContext.tsx";
import useGetAuthUser from "../hooks/useGetAuthUser.tsx";
import Header from "../components/Header.tsx";
import PeopleWindow from "../components/PeopleWindow.tsx";
import ChatWindow from "../components/ChatWindow.tsx";
import { Chat, Message } from "../types.ts";

export default function ChatsPage() {
  const { stateAuth } = useAuthContext();
  const { stateChats, dispatchChats } = useChatsContext();
  const { dispatchMessages } = useMessagesContext();
  const { dispatchNotifications } = useNotificationsContext();
  useGetAuthUser();

  function onAddChat(chat: Chat) {
    socket.emit("join-room", chat._id);
    dispatchChats({ type: "ADD", payload: chat });
    dispatchNotifications({ type: "ADD_CHAT", payload: chat });
  }

  function onReceiveMessage(message: Message) {
    if (stateChats.selectedChat?._id === message.chat)
      dispatchMessages({ type: "ADD", payload: message });
    else dispatchNotifications({ type: "ADD_MESSAGE", payload: message });
    dispatchChats({ type: "UPDATE_LATEST_MSG", payload: message });
  }

  useEffect(() => {
    socket.connect();
    socket.emit("join-room", stateAuth.user?._id as string);
    socket.on("add-chat", onAddChat);
    return () => {
      socket.off("add-chat", onAddChat);
      socket.disconnect();
    };
  }, []);

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
