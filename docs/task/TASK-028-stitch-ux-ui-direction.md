# TASK-028-stitch-ux-ui-direction

## Goal

Google Stitch를 사용해 RouteLog MVP의 핵심 UX/UI 방향을 정의하고, 실제 frontend에 반영 가능한 화면 기준을 만든다.

## Timing

```text
TASK-026 frontend-backend integration 완료 후 진행한다.
TASK-027 Android manual QA regression 완료 또는 주요 blocker 기록 후 진행한다.
```

## UX Principle

```text
1. RouteLog는 GPS 기반 운동 기록 및 공유 플랫폼이다.
2. MVP의 주 활동은 RUN이다.
3. 첫 화면은 마케팅 페이지가 아니라 실제 앱 사용 흐름이어야 한다.
4. 운동 기록 중인 화면은 정보가 즉시 읽히고 조작이 적어야 한다.
5. Feed와 Profile은 반복적으로 확인하는 operational screen으로 설계한다.
6. 과한 장식보다 경로, 기록, 상태, 액션의 명확성을 우선한다.
```

## Scope

Stitch에서 우선 생성할 화면:

```text
1. Login
2. RouteFeed
3. RouteDetail
4. Record
5. Profile
6. My Routes
7. Bookmarks
```

각 화면에 포함할 상태:

```text
1. loading
2. empty
3. error
4. logged-out
5. permission denied
6. normal
```

## Out of Scope

```text
Router 구조 변경
상태관리 라이브러리 변경
API 응답 구조 변경
DB 스키마 변경
신규 기능 추가
건강 지표 구현
RIDE/HIKE 구현
전체 프로젝트 구조 변경
```

## Stitch Input Context

Stitch 작업 시 반드시 포함할 제품 설명:

```text
RouteLog is a GPS-based running route recording and sharing app.
The MVP supports RUN only.
Users can sign in with Google, view public running routes, open route details,
record a run with GPS, see live distance/duration/pace, finish the run,
and manage profile routes and bookmarks.
```

화면 흐름:

```text
Login
-> RouteFeed
-> RouteDetail
-> Record
-> Profile
-> My Routes / Bookmarks
-> RouteDetail
```

Record 핵심 지표:

```text
Distance
Duration
Pace
GPS permission
Current location
Start
Finish
Map fallback
```

## Screen Requirements

### Login

```text
1. Google Login button is the primary action.
2. Naver and local signup can be visually deferred.
3. Environment or provider failure must have a clear error state.
4. Login screen must not imply health metrics are already available.
```

### RouteFeed

```text
1. Route cards must show route title, activity type, distance, duration, and basic engagement.
2. Empty feed must be useful without marketing copy.
3. Loading state must preserve layout stability.
4. RouteCard tap target must be clear.
```

### RouteDetail

```text
1. Map or route preview is the primary visual.
2. Similar Routes and Route History should be discoverable.
3. Comments, Like, and Bookmark actions should be accessible but not dominate.
4. API failure must not hide navigation recovery.
```

### Record

```text
1. Distance, Duration, and Pace must be highly readable.
2. Start, Finish, and Find Current Location actions must be reachable during movement.
3. Permission denied state must explain the required action concisely.
4. Google Maps key missing fallback must look intentional, not broken.
5. Record UI must not promise heart rate, cadence, calories, or elevation gain yet.
```

### Profile / My Routes / Bookmarks

```text
1. Profile must show user identity from /users/me.
2. My Routes and Bookmarks must be scannable lists.
3. Empty states must support returning to Feed or Record.
4. RouteDetail navigation must stay consistent with Feed.
```

## Design Constraints

```text
1. Do not create a marketing landing page.
2. Do not introduce new app navigation.
3. Do not design features outside the current backend contract.
4. Do not add visible copy describing keyboard shortcuts or implementation details.
5. Do not rely on health metrics before a separate health platform task is completed.
6. Avoid decorative layouts that reduce map, route, and metric readability.
```

## Handoff To Frontend

Stitch output must be converted into implementation notes before coding:

```text
1. Screen name
2. Target file
3. Component changes
4. State changes
5. API dependency
6. Assets required
7. Items intentionally deferred
```

## Completion Criteria

```text
1. Stitch output covers the seven MVP screens.
2. Each screen includes normal, loading, empty, and error direction where relevant.
3. Record screen includes permission denied and map fallback direction.
4. No out-of-scope feature is introduced.
5. A frontend implementation task can be created from the Stitch output.
```
