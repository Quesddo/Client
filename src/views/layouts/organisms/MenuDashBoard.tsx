import { memo } from "react";
import home from "@public/icons/home.png";

import MenuItem from "../atoms/MenuItem";

export default memo(function MenuDashboard() {
  return (
    <>
      <div className="hidden pb-[24px] sm:block">
        <button>새 할일</button>
      </div>
      <section className="flex h-[36px] items-center justify-between border-t border-b border-slate-200 py-3">
        <MenuItem title="대시보드" icon={home} />
        <button className="sm:hidden">새 할일</button>
      </section>
    </>
  );
});
