# TASK-017-bookmarks

## Goal

내가 북마크한 러닝 Route 목록 화면을 구현한다.

---

# Scope

```text
1. GET /api/v1/bookmarks/me 연결
2. BookmarkScreen 구현
3. useBookmarks Hook 생성
4. 북마크 Route 목록 표시
5. pagination 상태 준비
6. Route 상세 화면 진입 연결
```

---

# Excluded

```text
북마크 취소
Route 수정
Route 삭제
Route Cluster
Route History
Nearby Route
Route 검색
Like
Comment
```

---

# Deliverables

```text
src/screens/bookmark/BookmarkScreen.tsx
src/hooks/useBookmarks.ts
src/services/bookmarkService.ts
src/components/route/RouteCard.tsx
src/types/route.ts
```

---

# Constraints

```text
1. API 호출은 bookmarkService에서만 수행
2. Screen 직접 fetch 금지
3. 북마크 목록 조회만 구현
4. 북마크 취소 구현 금지
5. Route 상세 진입만 허용
6. RouteCard 재사용
```

---

# API

```http
GET /api/v1/bookmarks/me?page=1&size=20
```

Response는 docs/api-spec.md를 따른다.

---

# Verification

```text
1. TypeScript 오류 없음
2. BookmarkScreen 표시
3. /bookmarks/me 호출은 bookmarkService에만 존재
4. Screen 직접 fetch 없음
5. RouteCard 재사용
6. Route 상세 진입 가능
7. 북마크 취소 구현 없음
```

---

# Next Task

```text
TASK-018-mvp-stabilization
```