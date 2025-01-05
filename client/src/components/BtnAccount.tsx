import { useRef, useState } from "react";
import { MdArrowDropDown } from "react-icons/md";
import useClickOutside from "../hooks/useClickOutside.tsx";
import useLogout from "../hooks/useLogout.tsx";
import pfp from "../assets/images/pfp.png";

export default function BtnAccount() {
  const dropdownRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  useClickOutside(dropdownRef, () => setIsOpen(false));
  const logout = useLogout();

  return (
    <div ref={dropdownRef}>
      <button
        className="flex items-center"
        type="button"
        title="Account"
        onClick={() => setIsOpen(!isOpen)}
      >
        <img className="h-10 w-10 rounded-full" src={pfp} alt="" />
        <MdArrowDropDown className="h-6 w-6" />
      </button>
      {isOpen && (
        <div className="absolute right-4 rounded-lg bg-white p-1 shadow-lg">
          <button
            className="block w-full rounded-lg bg-white px-2 py-1 text-start hover:bg-gray-100"
            type="button"
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
  );
}
