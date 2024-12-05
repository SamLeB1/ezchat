import { useEffect } from "react";
import axios from "axios";
import useAuthContext from "../hooks/useAuthContext.tsx";

export default function ChatList() {
  const { stateAuth } = useAuthContext();

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_SERVER}/api/chats`, {
        headers: {
          Authorization: `Bearer ${stateAuth.user?.token}`,
        },
      })
      .then((res) => console.log(res.data))
      .catch((err) => console.error(err));
  }, []);

  return <h1>Chat List</h1>;
}
