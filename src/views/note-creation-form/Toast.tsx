import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

interface ToastContextProps {
  toasts: number[];
  addToast: () => void;
  removeToast: () => void;
}

export const ToastContext = createContext<ToastContextProps>({
  toasts: [],
  addToast: () => {},
  removeToast: () => {},
});

export const ToastProvider = ({ children }: PropsWithChildren) => {
  const [toasts, setToasts] = useState<number[]>([]);
  const addToast = () => {
    const newId = Math.random() * Number.MAX_SAFE_INTEGER;
    setToasts((prev) => [...prev, newId]);
  };
  const removeToast = () => {
    setToasts((prev) => prev.slice(1));
  };

  return (
    <ToastContext.Provider value={{ toasts, addToast, removeToast }}>
      {children}
    </ToastContext.Provider>
  );
};

const useToast = () => {
  const { toasts, removeToast } = useContext(ToastContext);
  const intervalRef = useRef<NodeJS.Timeout>(null);

  useEffect(() => {
    intervalRef.current = setTimeout(() => {
      removeToast();
    }, 1000);

    return () => {
      if (intervalRef.current) {
        clearTimeout(intervalRef.current);
      }
    };
  }, [toasts]);

  return { toasts };
};

export default function Toast() {
  const { toasts } = useToast();

  return toasts.map((_, i) => (
    <div
      key={i}
      className="flex items-center gap-2 rounded-[28px] bg-blue-200 px-6 py-3 text-sm font-semibold text-blue-500"
    >
      <img src="/icons/check.png" alt="확인" width={24} height={24} />
      <p>
        임시 저장이 완료되었습니다{" "}
        <span className="text-xs font-medium">ㆍ 1초전</span>
      </p>
    </div>
  ));
}
