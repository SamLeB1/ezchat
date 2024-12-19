import { createContext, useReducer } from "react";
import { Message } from "../types.ts";

type MessagesState = Message[];

type MessagesSetAction = {
  type: "SET";
  payload: Message[];
};

type MessagesAddAction = {
  type: "ADD";
  payload: Message;
};

type MessagesAction = MessagesSetAction | MessagesAddAction;

type MessagesContextValue = {
  messages: MessagesState;
  dispatchMessages: React.Dispatch<MessagesAction>;
};

export const MessagesContext = createContext<MessagesContextValue | null>(null);

function reducerMessages(state: MessagesState, action: MessagesAction) {
  switch (action.type) {
    case "SET":
      return action.payload;
    case "ADD":
      return [...state, action.payload];
    default:
      return state;
  }
}

export function MessagesContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [messages, dispatchMessages] = useReducer(reducerMessages, []);

  return (
    <MessagesContext.Provider value={{ messages, dispatchMessages }}>
      {children}
    </MessagesContext.Provider>
  );
}
