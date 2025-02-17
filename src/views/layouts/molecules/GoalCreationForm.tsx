import { memo } from "react";

type GoalCreationFormProps = {
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
};

export default memo(function GoalCreationForm({
  onSubmit,
}: GoalCreationFormProps) {
  return (
    <form
      className="box-border flex w-full flex-col gap-2 rounded-lg bg-white px-2 text-sm font-medium"
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
