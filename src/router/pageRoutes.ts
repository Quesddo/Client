const pageRoutes = {
  root: () => "/",
  signup: () => `/signup`,
  login: () => `/login`,
  dashboard: () => `/dashboard`,
  todo: () => `/todo`,
  goal: (goalId: number) => `/goal/${goalId}`,
  notes: (goalId: number) => `/goal/${goalId}/notes`,
  noteDetail: (noteId: number) => `?noteId=${noteId}&mode=detail`,
  noteCreate: (todoId: number) => `?todoId=${todoId}`,
  noteUpdate: (noteId: number) => `?noteId=${noteId}&mode=edit `,
};

export default pageRoutes;
