const apiRoutes = {
  auth: {
    login: () => "auth/login",
    tokens: () => "auth/tokens",
  },
  file: {
    upload: () => "files",
  },
  goal: {
    list: () => "goals",
    create: () => "goals",
    detail: (goalId: number) => `goals/${goalId}`,
    update: (goalId: number) => `goals/${goalId}`,
    delete: (goalId: number) => `goals/${goalId}`,
  },
  note: {
    list: () => "notes",
    create: () => "notes",
    detail: (noteId: number) => `notes/${noteId}`,
    update: (noteId: number) => `notes/${noteId}`,
    delete: (noteId: number) => `notes/${noteId}`,
  },
  todo: {
    list: () => "todos",
    create: () => "todos",
    progress: () => "todos/progress",
    detail: (todoId: number) => `todos/${todoId}`,
    update: (todoId: number) => `todos/${todoId}`,
    delete: (todoId: number) => `todos/${todoId}`,
  },
  user: {
    info: () => "user",
    signup: () => "user",
  },
};

export default apiRoutes;
