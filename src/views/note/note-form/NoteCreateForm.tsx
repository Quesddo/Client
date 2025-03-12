import { useSuspenseQuery } from "@tanstack/react-query";
import { usePathname } from "next/navigation";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";

import todoApi from "@/apis/todoApi";
import { useCreateNote } from "@/hooks/note/useCreateNote";
import { useNoteStorage } from "@/hooks/note/useNoteStorage";
import { CreateNoteBodyDto } from "@/types/types";

import NoteForm from "./NoteForm";

interface NoteCreationFormProps {
  todoId: number;
}

export default function NoteCreationForm({ todoId }: NoteCreationFormProps) {
  const methods = useForm<CreateNoteBodyDto>({
    defaultValues: {
      title: "",
      todoId,
      content: "",
      linkUrl: undefined,
    },
    mode: "onChange",
  });
  const mutation = useCreateNote();
  const pathname = usePathname();
  const router = useRouter();

  const { data } = useSuspenseQuery({
    queryKey: ["todo", todoId],
    queryFn: () => todoApi.fetchTodo(todoId),
  });

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
