import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { MdClose } from "react-icons/md";
import axios from "axios";
import { toast } from "sonner";
import { socket } from "../socket.ts";
import useAuthContext from "../hooks/useAuthContext.tsx";
import useChatsContext from "../hooks/useChatsContext.tsx";
import useDebounce from "../hooks/useDebounce.tsx";
import pfp from "../assets/images/pfp.png";
import { User } from "../types.ts";

type CreateChatModalProps = {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function CreateChatModal({ setIsOpen }: CreateChatModalProps) {
  const { stateAuth } = useAuthContext();
  const { dispatchChats } = useChatsContext();
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search);
  const [results, setResults] = useState<User[]>([]);
  const [isLoadingResults, setIsLoadingResults] = useState(false);
  const [isLoadingCreate, setIsLoadingCreate] = useState(false);

  function getResults(value: string) {
    if (value === "") {
      setResults([]);
      return;
    }
    setIsLoadingResults(true);
    axios
      .get(`${import.meta.env.VITE_SERVER}/api/users?search=${value}`)
      .then((res) => setResults(res.data))
      .catch((err) => console.error(err))
      .finally(() => setIsLoadingResults(false));
  }

  function createChat(userId: string) {
    setIsLoadingCreate(true);
    axios
      .post(
        `${import.meta.env.VITE_SERVER}/api/chats`,
        { userId },
        {
          headers: {
            Authorization: `Bearer ${stateAuth.user?.token}`,
          },
        },
      )
      .then((res) => {
        socket.emit("join-room", res.data._id);
        socket.emit("add-chat", res.data);
        dispatchChats({ type: "ADD", payload: res.data });
        dispatchChats({ type: "SELECT", payload: res.data });
        if (res.status === 201) toast.success("Chat created successfully!");
      })
      .catch((err) => console.error(err))
      .finally(() => {
        setIsLoadingCreate(false);
        setIsOpen(false);
      });
  }

  useEffect(() => {
    getResults(debouncedSearch);
  }, [debouncedSearch]);

  return createPortal(
    <div
      className="fixed left-0 top-0 flex h-screen w-screen items-center justify-center bg-black bg-opacity-25"
      onClick={() => setIsOpen(false)}
    >
      <div
        className="relative w-96 rounded-lg bg-white p-6 pt-3 shadow-md"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="absolute right-2 top-2 rounded-full p-1 hover:bg-gray-100"
          title="Close"
          onClick={() => setIsOpen(false)}
        >
          <MdClose className="h-6 w-6" />
        </button>
        <h1 className="text-center text-2xl">Create a chat</h1>
        <div className="mt-3">
          <label
            className="block text-sm font-medium text-gray-700"
            htmlFor="search-2"
          >
            Add user
          </label>
          <input
            className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            id="search-2"
            type="search"
            placeholder="Search username"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            autoFocus
          />
        </div>
        {isLoadingResults && <p className="mt-2">Loading...</p>}
        {!isLoadingResults && (
          <ul className="mt-2 max-h-[50vh] overflow-y-auto">
            {results.map((result, i) => {
              return (
                <li
                  key={i}
                  className="flex cursor-pointer items-center rounded-lg p-2 hover:bg-green-500 hover:text-white"
                  onClick={() => {
                    if (!isLoadingCreate) createChat(result._id);
                  }}
                >
                  <img
                    className="mr-2 h-10 w-10 rounded-full"
                    src={result.pfp ? result.pfp : pfp}
                    alt=""
                  />
                  <p>{result.username}</p>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>,
    document.getElementById("overlays") as HTMLElement,
  );
}
