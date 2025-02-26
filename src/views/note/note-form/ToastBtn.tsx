import { useState } from "react";

import Button from "@/components/atoms/button/Button";

interface ToastBtnProps {
  isOpen: boolean;
  onLoadData: () => void;
}

export default function ToastBtn({ isOpen, onLoadData }: ToastBtnProps) {
  const [isOpenToast, setIsOpenToast] = useState(isOpen);

  const handleClose = () => {
    setIsOpenToast(false);
  };

  return (
    <div
      className="flex items-center justify-between gap-3 rounded-[28px] bg-blue-50 px-3 py-2.5 text-blue-500 data-[open=false]:hidden"
      data-open={isOpenToast}
    >
      <div className="flex items-center gap-4">
        <button onClick={handleClose}>
          <img
            src="/icons/delete_circle.png"
            alt="삭제"
            width={24}
            height={24}
          />
        </button>
        <p>임시 저장된 노트가 있어요. 저장된 노트를 불러오시겠어요?</p>
      </div>
      <Button
        variant="outline"
        size="xs"
        rounded
        className="shrink-0"
        onClick={onLoadData}
      >
        불러오기
      </Button>
    </div>
  );
}
