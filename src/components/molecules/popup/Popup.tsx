import Button from "@/components/atoms/button/Button";
import ExitBtn from "@/components/atoms/exit-btn/ExitBtn";
import { cn } from "@/utils/cn/cn";

interface PopupProps {
  onClose: () => void;
  onConfirm: () => void;
  children: React.ReactNode;
  isCancelEnabled?: boolean;
}

export default function Popup({
  onClose,
  onConfirm,
  children,
  isCancelEnabled,
}: PopupProps) {
  return (
    <>
      <div
        onClick={onClose}
        className="fixed inset-0 z-50 w-full bg-black/50"
      ></div>
      <div
        className={cn(
          "animate-fadeIn fixed top-1/2 left-1/2 z-100 h-[186px] w-[300px] -translate-x-1/2 -translate-y-1/2",
          "box-border flex flex-col items-center rounded-lg bg-white p-6 font-medium shadow-lg sm:w-[450px]",
        )}
      >
        {!isCancelEnabled && (
          <ExitBtn onClick={onClose} className="absolute top-6 right-6" />
        )}
        <h2 className="my-4 text-center text-base">{children}</h2>
        <div className="flex w-full gap-2 sm:justify-center">
          {isCancelEnabled && (
            <Button onClick={onClose} variant={"outline"} className="w-30">
              취소
            </Button>
          )}
          <Button onClick={onConfirm} className="w-30">
            확인
          </Button>
        </div>
      </div>
    </>
  );
}
