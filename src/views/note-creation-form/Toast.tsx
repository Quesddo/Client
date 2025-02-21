import {
  createContext,
  PropsWithChildren,
  ReactElement,
  useContext,
  useState,
} from "react";

interface ToastProps {
  id: number;
  content: string | ReactElement;
}

interface ToastContextProps {
  toasts: ToastProps[];
  addToast: ({ content }: Omit<ToastProps, "id">) => void;
}

export const ToastContext = createContext<ToastContextProps>({
  toasts: [],
  addToast: () => {},
});

export const ToastProvider = ({ children }: PropsWithChildren) => {
  const [toasts, setToasts] = useState<ToastProps[]>([]);

  const addToast = ({ content }: Omit<ToastProps, "id">) => {
    const newId = Math.random() * Number.MAX_SAFE_INTEGER;
    setToasts((prev) => [...prev, { id: newId, content }]);

    const timeoutId = setTimeout(() => {
      setToasts((prev) => prev.slice(1));
      clearTimeout(timeoutId);
    }, 2000);
  };

  return (
    <ToastContext.Provider value={{ toasts, addToast }}>
      {children}
    </ToastContext.Provider>
  );
};

export default function Toast() {
  const { toasts } = useContext<ToastContextProps>(ToastContext);

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
