import "react-quill-new/dist/quill.snow.css";

import dynamic from "next/dynamic";
import { useMemo } from "react";
import { Controller, useFormContext } from "react-hook-form";

import { useModalContext } from "@/contexts/InputModalContext";

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
          className="flex flex-1 flex-col"
        ></ReactQuill>
      )}
    />
  );
}
