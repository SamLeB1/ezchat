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

type NotificationsRemoveAction = {
  type: "REMOVE";
  payload: string;
};

type NotificationsAction =
  | NotificationsAddChatAction
  | NotificationsAddMessageAction
  | NotificationsRemoveAction;

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
      const duplicateChat = state.chats.find(
        (chat) => chat._id === action.payload._id,
      );
      if (duplicateChat) return state;
      const chats = state.chats;
      chats.unshift(action.payload);
      return { ...state, chats };
    }
    case "ADD_MESSAGE": {
      const duplicateMessage = state.messages.find(
        (message) => message._id === action.payload._id,
      );
      if (duplicateMessage) return state;
      const messages = state.messages;
      messages.unshift(action.payload);
      return { ...state, messages };
    }
    case "REMOVE":
      return {
        chats: state.chats.filter((chat) => chat._id !== action.payload),
        messages: state.messages.filter(
          (message) => message.chat !== action.payload,
        ),
      };
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
