import { usePathname } from "next/navigation";
import { createContext, Suspense, useEffect, useState } from "react";
import { ErrorBoundary } from "react-error-boundary";

import ErrorFallback from "@/components/molecules/error-fallback/ErrorFallback";
import Toaster from "@/components/organisms/toaster/Toaster";
import ToastProvider from "@/components/organisms/toaster/ToastProvider";
import { InputModalProvider } from "@/contexts/InputModalContext";
import { cn } from "@/utils/cn";
import MenuDashboard from "@/views/layouts/sidebar/components/MenuDashBoard";
import Profile from "@/views/layouts/sidebar/components/Profile";

import MenuGoal from "./components/goals/MenuGoal";
import SidebarHeader from "./components/SidebarHeader";

const TABLET_BREAKPOINT = 964;
const TO_HIDE_PATH = ["/", "/login", "/signup"];

export const SidebarContext = createContext<() => void>(() => {});

export default function Sidebar() {
  const pathname = usePathname();
  const isHidden = TO_HIDE_PATH.includes(pathname);

  // 기본 사이드 바 상태 지정 (모바일/태블릭(sm): 닫힘)
  const [isOpen, setIsOpen] = useState(false);

  const handleToggleSidebar = () => {
    setIsOpen((prev) => !prev);
  };

  const handleCloseSidebarAfterAction = () => {
    if (window.innerWidth < TABLET_BREAKPOINT) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    // 기본 사이드 바 상태 지정 (PC/태블릿(smd): 열림)
    if (window.innerWidth >= TABLET_BREAKPOINT) {
      setIsOpen(true);
    }
  }, []);

  return (
    !isHidden && (
      <ToastProvider>
        <header
          className={cn("flex gap-4 px-4 py-3 sm:hidden", isOpen && "hidden")}
        >
          <button onClick={handleToggleSidebar}>
            <img src="/icons/hamburger.png" width={24} height={24} alt="메뉴" />
          </button>
        </header>
        <aside
          className={cn(
            // mobile 스타일
            "fixed inset-0 z-20 box-border flex h-dvh w-full flex-[0_0_100%] flex-col overflow-hidden border-slate-200 bg-white pt-3 pb-8 transition-[flex,width] ease-[cubic-bezier(0,0.36,0,0.84)]",
            // tablet + pc 스타일
            "sm:right-auto sm:w-[280px] sm:flex-[0_0_280px] sm:border-r sm:pb-9",
            !isOpen && "hidden sm:flex sm:w-[60px] sm:flex-[0_0_60px]",
          )}
        >
          <SidebarContext.Provider value={handleCloseSidebarAfterAction}>
            <SidebarHeader
              isOpen={isOpen}
              onToggleSidebar={handleToggleSidebar}
            />
            <div
              className={cn(
                "flex min-h-0 flex-col opacity-100 [&>*]:px-3 sm:[&>*]:px-6",
                !isOpen ? "opacity-0" : "transition-[opacity] delay-[10ms]",
              )}
            >
              <ErrorBoundary FallbackComponent={ErrorFallback}>
                <Suspense>
                  <Profile />
                </Suspense>
              </ErrorBoundary>
              <InputModalProvider>
                <MenuDashboard />
              </InputModalProvider>
              <MenuGoal />
            </div>
            <Toaster className="bottom-[40px] w-auto px-4" />
          </SidebarContext.Provider>
        </aside>
        <div
          className={cn(
            // backdrop
            "fixed inset-0 z-10 bg-black/50 opacity-100 transition-[opacity] delay-[10ms]",
            "smd:hidden hidden sm:block",
            !isOpen && "opacity-0 sm:hidden",
          )}
        ></div>
      </ToastProvider>
    )
  );
}
