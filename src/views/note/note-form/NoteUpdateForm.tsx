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
  const { data, isLoading, isError, error } = useQuery({
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

  if (isError) {
    return <p>에러 발생: {(error as Error).message}</p>;
  }

  if (isLoading) {
    return <p>로딩중...</p>;
  }

  return (
    <NoteForm
      id={noteId}
      methods={methods}
      onSubmit={handleSubmit}
      editMode
      goal={data?.goal?.title}
      todo={data?.todo.title}
    />
  );
}
