import { cva, type VariantProps } from "class-variance-authority";
import { ReactElement, useEffect, useState } from "react";

import { cn } from "@/utils/cn";

export const toastVariants = cva(
  "data-[state=open]:animate-toast-open data-[state=close]:animate-toast-close mx-10 mb-4 flex items-center gap-2 px-6 py-3 text-sm font-semibold first:mb-10",
  {
    variants: {
      variant: {
        default: "bg-blue-200 text-blue-500",
        destructive: "bg-red-200 text-red-500",
      },
      size: {
        default: "ml-auto w-[250px] rounded",
        full: "box-border rounded-[28px]",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ToastProps extends VariantProps<typeof toastVariants> {
  content: string | ReactElement;
  className?: string;
  delay?: number;
  autoClose?: boolean;
}

const getIconSrc = (variant: VariantProps<typeof toastVariants>["variant"]) => {
  switch (variant) {
    case "default":
      return "/icons/check.png";
    case "destructive":
      return "/icons/error.png";
    default:
      return "/icons/check.png";
  }
};

export default function Toast({
  content,
  delay,
  autoClose,
  className,
  ...props
}: ToastProps) {
  const [isOpen, setIsOpen] = useState(true);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    if (delay && autoClose) {
      timeoutId = setTimeout(() => {
        setIsOpen(false);
      }, delay - 190);
    }

    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, []);

  return (
    <div
      className={cn(
        toastVariants({
          ...props,
          className,
        }),
      )}
      data-state={isOpen ? "open" : "close"}
    >
      <img
        src={getIconSrc(props.variant)}
        alt="토스트 아이콘"
        width={24}
        height={24}
      />
      {typeof content === "string" ? <p>{content}</p> : content}
    </div>
  );
}
