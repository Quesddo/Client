import { mergeQueryKeys } from "@lukemorales/query-key-factory";

import { embedQueryKeys } from "./embedQueryKeys";
import { goalQueryKeys } from "./goalQueryKeys";
import { noteQueryKeys } from "./noteQueryKeys";
import { todoQueryKeys } from "./todoQueryKeys";
import { userQueryKeys } from "./userQueryKeys";

export const queryKeys = mergeQueryKeys(
  goalQueryKeys,
  noteQueryKeys,
  todoQueryKeys,
  userQueryKeys,
  embedQueryKeys,
);
