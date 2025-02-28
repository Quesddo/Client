import GoalItem from "@/components/atoms/goal-item/GoalItem";
import TodoChip from "@/components/atoms/todo-chip/TodoChip";
import { TodoTitle } from "@/views/todo/todo-item/todo-title/TodoTitle";

interface GoalTodoDisplayProps {
  goal?: string;
  todo?: string;
}

export default function GoalTodoDisplay({ goal, todo }: GoalTodoDisplayProps) {
  return (
    <div className="flex flex-col gap-3">
      <GoalItem
        goal={goal || ""}
        iconSize="sm"
        fontWeight="medium"
        textSize="base"
      />
      <div className="flex items-center gap-2">
        <TodoChip isDone={false} />
        <TodoTitle title={todo || ""} done={false} />
      </div>
    </div>
  );
}
