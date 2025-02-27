import { useSuspenseQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { Suspense } from "react";

import { fetchNoteDetail } from "@/apis/note/fetchNoteDetail";
import Divider from "@/components/atoms/divider/Divider";
import ExitBtn from "@/components/atoms/exit-btn/ExitBtn";
import GoalItem from "@/components/atoms/goal-item/GoalItem";
import Spinner from "@/components/atoms/spinner/Spinner";
import TodoChip from "@/components/atoms/todo-chip/TodoChip";
import { formatDate } from "@/utils/formatDate/formatDate";

export default function NoteDetail() {
  const router = useRouter();
  const { noteId } = router.query;

  const handleCloseSidebar = () => {
    router.push(router.pathname, undefined, { shallow: true });
  };

  // noteId가 없는 경우 렌더링하지 않음
  if (!noteId) return;
  return (
    // 사이드바의 바깥쪽을 누르면 쿼리스트링이 사라지도록 함 => 사이드바가 닫힘
    <div
      onClick={handleCloseSidebar}
      className="fixed inset-0 z-50 flex justify-end bg-black/50"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="absolute top-0 right-0 box-border flex h-full w-full flex-col gap-4 border-l border-slate-200 bg-white p-4 break-words whitespace-pre-wrap sm:w-[512px] md:w-[800px] md:p-6"
      >
        <ExitBtn onClick={handleCloseSidebar} />

        {/* 내부 콘텐츠 부분만 Suspense로 감싸기 */}
        <Suspense fallback={<Spinner size={80} />}>
          <NoteDetailContent noteId={Number(noteId)} />
        </Suspense>
      </div>
    </div>
  );
}

function NoteDetailContent({ noteId }: { noteId: number }) {
  const { data } = useSuspenseQuery({
    queryKey: ["noteDetail", noteId],
    queryFn: () => fetchNoteDetail(noteId),
  });

  return (
    <div className="flex h-full flex-col gap-6">
      <div className="flex flex-col gap-3">
        <GoalItem
          goal={data?.goal?.title}
          textSize="base"
          fontWeight="medium"
          iconSize="sm"
          gap={6}
        />
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <TodoChip isDone={data?.todo.done} />
            <span className="text-sm font-normal text-slate-700">
              {data?.todo.title}
            </span>
          </div>
          <span className="text-xs font-normal text-slate-500">
            {formatDate(data?.createdAt)}
          </span>
        </div>
      </div>
      <div className="flex h-full flex-col gap-4">
        <div>
          <Divider />
          <h1 className="py-3 text-lg font-medium text-slate-800">
            {data?.title}
          </h1>
          <Divider />
        </div>
        <p className="mb-30 h-full overflow-y-auto text-base font-normal text-slate-700">
          {data?.content}
        </p>
      </div>
    </div>
  );
}
