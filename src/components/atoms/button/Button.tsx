import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/utils/cn/cn";

const buttonVariants = cva(
  "shrink-0 box-border inline-flex items-center justify-center font-semibold rounded-[12px]",
  {
    variants: {
      variant: {
        default:
          "bg-blue-500 text-white hover:bg-blue-600 focus:bg-blue-800 disabled:bg-slate-400",
        outline:
          "bg-white text-blue-500 hover:text-blue-600 focus:text-blue-800 disabled:text-slate-400 border border-[curretColor]",
      },
      size: {
        default: "w-full h-[48px] text-base",
        lg: "w-[291px] h-[48px] text-base",
        sm: "w-[150px] h-[44px] text-sm",
        xs: "w-[84px] h-[36px] text-sm",
      },
      rounded: {
        true: "rounded-[24px]",
        false: null,
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants>;

export default function Button({
  variant = "default",
  size = "default",
  type = "button",
  rounded = false,
  className,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(buttonVariants({ variant, size, rounded, className }))}
      type={type}
      {...props}
    />
  );
}
