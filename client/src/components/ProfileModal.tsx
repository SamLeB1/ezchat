import { createPortal } from "react-dom";

type ProfileModalProps = {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function ProfileModal({ setIsOpen }: ProfileModalProps) {
  return createPortal(
    <div
      className="fixed left-0 top-0 flex h-screen w-screen items-center justify-center bg-black bg-opacity-25"
      onClick={() => setIsOpen(false)}
    >
      <div
        className="w-96 rounded-lg bg-white shadow-md"
        onClick={(e) => e.stopPropagation()}
      >
        Profile Modal
      </div>
    </div>,
    document.getElementById("overlays") as HTMLElement,
  );
}
