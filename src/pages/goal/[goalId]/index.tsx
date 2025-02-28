import { cva } from "class-variance-authority";
import Head from "next/head";
import { useRouter } from "next/router";

import PageTitle from "@/components/atoms/page-title/PageTitle";
import { cn } from "@/utils/cn";
import GoalSection from "@/views/goal/component/GoalSection";
import NoteSection from "@/views/goal/component/NoteSection";
import Section from "@/views/goal/component/Section";
import TodoListSection from "@/views/goal/component/TodoListSection";

const layoutVariants = cva(
  "h-full bg-slate-100 px-[16px] pt-[64px] sm:pl-[84px] sm:pr-[24px] sm:pt-[24px] md:px-[360px] flex flex-col gap-[16px]",
);

export default function GoalDetailPage() {
  const router = useRouter();
  const goalId = parseInt(router.query.goalId as string, 10);

  return (
    <>
      <div>
        <Head>
          <title>{goalId}</title>
        </Head>
      </div>
      <div className={cn(layoutVariants())}>
        {/* 목표 */}
        <PageTitle title="목표" isMobileFixed={true} />
        {/* 목표 이름,진행률 */}
        <Section className="relative bg-white hover:shadow">
          <GoalSection id={goalId} />
        </Section>
        {/* 노트 모아보기 */}
        <Section className="bg-blue-100 hover:shadow">
          <NoteSection goalId={goalId} />
        </Section>
        <Section className="flex flex-col gap-[16px] p-[0px] md:flex-row md:justify-between md:gap-[24px]">
          {/* 투두 리스트 */}
          <TodoListSection goalId={goalId} />
        </Section>
      </div>
    </>
  );
}
