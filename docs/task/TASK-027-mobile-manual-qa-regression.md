# TASK-027-mobile-manual-qa-regression

## Goal

Frontend-backend 통합 이후 Android 실기기 기준 MVP 회귀 QA를 수행한다.

## Scope

```text
1. Expo dev server 실행 확인
2. FastAPI backend 실행 확인
3. Android 실기기에서 backend 접근 확인
4. Google OAuth 로그인 확인
5. Feed, Detail, Record, Profile 핵심 화면 확인
6. Record start/finish 확인
7. 실패 상태와 fallback 확인
8. QA 결과를 문서에 기록
```

## Out of Scope

```text
신규 기능 추가
UI 리디자인
DB 스키마 변경
API 응답 구조 변경
Router 구조 변경
상태관리 라이브러리 변경
임의 라이브러리 추가
```

## Preconditions

```text
1. TASK-026 frontend-backend integration이 완료되어야 한다.
2. 사용자가 Supabase/Google OAuth 설정을 완료해야 한다.
3. 사용자가 필요한 .env 값을 직접 설정해야 한다.
4. AI Agent는 .env 실제 값을 읽거나 출력하지 않는다.
5. Android 기기와 backend 실행 PC가 서로 접근 가능한 네트워크에 있어야 한다.
```

## Commands

Backend run:

```powershell
python -m uvicorn app.main:app --reload --app-dir backend --host 0.0.0.0 --port 8000
```

Frontend run:

```powershell
npm start
```

Backend test:

```powershell
python -m pytest backend/tests
```

Frontend type check:

```powershell
npx.cmd tsc --noEmit
```

Android bundle compile:

```powershell
Invoke-WebRequest -UseBasicParsing -Uri "http://127.0.0.1:8081/index.bundle?platform=android&dev=true&minify=false" | Select-Object StatusCode
```

## QA Checklist

### Server

```text
[x] backend starts on 0.0.0.0:8000
[ ] Android browser opens http://PC-IPv4:8000/api/v1/health
[x] Expo dev server starts
[ ] Android device opens app through Expo Go
[x] app import stage has no crash
```

### Auth

```text
[ ] Login screen appears
[ ] Google Login button appears
[ ] Google OAuth page opens
[ ] OAuth returns to app
[ ] Supabase session exists after login
[ ] GET /api/v1/users/me returns 200
[ ] users.login_id has social_ prefix for social user
[ ] users.auth_provider is GOOGLE
[ ] email is not stored in login_id, created_by, or updated_by
```

### Feed / Detail

```text
[ ] RouteFeed appears
[ ] route list loads
[ ] empty state does not crash
[ ] network failure does not crash
[ ] RouteCard opens RouteDetail
[ ] RouteDetail shows route data
[ ] comments area opens
[ ] similar routes area opens
[ ] route history area opens
```

### Record

```text
[ ] Record screen opens
[ ] map appears when map key is configured
[ ] fallback appears when map key is not configured
[ ] foreground location permission prompt appears when needed
[ ] Find Current Location works after permission granted
[ ] Start Record returns 200
[ ] Distance appears
[ ] Duration appears
[ ] Pace appears
[ ] Duration increments while STARTED
[ ] Distance updates after movement greater than 5m
[ ] Pace stays -- /km until distance is greater than 0
[ ] Finish Record is available when GPS point count is at least 1
[ ] GPS point 1 finish saves 0km route by duplicating first point as end point
```

### Profile

```text
[ ] Profile screen appears
[ ] Profile uses /users/me data
[ ] My Routes opens
[ ] Bookmarks opens
[ ] My Routes item opens RouteDetail
[ ] Bookmarks item opens RouteDetail
```

## TASK-026 Carryover Physical-Device Checks

TASK-026 automated/local checks passed, but the following physical-device checks are carried into TASK-027.

```text
[ ] Android physical device can open http://10.205.46.48:8000/api/v1/health.
[ ] Google OAuth returns to the app.
[ ] Supabase session exists after login.
[ ] GET /api/v1/users/me returns 200 with common success response.
[ ] Feed screen loads without runtime crash.
[ ] Feed -> Detail navigation works.
[ ] Record screen opens without map key crash.
[ ] Start Record returns 200.
[ ] Find Current Location works when foreground location permission is granted.
[ ] Finish Record works when GPS point count is at least 1.
[ ] Profile screen loads /users/me data.
[ ] My Routes screen opens.
[ ] Bookmarks screen opens.
```

## Failure Log

| Date | Area | Step | Expected | Actual | Suspected Cause | Follow-up Task |
|---|---|---|---|---|---|---|
| | | | | | | |

## Progress Log

### 2026-06-21

Automated/local checks:

```text
1. Backend test passed.
   Command: python -m pytest backend/tests
   Result: 57 passed, 131 warnings

2. Frontend type check passed.
   Command: npx.cmd tsc --noEmit
   Result: passed

3. Android bundle compile passed.
   Command: Invoke-WebRequest -UseBasicParsing -Uri "http://127.0.0.1:8081/index.bundle?platform=android&dev=true&minify=false" | Select-Object StatusCode
   Result: 200

4. Backend health passed locally.
   Command: python -m uvicorn app.main:app --reload --app-dir backend --host 0.0.0.0 --port 8000
   Result: GET http://127.0.0.1:8000/api/v1/health returned 200.

5. Expo dev server is listening on 8081.
   Result: 0.0.0.0:8081 LISTENING

6. Backend server is listening on 8000.
   Result: 0.0.0.0:8000 LISTENING

7. PC IPv4 candidate for Android device test:
   URL: http://10.205.46.48:8000/api/v1/health

8. Backend health passed through PC IPv4 from host machine.
   URL: http://10.205.46.48:8000/api/v1/health
   Result: 200
```

Pending physical-device checks:

```text
1. Android browser opens http://10.205.46.48:8000/api/v1/health.
2. Android device opens app through Expo Go.
3. Google OAuth returns to app.
4. Supabase session exists after login.
5. GET /api/v1/users/me returns 200.
6. Feed, Detail, Record, Profile, My Routes, and Bookmarks screens open without runtime crash.
7. Record start/finish works against backend API.
8. Failure and fallback states are verified on device.
```

## Completion Criteria

```text
1. QA checklist critical path is completed on Android physical device.
2. Any failed item has a failure log row.
3. No runtime crash remains in Login -> Feed -> Detail -> Record -> Profile flow.
4. TASK-028 Stitch UX/UI work can use the verified app flow as its baseline.
```

## Follow-up Checklist Rule

```text
1. 실기기 검증은 TASK-027 범위까지 진행한 뒤 정리한다.
2. TASK-027 결과를 기준으로 필요한 후속 체크리스트를 별도 작성한다.
3. 후속 체크리스트에는 통과 항목, 실패 항목, 재검증 필요 항목을 구분한다.
4. 실패 항목은 Failure Log의 Follow-up Task와 연결한다.
```
