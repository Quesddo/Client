import { createContext, ReactNode, useContext } from "react";

interface GoalDetailContextProps {
  goalId: number;
}
const GoalDetailContext = createContext<GoalDetailContextProps | null>(null);

export const GoalDetailProvider = ({
  children,
  goalId,
}: {
  children: ReactNode;
  goalId: number;
}) => {
  const values: GoalDetailContextProps = {
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
