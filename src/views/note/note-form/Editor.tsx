import "react-quill-new/dist/quill.snow.css";

import dynamic from "next/dynamic";
import { ForwardedRef, useCallback, useMemo, useRef } from "react";
import { Controller, useFormContext } from "react-hook-form";
import ReactQuill from "react-quill-new";

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

  const setEditorRef = useCallback((el: ReactQuill | null) => {
    if (!el) return;
    editorRef.current = el;

    handleChangePlainText();
  }, []);

  return (
    <Controller
      control={methods.control}
      name="content"
      rules={{ required: true }}
      render={({ field: { onChange, value } }) => (
        <>
          <ReactQuillEditor
            forwardedRef={setEditorRef}
            theme="snow"
            modules={modules}
            onChange={(value) => {
              onChange(value);
              handleChangePlainText();
            }}
            value={value}
            placeholder="내용을 입력하세요"
            className={cn(
              // container
              "relative flex min-h-0 flex-1 flex-col-reverse gap-4",
              // toolbar, link item
              "[&_.ql-toolbar]:rounded-[22px] [&_.ql-toolbar.ql-snow]:!flex [&_.ql-toolbar.ql-snow_.ql-formats]:last:ml-auto [&_.ql-toolbar.ql-snow_.ql-formats]:last:rounded-full [&_.ql-toolbar.ql-snow_.ql-formats]:last:bg-slate-200",
              // content container
              "[&>.ql-container]:min-h-0 [&>.ql-container]:!text-base [&>.ql-container]:!font-normal [&>.ql-container.ql-snow]:!border-none",
              // content, content placeholder
              "[&_.ql-editor]:!p-0 [&_.ql-editor.ql-blank::before]:!left-0",
            )}
          ></ReactQuillEditor>
          <input type="hidden" {...methods.register("plainText")} />
        </>
      )}
    />
  );
}
