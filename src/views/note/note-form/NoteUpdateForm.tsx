import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

import noteApi from "@/apis/noteApi";
import useUpdateNote from "@/hooks/note/useUpdateNote";
import { UpdateNoteBodyDto } from "@/types/types";

import NoteForm from "./NoteForm";

interface NoteUpdateFormProps {
  noteId: number;
}

export default function NoteUpdateForm({ noteId }: NoteUpdateFormProps) {
  const methods = useForm<UpdateNoteBodyDto>();
  const mutation = useUpdateNote();
  const { data } = useQuery({
    queryKey: ["note", noteId],
    queryFn: () => noteApi.fetchNote(noteId),
    enabled: !!noteId,
  });

  const handleSubmit = (data: UpdateNoteBodyDto) => {
    mutation.mutate({ noteId, data });
  };

  useEffect(() => {
    if (!data) return;
    methods.setValue("title", data.title);
    methods.setValue("content", data.content);
    methods.setValue("linkUrl", data.linkUrl);
  }, [data, methods]);

  return <NoteForm id={noteId} methods={methods} onSubmit={handleSubmit} />;
}
