import Image from "next/image";
import {
  ButtonHTMLAttributes,
  InputHTMLAttributes,
  LabelHTMLAttributes,
  ReactNode,
  useEffect,
  useRef,
} from "react";
import ReactDOM from "react-dom";

import { useController, useFormContext } from "react-hook-form";

import Button from "@/components/atoms/button/Button";
import ExitBtn from "@/components/atoms/exit-btn/ExitBtn";
import Input from "@/components/atoms/input/Input";
import PlusIcon from "@/components/atoms/plus-icon/PlusIcon";
import { useModalContext } from "@/contexts/InputModalContext";
import useDragAndDrop from "@/hooks/useDragAndDrop";
import { useFilePreview } from "@/hooks/useFilePreview";
import { cn } from "@/utils/cn/cn";
import ClosePopup from "@/views/todo/popup/ClosePopup";
import { TodoCheckImg } from "@/views/todo/todo-checkbox/TodoCheckImg";

import InputDropdown from "../../../views/todo/input-dropdown/InputDropdown";
import type { Control, FieldValues, Path } from "react-hook-form";

export default function InputModal({ children }: { children: ReactNode }) {
  const { isOpen, isPopupOpen, hidePopup, confirmPopup } = useModalContext();
  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div>
      {children}
      {isPopupOpen && (
        <ClosePopup onClose={hidePopup} onConfirm={confirmPopup} />
      )}
    </div>,
    document.body,
  );
}

const MODAL_ANIMATION = {
  fadeIn: "animate-fadeIn",
};

function Overlay({ className }: { className?: string }) {
  const { isOpen, showPopup, closeModal } = useModalContext();
  const { watch, reset } = useFormContext();
  const [title, linkUrl, fileUrl] = watch(["title", "linkUrl", "fileUrl"]);

  const handleOverlayClick = () => {
    if (title || linkUrl || fileUrl) {
      showPopup();
    } else {
      closeModal();
      reset();
    }
  };

  return (
    <>
      <div
        className={cn(
          "fixed inset-0 z-20 flex items-center justify-center sm:bg-black/50",
          isOpen && MODAL_ANIMATION.fadeIn,
          className,
        )}
        onClick={handleOverlayClick}
      />
    </>
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
        "fixed top-[50%] left-[50%] z-30 h-[calc(100vh-48px)] w-[calc(100vw-48px)] -translate-x-1/2 -translate-y-1/2 transform bg-white p-6 font-semibold text-slate-800",
        isOpen && MODAL_ANIMATION.fadeIn,
        className,
      )}
    >
      {children}
    </div>
  );
}

function Title({ children }: { children: string | string[] }) {
  return <h1 className="z-30 text-lg font-bold">{children}</h1>;
}

function CloseButton() {
  const { closeModal, showPopup } = useModalContext();
  const { watch, reset } = useFormContext();
  const [title, linkUrl, fileUrl] = watch(["title", "linkUrl", "fileUrl"]);
  const handleCloseClick = () => {
    if (title || linkUrl || fileUrl) {
      showPopup();
    } else {
      closeModal();
      reset();
    }
  };

  return <ExitBtn onClick={handleCloseClick} />;
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
  return <Input size={size} ref={inputRef} {...props} />;
};

function FileInput({
  fileUrl,
  onFileChange,
  className,
}: {
  fileUrl?: string;
  onFileChange: (files: FileList) => void;
  className?: string;
}) {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const { previewFile, updateFilePreview } = useFilePreview();

  const { isDragging, handleDragOver, handleDragLeave, handleDrop } =
    useDragAndDrop({
      onDrop: (files) => {
        onFileChange(files);
        updateFilePreview(files);

        if (fileInputRef.current) {
          const dataTransfer = new DataTransfer();
          Array.from(files).forEach((file) => dataTransfer.items.add(file));
          fileInputRef.current.files = dataTransfer.files;
        }
      },
    });

  useEffect(() => {
    // 기존 fileUrl 미리보기
    if (fileUrl && !previewFile) {
      updateFilePreview(fileUrl);
    }
  }, [fileUrl, previewFile]);

  return (
    <div
      className={cn("h-[184px] transition-all", className)}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <label
        htmlFor="file-upload"
        className={cn(
          "relative flex h-full w-full cursor-pointer flex-col items-center justify-center rounded-xl bg-slate-50",
          isDragging && "bg-blue-100",
        )}
      >
        {previewFile ? (
          previewFile.url ? (
            <Image
              fill
              src={previewFile.url}
              alt={previewFile.name}
              className="h-16 w-16 rounded-md object-contain"
            />
          ) : (
            <>
              <img
                src="/icons/uploaded.png"
                alt="업로드파일"
                width={24}
                height={24}
              />
              <span
                className="max-w-[90%] text-center text-sm font-normal break-words text-gray-400"
                title={previewFile.name}
              >
                {previewFile.name}
              </span>
            </>
          )
        ) : (
          <>
            <PlusIcon color="gray" />
            <p className="text-sm font-normal text-slate-400 sm:text-base">
              파일을 업로드해주세요
            </p>
          </>
        )}
        <input
          ref={fileInputRef}
          id="file-upload"
          type="file"
          className="hidden"
          onChange={(e) => {
            if (e.target.files) {
              onFileChange(e.target.files);
              updateFilePreview(e.target.files);
            }
          }}
        />
      </label>
    </div>
  );
}

function DropdownInput<T extends FieldValues>({
  dropdownItems,
  buttonText,
  name,
  control,
  fetchNextPage,
  hasNextPage,
  isFetchingNextPage,
  ...props
}: {
  dropdownItems: { title: string; id: number }[];
  buttonText: string;
  name: Path<T>;
  control: Control<T>;
  fetchNextPage: () => void;
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
}) {
  const {
    field: { onChange, value },
  } = useController<T>({ name, control });

  const selectedItem = dropdownItems.find((item) => item.id === value) || null;

  return (
    <InputDropdown
      dropdownItems={dropdownItems}
      buttonText={buttonText}
      selectedItem={selectedItem}
      onSelect={(item) => onChange(item.id)}
      fetchNextPage={fetchNextPage}
      hasNextPage={hasNextPage}
      isFetchingNextPage={isFetchingNextPage}
      {...props}
    />
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
  checked,
  onToggle,
  children,
}: {
  checked: boolean;
  onToggle: () => void;
  children: string;
}) {
  return (
    <button
      type="button"
      onClick={(event) => {
        event.preventDefault();
        onToggle();
      }}
      className={cn(
        "group flex shrink-0 cursor-pointer items-center gap-[10px] rounded-lg p-2 pr-3 pl-3",
        "bg-slate-100 text-sm font-medium text-slate-800 transition duration-200 sm:text-base",
        checked && "bg-slate-800 text-white",
      )}
    >
      <TodoCheckImg
        checked={checked}
        checkedImgSrc="/icons/active-check-white.png"
        className="rounded-md group-hover:shadow-sm"
      />
      <p>{children}</p>
    </button>
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
