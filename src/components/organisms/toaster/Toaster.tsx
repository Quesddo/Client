import React, { useContext } from "react";

import Toast from "./Toast";
import { ToastStateContext, ToastStateProps } from "./ToastProvider";

export default function Toaster() {
  const toasts = useContext<ToastStateProps[]>(ToastStateContext);

  return (
    <div className="pointer-events-none sticky bottom-0 z-50 flex h-0 flex-col-reverse bg-red-200">
      {toasts.map(({ id, ...props }) => (
        <Toast key={id} {...props} />
      ))}
    </div>
  );
}
