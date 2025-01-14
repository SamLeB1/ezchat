import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "sonner";
import useAuthContext from "./useAuthContext.tsx";
import { ServerError } from "../types.ts";

export default function useSignup() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<ServerError["error"] | null>(null);
  const navigate = useNavigate();
  const { dispatchAuth } = useAuthContext();

  async function signup(email: string, username: string, password: string) {
    setIsLoading(true);
    setError(null);
    axios
      .post(`${import.meta.env.VITE_SERVER}/api/auth/signup`, {
        email,
        username,
        password,
      })
      .then((res) => {
        localStorage.setItem("user", JSON.stringify(res.data));
        dispatchAuth({ type: "LOGIN", payload: res.data });
        navigate("/chats");
        toast.success("Account created successfully!");
      })
      .catch((err) => {
        console.error(err);
        setError(err.response.data.error);
      })
      .finally(() => setIsLoading(false));
  }

  return { signup, isLoading, error };
}
