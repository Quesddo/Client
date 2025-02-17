import { HTMLAttributes } from "react";

import Button from "@/components/atoms/button/Button";
import PlusIcon from "@/components/atoms/plus-icon/PlusIcon";
import { cn } from "@/utils/cn";

interface ButtonPlusIconProps extends HTMLAttributes<HTMLButtonElement> {
  size?: "default" | "xs";
  outline?: boolean;
}

export default function AddButton({
  size = "default",
  outline = false,
  className,
  children,
  ...props
}: ButtonPlusIconProps) {
  const isSmallSize = size === "xs";
  const iconSize = isSmallSize ? 16 : 24;

  return (
    <Button
      size={isSmallSize ? "xs" : "default"}
      variant={outline ? "outline" : "default"}
      className={cn(
        isSmallSize ? "sm:hidden" : "hidden sm:inline-flex",
        className,
      )}
      {...props}
    >
      <PlusIcon width={iconSize} height={iconSize} />
      <span className={cn(isSmallSize ? "px-0.5" : "px-1")}>{children}</span>
    </Button>
  );
}
