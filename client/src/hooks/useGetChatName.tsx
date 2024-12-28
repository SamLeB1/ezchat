import useAuthContext from "./useAuthContext.tsx";
import useChatsContext from "./useChatsContext.tsx";
import { Chat } from "../types.ts";

export default function useGetChatName() {
  const { stateAuth } = useAuthContext();
  const { stateChats } = useChatsContext();

  function getChatName(chat: Chat) {
    if (chat.users.length !== 2) return "";
    if (chat.users[0]._id === stateAuth.user?._id)
      return chat.users[1].username;
    else return chat.users[0].username;
  }

  function getChatNameById(id: string) {
    const chat = stateChats.chats.find((chat) => chat._id === id);
    if (!chat) return "";
    else return getChatName(chat);
  }

  return { getChatName, getChatNameById };
}
