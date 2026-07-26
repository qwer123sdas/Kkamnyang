# TASK-015-profile

## 2026-06-08 Progress

### Completed

```text
1. ProfileScreen 기존 구현 확인
2. userService.getMe를 통한 GET /api/v1/users/me 호출 유지
3. ProfileSummary에서 nickname, login_id, email, profile_image_url 표시 확인
4. 운동 요약 placeholder 표시 유지
5. My Routes / Bookmarks 진입 버튼 유지
6. useProfile에서 useAuth 구독 제거
7. Profile 조회 시 authService.getSession()을 1회 호출해 access token 전달
```

### Changed Files

```text
kkamyang-app/src/hooks/useProfile.ts
docs/task/TASK-015-profile.md
```

### Commands

```powershell
npx.cmd tsc --noEmit
rg -n "useAuth\(|authService\.getSession|userService\.getMe|/users/me|fetch\(" kkamyang-app\src\screens\profile kkamyang-app\src\hooks\useProfile.ts kkamyang-app\src\services\userService.ts kkamyang-app\src\services\authService.ts
rg -n "logout|signOut|profile_image.*upload|chart|victory|recharts|statistics|stats" kkamyang-app\src\screens\profile kkamyang-app\src\components\profile kkamyang-app\src\hooks\useProfile.ts kkamyang-app\src\services\userService.ts
```

### QA Flow

```text
1. Login
2. Route Feed
3. Profile
4. Profile Screen 표시 확인
5. nickname/login_id/email/profile_image_url 표시 확인
6. 운동 요약 placeholder 표시 확인
7. My Routes 버튼 진입 확인
8. Bookmarks 버튼 진입 확인
```

## Goal

내 프로필 화면을 구현한다.

이번 단계에서는 로그인한 사용자의 기본 정보와 러닝 요약 정보를 표시한다.

---

# Scope

```text
1. GET /api/v1/users/me 호출 재사용
2. ProfileScreen 구현
3. 사용자 기본 정보 표시
4. 러닝 요약 정보 표시 영역 구성
5. My Routes 화면 진입 버튼 표시
6. Bookmark 화면 진입 버튼 표시
```

---

# Excluded

```text
프로필 수정
프로필 이미지 업로드
로그아웃
회원 탈퇴
통계 차트
월별/주별 분석
Push Notification
```

---

# Deliverables

```text
src/screens/profile/ProfileScreen.tsx
src/hooks/useProfile.ts
src/services/userService.ts
src/components/profile/ProfileSummary.tsx
src/types/user.ts

src/services/authService.ts
```

---

# Constraints

```text
1. API 호출은 userService에서만 수행
2. Screen 직접 fetch 금지
3. 프로필 수정 구현 금지
4. 이미지 업로드 구현 금지
5. 로그아웃 구현 금지
6. 통계 차트 라이브러리 추가 금지
```

---

# API

```http
GET /api/v1/users/me
```

Response는 docs/source/api-spec.md를 따른다.

---

# Display Rules

표시 항목:

```text
nickname
login_id
email
profile_image_url
```

요약 표시 영역:

```text
총 러닝 수
총 거리
총 시간
북마크 수
```

단, API 응답에 요약값이 없으면 placeholder로 표시한다.

---

# Verification

```text
1. TypeScript 오류 없음
2. ProfileScreen 표시
3. users/me 호출은 userService에만 존재
4. Screen 직접 fetch 없음
5. 프로필 수정/이미지 업로드 없음
6. 통계 차트 라이브러리 추가 없음
```

---

## Implementation Notes

기존 authService에서 /users/me를 직접 호출하고 있다면,
userService.getMe를 재사용하도록 최소 수정할 수 있다.

단, authService는 인증 관련 흐름만 담당하고
사용자 프로필 비즈니스 로직을 포함하면 안 된다.

---

# Next Task

```text
TASK-016-my-routes
```
