import { createContext, ReactNode, useContext, useState } from "react";

interface GoalDetailContextProps {
  goalId: number;
  progress: number;
  updateProgress: (doneCount: number, totalcount: number) => void;
}

const GoalDetailContext = createContext<GoalDetailContextProps | null>(null);

export const GoalDetailProvider = ({
  children,
  goalId,
}: {
  children: ReactNode;
  goalId: number;
}) => {
  const [progress, setProgress] = useState<number>(0);

  const updateProgress = (doneCount: number, totalCount: number) => {
    if (totalCount > 0) {
      setProgress(Math.round((doneCount / totalCount) * 100));
    } else {
      setProgress(0);
    }
  };

  const values: GoalDetailContextProps = {
    progress,
    updateProgress,
    goalId,
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
