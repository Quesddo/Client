# <img width="26" alt="logo" src="https://github.com/user-attachments/assets/e04e21b0-42a2-4167-ba82-7799b27e0599" /> 퀘스또

<img src = "https://github.com/user-attachments/assets/fd7f1f45-f09d-41b8-8131-e4c2311db407" />


<br/>
<br/>


🌐 [배포 주소](https://quesddo.vercel.app)  
🎨 [스토리북 바로가기](https://www.chromatic.com/library?appId=67acd5f79f2abb10c31d0c10&branch=main)

<br />
<br />

## 목차

[1](#1-기술-스택). 기술 스택  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[1.1](#11-주요-스택-사용-이유). 주요 스택 사용 이유  
[2](#2-설치-및-실행). 설치 및 실행  
[3](#3-팀원-구성). 팀원 구성  
[4](#4-협업-방식). 협업 방식  
[5](#5-페이지별-기능). 페이지별 기능  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[5.1](#51-로그인--회원가입). 로그인 / 회원가입  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[5.2](#52-네비게이션-사이드바). 네비게이션 사이드바  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[5.3](#53-대시보드). 대시보드  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[5.4](#54-모든-할-일-목록). 모든 할 일 목록  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[5.5](#55-목표-상세). 목표 상세  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[5.6](#56-노트-모아보기). 노트 모아보기  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[5.7](#57-노트-작성). 노트 작성  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[5.8](#58-노트-상세). 노트 상세  
[6](#6-주요-도전-과제). 주요 도전 과제  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[6.1](#61-브랜치전략). 브랜치전략  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[6.2](#62-디자인패턴). 디자인패턴  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[6.3](#63-open-api-generator). Open API Generator  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[6.4](#64-스토리북--msw). 스토리북 & MSW  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[6.5](#65-쿼리키-구조화). 쿼리키 구조화  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[6.6](#66-워크플로우-자동화). 워크플로우 자동화  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[6.7](#67-테스트). 테스트  
[7](#7-문서). 문서

<br />
<br />

## 1. 기술 스택

| **Stacks**            | **Tools**      | **Collaboration** |
| --------------------- | -------------- | ----------------- |
| Nexjs (Page Router)   | Figma          | Notion            |
| Typescript            | GitHub         | Discord           |
| Tailwind (v4)         | GitHub Actions | Jira              |
| Axios                 | Vercel         |                   |
| Tanstack Query        |                |                   |
| Jest                  |                |                   |
| React-Testing-Library |                |                   |
| PNPM                  |                |                   |
| Storybook             |                |                   |
| MSW                   |                |                   |
| Framer Motion         |                |                   |

 </br>

<details  open>
<summary> <h3>1.1 주요 스택 사용 이유</h3></summary>

#### **Next.js (Page Router)**

- 서버에서 미리 가져올 데이터가 많지 않아 **App Router의 서버 컴포넌트 활용 이점이 크지 않다**고 판단하였습니다.
- Page Router는 `use client` 선언이 필요 없어서 **클라이언트 컴포넌트 관리가 더 직관적**이라고 생각하여 채택하였습니다.
- 여전히 많은 현업 프로젝트에서 Page Router를 사용하고 있으며, 앞으로도 활용될 가능성이 높아 적용하였습니다.

#### **TanStack Query**

- **한 화면에서 동일한 데이터를 여러 곳에서 사용해야 하는 경우**가 많아, 데이터가 CRUD 작업에 따라 변경될 때, **관련된 모든 UI에서 즉시 동기화가 필요**하였습니다.
- TanStack Query를 활용하면 **자동 캐싱, 동기화, 낙관적 업데이트**를 통해 효율적인 상태 관리가 가능하여 채택하였습니다.

#### **Tailwind CSS (v4)**

- `tailwind.config.ts` 없이 단일 파일에서 모든 설정을 한눈에 관리하는 부분이 편리해 보여 채택하였습니다.
- 최신 버전이라 호환성 이슈가 있을 것 같았지만, 특별한 문제 없이 정상적으로 동작하였습니다.

<br />

 <div align="right">
  
  [목차로 이동](#목차) 
  
  </div>

</details>

 </br>
 </br>

## 2. 설치 및 실행

```bash
npm install && npm run dev
pnpm install && pnpm run dev  // pnpm 전역 설치 필요
yarn install && yarn run dev  // yarn 전역 설치 필요
```

```bash
npm install --global pnpm  // pnpm 전역 설치 (필요 시)
npm install --global yarn  // yarn 전역 설치 (필요 시)
```

<br />

 <div align="right">
  
  [목차로 이동](#목차) 
  
  </div>

 </br>
 </br>

## 3. 팀원 구성

|                                                                                   **👑 이태혁**                                                                                    |                                                                                        **강은영**                                                                                         |                                                                                     **하다연**                                                                                      |                                                                                       **강동현**                                                                                       |
| :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: |
| [<img src="https://raw.githubusercontent.com/Quesddo/Client/4b53099c1fad9dd2d9928c8d0b96423b969dcc5b/thgee.png" width="48" height = "48" > <br/> @thgee](https://github.com/thgee) | [<img src="https://raw.githubusercontent.com/Quesddo/Client/4b53099c1fad9dd2d9928c8d0b96423b969dcc5b/eunung.png"  width="48" height = "48"> <br/> @euNung24](https://github.com/euNung24) | [<img src="https://raw.githubusercontent.com/Quesddo/Client/4b53099c1fad9dd2d9928c8d0b96423b969dcc5b/dy.png"  width="48" height = "48"> <br/> @hdayeon](https://github.com/hdayeon) | [<img src="https://raw.githubusercontent.com/Quesddo/Client/4b53099c1fad9dd2d9928c8d0b96423b969dcc5b/ralto.png"  width="48" height = "48"> <br/> @Ralto13](https://github.com/Ralto13) |

<br />

 <div align="right">
  
  [목차로 이동](#목차) 
  
  </div>

 </br>
 </br>

## 4. 협업 방식

<img height="16" width="16" src="https://cdn.simpleicons.org/jira" /> Jira: 새 기능 및 스프린트 단위 이슈관리  

<img height="16" width="16" src="https://cdn.simpleicons.org/github/000/fff" /> GitHub: 지라 티켓과 연동, 팀원 간 코드 리뷰, Github Flow 적용, 디스코드 webhooks</div>  

<img height="16" width="16"  src="https://cdn.simpleicons.org/notion/000/fff" /> Notion: 데일리스크럼, 팀 회의, 멘토링, 회고 기록  

<br />

 <div align="right">
  
  [목차로 이동](#목차) 
  
  </div>

 </br>
 </br>

## 5. 페이지별 기능

<detail  open>
<summary>
<h3>5.1 로그인 / 회원가입</h3>
</summary>

- 로그인: 이메일 형식 및 비밀번호 유효성 검사를 수행합니다.
- 회원가입: 이름 입력 여부, 이메일 형식 및 계정 유무 및 비밀번호 글자 수, 비밀번호 확인란에 대한 유효성 검사를 수행합니다.

  | 로그인                       |
  | ---------------------------- |
  | <img src="" width = "700" /> |

  <br />

 <div align="right">
  
  [목차로 이동](#목차) 
  
  </div>

</detail>

<br />

<detail  open>
<summary><h3>5.2 네비게이션 사이드바</h3></summary>

- 로그인한 계정 정보를 확인할 수 있고 로그아웃 버튼으로 유저 로그아웃할 수 있습니다.
- 로고나 대시보드 탭을 클릭하면 대시보드로 이동하며, 비로그인 상태에서는 로그인 페이지로 이동합니다.
- 새 할일 추가 버튼으로 (할일 추가 기능)이 제공됩니다.
- 새 목표 추가 버튼으로 목표를 추가하고 목표가 많아지면 무한스크롤로 목록이 제공됩니다.

| 네비게이션 사이드바          |
| ---------------------------- |
| <img src="" width = "700" /> |

</detail>

<br />

<detail  open>
<summary><h3>5.3 대시보드</h3></summary>

- 최근 등록한 할 일: 가장 최근에 생성한 할 일이 나오고 (각 할 일에 대한 기능)이 제공됩니다. 모두보기 버튼 클릭으로 모든 할 일 목록으로 이동합니다.
- 내 진행 상황: 전체 완료된 할 일과 미완료 할 일의 비율이 퍼센트로 조회됩니다.
- 목표 별 할 일: 각 목표 아래에 속한 할 일들을 확인할 수 있으며 Progress bar로 각 할 일들의 진행 상황을 알려줍니다. 각 목표에 대한 할 일 추가 기능이 제공되며 목표 4개가 넘어가면 무한스크롤로 목록이 제공됩니다.

| 대시보드                     |
| ---------------------------- |
| <img src="" width = "700" /> |

<br />

 <div align="right">
  
  [목차로 이동](#목차) 
  
  </div>

</detail>

<br />

<detail  open>
<summary><h3>5.4 모든 할 일 목록</h3></summary>

- 모든 할 일 목록을 조회하고 생성할 수 있으며 할 일에 등록된 목표가 있으면 함께 보입니다.
- 할 일 추가 기능: 제목을 필수로 써야하고 파일과 링크를 첨부할 수 있으며 목표를 선택할수도 안할수도 있습니다.
- 해야 할 일(To Do)/완료된 일(Done) 필터링이 가능하며 40개가 넘어가면 무한스크롤로 목록이 제공됩니다.
- 각 할 일에 대한 기능: 수정, 삭제 그리고 완료 여부를 체크할 수 있으며 노트를 생성하고 등록된 노트도 조회할 수 있습니다.

| 모든 할 일 목록 페이지       |
| ---------------------------- |
| <img src="" width = "700" /> |

<br />

 <div align="right">
  
  [목차로 이동](#목차) 
  
  </div>

</detail>

<br />

<detail  open>
<summary><h3>5.5 목표 상세</h3></summary>

- 특정 목표의 상세 정보를 조회할 수 있고 목표를 삭제하거나 이름을 변경할 수 있습니다.
- Progress bar로 목표에 속한 할 일들의 진행 상황을 알려줍니다.
- 노트 모아보기 클릭 시, 목표에 속한 할 일들에 대한 노트를 모아보는 페이지로 이동합니다.
- 목표에 대한 할 일 추가 기능이 제공되며 각 할 일(Todo, Done)은 20개를 넘으면 무한 스크롤로 목록이 제공됩니다.

| 목표 별 할일 노트 모아보기   |
| ---------------------------- |
| <img src="" width = "700" /> |

<br />

 <div align="right">
  
  [목차로 이동](#목차) 
  
  </div>

</detail>

<br />

<detail  open>
<summary><h3>5.6 노트 모아보기</h3></summary>

- 목표에 속한 할 일들에 대한 모든 노트 목록을 조회할 수 있으며 작성된 노트의 제목, 노트에 해당하는 할일 제목을 볼 수 있습니다.
- 각 노트를 수정, 삭제할 수 있고 노트 클릭 시 노트 상세가 사이드 보기로 열립니다.

| 목표 별 할일 노트 모아보기   |
| ---------------------------- |
| <img src="" width = "700" /> |

<br />

 <div align="right">
  
  [목차로 이동](#목차) 
  
  </div>

</detail>

<br />

<detail  open>
<summary><h3>5.7 노트 작성</h3></summary>

- 링크를 첨부할 수 있는 에디터를 제공합니다.
- 임시 저장 버튼을 클릭하거나, 5분에 한 번 자동 저장되는 기능을 통해 임시 저장합니다.
- 노트 작성/수정 중 페이지 이동 시 작성 중단 안내 모달을 제공합니다.
- 첨부된 링크 클릭 시 PC 버전 기준 왼쪽에는 노트에 첨부된 링크 콘텐츠 임베드가, 오른쪽에는 에디터가 배치됩니다.

| 할 일 별 노트 작성 페이지    |
| ---------------------------- |
| <img src="" width = "700" /> |

</detail>

<br />

<detail  open>
<summary><h3>5.8 노트 상세</h3></summary>

- 노트의 목표 및 할일 제목, 노트 제목, 노트 마지막 저장일, 상세 내용을 볼 수 있습니다.
- 첨부된 링크 클릭 시 PC 버전 기준 왼쪽에는 노트에 첨부된 링크 콘텐츠 임베드가, 오른쪽에는 에디터가 배치됩니다.

| 할일에 대한 노트 상세 조회 페이지 |
| --------------------------------- |
| <img src="" width = "700" />      |

</detail>

<br />

 <div align="right">
  
  [목차로 이동](#목차) 
  
  </div>

<br />
<br />

## 6. 주요 도전 과제

<details open>
<summary> <h3>6.1. 브랜치전략</h3></summary>

본 프로젝트는 **GitHub Flow**를 기반으로 하지만, 초기 개발 단계에서 **코드 충돌을 최소화하고 독립적인 개발 환경을 유지하기 위해** `develop` 브랜치를 추가해 운영했습니다.

<img src="https://github.com/user-attachments/assets/19e89815-394a-4d19-93f6-0834c5041014" width="400px"/>

#### MVP 이전

- **`main`**: 공통된 로직만 포함하며, 안정적인 배포 버전을 유지합니다.
- **`feature`**: `main`에서 생성하여 개별 개발을 진행한 후 `develop`에 병합됩니다.
- **`develop`**: 기능 개발이 병렬로 진행될 때 충돌을 방지하고, 통합된 테스트 환경을 제공하기 위해 사용되었습니다.

#### MVP 이후: GitHub Flow 전환

MVP 이후에는 유지보수 위주의 작업이 많아지면서, **빠른 개발과 배포를 위해 `develop` 브랜치를 제거**하고 **GitHub Flow** 방식으로 전환했습니다.

- `main`에서 feature 브랜치를 생성해 **짧은 생명주기**로 개발하고, 검토 후 바로 `main`에 병합하는 방식입니다.
- 이를 통해 **불필요한 중간 브랜치를 줄이고, 개발 속도를 높이며, 보다 유연한 협업**이 가능해졌습니다.

<br />

 <div align="right">
  
  [목차로 이동](#목차) 
  
  </div>

</details>

<br />

<details  open>
<summary> <h3>6.2. 디자인패턴</h3></summary>

다양한 컴포넌트를 효율적으로 관리하기 위해 **아토믹 디자인 패턴**을 채택했습니다.
아토믹 디자인 패턴은 가장 작은 단위인 `atoms` 부터 기능이나 역할이 추가됨에 따라 `molecules`, `organisms`, `templates`, `pages`로 구성합니다.

#### 아토믹 디자인 패턴을 적용한 폴더 구조

- 공통 컴포넌트는 기능과 역할에 따라 atoms, molecules, organisms로 분류합니다.
- 각 페이지에서만 필요한 컴포넌트는 각 도메인에 따라 views(templates 기능) 하위에 분류합니다.
- 최종 결과물은 page router를 적용함에 따라 pages 하위에 위치합니다.

#### 아토믹 디자인 패턴을 도입하면서 겪은 어려움과 해결방법

- 공통 컴포넌트 분류하는 것에 어려움이 있었습니다. 어떤 기준으로 atoms, molecules, organisms를 분류할 것인지 모호했기 때문입니다.
- 가장 작은 단위를 목표로 하다보니 UI의 기능만 하는 것을 atoms로 분류했습니다.
- 기능이 많거나 중요한 역할을 하는 컴포넌트를 organisms로 분류했습니다.
- 이후 필요에 따라 팀원들과 논의하면서 UI의 기능만을 하진 않지만 기능이 많지는 않은 컴포넌트를 molecules로 분류했습니다.

<br/>

  <div align="right">
   
   [목차로 이동](#목차) 
   
   </div>

</details>

<br />

<details  open>
<summary> <h3>6.3. Open API Generator</h3></summary>
 
이번 프로젝트를 수행하면서 `Open API Generator`를 알게 되었습니다. 서버 요청에 필요한 type을 일일이 작성하지 않아도 된다는 장점이 있어 도입하게 되었습니다.
 
 #### Open API Generator를 도입기 
 - 백엔드에서 API 파싱에 필요한 OAS 파일을 공개적으로 제공하지 않아, Swagger의 네트워크 탭에서 직접 추출하여 활용하였습니다. 
 - 백엔드에서 Schema로 지정하지 않은 type은 Open API Generator가 지정한 타입을 가지고 있는데, 해당 타입명이 난해한 부분이 있었습니다. 실제로 백엔드와 협력한다면, 이런 부분은 논의를 통해 해결할 수 있을 것이라 생각됩니다.
 - API 요청 함수까지 작성된 결과가 나왔지만, 기존에 custom한 axios instance와 tanstack-query를 사용하면서 타입만 가져오게 되었습니다.

 <br/>

 <div align="right">
   
   [목차로 이동](#목차) 
   
   </div>

</details>

<br />

<details  open>
<summary> <h3>6.4. 스토리북 & MSW</h3></summary>

#### **Storybook**

- **아토믹 디자인 패턴**을 적용하면서 개별 컴포넌트의 수가 많아졌고, 컴포넌트명만으로 식별하기 어려워져 **한눈에 파악할 수 있는 환경이 필요**했습니다.

  <**Atoms 폴더** 내 컴포넌트가 많아지면서 관리가 어려워짐>  
  <img src="https://github.com/user-attachments/assets/48fc65ab-9152-4782-8b2b-1ae0dc3469dd"/>

- Storybook을 활용하면 **컴포넌트를 시각적으로 관리하면서, UI 조립 전에 디자인과 기능을 미리 확인**할 수 있어 개발 생산성이 크게 향상될 것으로 판단하여 사용하였습니다.
- Storybook 내에서 **API 통신이 필요한 경우가 있어 MSW를 함께 도입**하여 데이터 요청을 mocking 하였습니다.
- **Chromatic을 활용해 Storybook을 배포**하고, PR마다 UI 변경 사항을 시각적으로 확인할 수 있도록 설정하였습니다.

   <img src="https://github.com/user-attachments/assets/7b4eae14-b80e-4d45-94c0-22d780e93385" width="700px"/>

<br/>

<div align="right">
   
   [목차로 이동](#목차) 
   
   </div>

</details>

<br />

<details  open>
<summary> <h3>6.5. 쿼리키 구조화</h3></summary>

TanStack Query의 쿼리 키를 효율적으로 관리하기 위해 쿼리 키 팩토리 패턴을 적용하였습니다.

<br />

#### 기존 문제점

쿼리 키를 개별적으로 관리하면서 다음과 같은 문제가 발생했습니다.

- 여러 곳에서 동일한 데이터를 가져올 때, 쿼리 키가 중복되어 관리 부담이 증가함.
- 같은 엔티티를 나타내는 키라도 각 개발자가 다르게 정의하여 유지보수가 어려워짐.
- 문자열 기반 키는 IDE의 자동 완성 기능을 활용할 수 없어 오타 발생 가능성 증가.

이러한 문제를 해결하기 위해 **쿼리 키를 하나의 중앙 팩토리에서 생성**하도록 변경했습니다.  
이를 통해 **재사용성을 높이고, 일관성을 유지하며, IDE 자동 완성을 활용할 수 있습니다.**

<br />

#### 쿼리키 구조

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

 <div align="right">
  
  [목차로 이동](#목차) 
  
  </div>

</details>

<br />

<details  open>
  <summary> <h3>6.6 워크플로우 자동화</h3></summary>

GitHub Actions를 활용하여 개발 프로세스를 자동화하고, 코드 품질과 배포 효율성을 향상시키는 워크플로우를 구축하였습니다.

```bash
workflows/
├── merge-main-to-dev.yml   # main → develop 자동 병합
├── ci.yml                  # CI/CD 파이프라인
├── random-reviewer.yml     # 랜덤 리뷰어 지정
├── storybook.yml           # 스토리북 미리보기 자동화
├── vercel-deploy.yml       # Vercel 배포 자동화
```

- **main → develop 자동 병합**

  - `main` 브랜치에 머지된 커밋을 `develop` 브랜치에 자동으로 병합합니다.
  - 이를 통해 `develop` 브랜치에 PR을 올릴 때 `main`에서 반영된 변경 사항을 중복 검토하는 상황을 방지할 수 있습니다.

  <br />

- **랜덤 리뷰어 지정**

  - 코드 리뷰를 필수적으로 진행하기 위해 두 명의 리뷰어를 랜덤으로 지정합니다.
  - 지정된 리뷰어의 승인이 없으면 병합할 수 없도록 브랜치 보호 규칙을 설정하였습니다.

  <br />

- **스토리북 미리보기**

  - PR이 생성될 때마다 개발된 UI 컴포넌트를 쉽게 확인할 수 있도록 스토리북 미리보기 기능을 도입하였습니다.

  <img src="https://github.com/user-attachments/assets/22728c91-323d-4c45-bee3-601482d8c561" />

  <br />

- **Husky 활용**

  - PR 병합 전 커밋 단계에서 컨벤션 및 타입 오류를 검사하여 GitHub Actions 실행 비용을 절감합니다.

  <br />

 <div align="right">
  
  [목차로 이동](#목차) 
  
  </div>

</details>

<br />

<details  open>
<summary> <h3>6.7. 테스트</h3></summary>

</details>

<br />

 <div align="right">
  
  [목차로 이동](#목차) 
  
  </div>

<br/>
<br/>

## 7. 문서

- [회의록](https://instinctive-linseed-8cb.notion.site/1848a37bf8a281cf87cfce3a301292d2?pvs=4)
- [트러블슈팅](https://instinctive-linseed-8cb.notion.site/1948a37bf8a28078b5b9e00947687c6f?pvs=4)

<br/>

  <div align="right">
   
   [목차로 이동](#목차) 
   
   </div>
