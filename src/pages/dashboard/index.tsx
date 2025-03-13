import PageTitle from "@/components/atoms/page-title/PageTitle";
import GoalBasedTodo from "@/views/dashboard/goal-based-todo/GoalBasedTodo";
import MyProgress from "@/views/dashboard/my-progress/MyProgress";
import RecentTodo from "@/views/dashboard/recent-todo/RecentTodo";

import QuesddoHead from "../../components/atoms/quesddo-head/QuesddoHead";

export default function Dashboard() {
  return (
    <>
      <QuesddoHead title="대시보드" />

      <main className="smd:pl-[357px] flex min-h-full flex-col bg-slate-100 px-4 text-slate-800 sm:pl-21">
        <PageTitle title="대시보드" className="sm:pt-6" isMobileFixed={true} />

        <div className="smd:max-w-[1200px] smd:gap-5 flex flex-grow flex-col gap-4 py-4 sm:pt-0">
          <div className="sm:flex sm:h-[250px] sm:justify-between sm:gap-5">
            <RecentTodo />
            <MyProgress />
          </div>
          <GoalBasedTodo />
        </div>
      </main>
    </>
  );
}
