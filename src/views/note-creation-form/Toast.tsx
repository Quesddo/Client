import { createContext, PropsWithChildren, useContext, useState } from "react";

interface ToastContextProps {
  toasts: number[];
  addToast: () => void;
}

export const ToastContext = createContext<ToastContextProps>({
  toasts: [],
  addToast: () => {},
});

export const ToastProvider = ({ children }: PropsWithChildren) => {
  const [toasts, setToasts] = useState<number[]>([]);

  const addToast = () => {
    const newId = Math.random() * Number.MAX_SAFE_INTEGER;
    setToasts((prev) => [...prev, newId]);

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
      {toasts.map((v) => (
        <div
          key={v}
          className="flex items-center gap-2 rounded-[28px] bg-blue-200 px-6 py-3 text-sm font-semibold text-blue-500"
        >
          <img src="/icons/check.png" alt="확인" width={24} height={24} />
          <p>
            임시 저장이 완료되었습니다{" "}
            <span className="text-xs font-medium">ㆍ {v.toFixed(0)}초전</span>
          </p>
        </div>
      ))}
    </div>
  );
}
