export default function GoalBasedTodo() {
  return (
    <div className="h-full min-h-[152px] rounded-xl bg-white p-6 transition-shadow duration-300 hover:shadow-2xl">
      <h2>목표 별 할 일</h2>

      <div className="h-full">
        <div className="flex h-full items-center justify-center text-sm font-normal text-slate-500">
          등록한 목표가 없어요
        </div>
      </div>
    </div>
  );
}
