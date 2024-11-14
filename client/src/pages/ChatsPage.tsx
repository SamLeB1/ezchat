import Header from "../components/Header.tsx";

export default function ChatsPage() {
  return (
    <div className="flex h-screen flex-col">
      <Header />
      <div className="flex flex-1 p-2">
        <div className="mr-2 h-full w-80 rounded-lg bg-gray-100">
          <div className="h-12 rounded-t-lg bg-white">
            <div className="flex h-full items-center justify-evenly">
              <button type="button">Chats</button>
              <button type="button">Groups</button>
            </div>
          </div>
        </div>
        <div className="flex h-full flex-1 flex-col rounded-lg bg-gray-100">
          <div className="h-12 rounded-t-lg bg-white"></div>
          <p className="flex flex-1 items-center justify-center text-2xl">
            No chat selected
          </p>
        </div>
      </div>
    </div>
  );
}
