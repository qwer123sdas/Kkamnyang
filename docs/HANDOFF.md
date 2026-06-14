# RouteLog HANDOFF

## 2026-06-10 최신 요약

### 현재 QA 기준 흐름

```text
로그인
-> RouteFeed
-> RouteCard / 상세 열기
-> RouteDetail
-> 댓글 / 유사 경로 / 히스토리
-> Record
-> 기록 시작
-> 현재 위치 찾기
-> 실시간 거리 / 시간 / 페이스
-> 기록 종료
-> Profile
-> My Routes / Bookmarks
-> RouteDetail
```

### 오늘 완료한 작업

TASK-019 기기 테스트 / 유사 경로-히스토리:

```text
1. 사용자가 Supabase에서 docs/test/route-similar-history-qa.sql을 실행했다.
2. Android 기기에서 Similar Routes QA를 완료했다.
3. Android 기기에서 Route History QA를 완료했다.
4. Android 기기에서 FINISHED activity 표시 QA를 완료했다.
5. docs/task/TASK-019-device-test.md에 TASK-019 완료 상태를 반영했다.
```

TASK-020 런타임 수정:

```text
1. Record 화면 진입 문제를 수정했다.
2. useActivity가 RecordScreen 렌더링 중 useAuth를 구독하지 않도록 수정했다.
3. Activity 시작 API를 추가했다: POST /api/v1/activities/start.
4. Activity 종료 API를 추가했다: POST /api/v1/activities/{activity_id}/finish.
5. 기기에서 Start Record가 200을 반환하는 것을 확인했다.
6. GPS point가 1개 이상이면 Finish Record가 가능하다.
7. GPS point 1개로 종료할 때 첫 점을 정지 종료점으로 복제해 0km route를 저장한다.
8. Record 화면에 Find Current Location 액션을 추가했다.
9. Google Maps API key가 없을 때 Record map fallback을 표시해 crash를 방지한다.
10. docs/task/TASK-020-runtime-fix.md에 TASK-020 완료 상태를 반영했다.
```

Record 실시간 지표:

```text
1. Record 화면에 Distance를 표시한다.
2. Record 화면에 Duration을 표시한다.
3. Record 화면에 Pace를 표시한다.
4. activity status가 STARTED인 동안 Duration은 1초마다 갱신된다.
5. Distance는 기존 GPS point 거리 계산을 사용한다.
6. 거리가 0보다 커지기 전까지 Pace는 -- /km로 표시된다.
7. 사용자가 기기에서 Record 실시간 지표 UI를 확인했다.
```

건강 지표 로드맵:

```text
1. 심박수와 케이던스는 최종 목표 지표다.
2. 칼로리와 고도상승은 후속 희망 지표다.
3. HealthKit / Health Connect / BLE 연동은 별도 문서에 정리했다.
4. 건강 지표를 위한 DB 스키마 변경은 아직 적용하지 않았다.
5. 로드맵 문서가 추가되었다: docs/task/TASK-025-health-metrics-roadmap.md.
```

### 중요한 동작 기준

```text
1. 유사 경로는 기존 routes.route_cluster_id를 사용한다.
2. 같은 cluster에 속한 route의 similarity_score는 100으로 반환한다.
3. History는 status=FINISHED이고 deleted_yn=N인 activities row를 사용한다.
4. Record 종료는 시작 직후라도 GPS point가 1개 이상이면 가능하다.
5. GPS point 1개로 Record를 종료하면 첫 점을 정지 종료점으로 복제한다.
6. GPS 노이즈 규칙은 계속 유지된다: 5m 미만 이동 무시, 40km/h 초과 속도 제거.
7. Record 실시간 지표는 UI 표시용이며 API 응답 구조를 변경하지 않는다.
8. 심박수와 케이던스는 GPS만으로는 제공할 수 없다.
9. 건강 플랫폼 연동은 별도 설계와 native build 계획이 필요하다.
```

### 사용자가 완료한 DB 작업

사용자는 DB를 직접 수정할 수 있다.

DDL 참조 문서:

```text
docs/db/db_ddl.md
```

QA seed SQL:

```text
docs/test/route-similar-history-qa.sql
```

사용자가 이미 확인한 내용:

```text
1. route-similar-history QA SQL을 Supabase에서 실행했다.
2. Similar Routes QA가 통과했다.
3. History QA가 통과했다.
4. FINISHED activity 표시 QA가 통과했다.
```

Record 실시간 지표와 건강 지표 작업을 위해 새로 적용한 DB 작업은 없다.

### 변경 파일

Backend:

```text
backend/api/route_api.py
backend/services/route_service.py
backend/repositories/route_repository.py
backend/tests/test_route_feed.py
```

Frontend:

```text
kkamyang-app/src/components/map/RunningMap.tsx
kkamyang-app/src/hooks/useActivity.ts
kkamyang-app/src/hooks/useAuth.ts
kkamyang-app/src/hooks/useGPSRecorder.ts
kkamyang-app/src/screens/record/RecordScreen.tsx
```

Docs:

```text
docs/HANDOFF.md
docs/task/TASK-019-device-test.md
docs/task/TASK-020-runtime-fix.md
docs/task/TASK-025-health-metrics-roadmap.md
docs/test/manual-mvp-checklist.md
```

### 완료된 검증

Backend:

```powershell
python -m pytest backend\tests -q
```

결과:

```text
57 passed
```

Frontend:

```powershell
npx.cmd tsc --noEmit
```

결과:

```text
passed
```

Android bundle compile:

```powershell
Invoke-WebRequest -UseBasicParsing -Uri "http://127.0.0.1:8081/index.bundle?platform=android&dev=true&minify=false" | Select-Object StatusCode
```

결과:

```text
StatusCode 200
```

Diff check:

```powershell
git diff --check
```

결과:

```text
공백 오류 없음.
CRLF 변환 경고만 있음.
```

사용자가 기기에서 확인한 수동 QA:

```text
1. Similar Routes 표시 확인.
2. History 표시 확인.
3. FINISHED activity 표시 확인.
4. Record 화면 진입 확인.
5. Start Record 동작 확인.
6. Find Current Location 동작 확인.
7. Finish Record 동작 확인.
8. Record 실시간 Distance / Duration / Pace UI 동작 확인.
```

### 다음에 실행할 QA

TASK-019와 TASK-020에 남은 QA는 없다.

Skeleton 이후 backend 작업은 TASK-025까지 완료된 기준으로 본다.

다음 QA는 frontend-backend 통합 안정화 이후 Android 실기기 회귀 QA로 진행한다.

```text
1. TASK-026에서 Login -> users/me -> Feed -> Detail -> Record -> Profile 통합 흐름을 안정화한다.
2. TASK-027에서 Android 실기기 기준 MVP 회귀 QA를 수행한다.
3. TASK-028에서 검증된 화면 흐름을 기준으로 Google Stitch UX/UI 방향을 정의한다.
4. 건강 지표 spike는 UX/UI 기준 정리 이후 별도 task로 진행한다.
```

### QA가 다시 실패할 경우

Record:

```text
Start 실패
-> POST /api/v1/activities/start 응답 status와 backend log를 확인한다.

Finish 실패
-> POST /api/v1/activities/{activity_id}/finish 응답 status를 확인한다.
-> Finish Record를 누르기 전에 GPS point가 1개 이상 있는지 확인한다.

현재 위치 찾기 실패
-> 기기에서 foreground location permission이 허용되었는지 확인한다.

Distance가 계속 0
-> 이동 거리가 GPS_MIN_DISTANCE_M보다 큰지 확인한다. 현재 기준은 5m다.

Pace가 계속 -- /km
-> 거리가 0보다 커지기 전까지는 정상 동작이다.
```

Similar / History:

```text
Supabase routes request failed status=... postgrest_code=...
```

해석:

```text
PGRST204/PGRST205
-> schema/cache 누락 가능성이 높다. DDL 적용 또는 notify reload가 필요할 수 있다.

그 외 postgrest_code
-> 해당 code에 맞는 query 실패 원인을 확인한다.

postgrest_code 없는 500
-> network/config/Supabase 접근 문제를 확인한다.
```

### 유지해야 할 규칙

```text
1. .env 실제 값을 읽거나, 출력하거나, 요약하지 않는다.
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

### 다음 작업

다음 task:

```text
TASK-026-frontend-backend-integration
```

구체적인 다음 단계:

```text
1. frontend 서비스와 backend endpoint 연결 상태를 확인한다.
2. Google OAuth -> Supabase session -> GET /api/v1/users/me 흐름을 확인한다.
3. Android 실기기에서 PC backend에 접근 가능한지 확인한다.
4. Feed / Detail / Record / Profile 화면의 실제 API 연결을 확인한다.
5. TASK-027-mobile-manual-qa-regression으로 회귀 QA를 수행한다.
6. TASK-028-stitch-ux-ui-direction 기준으로 Google Stitch UX/UI 작업을 진행한다.
7. 건강 지표 spike는 이후 별도 task로 재개한다.
```

추가 문서:

```text
docs/frontend-backend-contract.md
docs/task/TASK-026-frontend-backend-integration.md
docs/task/TASK-027-mobile-manual-qa-regression.md
docs/task/TASK-028-stitch-ux-ui-direction.md
```

### 정리 참고

Pytest가 tracked `__pycache__` 파일을 수정할 수 있다.

```text
해당 파일들은 기능 변경이 아니다.
commit 전에는 tracked __pycache__ 변경만 제외하거나 restore한다.
```
