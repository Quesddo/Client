import { FormEvent, memo, useState } from "react";

import { useCreateGoal } from "@/hooks/goal/useCreateGoal";
import { useFetchGoals } from "@/hooks/goal/useFetchGoals";
import flag from "@public/icons/flag.png";

import MenuItem from "../atoms/MenuItem";
import TabSideMenuList from "../molecules/TabSideMenuList";

export default memo(function MenuGoal() {
  const { data } = useFetchGoals();
  const mutation = useCreateGoal();
  const [goalInput, setGoalInput] = useState("");

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setGoalInput(e.currentTarget.value);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    mutation.mutate(goalInput);
  };

  return (
    <section className="flex min-h-0 flex-1 flex-col gap-3 pt-3">
      <div className="flex justify-between">
        <MenuItem title="목표" icon={flag} />
        <button className="sm:hidden">새 목표</button>
      </div>
      <div className="flex min-h-0 flex-1 flex-col gap-6">
        <TabSideMenuList items={data?.goals || []} />
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={goalInput}
            onChange={handleInput}
            className="border border-slate-300"
          />
          <button>제출</button>
        </form>
        <button type="button" className="h-[44px]">
          새 목표
        </button>
      </div>
    </section>
  );
});
