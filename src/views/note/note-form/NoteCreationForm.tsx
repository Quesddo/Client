import { useQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";

import { todoApi } from "@/apis/todoApi";
import useCreateNote from "@/hooks/note/useCreateNote";
import { CreateNoteBodyDto } from "@/types/types";

import NoteForm from "./NoteForm";

interface NoteCreationFormProps {
  todoId: number;
}

export default function NoteCreationForm({ todoId }: NoteCreationFormProps) {
  const methods = useForm<CreateNoteBodyDto>();
  const mutation = useCreateNote();

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["todo", todoId],
    queryFn: () => todoApi.fetchTodo(todoId),
    enabled: !!todoId,
  });

  const handleSubmit = async (data: CreateNoteBodyDto) => {
    mutation.mutate(data);
  };

  if (isError) {
    return <p>에러 발생: {(error as Error).message}</p>;
  }

  if (isLoading) {
    return <p>로딩중...</p>;
  }

  return (
    <NoteForm
      id={todoId}
      methods={methods}
      onSubmit={handleSubmit}
      goal={data?.goal?.title}
      todo={data?.title}
    >
      <input {...methods.register("todoId", { value: todoId })} type="hidden" />
    </NoteForm>
  );
}
