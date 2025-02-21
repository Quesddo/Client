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
      className={cn("text-lg font-semibold text-slate-900", className)}
      {...props}
    >
      {title}
    </h1>
  );
}
