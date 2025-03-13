import { usePathname } from "next/navigation";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";

import { useCreateNote } from "@/hooks/note/useCreateNote";
import { useNoteStorage } from "@/hooks/note/useNoteStorage";
import { useFetchTodo } from "@/hooks/todo/useFetchTodo";
import { CreateNoteBodyDto } from "@/types/types";

import NoteForm from "../note-form/NoteForm";

interface NoteCreationFormProps {
  todoId: number;
}

export default function NoteCreateForm({ todoId }: NoteCreationFormProps) {
  const { data } = useFetchTodo(todoId);
  const methods = useForm({
    defaultValues: {
      title: "",
      todoId,
      content: "",
      linkUrl: undefined,
      goal: data?.goal?.title,
      todo: {
        title: data?.title,
        done: data?.done,
      },
    },
    mode: "onChange",
  });

  const mutation = useCreateNote();
  const pathname = usePathname();
  const router = useRouter();

  const { removeNoteDraft } = useNoteStorage({
    id: todoId,
    isEditMode: false,
  });

  const handleSubmit = async (data: CreateNoteBodyDto) => {
    mutation.mutate(data, {
      onSuccess: (data) => {
        const queryParams = new URLSearchParams();

        removeNoteDraft(todoId);
        queryParams.set("noteId", data.id.toString());
        queryParams.set("mode", "detail");
        router.push(`${pathname}?${queryParams.toString()}`);
      },
    });
  };

  return (
    <NoteForm id={todoId} methods={methods} onSubmit={handleSubmit}>
      <input {...methods.register("todoId", { value: todoId })} type="hidden" />
    </NoteForm>
  );
}
