import Image from "next/image";
import { useRouter } from "next/router";

import TitleWithIcon from "@/components/atoms/title-with-icon/TitleWithIcon.tsx";
import TodoList from "@/components/organisms/todo-list/TodoList";
import { useTodoListActionContext } from "@/contexts/TodoListActionContext";
import { useTodos } from "@/hooks/todo/useTodos";
import pageRoutes from "@/router/pageRoutes";
import arrowRight from "@public/icons/arrow-right.svg";

export default function RecentTodo() {
  const { data } = useTodos({ size: 5 });
  const router = useRouter();
  const handleShowAll = () => {
    router.push(pageRoutes.todo());
  };

  const todos = data?.todos ?? [];
  const hasTodos = data && data.todos.length > 0;

  const { handleToggleTodo, onOpenDeletePopup } = useTodoListActionContext();

  return (
    <>
      <div className="mb-4 flex justify-between">
        <TitleWithIcon
          imgUrl="/icons/todo-recently.png"
          title="최근 등록한 할 일"
          gap={8}
          className="font-semibold sm:text-lg"
        />
        <button
          onClick={handleShowAll}
          className="flex items-center text-sm font-medium text-slate-600"
        >
          모두보기
          <Image src={arrowRight} alt="arrow-right" width={24} height={24} />
        </button>
      </div>

      <div className="h-full max-h-[154px] overflow-y-hidden">
        {hasTodos ? (
          <TodoList
            data={todos}
            handleToggleTodo={handleToggleTodo}
            onOpenDeletePopup={onOpenDeletePopup}
          />
        ) : (
          <div className="flex h-full items-center justify-center text-sm font-normal text-slate-500">
            최근에 등록한 할 일이 없어요
          </div>
        )}
      </div>
    </>
  );
}
