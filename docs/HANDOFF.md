# RouteLog HANDOFF

## 2026-06-15 Current State

### Active Context

```text
1. Project: RouteLog, GPS 기반 운동 기록 및 공유 플랫폼.
2. MVP activity_type은 RUN만 지원한다.
3. Expo SDK 54 기준을 유지한다.
4. .env 실제 값은 읽거나 출력하지 않는다. 환경변수는 SET/NOT_SET 상태만 확인한다.
5. API 응답 구조, Router 구조, 상태관리 라이브러리, DB 스키마는 task 승인 없이 변경하지 않는다.
```

### Completed / No Rework Needed

아래 항목은 이미 작업 또는 확인된 것으로 보고 재작업하지 않는다.

```text
1. TASK-019 device test / similar routes / route history QA.
2. TASK-020 runtime fix / Record start-finish / map fallback / live metrics UI.
3. TASK-021 manual retest.
4. TASK-022 Google login failure analysis.
5. TASK-023 backend skeleton.
```

사용자가 언급한 `1, 2, 3` 항목도 이전에 작업했던 내용으로 본다. 새 작업으로 다시 시작하지 않는다.

### TASK-021 Result

```text
1. Expo dev server는 8081 포트 충돌 시 8082로 실행했다.
2. Android bundle compile 결과 StatusCode 200을 확인했다.
3. 사용자가 Android 실기기에서 앱 첫 화면 표시를 확인했다.
4. 사용자가 Google Login 버튼 표시를 확인했다.
5. 사용자가 Feed -> Detail 이동을 확인했다.
6. 사용자가 Record 화면 진입을 확인했다.
7. 사용자가 Profile 화면 진입을 확인했다.
8. 사용자가 지도 화면 진입을 확인했다.
9. 사용자가 런타임 크래시 없음을 확인했다.
```

남은 확인:

```text
manual-mvp-checklist.md의 Record Live Metrics 세부 동작 3개는 이후 별도 확인한다.
1. Duration increments while activity status is STARTED.
2. Distance updates when GPS points move more than the GPS noise threshold.
3. Pace changes after distance becomes greater than 0.
```

### TASK-022 Google Login Analysis

로컬 확인:

```text
1. .env 파일은 존재한다.
2. EXPO_PUBLIC_SUPABASE_URL은 SET 상태다.
3. EXPO_PUBLIC_SUPABASE_ANON_KEY는 SET 상태다.
4. EXPO_PUBLIC_API_BASE_URL은 SET 상태다.
5. EXPO_PUBLIC_GOOGLE_MAPS_API_KEY는 SET 상태다.
6. app.json에는 scheme이 설정되어 있다: kkamyang-app.
7. app.config.ts는 Google Maps API key를 env에서 읽어 Android/iOS map config에 전달한다.
8. src/config/supabase.ts는 Supabase URL/key가 있을 때만 createClient를 호출한다.
9. Supabase auth 설정은 AsyncStorage, persistSession, autoRefreshToken, PKCE flow를 사용한다.
10. authService.signInWithGoogle은 signInWithOAuth(provider=google)를 호출하고 redirectTo에 Linking.createURL("auth/callback")을 사용한다.
11. authService.onOAuthCallback은 auth/callback deep link에서 code를 읽고 exchangeCodeForSession을 호출한다.
12. LoginScreen은 useAuth.signInWithGoogle만 호출하며 Screen 직접 fetch는 없다.
```

Supabase Dashboard 확인:

```text
1. Authentication -> Providers -> Google Enable 여부: YES
2. Google Client ID 존재 여부: YES
3. Google Client Secret 존재 여부: NO
4. Authentication -> URL Configuration -> Redirect URLs: 사용자가 설명 요청
5. Authentication -> URL Configuration -> Site URL: 사용자가 설명 요청
```

확정 원인:

```text
Google Client Secret이 Supabase Google Provider에 입력되어 있지 않아 Google OAuth 설정이 완료되지 않았다.
Google login이 성공하려면 Supabase Dashboard의 Google Provider에 Google Client ID와 Client Secret이 모두 필요하다.
```

현재 결정:

```text
1. 현재 로컬 코드에서 확정 가능한 수정 지점은 없다.
2. 먼저 사용자가 Supabase Google Provider에 Client Secret을 입력해야 한다.
3. Redirect URLs와 Site URL 값은 실제 redirectTo 확인 후 결정한다.
4. 그 전에는 redirect 방식, scheme, OAuth 처리 코드를 임의 변경하지 않는다.
```

### TASK-023 Backend Skeleton Result

```text
1. backend/ FastAPI skeleton exists.
2. GET /api/v1/health exists and returns the common success response.
3. GET /api/v1/users/me exists and uses Bearer token authentication.
4. /users/me does not accept user_id from request input.
5. Bearer token verification uses Supabase Auth user info.
6. users lookup/create is isolated in backend repository/service code.
7. users lookup/create uses SUPABASE_SERVICE_ROLE_KEY only inside backend repository requests.
8. No backend code change was needed during this pass.
```

검증:

```text
Command: python -m pytest backend/tests
Result: 57 passed
Warnings: pytest cache write warnings for .pytest_cache permission only
```

### Keep Rules

```text
1. .env 실제 값을 읽거나 출력하거나 요약하지 않는다.
2. Screen에서 직접 fetch를 호출하지 않는다.
3. Screen -> Hook -> Service -> apiClient 흐름을 유지한다.
4. Detail/Profile/MyRoutes/Bookmarks hook은 useAuth를 구독하지 않아야 한다.
5. 필요한 action/load 시점에서 authService.getSession()을 1회 사용한다.
6. API 응답 구조를 임의로 변경하지 않는다.
7. task/document 승인 없이 DB 스키마를 변경하지 않는다.
8. 상태관리 라이브러리를 추가하지 않는다.
9. Router 구조를 변경하지 않는다.
10. 임의 라이브러리를 추가하지 않는다.
11. Expo 관련 작업 전에는 공식 Expo SDK 54 문서를 먼저 확인한다.
```

### Next Work

다음 task:

```text
TASK-024-social-user-identity-stabilization
```

진행 기준:

```text
1. TASK-024 문서에 이미 정의된 SQL/정책 범위 안에서만 진행한다.
2. DB 변경은 사용자가 Supabase에서 직접 수행해야 한다.
3. Agent는 DB secret 또는 .env 실제 값을 읽지 않는다.
4. TASK-024 완료 후 TASK-026 frontend-backend integration으로 이동한다.
```

Google login blocker가 먼저 해결되어야 하는 경우:

```text
1. 사용자가 Supabase Google Provider의 Client Secret을 입력한다.
2. 실제 기기에서 Google OAuth redirectTo 로그 또는 동작을 확인한다.
3. Redirect URLs 허용 목록이 앱의 Linking.createURL("auth/callback") 결과와 일치하는지 확인한다.
4. OAuth가 앱으로 복귀하면 Supabase session 생성 여부를 확인한다.
5. session이 생성되면 TASK-026 흐름의 GET /api/v1/users/me 확인으로 진행한다.
```

### Current Modified Docs

```text
docs/HANDOFF.md
docs/task/TASK-021-manual-retest.md
docs/task/TASK-022-fix-google-login.md
docs/task/TASK-023-backend-skeleton.md
```
