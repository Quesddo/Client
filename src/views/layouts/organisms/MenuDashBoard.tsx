import { memo } from "react";
import home from "@public/icons/home.png";

import AddButton from "../atoms/AddButton";
import MenuItem from "../atoms/MenuItem";

export default memo(function MenuDashboard() {
  return (
    <>
      <div className="hidden pb-[24px] sm:block">
        <AddButton>새 할일</AddButton>
      </div>
      <section className="flex h-[36px] items-center justify-between border-t border-b border-slate-200 py-3">
        <MenuItem title="대시보드" icon={home} />
        <AddButton size="xs">새 할일</AddButton>
      </section>
    </>
  );
});
