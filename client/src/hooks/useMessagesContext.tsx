import { useContext } from "react";
import { MessagesContext } from "../context/MessagesContext.tsx";

export default function useMessagesContext() {
  const context = useContext(MessagesContext);
  if (!context)
    throw Error(
      "useMessagesContext must be used inside a MessagesContextProvider.",
    );
  return context;
}
