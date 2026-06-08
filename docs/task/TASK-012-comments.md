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

---

# 2026-06-08 Update

## Completed

```text
1. Feed QA inline comment editor 제거
2. Route Detail 화면에서 comment list/create/update/delete 처리
3. CommentInput을 Save/Clear/Delete 지원 editor로 변경
4. CommentList에서 댓글 선택 및 선택 상태 표시
5. useRouteComments에서 selected comment, draft, save, delete 상태 관리
```

## Changed Files

```text
kkamyang-app/src/components/route/CommentInput.tsx
kkamyang-app/src/components/route/CommentList.tsx
kkamyang-app/src/hooks/useRouteComments.ts
kkamyang-app/src/screens/route/RouteDetailScreen.tsx
kkamyang-app/src/screens/route/RouteFeedScreen.tsx
kkamyang-app/src/hooks/useFeedQaComments.ts
```

## Commands

```powershell
npx.cmd tsc --noEmit
rg -n "useFeedQaComments|FeedQaCommentEditor" kkamyang-app\src
rg -n "updateComment|deleteComment|createComment|getComments" kkamyang-app\src\hooks kkamyang-app\src\services kkamyang-app\src\components kkamyang-app\src\screens
```

## QA Flow

```text
1. Login
2. Route Feed
3. Feed QA Refresh
4. Open Route Detail / Comments
5. Route Detail 화면 진입 확인
6. Route Comments 영역에서 새 댓글 Save
7. 댓글 선택 후 내용 수정 Save
8. 댓글 선택 후 Delete
9. 목록 refresh 반영 확인
```

## 2026-06-08 Route Detail Access Fix

```text
1. useRouteComments에서 useAuth 구독 제거
2. Comment Save/Delete 액션 시점에만 authService.getSession() 호출
3. RouteDetail 진입 시 auth loading으로 MainNavigator가 재생성되는 문제 방지
4. 댓글 QA는 Feed inline editor가 아니라 RouteDetail의 Route Comments 영역에서 수행
```

## Additional Commands

```powershell
npx.cmd tsc --noEmit
rg -n "useAuth\(|authService\.getSession|navigation\.navigate" kkamyang-app\src\hooks kkamyang-app\src\screens kkamyang-app\src\components
```
