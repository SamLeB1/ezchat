import { useState } from "react";
import axios from "axios";

export default function useSignup() {
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState([]);

  async function signup(email: string, username: string, password: string) {
    setIsLoading(true);
    setErrors([]);
    axios
      .post(`${import.meta.env.VITE_SERVER}/api/auth/signup`, {
        email,
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

  return { signup, isLoading, errors };
}
