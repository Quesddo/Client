import Input from "@/components/atoms/input/Input";

type GoalCreationFormProps = {
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
};

export default (function GoalCreationForm({ onSubmit }: GoalCreationFormProps) {
  return (
    <form
      className="box-border flex w-full flex-col gap-2 rounded-lg bg-white"
      onSubmit={onSubmit}
    >
      <Input
        placeholder="목표를 입력하세요"
        autoFocus
        name="title"
        className="rounded-[12px] text-base font-medium"
      />
    </form>
  );
});
