import { useRef, useState } from "react";
import { MdNotifications } from "react-icons/md";
import useChatsContext from "../hooks/useChatsContext.tsx";
import useNotificationsContext from "../hooks/useNotificationsContext.tsx";
import useGetChatName from "../hooks/useGetChatName.tsx";
import useClickOutside from "../hooks/useClickOutside.tsx";
import { Message } from "../types.ts";

export default function Notifications() {
  const dropdownRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const { dispatchChats } = useChatsContext();
  const { stateNotifications } = useNotificationsContext();
  const { getChatNameById } = useGetChatName();
  useClickOutside(dropdownRef, () => setIsOpen(false));

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
      const onClick = () => {
        setIsOpen(false);
        dispatchChats({ type: "SELECT_BY_ID", payload: m.chatId });
      };
      return { msg, onClick };
    });
    return msgNotifs;
  }

  return (
    <div ref={dropdownRef}>
      <button
        className="mr-2"
        type="button"
        title="Notifications"
        onClick={() => setIsOpen(!isOpen)}
      >
        <MdNotifications className="h-6 w-6" />
      </button>
      {isOpen && (
        <ul className="absolute right-4 max-h-[50vh] overflow-y-auto rounded-lg bg-white p-1 shadow-lg">
          {getMsgNotifs(stateNotifications.messages).map((notif, i) => (
            <li
              className="cursor-pointer rounded-lg bg-white px-2 py-1 hover:bg-gray-100"
              key={i}
              onClick={notif.onClick}
            >
              {notif.msg}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
