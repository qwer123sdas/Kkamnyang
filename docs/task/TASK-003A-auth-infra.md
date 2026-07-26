# TASK-003A-auth-infra

## Goal

Google OAuth가 실제 동작 가능한 인증 인프라를 구성한다.

이번 단계에서는 기능 추가가 아니라 인증 환경을 정상화한다.

---

# Scope

이번 작업:

```text
1. Supabase Auth 라이브러리 설치

2. Expo AuthSession 설치

3. Deep Link 설정

4. OAuth redirect URL 설정

5. Session 유지 설정

6. 실제 로그인 테스트
```

---

작업 범위 제외:

```text
login_id

Naver OAuth

회원가입

GPS

Google Maps

Route 기능
```

---

# Constraints

반드시 준수:

```text
AGENTS.md

docs/source/architecture.md
```

---

금지:

```text
UI 변경

비즈니스 로직 추가

DB 작업

API 구현

Route 기능 구현
```

---

# Commands

설치:

```bash
npm install @supabase/supabase-js

npx expo install expo-auth-session

npx expo install expo-linking

npm install react-native-url-polyfill
```

---

# Deliverables

```text
package.json

src/config/supabase.ts

app.json
```

---

# Verification

```text
1. Google OAuth 성공

2. 앱 재실행 후 로그인 유지

3. redirect URL 정상 동작

4. TypeScript 오류 없음
```

---

# Next Task

```text
TASK-004-login-id
```
