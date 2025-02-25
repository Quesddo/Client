import { createContext, PropsWithChildren, useCallback, useState } from "react";

import { ToastProps } from "./Toast";

export interface ToastStateProps extends ToastProps {
  id: number;
}

export type ToastActionProps = (
  toast: Omit<ToastStateProps, "id" | "state">,
) => void;

export const ToastStateContext = createContext<ToastStateProps[]>([]);

export const ToastActionContext = createContext<ToastActionProps>(() => {});

const MINIMUM_DELAY_TIME = 500;
const DEFAULT_TOAST_DELAY_TIME = 2500;

export const ToastProvider = ({ children }: PropsWithChildren) => {
  const [toasts, setToasts] = useState<ToastStateProps[]>([]);

  const addToast = useCallback(
    ({
      autoClose = true,
      delay = DEFAULT_TOAST_DELAY_TIME,
      ...toast
    }: Omit<ToastStateProps, "id" | "state">) => {
      if (delay <= MINIMUM_DELAY_TIME) {
        throw new Error(
          `addToast의 delay는 ${MINIMUM_DELAY_TIME}ms보다 초과되어야 합니다. `,
        );
      }

      const newId = Math.random() * Number.MAX_SAFE_INTEGER;
      setToasts((prev) => [...prev, { id: newId, delay, autoClose, ...toast }]);
      removeToast(newId, autoClose, delay);
    },
    [],
  );

  const removeToast = useCallback(
    (toastId: number, autoClose: boolean, delay: number) => {
      if (!autoClose) return;

      const timeoutId = setTimeout(() => {
        setToasts((prev) => prev.filter((item) => item.id !== toastId));
        clearTimeout(timeoutId);
      }, delay);
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
