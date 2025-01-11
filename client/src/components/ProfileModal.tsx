import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { MdClose } from "react-icons/md";
import axios from "axios";
import useAuthContext from "../hooks/useAuthContext.tsx";
import useUserContext from "../hooks/useUserContext.tsx";
import pfp from "../assets/images/pfp.png";

type ProfileModalProps = {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function ProfileModal({ setIsOpen }: ProfileModalProps) {
  const [img, setImg] = useState<string | null>(null);
  const { stateAuth } = useAuthContext();
  const { user, setUser } = useUserContext();

  function onImgChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.files) {
      const reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      reader.onload = () => setImg(reader.result as string);
      reader.onerror = (err) => console.error(err);
    }
  }

  function uploadPfp() {
    if (!img || img === user?.pfp) return;
    axios
      .patch(
        `${import.meta.env.VITE_SERVER}/api/users/upload-pfp`,
        { img },
        {
          headers: {
            Authorization: `Bearer ${stateAuth.user?.token}`,
          },
        },
      )
      .then((res) => setUser(res.data))
      .catch((err) => console.error(err));
  }

  useEffect(() => {
    if (user?.pfp) setImg(user.pfp);
  }, [user?.pfp]);

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
          <img
            className="h-32 w-32 rounded-full"
            src={img ? img : pfp}
            alt=""
          />
          <div className="ml-2">
            <label className="block" htmlFor="change-pfp">
              Change your profile picture:
            </label>
            <div className="mt-1 flex items-center">
              <input
                type="file"
                id="change-pfp"
                accept=".jpg, .jpeg, .png"
                onChange={onImgChange}
              />
              <button
                className="ml-1 cursor-pointer rounded-2xl bg-blue-500 px-2 py-1 text-white hover:bg-blue-600"
                type="button"
                disabled={!img || img === user?.pfp}
                onClick={uploadPfp}
              >
                Upload
              </button>
            </div>
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
