import { Fragment } from "react";

import { TeamIdNotesGet200Response } from "@/types/types";

import Card from "../card/Card";

const SCROLL_TRIGGER_OFFSET = 4;

interface NoteListProps {
  notes: TeamIdNotesGet200Response["notes"] | undefined;
  inViewRef: (node?: Element | null) => void;
}

export default function NoteList({ notes, inViewRef }: NoteListProps) {
  return (
    <div className="flex flex-col gap-4">
      {notes?.map(({ id, title, todo }, noteIdx, notes) => {
        /* 미리 스크롤을 감지하기 위해 마지막 노트보다 SCROLL_TRIGGER_OFFSET 만큼 위에있는 노트에 스크롤 감지 블록을 위치시킴 */
        const isShowScrollTrigger =
          notes.length - (1 + SCROLL_TRIGGER_OFFSET) === noteIdx;

        return (
          <Fragment key={id}>
            <Card>
              <Card.Header noteId={id} />
              <Card.Body>
                <Card.Title noteId={id}>{title}</Card.Title>
                <Card.Divider />
                <Card.Content>
                  <Card.todoChip isDone={todo.done} />
                  <Card.TodoTitle>{todo.title}</Card.TodoTitle>
                </Card.Content>
              </Card.Body>
            </Card>

            {isShowScrollTrigger && <div ref={inViewRef} />}
          </Fragment>
        );
      })}
    </div>
  );
}
