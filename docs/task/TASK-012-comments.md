# TASK-012-comments

## Goal

Route 상세 화면에서 댓글 목록 조회와 댓글 작성 기능을 구현한다.

---

# Scope

```text
1. GET /api/v1/routes/{route_id}/comments 연결
2. POST /api/v1/routes/{route_id}/comments 연결
3. Comment 목록 표시
4. Comment 입력창 표시
5. Comment 작성 후 목록 갱신
```

---

# Excluded

```text
댓글 삭제
Route Cluster
Route History
Nearby Route
Route 수정
Route 삭제
신고/차단
대댓글
```

---

# Deliverables

```text
src/services/commentService.ts
src/hooks/useRouteComments.ts
src/components/route/CommentList.tsx
src/components/route/CommentInput.tsx
src/screens/route/RouteDetailScreen.tsx
src/types/route.ts
```

---

# Constraints

```text
1. API 호출은 commentService에서만 수행
2. Screen 직접 fetch 금지
3. 댓글 삭제 구현 금지
4. 대댓글 구현 금지
5. Route Cluster 구현 금지
6. Route History 구현 금지
```

---

# Verification

```text
1. TypeScript 오류 없음
2. 댓글 목록 조회 가능
3. 댓글 작성 가능
4. 작성 후 목록 갱신
5. 댓글 삭제 구현 없음
6. Cluster/History 구현 없음
```

---

# Next Task

```text
TASK-013-route-cluster
```