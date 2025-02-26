import { useRouter } from "next/router";

import { useInfiniteNotes } from "@/hooks/notes/useInfiniteNotes";
import Goal from "@/views/notes/goal/Goal";
import NoteList from "@/views/notes/note-list/NoteList";

export default function NotesPage() {
  const {
    query: { goalId },
  } = useRouter();
  const { data, inViewRef } = useInfiniteNotes(Number(goalId));

  return (
    <div className="min-h-screen bg-slate-100">
      <div className="flex max-w-[792px] flex-col gap-4 p-4 sm:pl-[84px] md:pl-[360px]">
        <h1 className="text-lg font-semibold text-slate-900">노트 모아보기</h1>

        <Goal goal={data?.pages[0]?.notes[0]?.goal?.title} />
        <NoteList data={data} inViewRef={inViewRef} />
      </div>
    </div>
  );
}
