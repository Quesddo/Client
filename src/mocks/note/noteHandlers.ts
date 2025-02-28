// 노트 관련 API 요청을 Mocking하는 MSW 핸들러 파일

import { http, HttpResponse } from "msw";

import { TeamIdNotesGet200ResponseNotesInner } from "@/types/types";

import { noteDetailMockData } from "./noteMockData";

export const noteHandlers = [
  http.get(
    `${process.env.NEXT_PUBLIC_API_BACKEND_URL}notes/:noteId`,
    ({ params: { noteId } }) => {
      if (!noteId) return;
      return HttpResponse.json(noteDetailMockData(Number(noteId)));
    },
  ),
  ,
];
