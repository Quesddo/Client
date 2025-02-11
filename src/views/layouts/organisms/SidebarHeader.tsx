import Image from "next/image";
import iconFold from "@public/icons/fold.png";
import logo from "@public/icons/logo.png";
import logoHorizontal from "@public/icons/logo_horizontal.png";
import Link from "next/link";

import { cn } from "@/utils/cn";

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
      <Link href="/">
        <Image
          src={logoHorizontal}
          alt="로고"
          width={106}
          height={35}
          className={cn(!isOpen && "hidden")}
        />
        <Image
          src={logo}
          alt="로고"
          width={32}
          height={32}
          className={cn("hidden", !isOpen && "block h-[32px] w-[32px]")}
        />
      </Link>
      <button onClick={onToggleSidebar} className="hidden sm:block">
        <Image
          src={iconFold}
          width={24}
          height={24}
          alt={isOpen ? "사이드바 닫기" : "사이드바 열기"}
          className={cn("cursor-pointer", !isOpen && "sm:scale-[-1]")}
        />
      </button>
    </div>
  );
}
