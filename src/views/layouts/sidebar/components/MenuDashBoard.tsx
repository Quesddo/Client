import Link from "next/link";
import { memo } from "react";
import home from "@public/icons/home.png";

import MenuItem from "./MenuItem";

export default memo(function MenuDashboard() {
  return (
    <>
      <div className="hidden pb-[24px] sm:block">
        <button>새 할일</button>
      </div>
      <section className="flex h-[36px] items-center justify-between border-t border-b border-slate-200 py-3">
        <Link href="/dashboard">
          <MenuItem title="대시보드" icon={home} />
        </Link>
        <button className="sm:hidden">새 할일</button>
      </section>
    </>
  );
});
