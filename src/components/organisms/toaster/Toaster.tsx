import React, { useContext } from "react";

import { cn } from "@/utils/cn/cn";

import Toast from "./Toast";
import { ToastStateContext, ToastStateProps } from "./ToastProvider";

interface ToasterProps {
  className?: string;
}

export default function Toaster({ className }: ToasterProps) {
  const toasts = useContext<ToastStateProps[]>(ToastStateContext);

  return (
    <div
      className={cn(
        "pointer-events-none fixed right-0 bottom-0 z-50 flex h-0 flex-col-reverse bg-red-200",
        className,
      )}
    >
      {toasts.map(({ id, ...props }) => (
        <Toast key={id} {...props} />
      ))}
    </div>
  );
}
