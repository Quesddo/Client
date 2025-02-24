import { createContext, PropsWithChildren, useCallback, useState } from "react";

import { ToastProps } from "./Toast";

export interface ToastStateProps extends ToastProps {
  id: number;
}

export const ToastStateContext = createContext<ToastStateProps[]>([]);

export const ToastActionContext = createContext<
  (toast: Omit<ToastStateProps, "id" | "state">) => void
>(() => {});

export const ToastProvider = ({ children }: PropsWithChildren) => {
  const [toasts, setToasts] = useState<ToastStateProps[]>([]);

  const addToast = useCallback(
    ({
      autoClose = true,
      delay = 3000,
      ...toast
    }: Omit<ToastStateProps, "id" | "state">) => {
      const newId = Math.random() * Number.MAX_SAFE_INTEGER;
      setToasts((prev) => [...prev, { id: newId, delay, autoClose, ...toast }]);
      removeToast(newId, autoClose, delay);
    },
    [],
  );

  const removeToast = useCallback(
    (toastId: number, autoClose: boolean, delay: number) => {
      if (autoClose) {
        const timeoutId = setTimeout(() => {
          setToasts((prev) => prev.filter((item) => item.id !== toastId));
          clearTimeout(timeoutId);
        }, delay);
      }
    },
    [],
  );

  return (
    <ToastStateContext.Provider value={toasts}>
      <ToastActionContext.Provider value={addToast}>
        {children}
      </ToastActionContext.Provider>
    </ToastStateContext.Provider>
  );
};
