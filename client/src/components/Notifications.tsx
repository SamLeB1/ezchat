import { MdNotifications } from "react-icons/md";
import useChatsContext from "../hooks/useChatsContext.tsx";
import useNotificationsContext from "../hooks/useNotificationsContext.tsx";
import useGetChatName from "../hooks/useGetChatName.tsx";
import { Message } from "../types.ts";

export default function Notifications() {
  const { dispatchChats } = useChatsContext();
  const { stateNotifications } = useNotificationsContext();
  const { getChatNameById } = useGetChatName();

  function getMsgNotifs(messages: Message[]) {
    const msgCount: { chatId: string; count: number }[] = [];
    for (let i = 0; i < messages.length; i++) {
      const found = msgCount.find((m) => m.chatId === messages[i].chat);
      if (found) found.count++;
      else msgCount.push({ chatId: messages[i].chat, count: 1 });
    }
    const msgNotifs = msgCount.map((m) => {
      const msg =
        m.count === 1
          ? `New message from ${getChatNameById(m.chatId)}`
          : `${m.count} new messages from ${getChatNameById(m.chatId)}`;
      const onClick = () =>
        dispatchChats({ type: "SELECT_BY_ID", payload: m.chatId });
      return { msg, onClick };
    });
    return msgNotifs;
  }

  return (
    <button className="mr-2" title="Notifications">
      <MdNotifications className="h-6 w-6" />
    </button>
  );
}
