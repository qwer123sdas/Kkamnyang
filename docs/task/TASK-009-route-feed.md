# TASK-009-route-feed

## Goal

공개 러닝 Route Feed 조회 화면을 구현한다.

---

# Scope

```text
1. GET /api/v1/routes/feed 호출
2. RouteFeedScreen 구현
3. RouteCard 컴포넌트 생성
4. useRouteFeed Hook 구현
5. 공개 Route 목록 표시
6. page/size 기반 pagination 상태 준비
```

---

# Excluded

```text
Route Detail
Route Cluster
Nearby Route
Like
Comment
Bookmark
Google Maps 상세 표시
GPS 로직
```

---

# Deliverables

```text
src/screens/route/RouteFeedScreen.tsx
src/components/route/RouteCard.tsx
src/hooks/useRouteFeed.ts
src/services/routeService.ts
src/types/route.ts
```

---

# Constraints

```text
1. API 호출은 services 계층에서만 수행
2. Screen에서 직접 fetch 금지
3. RUN only
4. PUBLIC route만 표시
5. UI 상세 고도화 금지
6. Route Detail navigation은 placeholder만 허용
```

---

# Verification

```text
1. TypeScript 오류 없음
2. RouteFeedScreen 표시
3. routes/feed API 호출은 routeService에서만 수행
4. RouteCard 목록 렌더링
5. Like/Comment/Bookmark 구현 없음
6. Route Detail 구현 없음
```

---

# Next Task

```text
TASK-010-route-detail
```