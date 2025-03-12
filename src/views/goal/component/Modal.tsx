import { useEffect } from "react";
import { createPortal } from "react-dom";

import Button from "@/components/atoms/button/Button";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onClick: () => void;
  children: React.ReactNode;
}

const Modal = ({ isOpen, onClose, onClick, children }: ModalProps) => {
  useEffect(() => {
    if (isOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "auto";

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return createPortal(
    <>
      <div
        className="fixed inset-0 z-20 bg-black opacity-50"
        onClick={onClose}
      ></div>
      <div className="fixed inset-0 z-30 flex items-center justify-center">
        <div className="animate-fadeIn flex h-[216px] w-[300px] flex-col items-center justify-center gap-[32px] rounded-2xl bg-white p-6 shadow-lg sm:h-[200px] sm:w-[450px]">
          <h2 className="w-full text-base font-medium text-slate-800">
            {children}
          </h2>
          <div className="flex gap-[8px]">
            <Button
              variant="outline"
              onClick={onClose}
              className="h-[48px] w-[120px]"
            >
              취소
            </Button>
            <Button onClick={onClick} className="h-[48px] w-[120px]">
              확인
            </Button>
          </div>
        </div>
      </div>
    </>,
    document.body,
  );
};

export default Modal;
