import { useEffect } from "react";
import { useInView } from "react-intersection-observer";

import TitleWithIcon from "@/components/atoms/title-with-icon/TitleWithIcon.tsx";
import { useInfiniteGoals } from "@/hooks/goal/useInfiniteGoals";

import EmptyData from "./components/EmptyData";
import GoalItem from "./components/GoalItem";

export default function GoalBasedTodo() {
  const { data, hasNextPage, fetchNextPage } = useInfiniteGoals({
    size: 4,
    source: "dashboard",
  });
  const { inView, ref: inViewRef } = useInView();

  useEffect(() => {
    // 스크롤 감지 블록이 화면에 들어오고 다음페이지가 존재하는 경우에 데이터 더 가져오기
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage]);

  // 목표가 없는 경우 예외처리
  const hasGoals = data && data.goals.length > 0;
  // 목표 데이터 파싱
  const goals = data ? data.goals : [];

  return (
    <section className="rounded-xl bg-white p-6 transition-shadow duration-300 hover:shadow-2xl">
      {/* 목표별 할 일 타이틀 */}
      <TitleWithIcon
        title="목표별 할 일"
        imgUrl="/icons/flag-box.png"
        gap={8}
        className="text-lg font-semibold"
      />

      {/* 목표 리스트 */}
      {hasGoals ? (
        <>
          <ul className="mt-4 flex flex-col gap-4">
            {goals.map((goal) => (
              <GoalItem goal={goal} key={goal.id} />
            ))}
          </ul>

          {/* 스크롤 감지 블록 */}
          <div ref={inViewRef} />
        </>
      ) : (
        // 목표가 없는 경우 예외처리
        <EmptyData type="goal" />
      )}
    </section>
  );
}
