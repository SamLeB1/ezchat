import { MdArrowDropDown, MdNotifications } from "react-icons/md";
import SearchBar from "./SearchBar.tsx";
import pfp from "../assets/images/pfp.png";

export default function Header() {
  return (
    <header className="flex items-center justify-between bg-gray-100 p-3">
      <h1 className="text-2xl">EzChat</h1>
      <SearchBar />
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
