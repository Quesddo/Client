import "react-quill-new/dist/quill.snow.css";

import dynamic from "next/dynamic";
import { Controller, useFormContext } from "react-hook-form";

import Button from "@/components/atoms/button/Button";
import Input from "@/components/atoms/input/Input";

import Toast from "./Toast";

const ReactQuill = dynamic(() => import("react-quill-new"), { ssr: false });

const toolbarOptions = [
  ["bold", "italic", "underline"],
  [{ align: "" }, { align: "center" }, { align: "right" }],
  [{ list: "bullet" }, { list: "ordered" }],
  [{ color: [] }],
  ["link"],
];

const modules = {
  toolbar: toolbarOptions,
};

const setEmptyToUndefined = (value: string) =>
  value === "" ? undefined : value;

export default function Editor() {
  const { register, watch, control } = useFormContext();
  const content = watch("content");

  return (
    <div className="flex flex-1 flex-col gap-2">
      <p className="pt-[12px] text-xs font-medium text-slate-800">
        공백포함 : 총 {content?.length || 0}자 | 공백제외 : 총{" "}
        {content?.replace(/\s/gm, "").length || 0}자
      </p>
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
      {/* <Toast /> */}
      {/* <div>
        <Button>link추가</Button>
        <Input
          {...register("linkUrl", {
            setValueAs: setEmptyToUndefined,
          })}
        />
      </div> */}
    </div>
  );
}
