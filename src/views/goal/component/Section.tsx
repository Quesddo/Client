import { ReactNode } from "react";

import { cn } from "@/utils/cn";
interface Container {
  children: ReactNode;
  className?: string;
}

export default function Section({ children, className }: Container) {
  return (
    <section
      className={cn(`rounded-xl border-0 px-[24px] py-[16px] ${className}`)}
    >
      {children}
    </section>
  );
}
