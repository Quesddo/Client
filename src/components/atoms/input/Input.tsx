import { cva, type VariantProps } from "class-variance-authority";
import { forwardRef } from "react";

import { cn } from "@/utils/cn/cn";

const inputVariants = cva(
  "box-border inline-block px-[24px] py-[12px] rounded-[12px] bg-slate-50 text-slate-800 font-normal placeholder:text-slate-400 focus:outline-none focus:border focus:border-blue-500 hover:border-blue-300",
  {
    variants: {
      size: {
        default: "w-full h-[44px] text-sm sm:h-[48px] sm:text-base",
        lg: "w-[612px] h-[48px] text-base",
        sm: "w-[343px] h-[44px] text-sm",
      },
    },
    defaultVariants: {
      size: "default",
    },
  },
);

type InputSize =
  | Pick<React.InputHTMLAttributes<HTMLInputElement>, "size">
  | Pick<VariantProps<typeof inputVariants>, "size">;

type InputElementProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "size"
> &
  VariantProps<typeof inputVariants> &
  InputSize;

const RefInput = forwardRef<HTMLInputElement, InputElementProps>(
  ({ className, size, ...props }, ref) => {
    return (
      <input
        ref={ref}
        className={cn(
          inputVariants({
            size,
            className,
          }),
        )}
        {...props}
      />
    );
  },
);

RefInput.displayName = "RefInput";

export default RefInput;
