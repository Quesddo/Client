import { createContext, ReactNode, useContext, useState } from "react";

interface ModalContextType {
  isOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
  isPopupOpen: boolean;
  showPopup: () => void;
  hidePopup: () => void;
  confirmPopup: () => void;
}

const InputModalContext = createContext<ModalContextType | null>(null);

export function InputModalProvider({ children }: { children: ReactNode }) {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  const showPopup = () => setIsPopupOpen(true);
  const hidePopup = () => setIsPopupOpen(false);
  const confirmPopup = () => {
    closeModal();
    hidePopup();
  };

  return (
    <InputModalContext.Provider
      value={{
        isOpen,
        openModal,
        closeModal,
        isPopupOpen,
        showPopup,
        hidePopup,
        confirmPopup,
      }}
    >
      {children}
    </InputModalContext.Provider>
  );
}

export function useModalContext() {
  const context = useContext(InputModalContext);
  if (!context) throw new Error("InputModalProvider 내부에서 사용해야 합니다.");
  return context;
}
