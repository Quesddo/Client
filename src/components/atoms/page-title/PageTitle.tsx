import { HTMLAttributes } from "react";

import { cn } from "@/utils/cn";

interface PageTitleProps
  extends Omit<HTMLAttributes<HTMLHeadingElement>, "children"> {
  title: string;
}

export default function PageTitle({
  title,
  className,
  ...props
}: PageTitleProps) {
  return (
    <h1
      className={cn(
        "text-base font-semibold text-slate-900 sm:text-lg",
        className,
      )}
      {...props}
    >
      {title}
    </h1>
  );
}
