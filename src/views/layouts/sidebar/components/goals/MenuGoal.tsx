import { FormEventHandler, memo, useRef, useState } from "react";

import BoundaryWrapper from "@/components/organisms/boundary-wrapper/BoundaryWrapper";
import { useCreateGoal } from "@/hooks/goal/useCreateGoal";
import useToast from "@/hooks/useToast";
import { cn } from "@/utils/cn/cn";

import AddButton from "../AddButton";
import MenuItem from "../MenuItem";
import GoalCreationForm from "./GoalCreationForm";
import GoalToast from "./GoalToast";
import TabSideMenuList from "./TabSideMenuList";

export default memo(function MenuGoal() {
  const ulRef = useRef<HTMLUListElement>(null);
  const mutation = useCreateGoal();
  const { addToast } = useToast();

  const [showForm, setShowForm] = useState(false);

  const handleShowForm = () => {
    setShowForm(true);
  };

  const scrollListToTop = () => {
    ulRef?.current?.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleSubmit: FormEventHandler = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const title = formData.get("title") as string;
    const toastStyle = "mx-0 box-border w-full px-3";

    if (!title) {
      setShowForm(false);
      return;
    }

    if (title.trim() === "") {
      addToast({
        variant: "error",
        content: "공백만 입력할 수 없습니다",
        className: toastStyle,
      });
      return;
    }

    const handleSuccess = () => {
      addToast({
        content: (
          <GoalToast
            content="목표가 추가되었습니다."
            onClick={scrollListToTop}
          />
        ),
        className: toastStyle,
      });
      setShowForm(false);
    };
    const handleError = (error: Error) => {
      addToast({
        variant: "error",
        content: <GoalToast content={error.message} error />,
        className: toastStyle,
      });
    };

    mutation.mutate(
      { title },
      {
        onSuccess: handleSuccess,
        onError: handleError,
      },
    );
  };

  return (
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
        <BoundaryWrapper>
          <TabSideMenuList ref={ulRef} />
        </BoundaryWrapper>
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
  );
});
