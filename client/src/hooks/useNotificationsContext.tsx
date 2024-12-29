import { useContext } from "react";
import { NotificationsContext } from "../context/NotificationsContext.tsx";

export default function useNotificationsContext() {
  const context = useContext(NotificationsContext);
  if (!context)
    throw Error(
      "useNotificationsContext must be used inside a NotificationsContextProvider.",
    );
  return context;
}
