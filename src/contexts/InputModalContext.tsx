import { createContext, ReactNode, useContext, useState } from "react";

interface ModalContextType {
  isOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
}

const InputModalContext = createContext<ModalContextType | null>(null);

export function InputModalProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  return (
    <InputModalContext.Provider value={{ isOpen, openModal, closeModal }}>
      {children}
    </InputModalContext.Provider>
  );
}

export function useModalContext() {
  const context = useContext(InputModalContext);
  if (!context) throw new Error("InputModalProvider 내부에서 사용해야 합니다.");
  return context;
}
