import { useFormContext } from "react-hook-form";

export default function EditorTextCounter() {
  const { watch } = useFormContext();

  const textLength = watch("plainContent");
  const textWithoutLength = textLength?.replace(/\s/gm, "").length || 0;

  return (
    <p className="pt-[12px] text-xs font-medium text-slate-800">
      공백포함 : 총 {textLength?.length || 0}자 | 공백제외 : 총{" "}
      {textWithoutLength}자
    </p>
  );
}
