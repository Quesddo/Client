import { useFormContext } from "react-hook-form";

import Button from "@/components/atoms/button/Button";
import Input from "@/components/atoms/input/Input";

import Toast from "./Toast";

export default function Editor() {
  const { register, watch } = useFormContext();
  const content = watch("content");

  return (
    <div>
      <p className="pt-[12px] text-xs font-medium text-slate-800">
        공백포함 : 총 {content?.length || 0}자 | 공백제외 : 총{" "}
        {content?.replace(/\s/gm, "").length}자
      </p>
      <textarea {...register("content", { required: true })}></textarea>
      <Toast />
      <div>
        <Button>link추가</Button>
        <Input {...register("linkUrl")} />
      </div>
    </div>
  );
}
