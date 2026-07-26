# TASK-003-auth

## Goal

Supabase 실제 client 연결 및 Google OAuth 로그인을 구현한다.

이번 단계에서는 인증 기능만 구현한다.

사용자 정보 저장 및 login_id 설정은 구현하지 않는다.

---

# Scope

이번 Task에서 수행할 작업:

```text
1. Supabase client 실제 생성

2. Google OAuth 로그인 버튼 생성

3. Google OAuth 로그인 처리

4. 로그인 성공 시 세션 저장

5. 로그인 상태 확인 Hook 생성
```

---

이번 Task 범위 제외:

```text
Naver OAuth

login_id 설정

회원가입

/users/me 호출

GPS

Google Maps

Route 기능

댓글

좋아요

북마크
```

---

# Constraints

반드시 준수:

```text
AGENTS.md

docs/requirements.md

docs/source/architecture.md

docs/source/api-spec.md

docs/source/db-schema.md
```

---

금지:

```text
DB 직접 접근 금지

users 테이블 생성 금지

회원가입 구현 금지

Navigation 구조 변경 금지

API 구현 금지

GPS 구현 금지

Google Maps 구현 금지

비즈니스 로직 추가 금지

임의 라이브러리 추가 금지
```

---

허용:

```text
Supabase Auth 사용

Google OAuth 연결

세션 저장

Hook 생성
```

---

# Deliverables

생성 또는 수정:

```text
src/config/supabase.ts

src/hooks/useAuth.ts

src/services/authService.ts

src/screens/auth/LoginScreen.tsx

src/types/user.ts
```

---

# Implementation Rules

## Login Flow

```text
사용자

↓

Google 로그인 버튼 클릭

↓

Supabase Google OAuth

↓

로그인 성공

↓

세션 저장

↓

RootNavigator 재렌더링
```

---

## Session 정책

세션 저장:

```text
Supabase 기본 Session 사용
```

추가 저장 금지:

```text
AsyncStorage 직접 저장 금지
LocalStorage 사용 금지
```

---

## Navigation 정책

현재:

```text
RootNavigator

↓

MainNavigator
```

변경:

```text
RootNavigator

├─ 로그인 안됨
│      ↓
│   AuthNavigator
│
└─ 로그인 됨
       ↓
   MainNavigator
```

---

# Verification

완료 조건:

```text
1. Google 로그인 버튼 표시

2. Google 로그인 성공

3. 세션 저장 확인

4. 앱 재실행 시 로그인 유지

5. TypeScript 오류 없음

6. GPS 기능 없음

7. login_id 기능 없음

8. Naver OAuth 없음
```

---

# Next Task

다음 작업:

```text
TASK-004-login-id
```

목표:

```text
최초 로그인 시 login_id 설정
```
