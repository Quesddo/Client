import { ReactNode } from "react";
import ReactDOM from "react-dom";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
}

export default function Modal({ open, onClose, children }: ModalProps) {
  if (!open) return null;
  return ReactDOM.createPortal(
    <>
      <div
        className="fixed top-0 left-0 z-10 h-full w-full bg-black opacity-50"
        onClick={onClose}
      />
      <div className="fixed top-16 left-16 z-10 bg-white p-10">
        {children}
        <button onClick={onClose} className="bg-slate-500">
          모달닫기
        </button>
      </div>
    </>,
    document.getElementById("global-modal") as HTMLElement,
  );
}
