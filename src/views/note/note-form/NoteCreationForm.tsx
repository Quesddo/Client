import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

import useCreateNote from "@/hooks/note/useCreateNote";
import { CreateNoteBodyDto } from "@/types/types";

import NoteForm from "./NoteForm";

export default function NoteCreationForm() {
  const methods = useForm<CreateNoteBodyDto>();
  const mutation = useCreateNote();
  const searchParams = useSearchParams();

  const handleSubmit = async (data: CreateNoteBodyDto) => {
    mutation.mutate(data);
  };

  useEffect(() => {
    const todoId = searchParams.get("todoId");

    if (todoId) {
      methods.setValue("todoId", +todoId);
    }
  }, [methods, searchParams]);

  return <NoteForm methods={methods} onSubmit={handleSubmit} />;
}
