import { mergeQueryKeys } from "@lukemorales/query-key-factory";

import { goalQueryKeys } from "./goalQueryKeys";
import { noteQueryKeys } from "./noteQueryKeys";

export const queryKeys = mergeQueryKeys(goalQueryKeys, noteQueryKeys);
