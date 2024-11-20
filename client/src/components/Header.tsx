import { MdArrowDropDown, MdNotifications } from "react-icons/md";
import SearchBar from "./SearchBar.tsx";
import pfp from "../assets/images/pfp.png";

export default function Header() {
  return (
    <header className="flex items-center justify-between bg-gray-100 p-3">
      <h1 className="text-2xl">EzChat</h1>
      <SearchBar />
      <div className="flex items-center">
        <button className="mr-2" title="Notifications">
          <MdNotifications className="h-6 w-6" />
        </button>
        <button className="flex items-center" title="Account">
          <img className="h-10 w-10 rounded-full" src={pfp} alt="" />
          <MdArrowDropDown className="h-6 w-6" />
        </button>
      </div>
    </header>
  );
}
