# TASK-019-device-test

## 2026-06-10 Continuation

### Local Verification

```text
1. Targeted repository tests: 5 passed
2. Backend full tests: 55 passed
3. Frontend TypeScript: passed
4. git diff --check: no whitespace errors
5. Metro status: packager-status:running on 8081
```

### Commands

```powershell
python -m pytest backend\tests\test_route_repository.py -q -k "cluster_column_missing or activities_table_missing or similar or route_history"
python -m pytest backend\tests -q
npx.cmd tsc --noEmit
git diff --check
npm start
```

### Notes

```text
1. Pytest emitted cache write permission warnings, but tests passed.
2. User confirmed docs/test/route-similar-history-qa.sql was already run in Supabase.
3. Android device QA completed.
4. FINISHED activity was verified in History on device.
```

### Final Device QA Result

```text
1. Open route_id=1 detail
2. View History
3. Confirm FINISHED activity appears
4. TASK-019 complete
```

## 2026-06-09 500 Follow-up

### Device QA Finding

```text
1. GET /api/v1/routes/1/similar -> 500
2. GET /api/v1/routes/1/history?page=1&size=20 -> 500
3. Frontend error: INTERNAL_ERROR Supabase database request failed
```

### Root Cause

```text
1. Endpoint routing은 동작한다.
2. Supabase 조회 단계에서 실패한다.
3. similar는 routes.route_cluster_id 또는 route cluster 관련 schema/cache가 준비되지 않으면 실패할 수 있다.
4. history는 activities table 또는 관련 column schema/cache가 준비되지 않으면 실패할 수 있다.
```

### Completed Fix

```text
1. SupabaseRequestError에 postgrest_code 보존
2. PGRST204/PGRST205 schema-missing 계열만 optional feature empty state로 처리
3. similar schema missing -> cluster_id=null, items=[]
4. history schema missing -> items=[]
5. 일반 Supabase 실패는 계속 INTERNAL_ERROR로 유지
```

### Commands

```powershell
python -m pytest backend\tests\test_route_repository.py -q -k "cluster_column_missing or activities_table_missing or similar or route_history"
python -m pytest backend\tests -q
npx.cmd tsc --noEmit
git diff --check
```

### Results

```text
1. Targeted repository tests: 5 passed
2. Backend 전체 테스트: 55 passed
3. Frontend TypeScript: 통과
4. git diff --check: whitespace error 없음, CRLF 경고만 표시
```

## 2026-06-09 Progress

### Device QA Finding

```text
1. View Similar Routes 클릭 시 GET /api/v1/routes/1/similar 404 확인
2. View History 클릭 시 GET /api/v1/routes/1/history?page=1&size=20 404 확인
3. 원인: frontend service/API spec에는 있으나 backend route_api.py endpoint가 없었음
```

### Completed Fix

```text
1. Backend GET /api/v1/routes/{route_id}/similar endpoint 추가
2. Backend GET /api/v1/routes/{route_id}/history endpoint 추가
3. RouteService.get_similar_routes 추가
4. RouteService.get_route_history 추가
5. RouteRepository.list_similar_routes 추가
6. RouteRepository.list_route_history 추가
7. similar는 기존 route_cluster_id 기준 조회만 수행
8. 새 유사도 계산, PostGIS 계산, DB 스키마 변경 없음
9. history는 activities의 FINISHED, deleted_yn=N 기록만 조회
```

### Changed Files

```text
backend/api/route_api.py
backend/services/route_service.py
backend/repositories/route_repository.py
backend/tests/test_route_feed.py
backend/tests/test_route_repository.py
docs/task/TASK-019-device-test.md
docs/HANDOFF.md
```

### Commands

```powershell
python -m pytest backend\tests\test_route_feed.py -q -k "similar or history"
python -m pytest backend\tests\test_route_repository.py -q -k "similar or route_history"
python -m pytest backend\tests\test_route_feed.py backend\tests\test_route_repository.py -q -k "similar or history or route_history"
python -m pytest backend\tests -q
npx.cmd tsc --noEmit
rg -n "similar" backend\api\route_api.py backend\services\route_service.py backend\repositories\route_repository.py kkamyang-app\src\services\routeClusterService.ts
rg -n "history" backend\api\route_api.py backend\services\route_service.py backend\repositories\route_repository.py kkamyang-app\src\services\routeHistoryService.ts
git diff --check
```

### Results

```text
1. Targeted backend tests: 7 passed
2. Backend 전체 테스트: 53 passed
3. Frontend TypeScript: 통과
4. git diff --check: whitespace error 없음, CRLF 경고만 표시
```

## Goal

MVP 기능을 실제 Expo 실행 환경에서 점검한다.

## Scope

- npm start 실행
- Expo Go 또는 시뮬레이터 실행
- 로그인 화면 확인
- 지도 렌더링 확인
- GPS 권한 요청 확인
- 기록 시작/종료 흐름 확인
- 피드/상세/댓글/북마크 화면 접근 확인

## Excluded

- 신규 기능 추가
- UI 리디자인
- DB 스키마 변경
- API 스펙 변경

## Verification

- 앱 실행 성공
- TypeScript 오류 없음
- 지도 화면 오류 없음
- GPS 권한 요청 정상
- 화면 이동 오류 없음
- 런타임 크래시 없음
