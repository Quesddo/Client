import { cn } from "@/utils/cn";

import CloseSidebarLink from "./CloseSidebarLink";

interface SidebarHeaderProps {
  isOpen: boolean;
  onToggleSidebar: () => void;
}

export default function SidebarHeader({
  isOpen,
  onToggleSidebar,
}: SidebarHeaderProps) {
  return (
    <div
      className={cn(
        "flex items-center justify-between px-4",
        !isOpen && "flex-col gap-4 px-[14px] pt-2",
      )}
    >
      <CloseSidebarLink href="/">
        <img
          src="/icons/logo-horizontal.png"
          alt="로고_horizontal"
          width={106}
          height={35}
          className={cn(!isOpen && "hidden")}
        />
        <img
          src="/icons/logo.png"
          alt="로고"
          width={32}
          height={32}
          className={cn("hidden", !isOpen && "block h-[32px] w-[32px]")}
        />
      </CloseSidebarLink>
      <button
        onClick={onToggleSidebar}
        className={cn("smd:hidden", !isOpen && "smd:block")}
      >
        <img
          src="/icons/fold.png"
          width={24}
          height={24}
          alt={isOpen ? "사이드바 닫기" : "사이드바 열기"}
          className={cn(!isOpen && "scale-[-1]")}
        />
      </button>
    </div>
  );
}
