import ChatListTop from "./ChatListTop.tsx";
import ChatList from "./ChatList.tsx";

export default function PeopleWindow() {
  return (
    <div className="mr-2 flex h-full w-80 flex-col rounded-lg bg-gray-100">
      <div className="h-12 rounded-t-lg bg-white">
        <div className="flex h-full items-center justify-evenly">
          <button type="button">Chats</button>
          <button type="button">Groups</button>
        </div>
      </div>
      <div className="relative flex-1 p-2">
        <ChatListTop />
        <ChatList />
      </div>
    </div>
  );
}
