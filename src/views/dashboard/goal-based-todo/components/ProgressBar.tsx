import ProgressBar from "@/components/atoms/progress-bar/ProgressBar";
import useProgressTodo from "@/hooks/todo/useProgressTodo";

interface ProgressWrapperProps {
  goalId: number;
}

export default function ProgressWrapper({ goalId }: ProgressWrapperProps) {
  const { data } = useProgressTodo(goalId);
  const progress = data ? data.progress : 0;

  return (
    <div className="flex items-center justify-center gap-2 rounded-[13px] border border-slate-100 bg-white px-[9px] py-[2px]">
      <ProgressBar progress={progress} />
      <span className="text-xs font-semibold text-slate-900">{progress}%</span>
    </div>
  );
}
