import { createContext, useReducer } from "react";
import { Chat } from "../types.ts";

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

type ChatsAction = ChatsSetAction | ChatsSelectAction;

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
