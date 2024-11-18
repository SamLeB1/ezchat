import { useState } from "react";
import { MdSearch } from "react-icons/md";
import CreateChatModal from "./CreateChatModal.tsx";

export default function SearchBar() {
  const [isOpenModal, setIsOpenModal] = useState(false);
  return (
    <>
      <div
        className="flex cursor-pointer items-center rounded-2xl bg-white px-4 shadow"
        onClick={() => setIsOpenModal(true)}
      >
        <MdSearch className="mr-1" />
        <input
          className="w-64 cursor-pointer py-1 outline-none"
          id="search"
          type="search"
          placeholder="Search username"
        />
      </div>
      {isOpenModal && <CreateChatModal setIsOpen={setIsOpenModal} />}
    </>
  );
}
