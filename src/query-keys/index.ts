import { mergeQueryKeys } from "@lukemorales/query-key-factory";

import { goalQueryKeys } from "./goalQueryKeys";

export const queryKeys = mergeQueryKeys(goalQueryKeys);
