import { createContext, ReactNode, useContext, useState } from "react";

type ModalType = "createTodo" | "updateTodo" | "link" | null;

interface ModalContextType {
  modalType: ModalType;
  isOpen: boolean;
  openModal: (type: ModalType) => void;
  closeModal: () => void;
  isPopupOpen: boolean;
  showPopup: () => void;
  hidePopup: () => void;
  confirmPopup: () => void;
}

const InputModalContext = createContext<ModalContextType | null>(null);

export function InputModalProvider({ children }: { children: ReactNode }) {
  const [modalType, setModalType] = useState<ModalType>(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const openModal = (type: ModalType) => {
    setModalType(type);
    setIsOpen(true);
  };
  const closeModal = () => {
    setIsOpen(false);
    setModalType(null);
  };

  const showPopup = () => setIsPopupOpen(true);
  const hidePopup = () => setIsPopupOpen(false);
  const confirmPopup = () => {
    closeModal();
    hidePopup();
  };

  return (
    <InputModalContext.Provider
      value={{
        modalType,
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
