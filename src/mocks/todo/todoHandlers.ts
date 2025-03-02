import { http, HttpResponse } from "msw";

import { API_BACKEND_URL } from "@/constants/env";

import { todoListMockData } from "./todoMockData";

export const todoHandlers = [
  http.get(`${API_BACKEND_URL}todos`, () => {
    return HttpResponse.json(todoListMockData());
  }),
  ,
];
