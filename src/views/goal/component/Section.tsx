import { cva } from "class-variance-authority";
import { ReactNode } from "react";

import { cn } from "@/utils/cn";

const sectionVariants = cva("px-[24px] py-[16px] rounded-xl border-0");

interface Container {
  children: ReactNode;
  className?: string;
}
export default function Container({ children, className }: Container) {
  return (
    <section className={cn(sectionVariants({ className }))}>{children}</section>
  );
}
