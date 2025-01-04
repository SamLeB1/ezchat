import SearchBar from "./SearchBar.tsx";
import BtnNotifications from "./BtnNotifications.tsx";
import BtnAccount from "./BtnAccount.tsx";

export default function Header() {
  return (
    <header className="flex items-center justify-between bg-gray-100 p-3">
      <h1 className="text-2xl">EzChat</h1>
      <SearchBar />
      <div className="flex items-center">
        <BtnNotifications />
        <BtnAccount />
      </div>
    </header>
  );
}
