import { memo } from "react";

import { useModalContext } from "@/contexts/InputModalContext";
import TodoCreateForm from "@/views/todo/todo-create-form/TodoCreateForm";

import AddButton from "./AddButton";
import MenuItem from "./MenuItem";
import CloseSidebarLink from "./CloseSidebarLink";

export default memo(function MenuDashboard() {
  const { openModal } = useModalContext();

  return (
    <>
      <div className="hidden pb-[24px] sm:block">
        <AddButton onClick={() => openModal("createTodo")}>새 할일</AddButton>
      </div>
      <section className="flex h-[36px] items-center justify-between border-t border-b border-slate-200 py-3">
        <CloseSidebarLink href="/dashboard">
          <MenuItem title="대시보드" iconSrc="/icons/home.png" />
        </CloseSidebarLink>
        <AddButton size="xs" onClick={() => openModal("createTodo")}>
          새 할일
        </AddButton>
        <TodoCreateForm />
      </section>
    </>
  );
});
