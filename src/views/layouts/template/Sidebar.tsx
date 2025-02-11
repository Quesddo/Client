import { useState } from "react";

import { cn } from "@/utils/cn";
import MenuDashboard from "@/views/layouts/organisms/MenuDashBoard";
import MenuGoal from "@/views/layouts/organisms/MenuGoal";
import Profile from "@/views/layouts/organisms/Profile";

import SidebarHeader from "../organisms/SidebarHeader";

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(true);

  const handleToggleSidebar = () => {
    setIsOpen((prev) => !prev);
  };

  return (
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
  );
}
