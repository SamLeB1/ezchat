import { createContext, useReducer } from "react";
import { Chat, Message } from "../types.ts";

type NotificationsState = {
  chats: Chat[];
  messages: Message[];
};

type NotificationsAddChatAction = {
  type: "ADD_CHAT";
  payload: Chat;
};

type NotificationsAddMessageAction = {
  type: "ADD_MESSAGE";
  payload: Message;
};

type NotificationsAction =
  | NotificationsAddChatAction
  | NotificationsAddMessageAction;

type NotificationsContextValue = {
  stateNotifications: NotificationsState;
  dispatchNotifications: React.Dispatch<NotificationsAction>;
};

export const NotificationsContext =
  createContext<NotificationsContextValue | null>(null);

function reducerNotifications(
  state: NotificationsState,
  action: NotificationsAction,
) {
  switch (action.type) {
    case "ADD_CHAT": {
      const chats = state.chats;
      chats.unshift(action.payload);
      return { ...state, chats };
    }
    case "ADD_MESSAGE": {
      const messages = state.messages;
      messages.unshift(action.payload);
      return { ...state, messages };
    }
    default:
      return state;
  }
}

export function NotificationsContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [stateNotifications, dispatchNotifications] = useReducer(
    reducerNotifications,
    {
      chats: [],
      messages: [],
    },
  );

  return (
    <NotificationsContext.Provider
      value={{ stateNotifications, dispatchNotifications }}
    >
      {children}
    </NotificationsContext.Provider>
  );
}
