import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { AuthContextProvider } from "./context/AuthContext.tsx";
import { ChatsContextProvider } from "./context/ChatsContext.tsx";
import { MessagesContextProvider } from "./context/MessagesContext.tsx";
import { NotificationsContextProvider } from "./context/NotificationsContext.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AuthContextProvider>
      <ChatsContextProvider>
        <MessagesContextProvider>
          <NotificationsContextProvider>
            <App />
          </NotificationsContextProvider>
        </MessagesContextProvider>
      </ChatsContextProvider>
    </AuthContextProvider>
  </StrictMode>,
);
