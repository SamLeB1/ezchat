import { MdGroupAdd, MdPersonAddAlt1 } from "react-icons/md";
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
      <div className="flex-1 p-2">
        <div className="flex">
          <button className="mr-2" title="New chat">
            <MdPersonAddAlt1 className="h-6 w-6" />
          </button>
          <button title="New group chat">
            <MdGroupAdd className="h-6 w-6" />
          </button>
        </div>
        <ChatList />
      </div>
    </div>
  );
}
