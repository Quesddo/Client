import { ReactNode } from "react";
import ReactDOM from "react-dom";

interface CreateModalProps {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
}

export default function CreateModal({
  open,
  onClose,
  children,
}: CreateModalProps) {
  if (!open) return null;
  return ReactDOM.createPortal(
    <>
      <div
        className="fixed top-0 left-0 z-10 h-full w-full bg-black/80"
        onClick={onClose}
      />
      <div className="fixed top-[50%] left-[50%] z-10 -translate-x-1/2 -translate-y-1/2 transform rounded-xl bg-white p-10">
        {children}
        <button onClick={onClose} className="bg-slate-500">
          모달닫기
        </button>
      </div>
    </>,
    document.getElementById("global-modal") as HTMLElement,
  );
}
