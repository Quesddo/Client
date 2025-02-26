import { useRouter } from "next/router";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";

import { useNotes } from "@/hooks/notes/useNotes";
import Goal from "@/views/notes/goal/Goal";
import NoteList from "@/views/notes/note-list/NoteList";

export default function NotesPage() {
  const {
    query: { goalId },
  } = useRouter();
  const { ref: inViewRef, inView } = useInView();
  const { data, fetchNextPage, hasNextPage } = useNotes(Number(goalId));

  useEffect(() => {
    // 스크롤 감지 블럭이 화면에 들어오고 다음페이지가 존재하는 경우에 데이터 더 가져오기
    if (inView && hasNextPage) fetchNextPage();
  }, [inView, hasNextPage]);

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
