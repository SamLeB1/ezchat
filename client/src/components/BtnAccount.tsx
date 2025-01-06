import { useRef, useState } from "react";
import { MdArrowDropDown } from "react-icons/md";
import ProfileModal from "./ProfileModal.tsx";
import useClickOutside from "../hooks/useClickOutside.tsx";
import useLogout from "../hooks/useLogout.tsx";
import pfp from "../assets/images/pfp.png";

export default function BtnAccount() {
  const dropdownRef = useRef(null);
  const [isOpenDropdown, setIsOpenDropdown] = useState(false);
  const [isOpenProfileModal, setIsOpenProfileModal] = useState(false);
  useClickOutside(dropdownRef, () => setIsOpenDropdown(false));
  const logout = useLogout();

  return (
    <>
      <div ref={dropdownRef}>
        <button
          className="flex items-center"
          type="button"
          title="Account"
          onClick={() => setIsOpenDropdown(!isOpenDropdown)}
        >
          <img className="h-10 w-10 rounded-full" src={pfp} alt="" />
          <MdArrowDropDown className="h-6 w-6" />
        </button>
        {isOpenDropdown && (
          <div className="absolute right-4 rounded-lg bg-white p-1 shadow-lg">
            <button
              className="block w-full rounded-lg bg-white px-2 py-1 text-start hover:bg-gray-100"
              type="button"
              onClick={() => {
                setIsOpenDropdown(false);
                setIsOpenProfileModal(true);
              }}
            >
              My Profile
            </button>
            <button
              className="block w-full rounded-lg bg-white px-2 py-1 text-start hover:bg-gray-100"
              type="button"
              onClick={logout}
            >
              Log Out
            </button>
          </div>
        )}
      </div>
      {isOpenProfileModal && <ProfileModal setIsOpen={setIsOpenProfileModal} />}
    </>
  );
}
