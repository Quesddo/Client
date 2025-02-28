import {
  InfiniteData,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import { deleteNote } from "@/apis/note/deleteNote";
import { TeamIdNotesGet200Response } from "@/types/types";

export const useDeleteNote = (goalId: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (noteId: number) => deleteNote(noteId),

    onMutate: async (noteId: number) => {
      await queryClient.cancelQueries({ queryKey: ["notes", goalId] });

      // 이전 상태 저장
      const previousNotes = queryClient.getQueryData<
        TeamIdNotesGet200Response["notes"]
      >(["notes", goalId]);

      // 낙관적 업데이트
      queryClient.setQueryData<InfiniteData<TeamIdNotesGet200Response>>(
        ["notes", goalId],
        (oldData) => {
          if (!oldData) return oldData;
          return {
            ...oldData,
            pages: oldData.pages.map((page) => ({
              ...page,
              notes: page.notes.filter((note) => note.id !== noteId),
            })),
          };
        },
      );

      return { previousNotes };
    },

    // 에러 발생 시 롤백
    onError: (error, noteId, context) => {
      if (context?.previousNotes) {
        queryClient.setQueryData(["notes", goalId], context.previousNotes);
      }
      alert(error.message);
    },

    // 최종적으로 데이터 갱신
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["notes", goalId] });
    },
  });
};
