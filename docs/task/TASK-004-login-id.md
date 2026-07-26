# TASK-004-login-id

## Goal

OAuth 로그인 후 `login_id`가 없는 사용자가 최초 1회 `login_id`를 설정할 수 있도록 한다.

이번 Task에서는 `login_id` 최초 설정 흐름만 구현한다.

---

# Scope

이번 Task에서 수행할 작업:

```text
1. 현재 Supabase 세션 확인

2. 현재 사용자 정보 조회

3. login_id 미설정 상태 판정

4. login_id 입력 화면 연결

5. login_id 형식 검증

6. login_id 최초 설정 API 호출

7. 설정 성공 후 MainNavigator 이동 흐름 연결
```

---

이번 Task 범위 제외:

```text
Naver OAuth

일반 회원가입

비밀번호 로그인

GPS

Google Maps

Route 기능

댓글

좋아요

북마크

DB 스키마 수정

API 응답 구조 변경

상태관리 라이브러리 추가
```

---

# Constraints

반드시 준수:

```text
AGENTS.md

docs/source/architecture.md

docs/source/api-spec.md

docs/source/db-schema.md
```

---

금지:

```text
DB 직접 접근 금지

users 테이블 스키마 수정 금지

OAuth 구현 변경 금지

Supabase client 구조 변경 금지

Navigation 구조 전체 변경 금지

임의 라이브러리 추가 금지

GPS 구현 금지

Google Maps 구현 금지

Route 기능 구현 금지
```

---

허용:

```text
Supabase session 사용

GET /api/v1/users/me 호출

POST /api/v1/users/me/login-id 호출

login_id 입력 화면 구현

login_id 정규식 검증

Auth 상태 Hook 보강

RootNavigator 분기 보강
```

---

# API Rules

## Current User

```http
GET /api/v1/users/me
```

Authorization:

```http
Authorization: Bearer {access_token}
```

성공 응답:

```json
{
  "success": true,
  "data": {
    "user_id": "uuid",
    "login_id": "runner2026",
    "email": "user@test.com",
    "nickname": "runner",
    "profile_image_url": null
  },
  "message": null
}
```

---

## Set Login ID

```http
POST /api/v1/users/me/login-id
```

Authorization:

```http
Authorization: Bearer {access_token}
```

Request:

```json
{
  "login_id": "runner2026"
}
```

성공 응답:

```json
{
  "success": true,
  "data": {
    "login_id": "runner2026"
  },
  "message": null
}
```

---

# login_id Rules

정규식:

```text
^[a-z0-9_]{4,30}$
```

정책:

```text
1. 중복 불가

2. 최초 설정 후 변경 불가

3. 영문 소문자, 숫자, '_'만 허용

4. 4자 이상 30자 이하
```

오류 코드:

```text
DUPLICATE_LOGIN_ID

INVALID_LOGIN_ID

AUTH_REQUIRED

INVALID_TOKEN

VALIDATION_ERROR
```

---

# Deliverables

생성 또는 수정:

```text
src/services/authService.ts

src/hooks/useAuth.ts

src/screens/auth/LoginIdSetupScreen.tsx

src/navigation/RootNavigator.tsx

src/types/user.ts

src/types/api.ts
```

필요 시 수정:

```text
src/services/apiClient.ts

src/navigation/AuthNavigator.tsx
```

---

# Implementation Rules

## Auth Flow

```text
앱 시작

↓

Supabase Session 확인

↓

Session 없음
  → AuthNavigator

Session 있음
  → GET /api/v1/users/me

↓

login_id 없음
  → LoginIdSetupScreen

login_id 있음
  → MainNavigator
```

---

## Login ID Setup Flow

```text
LoginIdSetupScreen

↓

login_id 입력

↓

클라이언트 정규식 검증

↓

POST /api/v1/users/me/login-id

↓

성공

↓

사용자 상태 갱신

↓

MainNavigator
```

---

# Verification

완료 조건:

```text
1. TypeScript 오류 없음

2. login_id 입력 화면 표시

3. login_id 정규식 검증 동작

4. login_id 설정 API 호출 가능

5. 설정 성공 후 MainNavigator 이동 가능

6. login_id 설정 전에는 MainNavigator 접근 불가

7. Naver OAuth 없음

8. GPS 기능 없음

9. Google Maps 기능 없음

10. Route 기능 없음
```

---

# Commands

이번 Task에서 패키지 설치 명령은 사용하지 않는다.

실행 또는 검증 명령:

```bash
npm run web
```

```bash
npx tsc --noEmit
```

---

# Next Task

```text
TASK-005-record-start
```

목표:

```text
RUN 활동 기록 시작 흐름 구현
```
