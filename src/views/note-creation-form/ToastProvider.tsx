import { createContext, PropsWithChildren, useCallback, useState } from "react";

import { ToastProps } from "./Toast";

export const ToastStateContext = createContext<ToastProps[]>([]);

export const ToastActionContext = createContext<
  ({ content }: Omit<ToastProps, "id">) => void
>(() => {});

export const ToastProvider = ({ children }: PropsWithChildren) => {
  const [toasts, setToasts] = useState<ToastProps[]>([]);

  const addToast = useCallback(({ content }: Omit<ToastProps, "id">) => {
    const newId = Math.random() * Number.MAX_SAFE_INTEGER;
    setToasts((prev) => [...prev, { id: newId, content }]);

    const timeoutId = setTimeout(() => {
      setToasts((prev) => prev.slice(1));
      clearTimeout(timeoutId);
    }, 2000);
  }, []);

  return (
    <ToastStateContext.Provider value={toasts}>
      <ToastActionContext.Provider value={addToast}>
        {children}
      </ToastActionContext.Provider>
    </ToastStateContext.Provider>
  );
};
