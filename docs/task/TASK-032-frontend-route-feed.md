---
id: TASK-032
title: 프론트엔드 Route Feed
status: ready
area: frontend
feature: route-feed
priority: high
depends_on: [TASK-030, TASK-031]
created: 2026-07-01
updated: 2026-07-01
---

# 목적

문서화된 백엔드 Feed API를 사용해 프론트엔드 Route Feed 흐름을 확인하고 완성한다.

# 참고 문서

- [[AGENTS]]
- [[PROJECT]]
- [[docs/HANDOFF]]
- [[docs/architecture]]
- [[docs/api-spec]]
- [[docs/design-system]]
- [[docs/FRONTEND-BOARD]]
- [[docs/task/TASK-030-frontend-common-api-types]]

# 작업 범위

- [ ] Feed 응답 타입을 확인한다.
- [ ] Route Feed Service를 확인한다.
- [ ] Route Feed Hook을 확인한다.
- [ ] 로딩, 빈 상태, 오류, 성공 UI 상태를 확인한다.

# 제외 범위

- Nearby Route
- Route Cluster
- Route History
- 추천 알고리즘

# 완료 조건

- [ ] Feed가 Service와 Hook 계층을 통해 로드된다.
- [ ] 페이지네이션 동작을 검증했거나 문서화했다.
- [ ] Screen 직접 API 호출이 없다.
- [ ] 변경 파일을 기록했다.
- [ ] 검증 결과를 기록했다.

# 변경 파일

- 시작 전

# 검증 결과

- 미검증

# 남은 이슈

- 구현 전에 실제 백엔드 응답과 [[docs/api-spec]]를 비교해야 한다.
