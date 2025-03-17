import { cva, type VariantProps } from "class-variance-authority";
import Image from "next/image";

const textVariants = cva("text-slate-800", {
  variants: {
    textSize: {
      sm: "text-sm",
      base: "text-base",
      lg: "text-lg",
    },
    fontWeight: {
      medium: "font-medium",
      semibold: "font-semibold",
    },
  },
});

interface GoalItemProps extends Required<VariantProps<typeof textVariants>> {
  iconSize: "sm" | "lg";
  goal?: string;
  gap?: number;
}

export default function GoalItem({
  goal,
  iconSize,
  textSize,
  fontWeight,
  gap = 6,
}: GoalItemProps) {
  const iconProps = {
    src: `/icons/flag-goal-${iconSize}.png`,
    width: iconSize === "lg" ? 40 : 24,
    height: iconSize === "lg" ? 40 : 24,
    alt: "flag-goal",
  };

  return (
    <div
      className={`flex w-fit items-center justify-center`}
      style={{ gap: `${gap}px` }}
    >
      <Image {...iconProps} />
      <span className={textVariants({ textSize, fontWeight })}>{goal}</span>
    </div>
  );
}
