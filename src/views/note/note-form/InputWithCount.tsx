import { useFormContext } from "react-hook-form";

export default function InputWithCount() {
  const { register, watch } = useFormContext();
  const title = watch("title");

  return (
    <div className="flex items-center gap-4 border-y border-slate-200 py-[12px]">
      <input
        className="w-full text-base font-medium placeholder:text-slate-400 focus:outline-none sm:text-lg"
        placeholder="노트의 제목을 입력해주세요"
        {...register("title", { required: true })}
      />
      <div className="text-xs font-medium text-slate-800">
        <span>{title?.length || 0}/</span>
        <span className="text-blue-500">30</span>
      </div>
    </div>
  );
}
