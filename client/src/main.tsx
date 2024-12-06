import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { AuthContextProvider } from "./context/AuthContext.tsx";
import { ChatsContextProvider } from "./context/ChatsContext.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AuthContextProvider>
      <ChatsContextProvider>
        <App />
      </ChatsContextProvider>
    </AuthContextProvider>
  </StrictMode>,
);
