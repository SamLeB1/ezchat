import { useState } from "react";
import { MdGroupAdd, MdPersonAddAlt1 } from "react-icons/md";
import CreateChatModal from "./CreateChatModal.tsx";

export default function ChatListTop() {
  const [isOpenModal, setIsOpenModal] = useState(false);
  return (
    <>
      <div className="flex">
        <button
          className="mr-2"
          type="button"
          title="New chat"
          onClick={() => setIsOpenModal(true)}
        >
          <MdPersonAddAlt1 className="h-6 w-6" />
        </button>
        <button type="button" title="New group chat">
          <MdGroupAdd className="h-6 w-6" />
        </button>
      </div>
      {isOpenModal && <CreateChatModal setIsOpen={setIsOpenModal} />}
    </>
  );
}
