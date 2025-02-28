import { http, HttpResponse } from "msw";

import { todoListMockData } from "./todoMockData";

export const todoHandlers = [
  http.get(`${process.env.NEXT_PUBLIC_API_BACKEND_URL}todos`, () => {
    return HttpResponse.json(todoListMockData());
  }),
  ,
];
