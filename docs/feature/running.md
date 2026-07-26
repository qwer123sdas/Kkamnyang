# 러닝 기록 기능

## 범위

현재 MVP의 러닝 기록 흐름을 다룬다.

MVP 활동 유형:

```text
RUN
```

향후 활동 유형:

```text
RIDE
HIKE
```

향후 활동 유형은 Task에서 범위를 명시적으로 바꾸지 않는 한 후순위다.

## MVP 우선순위

`RUN`의 시작, GPS 수집, 실시간 지표, 종료 저장 흐름을 우선한다.
`RIDE`, `HIKE`와 건강 지표는 별도 Task 전까지 구현 범위가 아니다.

## GPS 규칙

`RUN` 기준:

```text
수집 주기: 3초
40km/h 초과 속도 제거
5m 이하 거리 변화 무시
```

## 프론트엔드 경로

```text
kkamyang-app/src/screens/record/RecordScreen.tsx
-> kkamyang-app/src/hooks/useGPSRecorder.ts
-> kkamyang-app/src/services/activityService.ts
-> kkamyang-app/src/services/apiClient.ts
```

## 백엔드 경로

```text
backend/api/route_api.py
-> backend/services/route_service.py
-> backend/repositories/route_repository.py
```

## 관련 Task 문서

- `../task/TASK-005-record-start.md`
- `../task/TASK-006-gps-record.md`
- `../task/TASK-007-record-finish`
- `../task/TASK-020-runtime-fix.md`

## 저장 형태

경로 저장은 다음 형태로 이해한다.

```text
encoded_polyline
route_geojson
start_point
end_point
```

## 변경 금지 메모

- GPS 수집 주기, 속도 및 거리 필터 기준은 [[AGENTS]]를 따른다.
- Router, API 응답, DB 스키마를 이 기능 문서만 근거로 변경하지 않는다.
- `docs/task/TASK-007-record-finish`는 확장자가 없는 보존 파일이며 기존 파일명 유지 정책에 따라 이번 문서 정리에서 이름을 변경하지 않는다.
