import "react-quill-new/dist/quill.snow.css";

import dynamic from "next/dynamic";
import { useMemo } from "react";
import { Controller, useFormContext } from "react-hook-form";

import { useModalContext } from "@/contexts/InputModalContext";

import LinkDisplay from "./LinkDisplay";

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
  const { watch, control } = useFormContext();

  const content = watch("content");

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
    <div className="flex flex-1 flex-col gap-2">
      <p className="pt-[12px] text-xs font-medium text-slate-800">
        공백포함 : 총 {content?.length || 0}자 | 공백제외 : 총{" "}
        {content?.replace(/\s/gm, "").length || 0}자
      </p>
      <LinkDisplay />
      <Controller
        control={control}
        name="content"
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
    </div>
  );
}
