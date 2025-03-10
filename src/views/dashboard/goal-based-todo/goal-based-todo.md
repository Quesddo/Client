## [대시보드/목표별 할 일]

```
GoalBasedTodo
│
├── GoalItem (무한스크롤로 렌더링되는 각 목표 아이템)
│    ├── ProgressWrapper (목표별 진행률)
│    └── TodoWrapper (todo, done 타입에 따른 라벨 + 할 일 리스트)
│         ├── EmptyData (할 일 없을 때)
│         └── TodoList (todo 파트에서 사용되는 할 일 목록 컴포넌트 가져옴)
│
└── EmptyData (목표 없을 때)
```

<br />

### 📍 GoalBasedTodo

- 목표를 **무한 스크롤** 방식으로 불러옵니다.
- 각 목표별로 `GoalItem`을 렌더링합니다.
- 목표가 없을 경우 `EmptyData`를 표시합니다.

### 📍 GoalItem

- 목표에 대한 **진행률과 To-Do 리스트**를 렌더링합니다.
- `ProgressWrapper`를 통해 목표의 **진행률**을 표시합니다.
- `TodoWrapper`를 통해 **미완료 및 완료된 할 일**을 구분하여 보여줍니다.

### 📍 TodoWrapper

- `TodoList`를 통해 **할 일 목록을 렌더링**합니다.
- 할 일이 없을 경우 `EmptyData`를 표시합니다.

### 📍 EmptyData

- 목표나 할 일이 없을 때 **해당 유형에 맞는 메시지**를 렌더링합니다.
