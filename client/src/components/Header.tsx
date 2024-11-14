import { MdArrowDropDown, MdNotifications, MdSearch } from "react-icons/md";
import pfp from "../assets/images/pfp.png";

export default function Header() {
  return (
    <header className="flex items-center justify-between bg-gray-100 p-3">
      <h1 className="text-2xl">EzChat</h1>
      <div className="flex items-center rounded-2xl bg-white px-4 shadow">
        <MdSearch className="mr-1" />
        <input
          className="w-64 py-1 outline-none"
          id="search"
          type="search"
          placeholder="Search username"
        />
      </div>
      <div className="flex items-center">
        <MdNotifications className="h-6 w-6 cursor-pointer" />
        <img
          className="mx-1 h-10 w-10 cursor-pointer rounded-full"
          src={pfp}
          alt=""
        />
        <MdArrowDropDown className="h-6 w-6 cursor-pointer" />
      </div>
    </header>
  );
}
