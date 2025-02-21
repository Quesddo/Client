import { HTMLAttributes } from "react";

import { cn } from "@/utils/cn";

interface PageTitleProps
  extends Omit<HTMLAttributes<HTMLHeadingElement>, "children"> {
  isMobileFixed?: boolean;
  title: string;
}

export default function PageTitle({
  title,
  isMobileFixed,
  className,
  ...props
}: PageTitleProps) {
  return (
    <h1
      className={cn(
        "text-base font-semibold text-slate-900 sm:text-lg",
        isMobileFixed &&
          "fixed top-0 left-10 px-4 py-3 sm:static sm:px-0 sm:py-3",
        className,
      )}
      {...props}
    >
      {title}
    </h1>
  );
}
