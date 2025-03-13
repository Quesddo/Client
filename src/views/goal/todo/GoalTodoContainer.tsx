import { useTodoListActionContext } from "@/contexts/TodoListActionContext";

import GoalDoneList from "./GoalDoneList";
import GoalTodoList from "./GoalTodoList";
import Section from "../component/Section";

export default function GoalTodoContainer() {
  /* todolist */
  const { handleToggleTodo, onOpenDeletePopup, onOpenCreateModal } =
    useTodoListActionContext();

  return (
    <Section className="flex flex-col gap-[16px] p-[0px] md:flex-row md:justify-between md:gap-[24px]">
      {/* todo list */}
      <GoalTodoList
        handleClick={onOpenCreateModal}
        handleToggleTodo={handleToggleTodo}
        onOpenDeletePopup={onOpenDeletePopup}
      />
      {/* done list */}
      <GoalDoneList
        handleToggleTodo={handleToggleTodo}
        onOpenDeletePopup={onOpenDeletePopup}
      />
    </Section>
  );
}
