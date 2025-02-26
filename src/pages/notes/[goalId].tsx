import { useRouter } from "next/router";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";

import { useNotes } from "@/hooks/notes/useNotes";
import Card from "@/views/notes/card/card";
import Goal from "@/views/notes/goal/goal";

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

        <div className="flex flex-col gap-4">
          {data?.pages.map((page, pageIdx) =>
            page.notes.map(({ id, title, todo }, noteIdx, notes) => {
              return (
                <>
                  <Card key={id}>
                    <Card.Header />
                    <Card.Body>
                      <Card.Title>{title}</Card.Title>
                      <Card.Divider />
                      <Card.Content>
                        <Card.TodoStatus>
                          {todo.done ? "Done" : "To do"}
                        </Card.TodoStatus>
                        <Card.TodoTitle>{todo.title}</Card.TodoTitle>
                      </Card.Content>
                    </Card.Body>
                  </Card>

                  {/* 마지막 페이지의 마지막 노트보다 4개 위에있는 노트에 스크롤 감지 블록을 위치시킴 */}
                  {pageIdx === data.pages.length - 1 &&
                    notes.length - 5 === noteIdx && <div ref={inViewRef} />}
                </>
              );
            }),
          )}
        </div>
      </div>
    </div>
  );
}
