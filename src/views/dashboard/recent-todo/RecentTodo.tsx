import { useRouter } from "next/router";

export default function RecentTodo() {
  const router = useRouter();
  const handleShowAll = () => {
    router.push("/todo");
  };
  return (
    <div className="smd:w-[540px] mb-4 h-[202px] rounded-xl bg-white p-6 transition-shadow duration-300 hover:shadow-2xl sm:w-[258px]">
      <div className="flex h-10 justify-between">
        <h2>최근 등록한 할 일</h2>
        <button
          onClick={handleShowAll}
          className="text-sm font-medium text-slate-600"
        >
          모두보기
        </button>
      </div>

      <div className="h-full max-h-[154px] overflow-y-hidden pt-[6px]">
        <div className="flex h-full items-center justify-center text-sm font-normal text-slate-500">
          최근에 등록한 할 일이 없어요
        </div>
      </div>
    </div>
  );
}
