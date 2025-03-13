import { http, HttpResponse } from "msw";

import { API_BACKEND_URL } from "@/constants/env";

import { todoDetailMockData, todoListMockData } from "./todoMockData";

export const todoHandlers = [
  http.get(`${API_BACKEND_URL}todos`, () => {
    return HttpResponse.json(todoListMockData());
  }),
  http.get(`${API_BACKEND_URL}todos/:todoId`, ({ params: { todoId } }) => {
    if (!todoId) return;
    return HttpResponse.json(todoDetailMockData(Number(todoId)));
  }),
];
