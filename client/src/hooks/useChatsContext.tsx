import { useContext } from "react";
import { ChatsContext } from "../context/ChatsContext.tsx";

export default function useChatsContext() {
  const context = useContext(ChatsContext);
  if (!context)
    throw Error("useChatsContext must be used inside a ChatsContextProvider.");
  return context;
}
