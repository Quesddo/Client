# 쿼리키 팩토리

TanStack Query의 쿼리키를 효율적으로 관리하기 위해
`@lukemorales/query-key-factory` 라이브러리를 활용한 쿼리키 팩토리 패턴을 적용합니다.

<br />

## 📍 쿼리키 구조

| **쿼리키 그룹** | **설명**         | **쿼리키**                                                   | **사용 예시**                                                   |
| --------------- | ---------------- | ------------------------------------------------------------ | --------------------------------------------------------------- |
| **note**        | 노트 무한스크롤  | ["note", "infinite", {"goalId": goalId}]                     | queryKeys.note.infinite(goalId: 123).queryKey                   |
|                 | 단일 노트        | ["note", "detail", {"noteId": noteId}]                       | queryKeys.note.detail(noteId: 123).queryKey                     |
| **todo**        | 할 일 리스트     | ["todo", "list", {"goalId": goalId}, {"filter": filter}]     | queryKeys.todo.list({goalId: 123, filter: "done"}).queryKey     |
|                 | 할 일 무한스크롤 | ["todo", "infinite", {"goalId": goalId}, {"filter": filter}] | queryKeys.todo.infinite({goalId: 123, filter: "done"}).queryKey |
|                 | 노트 작성/수정   | ["todo", "editNote", {"todoId": todoId}]                     | queryKeys.todo.editNote(todoId: 123).queryKey                   |
|                 | 할 일 진행률     | ["todo", "progress", {"goalId": goalId}]                     | queryKeys.todo.progress(goalId: 123).queryKey                   |
| **goal**        | 목표 무한스크롤  | ["goal", "infinite", {"source": source}]                     | queryKeys.goal.infinite(source: "dashboard").queryKey           |
|                 | 단일 목표        | ["goal", "detail", {"goalId": goalId}]                       | queryKeys.goal.detail(goalId: 123).queryKey                     |
| **user**        | 유저 프로필 조회 | ["user", "profile"]                                          | queryKeys.user.profile.queryKey                                 |

<br />

## **⚠️ 쿼리 키 사용 시 주의사항**

#### 쿼리 키를 지정할 때는 반드시 `_def` 또는 `queryKey`로 끝나는 값을 사용해야 합니다.

- `useQuery`, `getQueryData`, `setQueryData` 등 **쿼리 키를 직접 지정할 때** → `queryKey`를 사용
- `invalidateQueries` 등 **쿼리 키 그룹을 무효화할 때** → `_def`를 사용하여 적절한 단위로 끊어줌

<br />

예시)

```tsx
export const goalQueryKeys = createQueryKeys("goal", {
  detail: (goalId) => ({
    queryKey: [{ goalId: goalId }],
  }),
});

// 🔹 그룹 단위 무효화 시 (_def 사용)
const goalQueryKey = queryKeys.goal._def;
// 결과: ["goal"]

const goalDetailQueryKey = queryKeys.goal.detail._def;
// 결과: ["goal", "detail"]

// 🔹 특정 값까지 포함해야 할 경우 (queryKey 사용)
const goalDetailQueryKey = queryKeys.goal.detail(goalId).queryKey;
// 결과: ["goal", "detail", {"goalId": goalId}]
```
