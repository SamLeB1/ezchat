import { useState } from "react";
import { createPortal } from "react-dom";

type CreateChatModalProps = {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function CreateChatModal({ setIsOpen }: CreateChatModalProps) {
  const [search, setSearch] = useState("");
  return createPortal(
    <div
      className="fixed left-0 top-0 flex h-screen w-screen items-center justify-center bg-black bg-opacity-25"
      onClick={() => setIsOpen(false)}
    >
      <div
        className="w-96 rounded-lg bg-white p-6 pt-3 shadow-md"
        onClick={(e) => e.stopPropagation()}
      >
        <h1 className="mb-3 text-center text-2xl">Create a chat</h1>
        <label
          className="mb-1 block text-sm font-medium text-gray-700"
          htmlFor="search-2"
        >
          Add user
        </label>
        <input
          className="w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          id="search-2"
          type="search"
          placeholder="Search username"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          autoFocus
        />
      </div>
    </div>,
    document.getElementById("overlays") as HTMLElement,
  );
}
