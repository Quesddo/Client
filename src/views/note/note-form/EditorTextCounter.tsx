import { useFormContext } from "react-hook-form";

export default function EditorTextCounter() {
  const { watch } = useFormContext();

  const content = watch("content");

  return (
    <p className="pt-[12px] text-xs font-medium text-slate-800">
      공백포함 : 총 {content?.length || 0}자 | 공백제외 : 총{" "}
      {content?.replace(/\s/gm, "").length || 0}자
    </p>
  );
}
