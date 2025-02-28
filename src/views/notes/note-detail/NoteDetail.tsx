import { useQuery } from "@tanstack/react-query";
import { Dispatch, SetStateAction } from "react";
import ReactDOM from "react-dom";

import { fetchNoteDetail } from "@/apis/note/fetchNoteDetail";
import { formatDate } from "@/utils/formatDate/formatDate";

import {
  Divider,
  ExitBtn,
  GoalWrapper,
  TodoChip,
} from "./NoteDetailComponents";

interface NoteDetailProps {
  noteId: number | null;
  setNoteId: Dispatch<SetStateAction<number | null>>;
}

export default function NoteDetail({ noteId, setNoteId }: NoteDetailProps) {
  const { data, isLoading } = useQuery({
    queryKey: ["noteDetail", noteId],
    queryFn: () => fetchNoteDetail(noteId!),
    enabled: !!noteId,
  });

  const handleCloseNoteSidebar = () => setNoteId(null);

  if (isLoading || !noteId) return; // 로딩 중이거나 noteId가 없으면 렌더링 안 함 (isLoading은 Suspense로 리팩토링 할 것)

  return ReactDOM.createPortal(
    <div
      onClick={handleCloseNoteSidebar}
      className="fixed inset-0 z-50 flex justify-end bg-black/50"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="absolute top-0 right-0 box-border flex h-full w-full flex-col gap-4 border-l border-slate-200 bg-white p-4 break-words whitespace-pre-wrap sm:w-[512px] md:w-[800px] md:p-6"
      >
        <ExitBtn onClick={handleCloseNoteSidebar} />
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-3">
            <GoalWrapper goal={data?.goal?.title} />
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-[3px]">
                <TodoChip isDone={data?.todo.done} />
                <span className="text-sm font-normal text-slate-700">
                  {data?.todo.title}
                </span>
              </div>
              <span className="text-xs font-normal text-slate-500">
                {formatDate(data!.createdAt)}
              </span>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <div>
              <Divider />
              <h1 className="py-3 text-lg font-medium text-slate-800">
                {data?.title}
              </h1>
              <Divider />
            </div>
            <p className="overflow-y-auto text-base font-normal text-slate-700">
              {data?.content}
            </p>
          </div>
        </div>
      </div>
    </div>,
    document.body,
  );
}
