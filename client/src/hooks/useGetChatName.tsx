import useAuthContext from "./useAuthContext.tsx";
import { Chat } from "../types.ts";

export default function useGetChatName() {
  const { stateAuth } = useAuthContext();

  function getChatName(chat: Chat) {
    if (chat.users.length !== 2) return "";
    if (chat.users[0]._id === stateAuth.user?._id)
      return chat.users[1].username;
    else return chat.users[0].username;
  }

  return getChatName;
}
