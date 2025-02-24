import { createContext, PropsWithChildren, useCallback, useState } from "react";

import { ToastProps } from "./Toast";
import { ToasterProps } from "./Toaster";

export type ToastActionContextProps = ({ content }: ToastProps) => void;

export const ToastStateContext = createContext<ToasterProps[]>([]);

export const ToastActionContext = createContext<(toast: ToastProps) => void>(
  () => {},
);

export const ToastProvider = ({ children }: PropsWithChildren) => {
  const [toasts, setToasts] = useState<ToasterProps[]>([]);

  const addToast = useCallback((toast: ToastProps) => {
    const newId = Math.random() * Number.MAX_SAFE_INTEGER;
    setToasts((prev) => [...prev, { id: newId, ...toast }]);

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
