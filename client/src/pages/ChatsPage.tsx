import Header from "../components/Header.tsx";
import PeopleWindow from "../components/PeopleWindow.tsx";
import ChatWindow from "../components/ChatWindow.tsx";

export default function ChatsPage() {
  return (
    <div className="flex h-screen flex-col">
      <Header />
      <div className="flex flex-1 p-2">
        <PeopleWindow />
        <ChatWindow />
      </div>
    </div>
  );
}
