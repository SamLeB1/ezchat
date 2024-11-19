import { useState } from "react";
import { createPortal } from "react-dom";
import axios from "axios";
import pfp from "../assets/images/pfp.png";

type CreateChatModalProps = {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function CreateChatModal({ setIsOpen }: CreateChatModalProps) {
  const [search, setSearch] = useState("");
  const [results, setResults] = useState([]);

  function getResults(value: string) {
    if (value === "") {
      setResults([]);
      return;
    }
    axios
      .get(`${import.meta.env.VITE_SERVER}/api/users?search=${value}`)
      .then((res) => setResults(res.data))
      .catch((err) => console.error(err));
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setSearch(e.target.value);
    getResults(e.target.value);
  }

  return createPortal(
    <div
      className="fixed left-0 top-0 flex h-screen w-screen items-center justify-center bg-black bg-opacity-25"
      onClick={() => setIsOpen(false)}
    >
      <div
        className="w-96 rounded-lg bg-white p-6 pt-3 shadow-md"
        onClick={(e) => e.stopPropagation()}
      >
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
            onChange={handleChange}
            autoFocus
          />
        </div>
        <ul className="mt-2 max-h-[50vh] overflow-y-auto">
          {results.map((result, i) => {
            return (
              <li
                key={i}
                className="flex cursor-pointer items-center rounded-lg p-2 hover:bg-green-500 hover:text-white"
              >
                <img className="mr-2 h-10 w-10 rounded-full" src={pfp} alt="" />
                <p>{result.username}</p>
              </li>
            );
          })}
        </ul>
      </div>
    </div>,
    document.getElementById("overlays") as HTMLElement,
  );
}