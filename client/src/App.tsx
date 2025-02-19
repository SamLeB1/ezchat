import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "sonner";
import { SkeletonTheme } from "react-loading-skeleton";
import useAuthContext from "./hooks/useAuthContext.tsx";
import AuthPage from "./pages/AuthPage.tsx";
import ChatsPage from "./pages/ChatsPage.tsx";

export default function App() {
  const { stateAuth } = useAuthContext();
  return (
    <div className="App">
      <SkeletonTheme baseColor="#eee" highlightColor="#f9f9f9">
        <BrowserRouter>
          <Routes>
            <Route
              path="/"
              element={stateAuth.user ? <Navigate to="/chats" /> : <AuthPage />}
            />
            <Route
              path="/chats"
              element={stateAuth.user ? <ChatsPage /> : <Navigate to="/" />}
            />
          </Routes>
        </BrowserRouter>
      </SkeletonTheme>
      <Toaster richColors position={"bottom-center"} />
    </div>
  );
}
