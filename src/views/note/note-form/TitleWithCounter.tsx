import { useFormContext } from "react-hook-form";

import TextCounting from "@/components/atoms/text-counting/TextCounting";
import { cn } from "@/utils/cn";

const MAX_TITLE_COUNT = 30;

export default function TitleWithCounter() {
  const {
    register,
    watch,
    formState: { errors },
  } = useFormContext();
  const title = watch("title");

  return (
    <div className="w-full border-y border-slate-200 py-[12px]">
      <div className="flex items-center gap-4">
        <input
          className="w-full text-base font-medium placeholder:text-slate-400 focus:outline-none sm:text-lg"
          placeholder="노트의 제목을 입력해주세요"
          maxLength={MAX_TITLE_COUNT}
          autoFocus
          {...register("title", {
            required: true,
            maxLength: MAX_TITLE_COUNT,
            validate: (value) =>
              value.trim() !== "" || "공백만 입력할 수 없습니다.",
          })}
        />
        <TextCounting
          count={title?.length || 0}
          total={MAX_TITLE_COUNT}
          className={cn((title?.length || 0) > 30 && "text-red-500")}
        />
      </div>
      {errors?.title?.message && (
        <p className="mt-1 text-sm font-medium text-red-500">
          {errors.title.message.toString()}
        </p>
      )}
    </div>
  );
}
