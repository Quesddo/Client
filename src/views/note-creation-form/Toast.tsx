import { ReactElement, useContext } from "react";

import { ToastStateContext } from "./ToastProvider";

export interface ToastProps {
  id: number;
  content: string | ReactElement;
}

export default function Toast() {
  const toasts = useContext<ToastProps[]>(ToastStateContext);

  return (
    <div className="flex h-[500px] flex-col-reverse gap-4">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className="flex items-center gap-2 rounded-[28px] bg-blue-200 px-6 py-3 text-sm font-semibold text-blue-500"
        >
          <img src="/icons/check.png" alt="확인" width={24} height={24} />
          <p>{toast.content}</p>
        </div>
      ))}
    </div>
  );
}
