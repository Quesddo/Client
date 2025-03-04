import Image from "next/image";
import { useRouter } from "next/router";
import { Suspense } from "react";

import Spinner from "@/components/atoms/spinner/Spinner";
import TitleWithIcon from "@/components/atoms/title-with-icon/TitleWithIcon.tsx";
import TodoList from "@/components/organisms/todo-list/TodoList";
import { useTodos } from "@/hooks/todo/useTodos";
import arrowRight from "@public/icons/ic_arrow_right.svg";

interface RecentTodoProps {
  handleToggleTodo: (todoId: number, isDone: boolean) => void;
  setSelectedTodoId: (id: number | null) => void;
  onOpenDeletePopup: (todoId: number) => void;
}

export default function RecentTodo({
  handleToggleTodo,
  setSelectedTodoId,
  onOpenDeletePopup,
}: RecentTodoProps) {
  const { data } = useTodos();
  const router = useRouter();
  const handleShowAll = () => {
    router.push("/todo");
  };

  const todos = data?.todos ?? [];

  return (
    <section className="mb-4 h-[218px] flex-1 rounded-xl bg-white p-4 transition-shadow duration-300 hover:shadow-2xl">
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
        {todos.length === 0 ? (
          <div className="flex h-full items-center justify-center text-sm font-normal text-slate-500">
            최근에 등록한 할 일이 없어요
          </div>
        ) : (
          <Suspense fallback={<Spinner size={60} />}>
            <TodoList
              data={todos}
              handleToggleTodo={handleToggleTodo}
              setSelectedTodoId={setSelectedTodoId}
              onOpenDeletePopup={onOpenDeletePopup}
            />
          </Suspense>
        )}
      </div>
    </section>
  );
}
