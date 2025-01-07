import { useEffect } from "react";
import axios from "axios";
import useAuthContext from "./useAuthContext.tsx";
import useUserContext from "./useUserContext.tsx";

export default function useGetAuthUser() {
  const { stateAuth } = useAuthContext();
  const { setUser } = useUserContext();

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_SERVER}/api/users/${stateAuth.user?._id}`)
      .then((res) => setUser(res.data))
      .catch((err) => console.error(err));
  }, []);
}
