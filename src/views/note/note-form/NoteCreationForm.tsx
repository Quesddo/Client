import { useForm } from "react-hook-form";

import useCreateNote from "@/hooks/note/useCreateNote";
import { CreateNoteBodyDto } from "@/types/types";

import NoteForm from "./NoteForm";

interface NoteCreationFormProps {
  todoId: number;
}

export default function NoteCreationForm({ todoId }: NoteCreationFormProps) {
  const methods = useForm<CreateNoteBodyDto>();
  const mutation = useCreateNote();
  const handleSubmit = async (data: CreateNoteBodyDto) => {
    mutation.mutate(data);
  };

  return (
    <NoteForm id={todoId} methods={methods} onSubmit={handleSubmit}>
      <input {...methods.register("todoId", { value: todoId })} type="hidden" />
    </NoteForm>
  );
}
