import { motion } from "framer-motion";

interface ProgressBarProps {
  progress: number;
}

export default function ProgressBar({ progress }: ProgressBarProps) {
  return (
    <div className="mr-2 inline-block h-1 w-[96%] rounded-full bg-slate-50">
      <motion.div
        className="h-full rounded-full bg-slate-900"
        initial={{ width: 0 }}
        animate={{ width: `${progress}%` }}
        transition={{ duration: 1, ease: "easeOut" }}
        data-testid="progress-fill"
      />
    </div>
  );
}
