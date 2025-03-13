import { memo } from "react";

import { useTodoListActionContext } from "@/contexts/TodoListActionContext";
import pageRoutes from "@/router/pageRoutes";

import AddButton from "./AddButton";
import CloseSidebarLink from "./CloseSidebarLink";
import MenuItem from "./MenuItem";

export default memo(function MenuDashboard() {
  const { onOpenCreateModal } = useTodoListActionContext();

  const handleCreateTodo = () => {
    onOpenCreateModal(undefined);
  };

  return (
    <>
      <div className="hidden pb-[24px] sm:block">
        <AddButton onClick={handleCreateTodo}>새 할일</AddButton>
      </div>
      <section className="flex h-[36px] items-center justify-between border-t border-b border-slate-200 py-3">
        <CloseSidebarLink href={pageRoutes.dashboard()}>
          <MenuItem title="대시보드" iconSrc="/icons/home.png" />
        </CloseSidebarLink>
        <AddButton size="xs" onClick={handleCreateTodo}>
          새 할일
        </AddButton>
      </section>
    </>
  );
});
