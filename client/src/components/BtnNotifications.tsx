import { useRef, useState } from "react";
import { MdNotifications } from "react-icons/md";
import { socket } from "../socket.ts";
import useChatsContext from "../hooks/useChatsContext.tsx";
import useNotificationsContext from "../hooks/useNotificationsContext.tsx";
import useGetChatName from "../hooks/useGetChatName.tsx";
import useClickOutside from "../hooks/useClickOutside.tsx";
import { Chat, Message } from "../types.ts";

export default function BtnNotifications() {
  const dropdownRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const { stateChats, dispatchChats } = useChatsContext();
  const { stateNotifications, dispatchNotifications } =
    useNotificationsContext();
  const { getChatName, getChatNameById } = useGetChatName();
  useClickOutside(dropdownRef, () => setIsOpen(false));
  const notifs = getNotifs();

  function getChatNotifs(chats: Chat[]) {
    const chatNotifs = chats.map((chat) => {
      const msg = `${getChatName(chat)} has started a chat with you`;
      const onClick = () => {
        setIsOpen(false);
        if (stateChats.selectedChat)
          socket.emit("hide-typing", stateChats.selectedChat._id);
        dispatchNotifications({ type: "REMOVE", payload: chat._id });
        dispatchChats({ type: "SELECT", payload: chat });
      };
      return { msg, onClick };
    });
    return chatNotifs;
  }

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
        if (stateChats.selectedChat)
          socket.emit("hide-typing", stateChats.selectedChat._id);
        dispatchNotifications({ type: "REMOVE", payload: m.chatId });
        dispatchChats({ type: "SELECT_BY_ID", payload: m.chatId });
      };
      return { msg, onClick };
    });
    return msgNotifs;
  }

  function getNotifs() {
    const chatNotifs = getChatNotifs(stateNotifications.chats);
    const msgNotifs = getMsgNotifs(stateNotifications.messages);
    return chatNotifs.concat(msgNotifs);
  }

  return (
    <div ref={dropdownRef}>
      <button
        className="relative mr-2 rounded-full bg-gray-200 p-2 hover:bg-gray-300"
        type="button"
        title="Notifications"
        onClick={() => setIsOpen(!isOpen)}
      >
        <MdNotifications className="h-6 w-6" />
        {notifs.length > 0 && (
          <div className="absolute -right-2 -top-2 flex h-6 min-w-6 items-center justify-center rounded-full bg-red-500 px-1 text-xs text-white">
            {notifs.length}
          </div>
        )}
      </button>
      {isOpen && notifs.length > 0 && (
        <ul className="absolute right-4 max-h-[50vh] overflow-y-auto rounded-lg bg-white p-1 shadow-lg">
          {notifs.map((notif, i) => (
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
      {isOpen && notifs.length === 0 && (
        <div className="absolute right-4 rounded-lg bg-white px-3 py-2 shadow-lg">
          You have no notifications
        </div>
      )}
    </div>
  );
}
