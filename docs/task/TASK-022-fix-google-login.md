# 작업명
Google 로그인 실패 원인 분석 및 최소 수정

## 2026-06-15 Progress

### Local Findings

```text
1. .env 파일은 존재한다.
2. EXPO_PUBLIC_SUPABASE_URL은 SET 상태다.
3. EXPO_PUBLIC_SUPABASE_ANON_KEY는 SET 상태다.
4. EXPO_PUBLIC_API_BASE_URL은 SET 상태다.
5. EXPO_PUBLIC_GOOGLE_MAPS_API_KEY는 SET 상태다.
6. app.json에 scheme이 설정되어 있다: kkamyang-app.
7. app.config.ts는 Google Maps API key를 env에서 읽어 Android/iOS map config에 전달한다.
8. src/config/supabase.ts는 Supabase URL/key가 있을 때만 createClient를 호출한다.
9. Supabase auth 설정은 AsyncStorage, persistSession, autoRefreshToken, PKCE flow를 사용한다.
10. authService.signInWithGoogle은 signInWithOAuth(provider=google)를 호출하고 redirectTo에 Linking.createURL("auth/callback")을 사용한다.
11. authService.onOAuthCallback은 auth/callback deep link에서 code를 읽고 exchangeCodeForSession을 호출한다.
12. LoginScreen은 useAuth.signInWithGoogle만 호출하며 Screen 직접 fetch는 없다.
```

### Document Conflict

```text
TASK-022의 현재 상태에는 .env 필수 값이 없음으로 기록되어 있으나,
2026-06-15 로컬 확인 기준으로 4개 필수 EXPO_PUBLIC_* 변수는 모두 SET 상태다.
실제 값은 보안 정책에 따라 읽거나 출력하지 않았다.
```

### External Checks Required

```text
로컬 파일만으로는 아래 Supabase Dashboard 설정을 확인할 수 없다.

1. Authentication -> Providers -> Google Enable 여부
2. Google Client ID 존재 여부
3. Google Client Secret 존재 여부
4. Authentication -> URL Configuration -> Redirect URLs
5. Authentication -> URL Configuration -> Site URL
```

### 2026-06-15 Supabase Dashboard Check

```text
1. Authentication -> Providers -> Google Enable 여부: YES
2. Google Client ID 존재 여부: YES
3. Google Client Secret 존재 여부: NO
4. Authentication -> URL Configuration -> Redirect URLs: 사용자가 설명 요청
5. Authentication -> URL Configuration -> Site URL: 사용자가 설명 요청
```

### Confirmed Cause

```text
Google Client Secret이 Supabase Google Provider에 입력되어 있지 않아 Google OAuth 설정이 완료되지 않았다.
Google login이 성공하려면 Supabase Dashboard의 Google Provider에 Google Client ID와 Client Secret이 모두 필요하다.
```

### Redirect URLs / Site URL Notes

```text
Redirect URLs:
- 앱 코드의 redirectTo 값이 허용 목록에 있는지 검사하는 Supabase Auth 설정이다.
- 현재 앱은 authService.signInWithGoogle에서 Linking.createURL("auth/callback")을 redirectTo로 사용한다.
- 따라서 실제 기기에서 출력되는 [Auth] redirectTo URL이 Redirect URLs 허용 목록과 일치해야 한다.

Site URL:
- 코드에서 redirectTo를 넘기지 않았을 때 Supabase가 사용하는 기본 redirect URL이다.
- 이메일 확인, 비밀번호 재설정 같은 auth flow에서도 기본 URL로 쓰인다.
- 현재 Google login 코드는 redirectTo를 명시하므로, Google login의 1차 확인 대상은 Redirect URLs다.
```

### Current Decision

```text
현재 로컬 코드에서 확정 가능한 수정 지점은 없다.
먼저 Supabase Google Provider의 Client Secret을 입력해야 한다.
Redirect URLs와 Site URL 값은 실제 redirectTo 확인 후 사용자가 결정한다.
그 전에는 redirect 방식, scheme, OAuth 처리 코드를 임의 변경하지 않는다.
```

## 프로젝트

KKamyang

러닝 Route 기록/공유 앱
현재 MVP 안정화 및 QA 단계

---

## 현재 상태

실행 상태:

- Expo 실행 성공
- Expo Go 설치 완료
- 실제 휴대폰 연결 완료
- QR 실행 가능

현재 문제:

- Google 로그인이 동작하지 않음

현재 확인 결과:

### .env 상태

다음 필수 값이 없음 확인됨

EXPO_PUBLIC_SUPABASE_URL
EXPO_PUBLIC_SUPABASE_ANON_KEY
EXPO_PUBLIC_API_BASE_URL
EXPO_PUBLIC_GOOGLE_MAPS_API_KEY

---

## 원인 우선순위

1. .env 값 누락 (확정)

2. Supabase Google Provider 비활성

3. Google Client ID / Secret 누락

4. Redirect URL 불일치

5. app.json 또는 app.config.ts scheme 문제

6. authService OAuth 처리 문제

---

## 필수 작업 규칙

반드시 준수:

- Screen → Hook → Service → apiClient
- Screen 직접 fetch 금지
- Type 기반 설계
- MVP 우선
- 최소 수정 원칙
- 신규 기능 추가 금지
- 대규모 리팩토링 금지
- 작업 범위 외 수정 금지
- 임의 결정 금지
- 애매한 것은 질문 후 진행
- Deliverables 외 수정 시 이유 설명

---

## 확인 작업

### 1. 환경 변수 확인

확인 대상:

.env

필수 항목:

EXPO_PUBLIC_SUPABASE_URL
EXPO_PUBLIC_SUPABASE_ANON_KEY
EXPO_PUBLIC_API_BASE_URL
EXPO_PUBLIC_GOOGLE_MAPS_API_KEY

확인 내용:

- 파일 존재 여부
- 값 존재 여부
- EXPO_PUBLIC prefix 적용 여부
- 코드 참조 위치 확인

---

### 2. Supabase 설정 확인

확인:

Authentication
→ Providers
→ Google

확인 항목:

- Enable 여부
- Client ID 존재 여부
- Client Secret 존재 여부

추가 확인:

Authentication
→ URL Configuration

확인:

- Redirect URLs
- Site URL

---

### 3. 앱 설정 확인

확인 파일:

app.json
app.config.ts

확인 항목:

- scheme
- deep link
- redirect 설정

---

### 4. 로그인 구현 확인

확인 파일:

src/services/authService.ts
src/hooks/useAuth.ts

확인 항목:

- signInWithOAuth()
- redirectTo
- Linking.createURL()
- session 처리

---

## Deliverables

반드시 아래 형식으로 응답:

1. 원인 분석
2. 수정 필요 파일
3. 최소 수정 제안
4. 테스트 방법
5. 검증 결과
6. 문서와 충돌한 사항

주의:

관련 없는 파일 수정 금지
신규 기능 추가 금지
임의 구현 금지
