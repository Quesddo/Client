import { useSuspenseQuery } from "@tanstack/react-query";
import { Dispatch, SetStateAction, Suspense } from "react";
import ReactDOM from "react-dom";

import { fetchNoteDetail } from "@/apis/note/fetchNoteDetail";
import Divider from "@/components/atoms/divider/Divider";
import ExitBtn from "@/components/atoms/exit-btn/ExitBtn";
import GoalItem from "@/components/atoms/goal-item/GoalItem";
import Spinner from "@/components/atoms/spinner/Spinner";
import TodoChip from "@/components/atoms/todo-chip/TodoChip";
import { formatDate } from "@/utils/formatDate/formatDate";

interface NoteDetailProps {
  noteId: number | null;
  setNoteId: Dispatch<SetStateAction<number | null>>;
}

export default function NoteDetail({ noteId, setNoteId }: NoteDetailProps) {
  if (!noteId) return null;

  return ReactDOM.createPortal(
    <div
      onClick={() => setNoteId(null)}
      className="fixed inset-0 z-50 flex justify-end bg-black/50"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="absolute top-0 right-0 box-border flex h-full w-full flex-col gap-4 border-l border-slate-200 bg-white p-4 break-words whitespace-pre-wrap sm:w-[512px] md:w-[800px] md:p-6"
      >
        <ExitBtn onClick={() => setNoteId(null)} />

        {/* 내부 콘텐츠 부분만 Suspense로 감싸기 */}
        <Suspense fallback={<Spinner size={80} />}>
          <NoteDetailContent noteId={noteId} />
        </Suspense>
      </div>
    </div>,
    document.body,
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
