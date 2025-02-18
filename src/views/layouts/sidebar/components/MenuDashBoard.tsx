import Link from "next/link";
import { memo } from "react";

import MenuItem from "./MenuItem";
import AddButton from "./AddButton";

export default memo(function MenuDashboard() {
  return (
    <>
      <div className="hidden pb-[24px] sm:block">
        <AddButton>새 할일</AddButton>
      </div>
      <section className="flex h-[36px] items-center justify-between border-t border-b border-slate-200 py-3">
        <Link href="/dashboard">
          <MenuItem title="대시보드" iconSrc="/icons/home.png" />
        </Link>
        <AddButton size="xs">새 할일</AddButton>
        <button className="sm:hidden">새 할일</button>
      </section>
    </>
  );
});
