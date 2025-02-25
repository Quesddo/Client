import useCreateNote from "@/hooks/note/useCreateNote";
import { CreateNoteBodyDto } from "@/types/types";

import NoteForm from "./NoteForm";

export default function NoteCreationForm() {
  const mutation = useCreateNote();

  const handleSubmit = (data: CreateNoteBodyDto) => {
    mutation.mutate(data);
  };

  return <NoteForm onSubmit={handleSubmit} />;
}
