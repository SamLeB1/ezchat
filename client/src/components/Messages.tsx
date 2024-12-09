import { useEffect } from "react";
import axios from "axios";
import useChatsContext from "../hooks/useChatsContext.tsx";

export default function Messages() {
  const { stateChats } = useChatsContext();

  useEffect(() => {
    if (stateChats.selectedChat) {
      axios
        .get(
          `${import.meta.env.VITE_SERVER}/api/messages?chatId=${stateChats.selectedChat._id}`,
        )
        .then((res) => console.log(res.data))
        .catch((err) => console.error(err));
    }
  }, [stateChats.selectedChat]);

  return <div className="h-full rounded-lg bg-white"></div>;
}
