# TASK-010-route-detail

## Goal

Route 상세 조회 화면을 구현한다.

---

# Scope

```text
1. GET /api/v1/routes/{route_id} 호출
2. RouteDetailScreen 구현
3. Route 상세 정보 표시
4. encoded_polyline 기반 지도 표시 준비
5. is_liked, is_bookmarked 상태 표시만 구현
```

---

# Excluded

```text
Like 실행
Bookmark 실행
Comment 작성
Route Cluster
Route History
Route 수정
Route 삭제
Nearby Route
```

---

# Deliverables

```text
src/screens/route/RouteDetailScreen.tsx
src/services/routeService.ts
src/hooks/useRouteDetail.ts
src/components/route/RouteDetailInfo.tsx
src/types/route.ts
```

---

# Constraints

```text
1. API 호출은 routeService에서만 수행
2. Screen 직접 fetch 금지
3. Like/Bookmark 버튼은 표시만 가능
4. Comment 목록 구현 금지
5. Route Cluster 구현 금지
6. Route History 구현 금지
```

---

# Verification

```text
1. TypeScript 오류 없음
2. RouteDetailScreen 표시
3. routeService에서 상세 API 호출
4. 상세 데이터 표시
5. Like/Bookmark 실행 로직 없음
6. Comment/Cluster/History 구현 없음
```

---

# Next Task

```text
TASK-011-like-bookmark
```