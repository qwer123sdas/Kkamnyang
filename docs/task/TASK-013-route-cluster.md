# TASK-013-route-cluster

## 2026-06-08 QA Path Update

### Completed

```text
1. RouteCard에 Open Detail 버튼 추가
2. Feed QA의 Open Route Detail / Comments 버튼을 RouteDetail 이동으로 복구
3. Route Detail에서 View Similar Routes 버튼으로 RouteClusterScreen 진입 유지
```

### QA Flow

```text
1. Login
2. Route Feed
3. Feed QA Refresh
4. Open Route Detail / Comments
5. Route Detail
6. View Similar Routes
7. RouteClusterScreen
8. Similar Route 목록 렌더링 확인
```

### Commands

```powershell
npx.cmd tsc --noEmit
rg -n "Open Route Detail / Comments|Open Detail|RouteDetail" kkamyang-app\src\screens kkamyang-app\src\components
```

## 2026-06-08 Route Detail Access Fix

```text
1. useRouteDetail에서 useAuth 구독 제거
2. Route Detail 조회 시 authService.getSession()을 1회 호출해 token 전달
3. Like/Bookmark 액션 시점에만 authService.getSession() 호출
4. Route Detail 화면에서 route 정보와 View Similar Routes를 댓글 영역보다 먼저 표시
5. TASK-013 QA 경로는 Feed -> RouteDetail -> View Similar Routes -> RouteClusterScreen
```

## Goal

Route 상세 화면에서 유사한 러닝 루트 목록을 조회하고 표시한다.

이번 단계에서는 서버에서 계산된 유사 루트 결과를 조회해서 보여주는 것만 구현한다.

---

# Scope

```text
1. GET /api/v1/routes/{route_id}/similar 연결
2. routeClusterService 생성
3. useRouteCluster Hook 생성
4. RouteClusterScreen 구현
5. 유사 Route 목록 표시
6. RouteDetailScreen에서 유사 루트 보기 진입 연결
```

---

# Excluded

```text
유사도 계산 로직
PostGIS 직접 계산
Route Cluster 생성 로직
Nearby Route
Route History
Like
Bookmark
Comment
Route 수정/삭제
```

---

# Deliverables

```text
src/services/routeClusterService.ts
src/hooks/useRouteCluster.ts
src/screens/route/RouteClusterScreen.tsx
src/components/route/RouteClusterList.tsx
src/types/route.ts
src/navigation/MainNavigator.tsx

src/screens/route/RouteDetailScreen.tsx
```

---

# Constraints

```text
1. API 호출은 routeClusterService에서만 수행
2. Screen 직접 fetch 금지
3. 유사도 계산은 프론트에서 하지 않음
4. 서버 응답을 그대로 표시
5. Route History 구현 금지
6. Nearby Route 구현 금지
```

---

# Verification

```text
1. TypeScript 오류 없음
2. /routes/{route_id}/similar 호출은 routeClusterService에만 존재
3. RouteClusterScreen 표시
4. 유사 Route 목록 렌더링
5. 유사도 계산 로직 없음
6. Route History 구현 없음
7. Nearby Route 구현 없음
```

---

# Next Task

```text
TASK-014-route-history
```

---

# 2026-06-08 Progress

## Completed

```text
1. RouteDetailScreen에서 RouteCluster 화면 진입 연결
2. RouteDetailInfo에 View Similar Routes 버튼 추가
3. 기존 routeClusterService -> useRouteCluster -> RouteClusterScreen 흐름 유지
4. /routes/{route_id}/similar API 호출 위치를 routeClusterService로 제한
```

## Changed Files

```text
kkamyang-app/src/components/route/RouteDetailInfo.tsx
kkamyang-app/src/screens/route/RouteDetailScreen.tsx
```

## Commands

```powershell
npx.cmd tsc --noEmit
rg -n "/routes/\$\{routeId\}/similar|similar" kkamyang-app\src
rg -n "nearby|history|RouteHistory|distance_from_user|chart" kkamyang-app\src\services kkamyang-app\src\hooks kkamyang-app\src\screens\route kkamyang-app\src\components\route
```

## QA Result

```text
1. TypeScript 검사 통과
2. /routes/{route_id}/similar 호출은 routeClusterService에만 존재
3. Screen 직접 fetch 없음
4. Similar route 계산 로직 추가 없음
5. Nearby Route 구현 추가 없음
6. TASK-013 범위 밖 기존 RouteHistory 파일은 수정하지 않음
```

## Remaining

```text
1. Android 실기기에서 Route Detail -> View Similar Routes -> RouteClusterScreen 진입 확인
2. 서버 응답이 준비된 상태에서 유사 Route 목록 렌더링 확인
3. 이후 TASK-014-route-history 진행
```
