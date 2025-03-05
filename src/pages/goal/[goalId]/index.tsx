import Head from "next/head";
import { useRouter } from "next/router";

import PageTitle from "@/components/atoms/page-title/PageTitle";
import { GoalDetailProvider } from "@/contexts/GoalDetailContext";
import GoalSection from "@/views/goal/component/GoalSection";
import NoteSection from "@/views/goal/component/NoteSection";
import Section from "@/views/goal/component/Section";
import TodoListSection from "@/views/goal/component/TodoListSection";

export default function GoalDetailPage() {
  const router = useRouter();
  const goalId = parseInt(router.query.goalId as string, 10);

  return (
    <>
      <GoalDetailProvider goalId={goalId}>
        <div>
          <Head>
            <title>{goalId}</title>
          </Head>
        </div>
        <div
          className={
            "flex h-full flex-col gap-[16px] bg-slate-100 px-[16px] pt-[64px] sm:pt-[24px] sm:pr-[24px] sm:pl-[84px] md:px-[360px]"
          }
        >
          {/* 목표 */}
          <PageTitle title="목표" isMobileFixed={true} />
          {/* 목표 이름,진행률 */}
          <GoalSection />
          {/* 노트 모아보기 */}
          <NoteSection />
          {/* 투두 리스트 */}
          <TodoListSection />
        </div>
      </GoalDetailProvider>
    </>
  );
}
