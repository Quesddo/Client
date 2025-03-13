// 노트 관련 API 요청을 Mocking하는 MSW 핸들러 파일

import { http, HttpResponse } from "msw";

import { API_BACKEND_URL } from "@/constants/env";
import { CreateNoteBodyDto, UpdateNoteBodyDto } from "@/types/types";

import { noteDetailMockData } from "./noteMockData";

export const noteHandlers = [
  http.get(`${API_BACKEND_URL}notes/:noteId`, ({ params: { noteId } }) => {
    if (!noteId) return;
    return HttpResponse.json(noteDetailMockData(Number(noteId)));
  }),
  http.post(
    `${API_BACKEND_URL}notes`,
    async ({ request }: { request: Request }) => {
      const body: CreateNoteBodyDto = await request.json();

      return HttpResponse.json(body);
    },
  ),
  http.patch(
    `${API_BACKEND_URL}notes/:noteId`,
    async ({ request }: { request: Request }) => {
      const body: UpdateNoteBodyDto = await request.json();

      return HttpResponse.json(body);
    },
  ),
];
