import { useSuspenseQuery } from "@tanstack/react-query";

import noteApi from "@/apis/noteApi";
import { queryKeys } from "@/query-keys";

export const useFetchNote = (noteId: number) => {
  const noteDetailQueryKey = queryKeys.note.detail(noteId).queryKey;

  return useSuspenseQuery({
    queryKey: noteDetailQueryKey,
    queryFn: () => noteApi.fetchNote(noteId),
  });
};
