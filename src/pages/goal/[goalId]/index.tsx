import Head from "next/head";
import { useRouter } from "next/router";

import PageTitle from "@/components/atoms/page-title/PageTitle";
import { GoalDetailProvider } from "@/contexts/GoalDetailContext";
import GoalHeader from "@/views/goal/header/GoalHeader";
import GoalNote from "@/views/goal/note/GoalNote";
import GoalTodoContainer from "@/views/goal/todo/GoalTodoContainer";

export default function GoalDetailPage() {
  const router = useRouter();
  const goalId = parseInt(router.query.goalId as string, 10);

  return (
    <GoalDetailProvider goalId={goalId}>
      <Head>
        <title>{goalId}</title>
      </Head>
      <div className="box-border h-full bg-slate-100 px-[16px] pt-[64px] sm:pt-[24px] sm:pr-[24px] sm:pl-[84px] md:pl-[360px]">
        <div className="flex max-w-[1200px] flex-col gap-[16px]">
          {/* 목표 */}
          <PageTitle title="목표" isMobileFixed={true} />
          {/* 목표 이름,진행률 */}
          <GoalHeader />
          {/* 노트 모아보기 */}
          <GoalNote />
          {/* 투두 리스트 */}
          <GoalTodoContainer />
        </div>
      </div>
    </GoalDetailProvider>
  );
}
