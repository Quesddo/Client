import { usePathname } from "next/navigation";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";

import { useFetchNote } from "@/hooks/note/useFetchNote";
import { useNoteStorage } from "@/hooks/note/useNoteStorage";
import { useUpdateNote } from "@/hooks/note/useUpdateNote";
import { UpdateNoteBodyDto } from "@/types/types";

import NoteForm from "../note-form/NoteForm";

interface NoteUpdateFormProps {
  noteId: number;
}

export default function NoteUpdateForm({ noteId }: NoteUpdateFormProps) {
  const mutation = useUpdateNote(noteId);
  const pathname = usePathname();
  const router = useRouter();

  const { data } = useFetchNote(noteId);

  const methods = useForm({
    defaultValues: {
      title: data.title,
      content: data.content,
      linkUrl: data.linkUrl,
      goal: data?.goal?.title,
      todo: {
        title: data?.todo.title,
        done: data?.todo.done,
      },
    },
    mode: "onChange",
  });

  const { removeNoteDraft } = useNoteStorage({
    id: noteId,
    isEditMode: true,
  });

  const handleSubmit = (data: UpdateNoteBodyDto) => {
    mutation.mutate(data, {
      onSuccess: (data) => {
        const queryParams = new URLSearchParams();

        removeNoteDraft(noteId);
        queryParams.set("noteId", data.id.toString());
        queryParams.set("mode", "detail");
        router.push(`${pathname}?${queryParams.toString()}`);
      },
    });
  };

  return (
    <NoteForm id={noteId} methods={methods} onSubmit={handleSubmit} editMode />
  );
}
