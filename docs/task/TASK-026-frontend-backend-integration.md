# TASK-026-frontend-backend-integration

## Goal

Skeleton 이후 완료된 backend API를 실제 frontend 흐름과 연결해 MVP 핵심 경로를 안정화한다.

대상 흐름:

```text
Login
-> Google OAuth
-> Supabase session
-> GET /api/v1/users/me
-> RouteFeed
-> RouteDetail
-> Record
-> Start Record
-> Find Current Location
-> Finish Record
-> Profile
-> My Routes / Bookmarks
```

## Progress Log

### 2026-06-21

Automated checks:

```text
1. Backend test passed.
   Command: python -m pytest backend/tests
   Result: 57 passed, 131 warnings

2. Frontend dependency install passed.
   Command: npm.cmd install
   Result: 831 packages installed.
   Note: npm audit reported 25 vulnerabilities.

3. Frontend type check passed.
   Command: npx.cmd tsc --noEmit
   Result: passed

4. Frontend run passed.
   Command: npm start
   Command: npm.cmd start
   Result: Metro Bundler started on http://localhost:8081
   Note: expo reported expo@54.0.34, expected ~54.0.35.

5. Android bundle compile passed.
   Command: Invoke-WebRequest -UseBasicParsing -Uri "http://127.0.0.1:8081/index.bundle?platform=android&dev=true&minify=false" | Select-Object StatusCode
   Result: 200

6. Backend health check passed.
   Command: python -m uvicorn app.main:app --reload --app-dir backend --host 0.0.0.0 --port 8000
   Result: GET /api/v1/health returned 200 with common success response.

7. Diff check passed.
   Command: git config --global --add safe.directory C:/project/Kkamnyang
   Command: git diff --check
   Result: passed with LF-to-CRLF warning for this task document.
```

Code inspection:

```text
1. apiClient unwraps the common success response and sends Authorization Bearer when an access token exists.
2. userService.getMe calls GET /users/me with the Supabase access token.
3. authService calls /users/me after a Supabase session exists.
4. activityService.start calls POST /activities/start with RUN.
5. activityService.finish calls POST /activities/{activity_id}/finish with route payload.
6. useActivity prevents finish when GPS point count is 0 and duplicates a single point for stationary finish.
7. Frontend .env file exists.
8. Backend .env file exists.
9. Backend config reads OS environment variables only; it does not load .env automatically.
```

## Context

```text
1. TASK-021~TASK-025 기준 skeleton/backend 작업은 완료된 상태로 본다.
2. UX/UI 고도화 전 frontend-backend 통합 안정화를 먼저 진행한다.
3. Google Stitch UX/UI 작업은 이 통합 검증이 끝난 뒤 실제 동작 기준으로 진행한다.
4. 건강 지표 spike는 MVP 통합 안정화 이후 별도 task로 진행한다.
```

## Scope

```text
1. frontend 서비스가 backend endpoint를 올바르게 호출하는지 확인한다.
2. Supabase access_token이 Authorization Bearer로 전달되는지 확인한다.
3. /users/me 응답이 frontend User 타입과 충돌하지 않는지 확인한다.
4. RouteFeed, RouteDetail, Record, Profile 화면 진입을 실제 API 기준으로 확인한다.
5. Android 실기기에서 PC backend 서버에 접근 가능한지 확인한다.
6. 네트워크 실패, 세션 없음, 권한 거부 상태에서 앱이 crash 없이 처리되는지 확인한다.
```

## Out of Scope

```text
신규 기능 추가
UI 리디자인
Router 구조 변경
상태관리 라이브러리 변경
API 응답 구조 변경
DB 스키마 변경
임의 라이브러리 추가
건강 지표 구현
```

## Security Rules

```text
1. .env 실제 값을 읽거나 출력하지 않는다.
2. EXPO_PUBLIC_* 값도 실제 값을 출력하지 않는다.
3. 환경변수는 변수명과 SET/NOT_SET 상태만 확인한다.
4. SUPABASE_SERVICE_ROLE_KEY는 frontend에 전달하지 않는다.
5. backend service role key는 users 조회/생성 등 서버 내부 작업에만 사용한다.
```

## Environment Variables

frontend 필수 변수:

```text
EXPO_PUBLIC_SUPABASE_URL
EXPO_PUBLIC_SUPABASE_ANON_KEY
EXPO_PUBLIC_API_BASE_URL
EXPO_PUBLIC_GOOGLE_MAPS_API_KEY
```

backend 필수 변수:

```text
SUPABASE_URL
SUPABASE_ANON_KEY
SUPABASE_SERVICE_ROLE_KEY
```

확인 기준:

```text
값 자체는 확인하지 않는다.
존재 여부만 SET/NOT_SET으로 기록한다.
```

## Commands

Backend run:

```powershell
python -m uvicorn app.main:app --reload --app-dir backend --host 0.0.0.0 --port 8000
```

Backend test:

```powershell
python -m pytest backend/tests
```

Frontend run:

```powershell
npm start
npm.cmd start
```

Frontend dependency install:

```powershell
npm.cmd install
```

Frontend type check:

```powershell
npx.cmd tsc --noEmit
```

Android bundle compile:

```powershell
Invoke-WebRequest -UseBasicParsing -Uri "http://127.0.0.1:8081/index.bundle?platform=android&dev=true&minify=false" | Select-Object StatusCode
```

Diff check:

```powershell
git config --global --add safe.directory C:/project/Kkamnyang
git diff --check
```

## Verification

```text
1. backend /api/v1/health returns success.
2. Android physical device can open http://PC-IPv4:8000/api/v1/health.
3. Google OAuth returns to the app.
4. Supabase session exists after login.
5. GET /api/v1/users/me returns 200 with common success response.
6. Feed screen loads without runtime crash.
7. Feed -> Detail navigation works.
8. Record screen opens without map key crash.
9. Start Record returns 200.
10. Find Current Location works when foreground location permission is granted.
11. Finish Record works when GPS point count is at least 1.
12. Profile screen loads /users/me data.
13. My Routes and Bookmarks screens open.
```

## Failure Triage

Google login failure:

```text
1. Check frontend env variable existence.
2. Check Supabase Google Provider enabled state.
3. Check Google Client ID / Secret in Supabase dashboard.
4. Check Supabase redirect URLs and site URL.
5. Check app scheme and Linking.createURL usage.
```

Android Network request failed:

```text
1. Confirm backend is running with --host 0.0.0.0 --port 8000.
2. Confirm EXPO_PUBLIC_API_BASE_URL uses PC IPv4 address, not 127.0.0.1.
3. Confirm Android device and PC are on reachable network.
4. Confirm Windows firewall allows inbound port 8000 if needed.
```

users/me failure:

```text
1. Confirm Authorization: Bearer access_token exists.
2. Confirm backend token verification succeeds.
3. Confirm users row can be created/read by backend service role.
4. Confirm common response shape is unchanged.
```

## Completion Criteria

```text
1. MVP 핵심 경로가 Android 실기기에서 crash 없이 동작한다.
2. Google OAuth 이후 /users/me가 정상 동작한다.
3. Record start/finish가 backend API와 연결되어 동작한다.
4. 실패 상태가 앱 crash가 아닌 사용자 표시 또는 로그로 처리된다.
5. TASK-027 회귀 QA를 실행할 수 있는 상태가 된다.
```
