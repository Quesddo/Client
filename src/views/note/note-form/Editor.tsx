import "react-quill-new/dist/quill.snow.css";

import dynamic from "next/dynamic";
import { useMemo } from "react";
import { Controller, useFormContext } from "react-hook-form";

import { useModalContext } from "@/contexts/InputModalContext";
import { cn } from "@/utils/cn";

const ReactQuill = dynamic(() => import("react-quill-new"), { ssr: false });

const toolbarOptions = [
  ["bold", "italic", "underline"],
  [{ align: "" }, { align: "center" }, { align: "right" }],
  [{ list: "bullet" }, { list: "ordered" }],
  [{ color: [] }],
  ["link"],
];

export default function Editor() {
  const { openModal } = useModalContext();
  const { control } = useFormContext();

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

  return (
    <Controller
      control={control}
      name="content"
      rules={{ required: true }}
      render={({ field: { onChange, value } }) => (
        <ReactQuill
          theme="snow"
          modules={modules}
          onChange={onChange}
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
        ></ReactQuill>
      )}
    />
  );
}
