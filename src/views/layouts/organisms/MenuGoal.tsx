import { FormEventHandler, memo, useRef, useState } from "react";

import { useCreateGoal } from "@/hooks/goal/useCreateGoal";
import { cn } from "@/utils/cn";

import AddButton from "../atoms/AddButton";
import MenuItem from "../atoms/MenuItem";
import GoalCreationForm from "../molecules/GoalCreationForm";
import TabSideMenuList from "../molecules/TabSideMenuList";

export default memo(function MenuGoal() {
  const ref = useRef<HTMLDivElement>(null);
  const mutation = useCreateGoal({
    onSuccess: () => {
      ref?.current?.scrollTo({
        top: 0,
      });
    },
  });

  const [showForm, setShowForm] = useState(false);

  const handleShowForm = () => {
    setShowForm(true);
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
          <TabSideMenuList ref={ref} />
          {showForm && <GoalCreationForm onSubmit={handleSubmit} />}
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
