import { useSuspenseQuery } from "@tanstack/react-query";

import noteApi from "@/apis/noteApi";

export const useFetchNote = (noteId: number) => {
  return useSuspenseQuery({
    queryKey: ["noteDetail", noteId],
    queryFn: () => noteApi.fetchNote(noteId),
  });
};
