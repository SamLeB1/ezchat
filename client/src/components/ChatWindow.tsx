import { useEffect, useState } from "react";
import Messages from "./Messages.tsx";
import MessageBar from "./MessageBar.tsx";
import useChatsContext from "../hooks/useChatsContext.tsx";
import useGetChatName from "../hooks/useGetChatName.tsx";

export default function ChatWindow() {
  const [maxWidth, setMaxWidth] = useState(getMaxWidth());
  const { stateChats } = useChatsContext();
  const { getChatName } = useGetChatName();

  function getMaxWidth() {
    const root = document.getElementById("root");
    const maxWidth = root ? root.offsetWidth - 344 : 0;
    return maxWidth;
  }

  useEffect(() => {
    window.addEventListener("resize", () => setMaxWidth(getMaxWidth()));
    return window.removeEventListener("resize", () =>
      setMaxWidth(getMaxWidth()),
    );
  }, []);

  if (stateChats.selectedChat)
    return (
      <div
        className="flex h-full flex-1 flex-col rounded-lg bg-gray-100"
        style={{ maxWidth }}
      >
        <div className="flex h-12 items-center justify-center rounded-t-lg bg-white">
          <h1 className="text-xl font-medium">
            {getChatName(stateChats.selectedChat)}
          </h1>
        </div>
        <div className="flex flex-1 flex-col p-2">
          <Messages />
          <MessageBar />
        </div>
      </div>
    );
  else
    return (
      <div
        className="flex h-full flex-1 flex-col rounded-lg bg-gray-100"
        style={{ maxWidth }}
      >
        <div className="h-12 rounded-t-lg bg-white"></div>
        <p className="flex flex-1 items-center justify-center text-2xl">
          No chat selected
        </p>
      </div>
    );
}
