import { TodoCheckImg } from "./TodoCheckImg";

export default function TodoUpdateFormCheckbox({
  done,
  setIsDone,
}: {
  done: boolean;
  setIsDone: (value: boolean) => void;
}) {
  return (
    <div
      className="group flex cursor-pointer items-center gap-2 self-start"
      onClick={() => setIsDone(!done)}
    >
      <TodoCheckImg checked={done} className="group-hover:shadow-sm" />
      <span>Done</span>
    </div>
  );
}
