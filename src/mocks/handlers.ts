import { noteHandlers } from "./note/noteHandlers";
import { todoHandlers } from "./todo/todoHandlers";

// 핸들러 정의 한 후 배열 안에 추가해주세요.
export const handlers = [...noteHandlers, ...todoHandlers];
