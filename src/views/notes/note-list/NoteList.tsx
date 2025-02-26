import { TeamIdNotesGet200Response } from "@/types/types";

import Card from "../card/Card";

interface noteListProps {
  notes: TeamIdNotesGet200Response["notes"] | undefined;
  inViewRef: (node?: Element | null) => void;
}

export default function NoteList({ notes, inViewRef }: noteListProps) {
  return (
    <div className="flex flex-col gap-4">
      {notes?.map(({ id, title, todo }, noteIdx, notes) => {
        return (
          <>
            <Card key={id}>
              <Card.Header noteId={id} />
              <Card.Body>
                <Card.Title>{title}</Card.Title>
                <Card.Divider />
                <Card.Content>
                  <Card.todoChip isDone={todo.done} />
                  <Card.TodoTitle>{todo.title}</Card.TodoTitle>
                </Card.Content>
              </Card.Body>
            </Card>

            {/* 마지막 노트보다 4개 위에있는 노트에 스크롤 감지 블록을 위치시킴 */}
            {notes.length - 5 === noteIdx && <div ref={inViewRef} />}
          </>
        );
      })}
    </div>
  );
}
