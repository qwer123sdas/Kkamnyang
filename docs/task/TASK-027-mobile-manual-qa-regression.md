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
[ ] backend starts on 0.0.0.0:8000
[ ] Android browser opens http://PC-IPv4:8000/api/v1/health
[ ] Expo dev server starts
[ ] Android device opens app through Expo Go
[ ] app import stage has no crash
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

## Failure Log

| Date | Area | Step | Expected | Actual | Suspected Cause | Follow-up Task |
|---|---|---|---|---|---|---|
| | | | | | | |

## Completion Criteria

```text
1. QA checklist critical path is completed on Android physical device.
2. Any failed item has a failure log row.
3. No runtime crash remains in Login -> Feed -> Detail -> Record -> Profile flow.
4. TASK-028 Stitch UX/UI work can use the verified app flow as its baseline.
```
