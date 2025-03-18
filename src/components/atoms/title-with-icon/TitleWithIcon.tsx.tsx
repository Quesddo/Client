import Image from "next/image";

import { cn } from "@/utils/cn/cn";

interface TitleWithIconProps {
  iconSize?: "sm" | "lg";
  title: string;
  gap?: number;
  imgUrl?: string;
  className?: string;
}

export default function TitleWithIcon({
  title,
  iconSize = "lg",
  gap = 6,
  imgUrl,
  className,
}: TitleWithIconProps) {
  const iconProps = {
    src: imgUrl ? imgUrl : `/icons/flag-goal-${iconSize}.png`,
    width: iconSize === "lg" ? 40 : 24,
    height: iconSize === "lg" ? 40 : 24,
    alt: `${imgUrl}`,
  };

  return (
    <div
      className={`flex w-fit items-center justify-center`}
      style={{ gap: `${gap}px` }}
    >
      <Image {...iconProps} />
      <span className={cn("text-base font-medium text-slate-800", className)}>
        {title}
      </span>
    </div>
  );
}
