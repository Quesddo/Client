import PageTitle from "@/components/atoms/page-title/PageTitle";
import GoalBasedTodo from "@/views/dashboard/goal-based-todo/GoalBasedTodo";
import MyProgress from "@/views/dashboard/my-progress/MyProgress";
import RecentTodo from "@/views/dashboard/recent-todo/RecentTodo";

export default function Dashboard() {
  return (
    <div className="flex h-full flex-col bg-slate-100 px-4 text-slate-800 sm:px-6 md:px-20">
      <PageTitle title="대시보드" className="sm:pt-6" isMobileFixed={true} />

      <div className="smd:max-w-[1200px] smd:gap-5 flex h-full flex-grow flex-col gap-4 py-4 sm:max-w-[628px] sm:pt-0">
        <div className="smd:gap-5 sm:flex sm:h-[250px] sm:justify-between">
          <RecentTodo />
          <MyProgress />
        </div>
        <GoalBasedTodo />
      </div>
    </div>
  );
}
