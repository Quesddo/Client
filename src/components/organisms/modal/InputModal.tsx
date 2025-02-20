import {
  ButtonHTMLAttributes,
  createContext,
  InputHTMLAttributes,
  LabelHTMLAttributes,
  ReactNode,
  useContext,
  useRef,
  useState,
} from "react";
import ReactDOM from "react-dom";
import { useFormContext } from "react-hook-form";

import Button from "@/components/atoms/button/Button";
import DeleteIcon from "@/components/atoms/delete-icon/DeleteIcon";
import RefInput from "@/components/atoms/input/RefInput";
import useDragAndDrop from "@/hooks/useDragAndDrop";
import { cn } from "@/utils/cn";

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

export default function InputModal({ children }: { children: ReactNode }) {
  const { isOpen } = useModalContext();
  if (!isOpen) return null;

  return ReactDOM.createPortal(<div>{children}</div>, document.body);
}

const MODAL_ANIMATION = {
  fadeIn: "animate-fadeIn",
};

function Overlay() {
  const { isOpen, closeModal } = useModalContext();
  const { watch, reset } = useFormContext();
  const [title, linkUrl, fileUrl] = watch(["title", "linkUrl", "fileUrl"]);

  return (
    <div
      className={cn(
        "fixed inset-0 z-20 flex items-center justify-center bg-black/50",
        isOpen && MODAL_ANIMATION.fadeIn,
      )}
      onClick={() => {
        if (title || linkUrl || fileUrl) {
          if (!confirm("(팝업창)모달 닫기 확인")) return;
        }
        closeModal();
        reset();
      }}
    />
  );
}

function Content({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const { isOpen } = useModalContext();

  return (
    <div
      className={cn(
        "fixed top-[50%] left-[50%] z-30 w-[472px] -translate-x-1/2 -translate-y-1/2 transform rounded-xl bg-white p-6 font-semibold text-slate-800",
        isOpen && MODAL_ANIMATION.fadeIn,
        className,
      )}
    >
      {children}
    </div>
  );
}

function Title({ children }: { children: string }) {
  return <h1 className="z-30 text-lg font-bold">{children}</h1>;
}

function CloseButton() {
  const { closeModal } = useModalContext();
  const { watch, reset } = useFormContext();
  const [title, linkUrl, fileUrl] = watch(["title", "linkUrl", "fileUrl"]);
  const closeConfirm = () => {
    if (title || linkUrl || fileUrl) {
      if (!confirm("(팝업창)모달 닫기 확인")) return;
    }
    closeModal();
    reset();
  };

  return (
    <button onClick={closeConfirm}>
      <DeleteIcon />
    </button>
  );
}

function Label({ children, ...props }: LabelHTMLAttributes<HTMLLabelElement>) {
  return (
    <label className="mb-3 block" {...props}>
      {children}
    </label>
  );
}

// ------- Form Input 컴포넌트 -------
const ALLOWED_SIZES = ["default", "lg", "sm", null] as const;

const TextInput = ({
  size,
  ...props
}: Omit<InputHTMLAttributes<HTMLInputElement>, "size"> & {
  size?: (typeof ALLOWED_SIZES)[number];
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  return <RefInput size={size} ref={inputRef} {...props} />;
};

function FileInput({
  onFileChange,
}: {
  onFileChange: (files: FileList) => void;
}) {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const { isDragging, handleDragOver, handleDragLeave, handleDrop } =
    useDragAndDrop({
      onDrop: (files) => {
        onFileChange(files);

        // input 값도 업데이트
        if (fileInputRef.current) {
          const dataTransfer = new DataTransfer();
          Array.from(files).forEach((file) => dataTransfer.items.add(file));
          fileInputRef.current.files = dataTransfer.files;
        }
      },
    });

  return (
    <div
      className={`transition-all ${isDragging ? "border-blue-500 bg-blue-100" : "border-gray-300"}`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <label
        htmlFor="file-upload"
        className="flex h-10 cursor-pointer flex-col items-center justify-center rounded-xl bg-slate-50"
      >
        <p className="font-normal text-slate-400">파일을 업로드해주세요</p>
        <input
          ref={fileInputRef}
          id="file-upload"
          type="file"
          className="hidden"
          onChange={(e) => e.target.files && onFileChange(e.target.files)}
        />
      </label>
    </div>
  );
}

function DropdownInput<T extends string | number>({
  options,
  ...props
}: {
  options: T[];
}) {
  const selectRef = useRef<HTMLSelectElement>(null);

  return (
    <select
      ref={selectRef}
      className="w-full rounded-xl bg-slate-200 p-2"
      {...props}
    >
      {options.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
  );
}
// -----------------------

function SubmitButton({
  children,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <Button type="submit" {...props}>
      {children}
    </Button>
  );
}

function CheckButton({
  done,
  onToggle,
  children,
}: {
  done: boolean;
  onToggle: () => void;
  children: string;
}) {
  return (
    <div className="flex items-center bg-amber-100 p-1">
      <button
        type="button"
        onClick={(event) => {
          event.preventDefault();
          onToggle();
        }}
        className="mr-2 flex shrink-0 cursor-pointer items-center p-[3px]"
      >
        <img
          src={done ? "/active-check-white.png" : "/inactive-check.png"}
          alt={done ? "체크됨" : "미체크"}
          width={18}
          height={18}
          className="rounded-md transition-all duration-150 hover:shadow-sm"
        />
      </button>
      <p className="text-xs font-medium text-slate-400">{children}</p>
    </div>
  );
}

InputModal.Overlay = Overlay;
InputModal.Title = Title;
InputModal.Content = Content;
InputModal.CloseButton = CloseButton;

InputModal.Label = Label;
InputModal.TextInput = TextInput;
InputModal.FileInput = FileInput;
InputModal.DropdownInput = DropdownInput;

InputModal.SubmitButton = SubmitButton;
InputModal.CheckButton = CheckButton;
