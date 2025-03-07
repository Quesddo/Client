import { createContext, ReactNode, useContext, useState } from "react";

import { useTodos } from "@/hooks/todo/useTodos";

interface GoalDetailContextProps {
  goalId: number;
  progress: number;
  updateProgress: (doneCount: number) => void;
  totalCount: number;
}

const MAX_TOTAL_COUNT = 9999;
const GoalDetailContext = createContext<GoalDetailContextProps | null>(null);

export const GoalDetailProvider = ({
  children,
  goalId,
}: {
  children: ReactNode;
  goalId: number;
}) => {
  const [progress, setProgress] = useState<number>(0);
  const { data } = useTodos(goalId, MAX_TOTAL_COUNT);
  const { totalCount } = data;

  const updateProgress = (doneCount: number) => {
    if (totalCount > 0) {
      setProgress(Math.round((doneCount / totalCount) * 100));
    } else {
      setProgress(0);
    }
  };

  const values: GoalDetailContextProps = {
    goalId,
    progress,
    updateProgress,
    totalCount,
  };

  return (
    <GoalDetailContext.Provider value={values}>
      {children}
    </GoalDetailContext.Provider>
  );
};

export const useGoalDetailContext = () => {
  const context = useContext(GoalDetailContext);
  if (context === null) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
