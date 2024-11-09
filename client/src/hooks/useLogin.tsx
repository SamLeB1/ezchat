import { useState } from "react";
import axios from "axios";

export default function useLogin() {
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState([]);

  async function login(username: string, password: string) {
    setIsLoading(true);
    setErrors([]);
    axios
      .post(`${import.meta.env.VITE_SERVER}/api/auth/login`, {
        username,
        password,
      })
      .then((res) => console.log(res))
      .catch((err) => {
        console.error(err);
        setErrors(err.response.data.errors);
      })
      .finally(() => setIsLoading(false));
  }

  return { login, isLoading, errors };
}
