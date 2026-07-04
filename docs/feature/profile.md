# 프로필 기능

## 범위

사용자 프로필, 내 경로, 북마크를 다룬다.

## MVP 우선순위

프로필은 사용자가 자신의 경로 기록과 저장한 경로에 접근할 수 있게 하여 `RUN` MVP를 지원한다.

## 프론트엔드 경로

```text
kkamyang-app/src/screens/profile/ProfileScreen.tsx
-> kkamyang-app/src/hooks/useProfile.ts
-> kkamyang-app/src/services/userService.ts
-> kkamyang-app/src/services/apiClient.ts
```

관련 프론트엔드 경로:

```text
kkamyang-app/src/screens/route/MyRoutesScreen.tsx
kkamyang-app/src/screens/bookmark/BookmarkScreen.tsx
kkamyang-app/src/hooks/useMyRoutes.ts
kkamyang-app/src/hooks/useBookmarks.ts
kkamyang-app/src/services/bookmarkService.ts
```

## 백엔드 경로

```text
backend/api/user_api.py
-> backend/services/user_service.py
-> backend/repositories/user_repository.py
```

관련 경로 데이터는 다음 경로를 함께 사용할 수 있다.

```text
backend/api/route_api.py
-> backend/services/route_service.py
-> backend/repositories/route_repository.py
```

## 관련 Task 문서

- `../task/TASK-015-profile.md`
- `../task/TASK-016-my-routes.md`
- `../task/TASK-017-bookmarks.md`
