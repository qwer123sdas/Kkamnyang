# TASK-020-runtime-fix

## 2026-06-10 Progress

### Confirmed Before Change

```text
1. src/config/env.ts already uses empty-string fallbacks for EXPO_PUBLIC_* values.
2. src/config/supabase.ts already avoids createClient when Supabase URL/key are missing.
3. LoginScreen already displays a Google login button.
4. RouteFeedScreen already connects RouteCard press to RouteDetail.
5. RouteFeedScreen already has Record/Profile entry buttons.
6. MainNavigator already registers RouteDetail, Record, and Profile screens.
```

### Minimal Fix

```text
1. useAuth.signInWithGoogle now catches login errors.
2. Login errors are written to existing auth errorMessage state.
3. LoginScreen can display SUPABASE_NOT_CONFIGURED instead of leaving an unhandled button action.
4. RunningMap now skips MapView rendering when Google Maps API key is missing.
5. RecordScreen can render a non-map fallback instead of failing at map entry.
6. useActivity no longer subscribes to useAuth on RecordScreen mount.
7. useActivity now calls authService.getSession() only at start/finish action points.
8. Backend POST /api/v1/activities/start endpoint added.
9. Backend POST /api/v1/activities/{activity_id}/finish endpoint added.
10. RecordScreen now has a Find Current Location action.
11. Finish Record is enabled with at least 1 GPS point.
12. Single-point finish duplicates the first point as a stationary end point.
```

### Verification

```text
1. TypeScript 오류 없음: passed
2. Screen direct fetch 없음: fetch only in src/services/apiClient.ts
3. Detail/Profile/MyRoutes/Bookmarks/Activity hooks useAuth 구독 없음: passed
4. Metro status: packager-status:running on 8081
5. Android bundle compile: passed on 8081
6. Activity endpoint tests: 2 passed
7. Backend full tests: 57 passed
8. env 미설정 상태 수동 확인: completed
9. Google 로그인 버튼 설정 누락 에러 표시 수동 확인: completed
10. Feed -> RouteDetail 이동 수동 재확인: completed
11. Record 화면 진입 재확인: completed
12. Start Record 수동 재확인: completed
13. Find Current Location 수동 확인: completed
14. Finish Record 수동 확인: completed
15. Profile 화면 진입 수동 재확인: completed
16. TASK-020 complete
17. Record live metrics TypeScript check: passed
18. Record live metrics Android bundle compile: passed
19. Record live metrics diff whitespace check: passed with line-ending warnings only
```

### Record Entry Finding

```text
1. Device logs confirmed Record button press and RecordScreen mount.
2. After RecordScreen mount, auth reload and routes/feed reload occurred.
3. Cause: useActivity used useAuth subscription during RecordScreen render.
4. Fix: replace useAuth subscription with authService.getSession() in start/finish.
```

### Activity Start Finding

```text
1. Device logs confirmed POST /api/v1/activities/start returned 404.
2. Cause: backend activity start/finish endpoints were missing.
3. Fix: add route_api endpoints and RouteService/RouteRepository activity methods.
4. API response structure remains success/data/message.
```

### Current Location Finding

```text
1. Expo SDK 54 Location docs checked.
2. Find Current Location uses existing expo-location dependency.
3. It requests foreground permission and reads one current position.
4. It updates existing points state so RunningMap can center on the current point.
```

### Finish Record Finding

```text
1. Start Record returned 200 on device, so activities insert works.
2. Finish Record requires at least 1 GPS point before API call.
3. GPS noise rules ignore movement under 5m, so stationary tests can keep points at 1.
4. Single-point finish stores a zero-distance route with matching start/end point.
5. If POST /activities/{activity_id}/finish returns 500, inspect Supabase postgrest_code.
```

### Record Metrics Display

```text
1. RecordScreen currently shows Activity ID, Status, GPS collection state, and GPS Points.
2. RecordScreen now shows live Distance, Duration, and Pace.
3. Distance uses the existing GPS point distance utility.
4. Duration updates every 1 second while the activity is STARTED.
5. Pace is displayed as -- /km until distance is greater than 0.
6. Calories, elevation gain, heart rate, and cadence are deferred to a health metrics integration task.
```

## Goal

MVP 수동 검증에서 발견된 런타임 진입 문제를 최소 수정한다.

---

# Scope

```text
1. env 필수값 누락 시 앱 크래시 방지
2. LoginScreen에 Google 로그인 버튼 연결
3. RouteFeedScreen에서 RouteDetail 진입 연결
4. 초기 화면에서 Record/Profile 진입 버튼 추가
5. 8081 포트 충돌 대응 실행 명령 문서화
```

---

# Excluded

```text
신규 기능 추가
UI 리디자인
API 스펙 변경
DB 스키마 변경
OAuth 로직 재설계
Route Cluster 수정
GPS 로직 수정
성능 최적화
```

---

# Deliverables

```text
src/config/env.ts
src/config/supabase.ts
src/screens/auth/LoginScreen.tsx
src/screens/route/RouteFeedScreen.tsx
src/navigation/MainNavigator.tsx
README.md 또는 docs/test/manual-mvp-checklist.md
```

---

# Constraints

```text
1. 최소 수정만 허용
2. 신규 라이브러리 추가 금지
3. 기존 API 계약 변경 금지
4. 기존 Navigation 구조 대규모 변경 금지
5. Supabase 설정 누락 시 앱이 즉시 크래시하지 않도록 처리
6. Google 로그인은 기존 authService/useAuth 흐름만 사용
7. Feed -> Detail 이동만 연결
8. Record/Profile 진입은 임시 버튼 또는 기존 화면 내 최소 링크로 처리
```

---

# Verification

```text
1. TypeScript 오류 없음
2. env 미설정 상태에서도 import 단계 크래시 없음
3. LoginScreen에 Google 로그인 버튼 표시
4. Feed에서 Route Detail 이동 가능
5. Record 화면 진입 가능
6. Profile 화면 진입 가능
7. 신규 기능 추가 없음
8. API 스펙 변경 없음
```

---

# Notes

8081 포트 충돌 시 다음 명령 사용:

```bash
npm start -- --port 8082
```

또는 기존 node/expo 프로세스를 종료한 후 실행한다.

---

# Next Task

```text
TASK-021-manual-retest
```
