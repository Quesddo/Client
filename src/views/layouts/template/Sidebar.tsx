import hamburger from "@public/icons/hamburger.png";
import Image from "next/image";
import { useEffect, useState } from "react";

import { cn } from "@/utils/cn";
import MenuDashboard from "@/views/layouts/organisms/MenuDashBoard";
import MenuGoal from "@/views/layouts/organisms/MenuGoal";
import Profile from "@/views/layouts/organisms/Profile";

import SidebarHeader from "../organisms/SidebarHeader";

const MOBILE_BREAKPOINT = 744;

export default function Sidebar({ title }: { title: string }) {
  const [isOpen, setIsOpen] = useState(true);

  const handleToggleSidebar = () => {
    setIsOpen((prev) => !prev);
  };

  useEffect(() => {
    // 모바일이면 Sidebar를 닫음
    if (window.innerWidth < MOBILE_BREAKPOINT) {
      setIsOpen(false);
    }
  }, []);

  return (
    <>
      <header
        className={cn("flex gap-4 px-4 py-3 sm:hidden", isOpen && "hidden")}
      >
        <button onClick={handleToggleSidebar}>
          <Image src={hamburger} width={24} height={24} alt="메뉴" />
        </button>
        <h1 className="text-base font-semibold">{title}</h1>
      </header>
      <aside
        className={cn(
          "flex h-screen w-full flex-[0_0_100%] flex-col overflow-hidden border-r border-slate-200 pt-3 pb-8 transition-[flex] ease-[cubic-bezier(0,0.36,0,0.84)] sm:w-[280px] sm:flex-[0_0_280px] sm:pb-9",
          !isOpen && "sm:w-[60px] sm:flex-[0_0_60px]",
        )}
      >
        <SidebarHeader isOpen={isOpen} onToggleSidebar={handleToggleSidebar} />
        <div
          className={cn(
            "flex min-h-0 flex-col opacity-100 [&>*]:px-3 sm:[&>*]:px-6",
            !isOpen ? "opacity-0" : "transition-[opacity] delay-[10ms]",
          )}
        >
          <Profile />
          <MenuDashboard />
          <MenuGoal />
        </div>
      </aside>
    </>
  );
}
