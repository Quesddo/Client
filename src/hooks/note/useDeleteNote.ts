import {
  InfiniteData,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import noteApi from "@/apis/noteApi";
import { queryKeys } from "@/query-keys";
import { TeamIdNotesGet200Response } from "@/types/types";

export const useDeleteNote = (goalId: number) => {
  const queryClient = useQueryClient();
  const noteInfiniteQueryKey = queryKeys.note.infinite(goalId).queryKey;

  return useMutation({
    mutationFn: (noteId: number) => noteApi.deleteNote(noteId),

    onMutate: async (noteId: number) => {
      await queryClient.cancelQueries({ queryKey: noteInfiniteQueryKey });

      // 이전 상태 저장
      const previousNotes =
        queryClient.getQueryData<TeamIdNotesGet200Response["notes"]>(
          noteInfiniteQueryKey,
        );

      // 낙관적 업데이트
      queryClient.setQueryData<InfiniteData<TeamIdNotesGet200Response>>(
        noteInfiniteQueryKey,
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
        queryClient.setQueryData(noteInfiniteQueryKey, context.previousNotes);
      }
      alert(error.message);
    },

    // 최종적으로 데이터 갱신
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: noteInfiniteQueryKey });
    },
  });
};
