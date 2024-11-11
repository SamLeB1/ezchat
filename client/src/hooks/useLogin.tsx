import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import useAuthContext from "./useAuthContext.tsx";

export default function useLogin() {
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState([]);
  const navigate = useNavigate();
  const { dispatchAuth } = useAuthContext();

  async function login(username: string, password: string) {
    setIsLoading(true);
    setErrors([]);
    axios
      .post(`${import.meta.env.VITE_SERVER}/api/auth/login`, {
        username,
        password,
      })
      .then((res) => {
        localStorage.setItem("user", JSON.stringify(res.data));
        dispatchAuth({ type: "LOGIN", payload: res.data });
        navigate("/chats");
      })
      .catch((err) => {
        console.error(err);
        setErrors(err.response.data.errors);
      })
      .finally(() => setIsLoading(false));
  }

  return { login, isLoading, errors };
}
