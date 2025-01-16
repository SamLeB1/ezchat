import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import useAuthContext from "./useAuthContext.tsx";
import useUserContext from "./useUserContext.tsx";

export default function useGetAuthUser() {
  const [refetchCount, setRefetchCount] = useState(0);
  const { stateAuth } = useAuthContext();
  const { setUser } = useUserContext();

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_SERVER}/api/users/${stateAuth.user?._id}`)
      .then((res) => setUser(res.data))
      .catch((err) => {
        console.error(err);
        toast.error("User data couldn't be fetched. Retrying...");
        setTimeout(() => setRefetchCount(refetchCount + 1), 5000);
      });
  }, [refetchCount]);
}
