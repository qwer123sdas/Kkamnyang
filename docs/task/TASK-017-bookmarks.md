# TASK-017-bookmarks

## 2026-06-09 Progress

### Completed

```text
1. Backend GET /api/v1/bookmarks/me endpoint 추가
2. RouteService.get_bookmarks 추가
3. RouteRepository.list_bookmarked_routes 추가
4. route_bookmarks 기준 내 활성 북마크만 조회
5. 삭제되지 않은 routes만 inner join으로 조회
6. useBookmarks에서 useAuth 구독 제거
7. Bookmarks 조회 시 authService.getSession() 1회 호출
8. BookmarkScreen -> RouteCard -> RouteDetail 진입 흐름 유지
9. Bookmark 취소 기능은 TASK-017 범위에 추가하지 않음
```

### Changed Files

```text
backend/api/route_api.py
backend/services/route_service.py
backend/repositories/route_repository.py
backend/tests/test_route_feed.py
backend/tests/test_route_repository.py
kkamyang-app/src/hooks/useBookmarks.ts
docs/task/TASK-017-bookmarks.md
```

### Commands

```powershell
python -m pytest backend\tests\test_route_feed.py -q -k bookmarks
python -m pytest backend\tests\test_route_repository.py -q -k bookmarked
python -m pytest backend\tests\test_route_feed.py -q -k "bookmarks or paginated_bookmarks"
python -m pytest backend\tests\test_route_feed.py backend\tests\test_route_repository.py -q -k "bookmarks or bookmarked"
npx.cmd tsc --noEmit
rg -n "useAuth" kkamyang-app\src\hooks\useBookmarks.ts kkamyang-app\src\screens\bookmark\BookmarkScreen.tsx kkamyang-app\src\services\bookmarkService.ts
rg -n "/bookmarks/me" kkamyang-app\src\hooks\useBookmarks.ts kkamyang-app\src\screens\bookmark\BookmarkScreen.tsx kkamyang-app\src\services\bookmarkService.ts backend
rg -n "fetch\(" kkamyang-app\src\hooks\useBookmarks.ts kkamyang-app\src\screens\bookmark\BookmarkScreen.tsx kkamyang-app\src\services\bookmarkService.ts
python -m pytest backend\tests -q
```

### Results

```text
1. Backend targeted RED 확인 후 GREEN 통과
2. Backend 전체 테스트: 46 passed
3. Frontend TypeScript: 통과
4. useBookmarks useAuth 검색: 매치 없음
5. BookmarkScreen/useBookmarks/bookmarkService 직접 fetch 검색: 매치 없음
6. /bookmarks/me 호출 위치: bookmarkService와 backend route/test에만 존재
```

### QA Flow

```text
1. Login
2. Route Feed
3. Profile
4. Bookmarks
5. BookmarkScreen 목록 표시 확인
6. RouteCard / Open Detail
7. RouteDetail 진입 확인
8. Pull to refresh / pagination 동작 확인
```

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

Response는 docs/source/api-spec.md를 따른다.

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
