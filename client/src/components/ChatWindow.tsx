import Messages from "./Messages.tsx";
import useChatsContext from "../hooks/useChatsContext.tsx";

export default function ChatWindow() {
  const { stateChats } = useChatsContext();
  return (
    <div className="flex h-full flex-1 flex-col rounded-lg bg-gray-100">
      <div className="h-12 rounded-t-lg bg-white"></div>
      {stateChats.selectedChat ? (
        <div className="flex-1 p-2">
          <Messages />
        </div>
      ) : (
        <p className="flex flex-1 items-center justify-center text-2xl">
          No chat selected
        </p>
      )}
    </div>
  );
}
