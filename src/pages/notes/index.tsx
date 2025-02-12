import Card from "../../../views/notes/card";
import { notes } from "../../../views/notes/dummy";
import Goal from "../../../views/notes/goal";

export default function NotesPage() {
  return (
    <div className="min-h-screen bg-slate-100">
      <div className="flex max-w-[792px] flex-col gap-4 p-4 sm:pl-[84px] md:pl-[360px]">
        <h1 className="text-lg font-semibold text-slate-900">노트 모아보기</h1>
        <Goal />

        {/* list */}
        <div className="flex flex-col gap-4">
          {notes.map(({ id, title, todo }) => (
            <Card key={id}>
              <Card.Header />
              <Card.Body>
                <Card.Title>{title}</Card.Title>
                <Card.Divider />
                <Card.Content>{todo}</Card.Content>
              </Card.Body>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
