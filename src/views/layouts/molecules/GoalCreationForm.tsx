import { memo } from "react";

import { cn } from "@/utils/cn";

type GoalCreationFormProps = {
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  isVisible: boolean;
};

export default memo(function GoalCreationForm({
  onSubmit,
  isVisible,
}: GoalCreationFormProps) {
  return (
    <form
      className={cn(
        "box-border flex w-full flex-col gap-2 rounded-lg bg-white px-2 text-sm font-medium",
        { hidden: !isVisible },
      )}
      onSubmit={onSubmit}
    >
      <div className="flex w-full items-center gap-1">
        <span>•</span>
        <input
          placeholder="목표를 입력하세요"
          autoFocus
          name="title"
          className="w-full rounded bg-slate-100 p-2 text-base outline-none sm:text-sm"
        />
      </div>
    </form>
  );
});
