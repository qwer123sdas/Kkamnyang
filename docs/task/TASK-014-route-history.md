# TASK-014-route-history

## 2026-06-08 Progress

### Completed

```text
1. Feed QA Refresh 버튼 제거
2. Feed QA Actions 패널 및 임시 Like/Bookmark 토글 제거
3. RouteDetail에서 View History 버튼 추가
4. View History 버튼으로 RouteHistoryScreen 진입 연결
5. 기존 routeHistoryService -> useRouteHistory -> RouteHistoryScreen -> RouteHistoryList 흐름 유지
```

### Changed Files

```text
kkamyang-app/src/screens/route/RouteFeedScreen.tsx
kkamyang-app/src/components/route/RouteDetailInfo.tsx
kkamyang-app/src/screens/route/RouteDetailScreen.tsx
docs/archive-or-legacy/HANDOFF-history.md
docs/task/TASK-014-route-history.md
```

### Commands

```powershell
npx.cmd tsc --noEmit
rg -n "Feed QA|FeedQa|QA Refresh|Open Route Detail / Comments|isFeedQa|useFeedQa" kkamyang-app\src docs\HANDOFF.md docs\task
rg -n "RouteHistory|View History|/routes/\$\{routeId\}/history|routeHistoryService" kkamyang-app\src
```

### QA Flow

```text
1. Login
2. Route Feed
3. RouteCard / Open Detail
4. Route Detail
5. View History
6. RouteHistoryScreen
7. Activity history 목록 렌더링 확인
```

## Goal

Route 상세 화면에서 동일 Route의 과거 러닝 기록을 조회하고 표시한다.

이번 단계에서는 특정 route_id에 연결된 Activity 기록 목록을 조회해서 보여주는 것만 구현한다.

---

# Scope

```text
1. GET /api/v1/routes/{route_id}/history 연결
2. routeHistoryService 생성
3. useRouteHistory Hook 생성
4. RouteHistoryScreen 구현
5. RouteHistoryList 컴포넌트 생성
6. RouteDetailScreen에서 기록 보기 진입 연결
7. Activity 기록 목록 표시
```

---

# Excluded

```text
Route Cluster
Nearby Route
유사도 계산
Activity 수정
Activity 삭제
통계 차트
월별/주별 집계
러닝 기록 비교 분석
Like
Bookmark
Comment
```

---

# Deliverables

```text
src/services/routeHistoryService.ts
src/hooks/useRouteHistory.ts
src/screens/route/RouteHistoryScreen.tsx
src/components/route/RouteHistoryList.tsx
src/screens/route/RouteDetailScreen.tsx
src/navigation/MainNavigator.tsx
src/types/activity.ts
src/types/route.ts
```

---

# Constraints

```text
1. API 호출은 routeHistoryService에서만 수행
2. Screen 직접 fetch 금지
3. 동일 route_id 기준 Activity 목록만 표시
4. 통계 계산 고도화 금지
5. Chart 라이브러리 추가 금지
6. Route Cluster 기능 수정 금지
7. GPS 로직 수정 금지
8. Record 기능 수정 금지
```

---

# API

```http
GET /api/v1/routes/{route_id}/history?page=1&size=20
```

Response:

```json
{
  "success": true,
  "data": {
    "items": [
      {
        "activity_id": 1,
        "route_id": 10,
        "distance_km": 5.1,
        "duration_sec": 1800,
        "started_at": "2026-05-19T10:00:00Z",
        "ended_at": "2026-05-19T10:30:00Z"
      }
    ],
    "page": 1,
    "size": 20,
    "has_next": false
  },
  "message": null
}
```

---

# Display Rules

목록에 표시할 값:

```text
started_at
distance_km
duration_sec
```

선택 표시:

```text
pace
```

pace 계산은 프론트에서 단순 표시용으로만 허용한다.

```text
pace = duration_sec / distance_km
```

단, 서버 저장값 변경 금지.

---

# Verification

```text
1. TypeScript 오류 없음
2. /routes/{route_id}/history 호출은 routeHistoryService에만 존재
3. RouteHistoryScreen 표시
4. RouteHistoryList 렌더링
5. RouteDetailScreen에서 기록 보기 이동 가능
6. Route Cluster 수정 없음
7. Nearby Route 구현 없음
8. Chart 라이브러리 추가 없음
9. GPS/Record 로직 수정 없음
```

---

# Next Task

```text
TASK-015-profile
```
