import { createContext, useReducer } from "react";
import { Chat, Message } from "../types.ts";

type ChatsState = {
  chats: Chat[];
  selectedChat: Chat | null;
};

type ChatsSetAction = {
  type: "SET";
  payload: Chat[];
};

type ChatsSelectAction = {
  type: "SELECT";
  payload: Chat;
};

type ChatsSelectByIdAction = {
  type: "SELECT_BY_ID";
  payload: string;
};

type ChatsUpdateLatestMsgAction = {
  type: "UPDATE_LATEST_MSG";
  payload: Message;
};

type ChatsAddAction = {
  type: "ADD";
  payload: Chat;
};

type ChatsAction =
  | ChatsSetAction
  | ChatsSelectAction
  | ChatsSelectByIdAction
  | ChatsUpdateLatestMsgAction
  | ChatsAddAction;

type ChatsContextValue = {
  stateChats: ChatsState;
  dispatchChats: React.Dispatch<ChatsAction>;
};

export const ChatsContext = createContext<ChatsContextValue | null>(null);

function reducerChats(state: ChatsState, action: ChatsAction) {
  switch (action.type) {
    case "SET":
      return { ...state, chats: action.payload };
    case "SELECT":
      return { ...state, selectedChat: action.payload };
    case "SELECT_BY_ID": {
      const chat = state.chats.find((chat) => chat._id === action.payload);
      if (!chat) return state;
      return { ...state, selectedChat: chat };
    }
    case "UPDATE_LATEST_MSG": {
      const msg = action.payload;
      let chat = state.chats.find((chat) => chat._id === msg.chat);
      if (!chat) return state;
      chat = JSON.parse(JSON.stringify(chat)) as Chat;
      chat.latestMessage = {
        _id: msg._id,
        sender: msg.sender,
        content: msg.content,
        createdAt: msg.createdAt,
      };
      const chats = state.chats.filter((chat) => chat._id !== msg.chat);
      chats.unshift(chat);
      return { ...state, chats };
    }
    case "ADD": {
      const duplicateChat = state.chats.find(
        (chat) => chat._id === action.payload._id,
      );
      if (duplicateChat) return state;
      const chats = state.chats;
      chats.unshift(action.payload);
      return { ...state, chats };
    }
    default:
      return state;
  }
}

export function ChatsContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [stateChats, dispatchChats] = useReducer(reducerChats, {
    chats: [],
    selectedChat: null,
  });

  return (
    <ChatsContext.Provider value={{ stateChats, dispatchChats }}>
      {children}
    </ChatsContext.Provider>
  );
}
