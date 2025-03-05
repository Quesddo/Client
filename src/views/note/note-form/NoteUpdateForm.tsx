import { useSuspenseQuery } from "@tanstack/react-query";
import { usePathname } from "next/navigation";
import { useRouter } from "next/router";
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
  const mutation = useUpdateNote(noteId);
  const pathname = usePathname();
  const router = useRouter();

  const { data } = useSuspenseQuery({
    queryKey: ["noteDetail", noteId],
    queryFn: () => noteApi.fetchNote(noteId),
  });

  const handleSubmit = (data: UpdateNoteBodyDto) => {
    mutation.mutate(data, {
      onSuccess: (data) => {
        const queryParams = new URLSearchParams();

        queryParams.set("noteId", data.id.toString());
        queryParams.set("mode", "detail");
        router.push(`${pathname}?${queryParams.toString()}`);
      },
    });
  };

  useEffect(() => {
    if (!data) return;
    methods.setValue("title", data.title, { shouldValidate: true });
    methods.setValue("content", data.content, { shouldValidate: true });
    methods.setValue("linkUrl", data.linkUrl);
  }, [data, methods]);

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
