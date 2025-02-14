import { usePathname } from "next/navigation";

import { useNotes } from "@/hooks/notes/useNotes";

import Card from "../../views/notes/card/card";
import Goal from "../../views/notes/goal/goal";

interface NotePageParams {
  goalId: number;
}

export default function NotesPage({ goalId }: NotePageParams) {
  const { data } = useNotes({ goalId });

  return (
    <div className="min-h-screen bg-slate-100">
      <div className="flex max-w-[792px] flex-col gap-4 p-4 sm:pl-[84px] md:pl-[360px]">
        <h1 className="text-lg font-semibold text-slate-900">노트 모아보기</h1>

        <Goal goal={data?.notes[0].goal?.title} />

        {/* list */}
        <div className="flex flex-col gap-4">
          {data?.notes.map(({ id, title, todo }) => (
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
          ))}
        </div>
      </div>
    </div>
  );
}
