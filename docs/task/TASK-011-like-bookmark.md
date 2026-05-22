# TASK-011-like-bookmark

## Goal

Route 상세 화면에서 좋아요와 북마크 실행 기능을 구현한다.

---

# Scope

```text
1. POST /api/v1/routes/{route_id}/like 연결
2. DELETE /api/v1/routes/{route_id}/like 연결
3. POST /api/v1/routes/{route_id}/bookmark 연결
4. DELETE /api/v1/routes/{route_id}/bookmark 연결
5. RouteDetailScreen에서 좋아요/북마크 토글 처리
6. like_count, bookmark_count 화면 상태 반영
```

---

# Excluded

```text
Comment
Route Cluster
Route History
Nearby Route
Route 수정
Route 삭제
Feed 자동 갱신
```

---

# Deliverables

```text
src/services/likeService.ts
src/services/bookmarkService.ts
src/hooks/useRouteDetail.ts
src/screens/route/RouteDetailScreen.tsx
src/components/route/RouteDetailInfo.tsx
src/types/route.ts
src/services/apiClient.ts
```

---

# Constraints

```text
1. API 호출은 services 계층에서만 수행
2. Screen 직접 fetch 금지
3. 좋아요/북마크 외 기능 구현 금지
4. Comment 구현 금지
5. Route Cluster 구현 금지
6. Route History 구현 금지
```

---

## Implementation Notes

DELETE API 호출을 위해 공통 apiClient에 delete 메서드를 추가할 수 있다.

단:
- 공통 요청 기능만 담당
- 비즈니스 로직 금지
- Like/Bookmark 로직 작성 금지

---

# Verification

```text
1. TypeScript 오류 없음
2. 좋아요 토글 가능
3. 북마크 토글 가능
4. like_count 상태 반영
5. bookmark_count 상태 반영
6. Comment/Cluster/History 구현 없음
```

---

# Next Task

```text
TASK-012-comments
```