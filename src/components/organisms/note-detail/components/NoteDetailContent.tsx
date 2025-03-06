import { useSuspenseQuery } from "@tanstack/react-query";
import { useState } from "react";

import { fetchNoteDetail } from "@/apis/note/fetchNoteDetail";
import Divider from "@/components/atoms/divider/Divider";
import GoalItem from "@/components/atoms/goal-item/GoalItem";
import TodoChip from "@/components/atoms/todo-chip/TodoChip";
import { formatDate } from "@/utils/formatDate/formatDate";
import ReactQuillEditor from "@/views/note/editor/ReactQuillEditor";

import EmbeddedContent from "./EmbeddedContent";
import LinkItem from "./LinkItem";

interface NoteDetailContentProps {
  noteId: number;
}
export default function NoteDetailContent({ noteId }: NoteDetailContentProps) {
  const [isEmbedOpen, setIsEmbedOpen] = useState(false);

  const { data } = useSuspenseQuery({
    queryKey: ["noteDetail", noteId],
    queryFn: () => fetchNoteDetail(noteId),
  });
  return (
    <>
      {/* 링크 embed 영역 (링크가 존재할 경우만 표시) */}
      <EmbeddedContent isOpen={isEmbedOpen} linkUrl={data?.linkUrl} />

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
          <LinkItem linkUrl={data?.linkUrl} setIsEmbedOpen={setIsEmbedOpen} />
          <div className="mb-30 overflow-y-auto pr-2">
            <ReactQuillEditor
              modules={{ toolbar: false }}
              readOnly
              value={data?.content}
            />
          </div>
        </div>
      </div>
    </>
  );
}
