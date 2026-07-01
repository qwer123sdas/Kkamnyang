---
id: TASK-034
title: 프론트엔드 러닝 기록
status: ready
area: frontend
feature: record
priority: high
depends_on: [TASK-030, TASK-031]
created: 2026-07-01
updated: 2026-07-01
---

# 목적

`RUN` 활동 시작, GPS 기록, 종료 흐름을 확인하고 완성한다.

# 참고 문서

- [[AGENTS]]
- [[PROJECT]]
- [[docs/HANDOFF]]
- [[docs/architecture]]
- [[docs/api-spec]]
- [[docs/db-schema]]
- [[docs/design-system]]
- [[docs/FRONTEND-BOARD]]
- [[docs/task/TASK-030-frontend-common-api-types]]

# 작업 범위

- [ ] 기록 시작 Service와 Hook 흐름을 확인한다.
- [ ] 프로젝트 규칙에 맞춰 GPS 수집 및 필터링 동작을 확인한다.
- [ ] 기록 종료 요청 payload를 확인한다.
- [ ] 지원되는 환경에서 실시간 지표 동작을 확인한다.

# 제외 범위

- RIDE
- HIKE
- 고급 GPS 분석
- 백엔드 스키마 변경

# 완료 조건

- [ ] 지원 환경에서 시작과 종료 흐름을 검증했다.
- [ ] GPS 노이즈 규칙을 유지한다.
- [ ] Screen 직접 API 호출이 없다.
- [ ] 변경 파일을 기록했다.
- [ ] 검증 결과를 기록했다.

# 변경 파일

- 시작 전

# 검증 결과

- 미검증

# 남은 이슈

- 실기기 동작은 수동 QA가 필요할 수 있다.
