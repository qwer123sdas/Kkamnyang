# TASK-016-my-routes

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

Response는 docs/api-spec.md를 따른다.

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