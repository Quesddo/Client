import "react-quill-new/dist/quill.snow.css";

import dynamic from "next/dynamic";
import { ForwardedRef, useEffect, useMemo, useRef } from "react";
import { Controller, useFormContext } from "react-hook-form";
import ReactQuill, { Quill } from "react-quill-new";

import { useModalContext } from "@/contexts/InputModalContext";
import { cn } from "@/utils/cn";

interface ReactQuillNewProps extends ReactQuill.ReactQuillProps {
  forwardedRef: ForwardedRef<ReactQuill> | undefined;
}

const ReactQuillEditor = dynamic(
  async () => {
    const { default: RQ } = await import("react-quill-new");

    const ReactQuillNew = ({ forwardedRef, ...props }: ReactQuillNewProps) => (
      <RQ ref={forwardedRef} {...props} formats={props.formats ?? undefined} />
    );

    return ReactQuillNew;
  },
  {
    ssr: false,
  },
);

const toolbarOptions = [
  ["bold", "italic", "underline"],
  [{ align: "" }, { align: "center" }, { align: "right" }],
  [{ list: "bullet" }, { list: "ordered" }],
  [{ color: [] }],
  ["link"],
];

export default function Editor() {
  const { openModal } = useModalContext();
  const methods = useFormContext();
  const editorRef = useRef<ReactQuill>(null);

  const modules = useMemo(
    () => ({
      toolbar: {
        container: toolbarOptions,
        handlers: {
          link: openModal,
        },
      },
    }),
    [],
  );

  const handleChangePlainText = () => {
    methods.setValue(
      "plainText",
      editorRef.current?.getEditor().getText().replace(/\n+$/, ""),
    );
  };

  return (
    <Controller
      control={methods.control}
      name="content"
      rules={{ required: true }}
      render={({ field: { onChange, value } }) => (
        <>
          <ReactQuillEditor
            forwardedRef={(el: ReactQuill | null) => {
              editorRef.current = el;
            }}
            theme="snow"
            modules={modules}
            onChange={(value) => {
              onChange(value);
              handleChangePlainText();
            }}
            value={value}
            placeholder="내용을 입력하세요"
            className={cn(
              "relative flex min-h-0 flex-1 flex-col-reverse gap-4",
              "[&_.ql-toolbar]:rounded-[22px]",
              "[&>.ql-container.ql-snow]:!border-none",
              "[&>.ql-container]:min-h-0 [&>.ql-container]:!font-normal",
              "[&_.ql-editor]:!p-0",
              "[&_.ql-editor.ql-blank::before]:!left-0",
            )}
          ></ReactQuillEditor>
          <input type="hidden" {...methods.register("plainText")} />
        </>
      )}
    />
  );
}
