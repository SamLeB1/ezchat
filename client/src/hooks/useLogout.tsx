import { toast } from "sonner";
import useAuthContext from "./useAuthContext.tsx";
import useUserContext from "./useUserContext.tsx";
import useChatsContext from "./useChatsContext.tsx";
import useMessagesContext from "./useMessagesContext.tsx";
import useNotificationsContext from "./useNotificationsContext.tsx";

export default function useLogout() {
  const { dispatchAuth } = useAuthContext();
  const { dispatchChats } = useChatsContext();
  const { dispatchMessages } = useMessagesContext();
  const { dispatchNotifications } = useNotificationsContext();
  const { setUser } = useUserContext();

  function logout() {
    localStorage.removeItem("user");
    dispatchAuth({ type: "LOGOUT" });
    dispatchChats({ type: "INIT" });
    dispatchMessages({ type: "INIT" });
    dispatchNotifications({ type: "INIT" });
    setUser(null);
    toast("You have been logged out.");
  }

  return logout;
}
