import { useEffect, useState } from "react";

import useProgressTodo from "@/hooks/todo/useProgressTodo";

import ProgressBar from "../../../components/atoms/progress-bar/ProgressBar";

interface ProgressBarProps {
  goalId: number;
  label?: string;
  showLabel?: boolean;
}

export default function ProgressContainer({
  goalId,
  label = "Progress",
  showLabel = true,
}: ProgressBarProps) {
  const [progress, setProgress] = useState<number>(0);
  const { data, isPending } = useProgressTodo(goalId);

  useEffect(() => {
    if (isPending) return;
    setProgress(data.progress);
  }, [isPending, data]);

  return (
    <>
      {showLabel && (
        <p className="color-slate-900 mb-[8px] text-xs font-semibold">
          {label}
        </p>
      )}
      <div className="flex items-center justify-between whitespace-nowrap">
        <ProgressBar progress={progress} />
        <p className="inline-block text-xs font-semibold">
          {!isNaN(progress) && progress + "%"}
        </p>
      </div>
    </>
  );
}
