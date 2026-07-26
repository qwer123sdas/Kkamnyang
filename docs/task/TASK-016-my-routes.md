# TASK-016-my-routes

## 2026-06-08 Progress

### Completed

```text
1. Backend GET /api/v1/routes/me endpoint 추가
2. RouteService.get_my_routes 추가
3. RouteRepository.list_my_routes 추가
4. /routes/me가 /routes/{route_id}보다 먼저 매칭되도록 route_api 순서 조정
5. useMyRoutes에서 useAuth 구독 제거
6. My Routes 조회 시 authService.getSession()을 1회 호출해 access token 전달
7. MyRoutesScreen의 RouteCard -> RouteDetail 진입 흐름 유지
```

### Changed Files

```text
backend/api/route_api.py
backend/services/route_service.py
backend/repositories/route_repository.py
backend/tests/test_route_feed.py
backend/tests/test_route_repository.py
kkamyang-app/src/hooks/useMyRoutes.ts
docs/task/TASK-016-my-routes.md
```

### Commands

```powershell
python -m pytest backend\tests\test_route_feed.py::test_my_routes_requires_authentication_and_returns_paginated_routes backend\tests\test_route_repository.py::test_route_repository_queries_my_routes_by_owner -q
python -m pytest backend\tests -q
npx.cmd tsc --noEmit
rg -n "/routes/me|routes/me|useAuth\(|authService\.getSession|fetch\(" backend kkamyang-app\src\hooks\useMyRoutes.ts kkamyang-app\src\screens\route\MyRoutesScreen.tsx kkamyang-app\src\services\routeService.ts
```

### QA Flow

```text
1. Login
2. Route Feed
3. Profile
4. My Routes
5. My Routes Screen 표시 확인
6. 내 route 목록 표시 확인
7. RouteCard / Open Detail
8. RouteDetail 진입 확인
9. Pull to refresh / pagination 동작 확인
```

## Goal

내가 생성한 러닝 Route 목록 화면을 구현한다.

---

# Scope

```text
1. GET /api/v1/routes/me 연결
2. MyRoutesScreen 구현
3. useMyRoutes Hook 생성
4. 내 Route 목록 표시
5. pagination 상태 준비
6. Route 상세 화면 진입 연결
```

---

# Excluded

```text
Route 수정
Route 삭제
Route Cluster
Route History
Nearby Route
Like
Comment
Bookmark
Route 검색
```

---

# Deliverables

```text
src/screens/route/MyRoutesScreen.tsx
src/hooks/useMyRoutes.ts
src/services/routeService.ts
src/components/route/RouteCard.tsx
src/types/route.ts
src/navigation/MainNavigator.tsx
```

---

# Constraints

```text
1. API 호출은 routeService에서만 수행
2. Screen 직접 fetch 금지
3. 내 Route 목록만 조회
4. Route 수정/삭제 구현 금지
5. Route 검색 구현 금지
6. Route Cluster/History 수정 금지
```

---

# API

```http
GET /api/v1/routes/me?page=1&size=20
```

Response는 docs/source/api-spec.md를 따른다.

---

# Verification

```text
1. TypeScript 오류 없음
2. MyRoutesScreen 표시
3. /routes/me 호출은 routeService에만 존재
4. Screen 직접 fetch 없음
5. RouteCard 재사용
6. Route 상세 진입 가능
7. 수정/삭제 구현 없음
8. Cluster/History 수정 없음
```

---

# Next Task

```text
TASK-017-bookmarks
```
