import Button from "@/components/atoms/button/Button";
import { cn } from "@/utils/cn";

interface ToastActionButtonProps {
  content: string;
  error?: boolean;
  onClick?: () => void;
}

export default function GoalToast({
  content,
  error,
  onClick,
}: ToastActionButtonProps) {
  const errorBtnStyle =
    "border-none text-red-500 hover:text-red-600 hover:shadow-md focus:text-red-800";

  return (
    <div className="flex flex-1 items-center justify-between gap-2">
      <p>{content}</p>
      {onClick && (
        <Button
          size="xs"
          variant="outline"
          rounded
          className={cn("h-[30px] w-[50px]", error && errorBtnStyle)}
          onClick={onClick}
        >
          보기
        </Button>
      )}
    </div>
  );
}
