---
id: TASK-034
title: 프론트엔드 러닝 기록
status: completed
area: frontend
feature: record
priority: high
depends_on: [TASK-030, TASK-031]
created: 2026-07-01
updated: 2026-07-26
---

# 목적

`RUN` 활동 시작, GPS 기록, 종료 흐름을 확인하고 완성한다.

# 참고 문서

- [[AGENTS]]
- [[PROJECT]]
- [[docs/archive-or-legacy/HANDOFF-history]]
- [[docs/source/architecture]]
- [[docs/source/api-spec]]
- [[docs/source/db-schema]]
- [[docs/source/design-system]]
- [[docs/FRONTEND-BOARD]]
- [[docs/task/TASK-030-frontend-common-api-types]]

# 작업 범위

- [x] 기록 시작 Service와 Hook 흐름을 확인한다.
- [x] 프로젝트 규칙에 맞춰 GPS 수집 및 필터링 동작을 확인한다.
- [x] 기록 종료 요청 payload를 확인한다.
- [x] 지원되는 환경에서 실시간 지표 동작을 확인한다.

# 제외 범위

- RIDE
- HIKE
- 고급 GPS 분석
- 백엔드 스키마 변경

# 실행 명령

```powershell
npx.cmd tsc --noEmit
python -m pytest backend/tests
```

# 완료 조건

- [x] 지원 환경에서 시작과 종료 흐름을 검증했다.
- [x] GPS 노이즈 규칙을 유지한다.
- [x] Screen 직접 API 호출이 없다.
- [x] 변경 파일을 기록했다.
- [x] 검증 결과를 기록했다.

# 변경 파일

- `kkamyang-app/src/utils/gps.ts`
- `docs/task/TASK-034-frontend-running-record.md`

# 검증 결과

- Expo SDK 54 Location 공식 문서 확인
- `npx.cmd tsc --noEmit`: 통과
- `python -m pytest backend/tests`: 57 passed, 131 warnings
- 활동 시작/종료 API와 1개 GPS point 종료 자동화 테스트 통과
- 3초 수집, 40km/h 초과 제거, 5m 이하 무시 코드 확인
- 기존 `< 5m` 조건을 프로젝트 규칙과 일치하도록 `<= 5m`로 수정

# 남은 이슈

- 위치 권한, 실제 이동 거리, 지도 표시는 환경변수와 실기기가 없어 TASK-038에서 차단 상태로 기록한다.
