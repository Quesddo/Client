import { useEffect } from "react";

import useUpdateNote from "@/hooks/note/useUpdateNote";
import { UpdateNoteBodyDto } from "@/types/types";

import NoteForm from "./NoteForm";

interface NoteUpdateFormProps {
  noteId: string;
}

export default function NoteUpdateForm({ noteId }: NoteUpdateFormProps) {
  const mutation = useUpdateNote();

  const handleSubmit = (data: UpdateNoteBodyDto) => {
    mutation.mutate({ noteId, data });
  };

  useEffect(() => {});

  return <NoteForm onSubmit={handleSubmit} />;
}
