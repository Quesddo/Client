export interface TodoResponse {
  totalCount: number;
  nextCursor: number | null;
  todos: TodoItem[];
}

export interface TodoItem {
  noteId: number | null;
  done: boolean;
  linkUrl: string | null;
  fileUrl: string | null;
  title: string;
  id: number;
  goal: {
    id: number;
    title: string;
  } | null;
  userId: number;
  teamId: string;
  updatedAt: string;
  createdAt: string;
}

export type FilterType = "todo" | "done";
