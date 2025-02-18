import { FormEventHandler, memo, useRef, useState } from "react";

import { useCreateGoal } from "@/hooks/goal/useCreateGoal";
import { useFetchGoals } from "@/hooks/goal/useFetchGoals";
import { cn } from "@/utils/cn";

import MenuItem from "../MenuItem";
import TabSideMenuList from "./TabSideMenuList";
import AddButton from "../AddButton";
import GoalCreationForm from "./GoalCreationForm";

export default memo(function MenuGoal() {
  const { data, isError, error } = useFetchGoals();
  const mutation = useCreateGoal();

  const ref = useRef<HTMLDivElement>(null);

  const [showForm, setShowForm] = useState(false);

  const handleShowForm = () => {
    setShowForm(true);
    ref.current?.scrollTo(0, ref.current?.scrollHeight);
  };

  const handleSubmit: FormEventHandler = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const title = formData.get("title") as string;

    if (title) {
      mutation.mutate(title);
    }

    setShowForm(false);
  };

  return (
    <>
      <section className="flex min-h-0 flex-1 flex-col gap-3 pt-3">
        <div className="flex justify-between">
          <MenuItem title="목표" iconSrc="/icons/flag.png" />
          <AddButton
            size="xs"
            outline
            onClick={handleShowForm}
            className={cn(showForm && "hidden")}
          >
            새 목표
          </AddButton>
        </div>
        <div className="flex min-h-0 flex-1 flex-col gap-6">
          {!isError ? (
            <div className="flex-1 overflow-auto" ref={ref}>
              <TabSideMenuList items={data?.goals || []} />
              <GoalCreationForm onSubmit={handleSubmit} />
            </div>
          ) : (
            <p>에러 발생: {(error as Error).message}</p>
          )}
          <AddButton
            outline
            onClick={handleShowForm}
            className={cn(showForm && "hidden sm:hidden")}
          >
            새 목표
          </AddButton>
        </div>
      </section>
    </>
  );
});
