import { createPortal } from "react-dom";
import { MdClose } from "react-icons/md";
import useUserContext from "../hooks/useUserContext.tsx";
import pfp from "../assets/images/pfp.png";

type ProfileModalProps = {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function ProfileModal({ setIsOpen }: ProfileModalProps) {
  const { user } = useUserContext();

  return createPortal(
    <div
      className="fixed left-0 top-0 flex h-screen w-screen items-center justify-center bg-black bg-opacity-25"
      onClick={() => setIsOpen(false)}
    >
      <div
        className="relative min-w-96 rounded-lg bg-white px-6 py-3 shadow-md"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="absolute right-2 top-2 rounded-full p-1 hover:bg-gray-100"
          title="Close"
          onClick={() => setIsOpen(false)}
        >
          <MdClose className="h-6 w-6" />
        </button>
        <h1 className="text-center text-2xl">{user?.username}</h1>
        <div className="mt-4 flex items-center">
          <img className="h-32 w-32 rounded-full" src={pfp} alt="" />
          <div className="ml-2">
            <label className="block" htmlFor="change-pfp">
              Change your profile picture:
            </label>
            <input
              className="mt-1 block"
              type="file"
              id="change-pfp"
              accept=".jpg, .jpeg, .png"
            />
          </div>
        </div>
        <div className="mt-4 text-lg">
          <h2>Account creation date: {user?.createdAt.split("T")[0]}</h2>
          <h2>Email: {user?.email}</h2>
        </div>
      </div>
    </div>,
    document.getElementById("overlays") as HTMLElement,
  );
}
