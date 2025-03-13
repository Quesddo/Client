import { useFormContext } from "react-hook-form";

import GoalItem from "@/components/atoms/goal-item/GoalItem";
import TodoChip from "@/components/atoms/todo-chip/TodoChip";

export default function GoalTodoDisplay() {
  const methods = useFormContext();
  const goal = methods.getValues("goal");
  const todo = methods.getValues("todo.title");
  const done = methods.getValues("todo.done");

  return (
    <div className="flex flex-col gap-3">
      <GoalItem
        goal={goal || ""}
        iconSize="sm"
        fontWeight="medium"
        textSize="base"
      />
      <div className="flex items-center gap-2">
        <TodoChip isDone={done} />
        <span className="text-sm font-normal text-slate-700">{todo || ""}</span>
      </div>
    </div>
  );
}
