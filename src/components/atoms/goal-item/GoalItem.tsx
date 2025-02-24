import { cva, type VariantProps } from "class-variance-authority";
import Image from "next/image";

const textVariants = cva("text-base font-medium text-slate-800", {
  variants: {
    fontSize: {
      sm: "text-sm",
      md: "text-base",
      lg: "text-lg",
    },
    fontWeight: {
      medium: "font-medium",
      semibold: "font-semibold",
    },
  },
  defaultVariants: {
    fontSize: "sm",
    fontWeight: "medium",
  },
});

interface GoalItemProps extends VariantProps<typeof textVariants> {
  iconSize: "sm" | "lg";
  gap?: number;
  goal?: string;
}

export default function GoalItem({
  goal,
  iconSize,
  fontSize,
  fontWeight,
  gap = 6,
}: GoalItemProps) {
  const iconProps = {
    src: `/icons/flag-goal-${iconSize}.png`,
    width: iconSize === "lg" ? 40 : 24,
    height: iconSize === "lg" ? 40 : 24,
    alt: "flag-goal",
    layout: "fixed",
  };

  return (
    <div
      className={`flex w-fit items-center justify-center`}
      style={{ gap: `${gap}px` }}
    >
      <Image {...iconProps} />
      <span className={textVariants({ fontWeight, fontSize })}>{goal}</span>
    </div>
  );
}
