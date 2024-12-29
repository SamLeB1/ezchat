import { MdNotifications } from "react-icons/md";
import useNotificationsContext from "../hooks/useNotificationsContext.tsx";

export default function Notifications() {
  const { stateNotifications } = useNotificationsContext();
  return (
    <button className="mr-2" title="Notifications">
      <MdNotifications className="h-6 w-6" />
    </button>
  );
}
