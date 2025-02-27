// =========== Response, Request type ===========

/**
 *
 * @export
 * @interface CreateGoalBodyDto
 */
export interface CreateGoalBodyDto {
  /**
   *
   * @type {string}
   * @memberof CreateGoalBodyDto
   */
  title: string;
}
/**
 *
 * @export
 * @interface CreateNoteBodyDto
 */
export interface CreateNoteBodyDto {
  /**
   *
   * @type {number}
   * @memberof CreateNoteBodyDto
   */
  todoId: number;
  /**
   *
   * @type {string}
   * @memberof CreateNoteBodyDto
   */
  title: string;
  /**
   *
   * @type {string}
   * @memberof CreateNoteBodyDto
   */
  content: string;
  /**
   *
   * @type {string}
   * @memberof CreateNoteBodyDto
   */
  linkUrl?: string;
}
/**
 *
 * @export
 * @interface CreateTodoBodyDto
 */
export interface CreateTodoBodyDto {
  /**
   *
   * @type {string}
   * @memberof CreateTodoBodyDto
   */
  title: string;
  /**
   *
   * @type {string}
   * @memberof CreateTodoBodyDto
   */
  fileUrl?: string;
  /**
   *
   * @type {string}
   * @memberof CreateTodoBodyDto
   */
  linkUrl?: string;
  /**
   *
   * @type {number}
   * @memberof CreateTodoBodyDto
   */
  goalId?: number;
}
/**
 *
 * @export
 * @interface ErrorResponsePayload
 */
export interface ErrorResponsePayload {
  /**
   *
   * @type {string}
   * @memberof ErrorResponsePayload
   */
  message: string;
}
/**
 *
 * @export
 * @interface FindGoalsQuery
 */
export interface FindGoalsQuery {
  /**
   *
   * @type {number}
   * @memberof FindGoalsQuery
   */
  cursor?: number;
  /**
   *
   * @type {number}
   * @memberof FindGoalsQuery
   */
  size?: number;
  /**
   *
   * @type {string}
   * @memberof FindGoalsQuery
   */
  sortOrder?: FindGoalsQuerySortOrderEnum;
}

export const FindGoalsQuerySortOrderEnum = {
  Oldest: "oldest",
  Newest: "newest",
} as const;

export type FindGoalsQuerySortOrderEnum =
  (typeof FindGoalsQuerySortOrderEnum)[keyof typeof FindGoalsQuerySortOrderEnum];

/**
 *
 * @export
 * @interface FindNotesQueryDto
 */
export interface FindNotesQueryDto {
  /**
   *
   * @type {number}
   * @memberof FindNotesQueryDto
   */
  goalId?: number;
  /**
   *
   * @type {number}
   * @memberof FindNotesQueryDto
   */
  cursor?: number;
  /**
   *
   * @type {number}
   * @memberof FindNotesQueryDto
   */
  size?: number;
}
/**
 *
 * @export
 * @interface FindTodosQueryDto
 */
export interface FindTodosQueryDto {
  /**
   *
   * @type {number}
   * @memberof FindTodosQueryDto
   */
  goalId?: number;
  /**
   * done이 true이면 완료된 todo만, false이면 미완료된 todo만 조회합니다. 아무것도 입력하지 않으면 모든 todo를 조회합니다.
   * @type {boolean}
   * @memberof FindTodosQueryDto
   */
  done?: boolean;
  /**
   *
   * @type {number}
   * @memberof FindTodosQueryDto
   */
  cursor?: number;
  /**
   *
   * @type {number}
   * @memberof FindTodosQueryDto
   */
  size?: number;
}
/**
 *
 * @export
 * @interface GetProgressQueryDto
 */
export interface GetProgressQueryDto {
  /**
   *
   * @type {number}
   * @memberof GetProgressQueryDto
   */
  goalId?: number;
}
/**
 *
 * @export
 * @interface LoginBodyDto
 */
export interface LoginBodyDto {
  /**
   *
   * @type {string}
   * @memberof LoginBodyDto
   */
  email: string;
  /**
   *
   * @type {string}
   * @memberof LoginBodyDto
   */
  password: string;
}
/**
 *
 * @export
 * @interface TeamIdAuthLoginPost201Response
 */
export interface TeamIdAuthLoginPost201Response {
  /**
   *
   * @type {UserServiceResponseDto}
   * @memberof TeamIdAuthLoginPost201Response
   */
  user: UserServiceResponseDto;
  /**
   *
   * @type {string}
   * @memberof TeamIdAuthLoginPost201Response
   */
  refreshToken: string;
  /**
   *
   * @type {string}
   * @memberof TeamIdAuthLoginPost201Response
   */
  accessToken: string;
}
/**
 *
 * @export
 * @interface TeamIdAuthTokensPost201Response
 */
export interface TeamIdAuthTokensPost201Response {
  /**
   *
   * @type {string}
   * @memberof TeamIdAuthTokensPost201Response
   */
  refreshToken: string;
  /**
   *
   * @type {string}
   * @memberof TeamIdAuthTokensPost201Response
   */
  accessToken: string;
}
/**
 *
 * @export
 * @interface TeamIdFilesPost200Response
 */
export interface TeamIdFilesPost200Response {
  /**
   *
   * @type {string}
   * @memberof TeamIdFilesPost200Response
   */
  url: string;
}
/**
 *
 * @export
 * @interface TeamIdGoalsGet200Response
 */
export interface TeamIdGoalsGet200Response {
  /**
   *
   * @type {number}
   * @memberof TeamIdGoalsGet200Response
   */
  nextCursor: number | null;
  /**
   *
   * @type {number}
   * @memberof TeamIdGoalsGet200Response
   */
  totalCount: number;
  /**
   *
   * @type {Array<TeamIdGoalsGet200ResponseGoalsInner>}
   * @memberof TeamIdGoalsGet200Response
   */
  goals: Array<TeamIdGoalsGet200ResponseGoalsInner>;
}
/**
 *
 * @export
 * @interface TeamIdGoalsGet200ResponseGoalsInner
 */
export interface TeamIdGoalsGet200ResponseGoalsInner {
  /**
   *
   * @type {string}
   * @memberof TeamIdGoalsGet200ResponseGoalsInner
   */
  updatedAt: string;
  /**
   *
   * @type {string}
   * @memberof TeamIdGoalsGet200ResponseGoalsInner
   */
  createdAt: string;
  /**
   *
   * @type {string}
   * @memberof TeamIdGoalsGet200ResponseGoalsInner
   */
  title: string;
  /**
   *
   * @type {number}
   * @memberof TeamIdGoalsGet200ResponseGoalsInner
   */
  id: number;
  /**
   *
   * @type {number}
   * @memberof TeamIdGoalsGet200ResponseGoalsInner
   */
  userId: number;
  /**
   *
   * @type {string}
   * @memberof TeamIdGoalsGet200ResponseGoalsInner
   */
  teamId: string;
}
/**
 *
 * @export
 * @interface TeamIdNotesGet200Response
 */
export interface TeamIdNotesGet200Response {
  /**
   *
   * @type {number}
   * @memberof TeamIdNotesGet200Response
   */
  nextCursor: number | null;
  /**
   *
   * @type {number}
   * @memberof TeamIdNotesGet200Response
   */
  totalCount: number;
  /**
   *
   * @type {Array<TeamIdNotesGet200ResponseNotesInner>}
   * @memberof TeamIdNotesGet200Response
   */
  notes: Array<TeamIdNotesGet200ResponseNotesInner>;
}
/**
 *
 * @export
 * @interface TeamIdNotesGet200ResponseNotesInner
 */
export interface TeamIdNotesGet200ResponseNotesInner {
  /**
   *
   * @type {TeamIdNotesGet200ResponseNotesInnerTodo}
   * @memberof TeamIdNotesGet200ResponseNotesInner
   */
  todo: TeamIdNotesGet200ResponseNotesInnerTodo;
  /**
   *
   * @type {string}
   * @memberof TeamIdNotesGet200ResponseNotesInner
   */
  updatedAt: string;
  /**
   *
   * @type {string}
   * @memberof TeamIdNotesGet200ResponseNotesInner
   */
  createdAt: string;
  /**
   *
   * @type {string}
   * @memberof TeamIdNotesGet200ResponseNotesInner
   */
  title: string;
  /**
   *
   * @type {number}
   * @memberof TeamIdNotesGet200ResponseNotesInner
   */
  id: number;
  /**
   *
   * @tye {TeamIdNotesGet200ResponseNotesInnerGoal}
   * @memberof TeamIdNotesGet200ResponseNotesInner
   */
  goal: TeamIdNotesGet200ResponseNotesInnerGoal | null;
  /**
   *
   * @type {number}
   * @memberof TeamIdNotesGet200ResponseNotesInner
   */
  userId: number;
  /**
   *
   * @type {string}
   * @memberof TeamIdNotesGet200ResponseNotesInner
   */
  teamId: string;
  content: string;
}
/**
 *
 * @export
 * @interface TeamIdNotesGet200ResponseNotesInnerGoal
 */
export interface TeamIdNotesGet200ResponseNotesInnerGoal {
  /**
   *
   * @type {string}
   * @memberof TeamIdNotesGet200ResponseNotesInnerGoal
   */
  title: string;
  /**
   *
   * @type {number}
   * @memberof TeamIdNotesGet200ResponseNotesInnerGoal
   */
  id: number;
}
/**
 *
 * @export
 * @interface TeamIdNotesGet200ResponseNotesInnerTodo
 */
export interface TeamIdNotesGet200ResponseNotesInnerTodo {
  /**
   *
   * @type {boolean}
   * @memberof TeamIdNotesGet200ResponseNotesInnerTodo
   */
  done: boolean;
  /**
   *
   * @type {string}
   * @memberof TeamIdNotesGet200ResponseNotesInnerTodo
   */
  title: string;
  /**
   *
   * @type {number}
   * @memberof TeamIdNotesGet200ResponseNotesInnerTodo
   */
  id: number;
}
/**
 *
 * @export
 * @interface TeamIdNotesPost201Response
 */
export interface TeamIdNotesPost201Response {
  /**
   *
   * @tye {TeamIdNotesPost201ResponseTodo}
   * @memberof TeamIdNotesPost201Response
   */
  todo: TeamIdNotesPost201ResponseTodo;
  /**
   *
   * @type {string}
   * @memberof TeamIdNotesPost201Response
   */
  linkUrl: string | null;
  /**
   *
   * @type {string}
   * @memberof TeamIdNotesPost201Response
   */
  content: string;
  /**
   *
   * @type {string}
   * @memberof TeamIdNotesPost201Response
   */
  updatedAt: string;
  /**
   *
   * @type {string}
   * @memberof TeamIdNotesPost201Response
   */
  createdAt: string;
  /**
   *
   * @type {string}
   * @memberof TeamIdNotesPost201Response
   */
  title: string;
  /**
   *
   * @type {number}
   * @memberof TeamIdNotesPost201Response
   */
  id: number;
  /**
   *
   * @tye {TeamIdNotesGet200ResponseNotesInnerGoal}
   * @memberof TeamIdNotesPost201Response
   */
  goal: TeamIdNotesGet200ResponseNotesInnerGoal | null;
  /**
   *
   * @type {number}
   * @memberof TeamIdNotesPost201Response
   */
  userId: number;
  /**
   *
   * @type {string}
   * @memberof TeamIdNotesPost201Response
   */
  teamId: string;
}
/**
 *
 * @export
 * @interface TeamIdNotesPost201ResponseTodo
 */
export interface TeamIdNotesPost201ResponseTodo {
  /**
   *
   * @type {boolean}
   * @memberof TeamIdNotesPost201ResponseTodo
   */
  done: boolean;
  /**
   *
   * @type {string}
   * @memberof TeamIdNotesPost201ResponseTodo
   */
  fileUrl: string | null;
  /**
   *
   * @type {string}
   * @memberof TeamIdNotesPost201ResponseTodo
   */
  linkUrl: string | null;
  /**
   *
   * @type {string}
   * @memberof TeamIdNotesPost201ResponseTodo
   */
  title: string;
  /**
   *
   * @type {number}
   * @memberof TeamIdNotesPost201ResponseTodo
   */
  id: number;
}
/**
 *
 * @export
 * @interface TeamIdTodosGet200Response
 */
export interface TeamIdTodosGet200Response {
  /**
   *
   * @type {number}
   * @memberof TeamIdTodosGet200Response
   */
  totalCount: number;
  /**
   *
   * @type {number}
   * @memberof TeamIdTodosGet200Response
   */
  nextCursor: number | null;
  /**
   *
   * @type {Array<TodoResponseDto>}
   * @memberof TeamIdTodosGet200Response
   */
  todos: Array<TodoResponseDto>;
}
/**
 *
 * @export
 * @interface TeamIdTodosProgressGet200Response
 */
export interface TeamIdTodosProgressGet200Response {
  /**
   *
   * @type {number}
   * @memberof TeamIdTodosProgressGet200Response
   */
  progress: number;
}
/**
 *
 * @export
 * @interface TodoResponseDto
 */
export interface TodoResponseDto {
  /**
   *
   * @type {number}
   * @memberof TodoResponseDto
   */
  noteId: number | null;
  /**
   *
   * @type {boolean}
   * @memberof TodoResponseDto
   */
  done: boolean;
  /**
   *
   * @type {string}
   * @memberof TodoResponseDto
   */
  linkUrl: string | null;
  /**
   *
   * @type {string}
   * @memberof TodoResponseDto
   */
  fileUrl: string | null;
  /**
   *
   * @type {string}
   * @memberof TodoResponseDto
   */
  title: string;
  /**
   *
   * @type {number}
   * @memberof TodoResponseDto
   */
  id: number;
  /**
   *
   * @type {TodoResponseDtoGoal}
   * @memberof TodoResponseDto
   */
  goal: TodoResponseDtoGoal | null;
  /**
   *
   * @type {number}
   * @memberof TodoResponseDto
   */
  userId: number;
  /**
   *
   * @type {string}
   * @memberof TodoResponseDto
   */
  teamId: string;
  /**
   *
   * @type {string}
   * @memberof TodoResponseDto
   */
  updatedAt: string;
  /**
   *
   * @type {string}
   * @memberof TodoResponseDto
   */
  createdAt: string;
}
/**
 *
 * @export
 * @interface TodoResponseDtoGoal
 */
export interface TodoResponseDtoGoal {
  /**
   *
   * @type {number}
   * @memberof TodoResponseDtoGoal
   */
  id: number;
  /**
   *
   * @type {string}
   * @memberof TodoResponseDtoGoal
   */
  title: string;
}
/**
 *
 * @export
 * @interface UpdateGoalBodyDto
 */
export interface UpdateGoalBodyDto {
  /**
   *
   * @type {string}
   * @memberof UpdateGoalBodyDto
   */
  title: string;
}
/**
 *
 * @export
 * @interface UpdateNoteBodyDto
 */
export interface UpdateNoteBodyDto {
  /**
   *
   * @type {string}
   * @memberof UpdateNoteBodyDto
   */
  title?: string;
  /**
   *
   * @type {string}
   * @memberof UpdateNoteBodyDto
   */
  content?: string;
  /**
   *
   * @type {string}
   * @memberof UpdateNoteBodyDto
   */
  linkUrl?: string | null;
}
/**
 *
 * @export
 * @interface UpdateTodoBodyDto
 */
export interface UpdateTodoBodyDto {
  /**
   *
   * @type {string}
   * @memberof UpdateTodoBodyDto
   */
  title?: string;
  /**
   *
   * @type {string}
   * @memberof UpdateTodoBodyDto
   */
  fileUrl?: string | null;
  /**
   *
   * @type {string}
   * @memberof UpdateTodoBodyDto
   */
  linkUrl?: string | null;
  /**
   *
   * @type {number}
   * @memberof UpdateTodoBodyDto
   */
  goalId?: number | null;
  /**
   *
   * @type {boolean}
   * @memberof UpdateTodoBodyDto
   */
  done?: boolean;
}
/**
 *
 * @export
 * @interface UserCreateRequstDto
 */
export interface UserCreateRequstDto {
  /**
   *
   * @type {string}
   * @memberof UserCreateRequstDto
   */
  email: string;
  /**
   *
   * @type {string}
   * @memberof UserCreateRequstDto
   */
  name: string;
  /**
   *
   * @type {string}
   * @memberof UserCreateRequstDto
   */
  password: string;
}
/**
 *
 * @export
 * @interface UserServiceResponseDto
 */
export interface UserServiceResponseDto {
  /**
   *
   * @type {number}
   * @memberof UserServiceResponseDto
   */
  id: number;
  /**
   *
   * @type {string}
   * @memberof UserServiceResponseDto
   */
  email: string;
  /**
   *
   * @type {string}
   * @memberof UserServiceResponseDto
   */
  name: string;
  /**
   *
   * @type {string}
   * @memberof UserServiceResponseDto
   */
  createdAt: string;
  /**
   *
   * @type {string}
   * @memberof UserServiceResponseDto
   */
  updatedAt: string;
}

/**
 * @export
 */
export const TeamIdGoalsGetSortOrderEnum = {
  Oldest: "oldest",
  Newest: "newest",
} as const;
export type TeamIdGoalsGetSortOrderEnum =
  (typeof TeamIdGoalsGetSortOrderEnum)[keyof typeof TeamIdGoalsGetSortOrderEnum];

// ========== Params type ============
export interface teamIdAuthLoginPostParams {
  loginBodyDto: LoginBodyDto;
}

export interface teamIdFilesPostParams {
  file: File;
}
export interface teamIdGoalsGetParams {
  cursor?: number;
  size?: number;
  sortOrder?: TeamIdGoalsGetSortOrderEnum;
}
export interface teamIdGoalsGoalIdDeleteParams {
  goalId: number;
}
export interface teamIdGoalsGoalIdGetParams {
  goalId: number;
}
export interface teamIdGoalsGoalIdPatchParams {
  goalId: number;
  updateGoalBodyDto: UpdateGoalBodyDto;
}
export interface teamIdGoalsPostParams {
  createGoalBodyDto: CreateGoalBodyDto;
}
export interface teamIdNotesGetParams {
  goalId?: number;
  cursor?: number;
  size?: number;
}
export interface teamIdNotesNoteIdDeleteParams {
  noteId: number;
}
export interface teamIdNotesNoteIdGetParams {
  noteId: number;
}
export interface teamIdNotesNoteIdPatchParams {
  noteId: number;
  updateNoteBodyDto: UpdateNoteBodyDto;
}
export interface teamIdNotesPostParams {
  createNoteBodyDto: CreateNoteBodyDto;
}
export interface teamIdTodosGetParams {
  goalId?: number;
  done?: boolean;
  cursor?: number;
  size?: number;
}
export interface teamIdTodosPostParams {
  createTodoBodyDto: CreateTodoBodyDto;
}
export interface teamIdTodosProgressGetParams {
  goalId?: number;
}
export interface teamIdTodosTodoIdDeleteParams {
  todoId: number;
}
export interface teamIdTodosTodoIdGetParams {
  todoId: number;
}
export interface teamIdTodosTodoIdPatchParams {
  todoId: number;
  updateTodoBodyDto: UpdateTodoBodyDto;
}

export interface teamIdUserPostParams {
  userCreateRequstDto: UserCreateRequstDto;
}
