---
id: TASK-033
title: 프론트엔드 Route Detail
status: ready
area: frontend
feature: route-detail
priority: high
depends_on: [TASK-030, TASK-032]
created: 2026-07-01
updated: 2026-07-01
---

# 목적

표시되는 경로 메타데이터와 사용자별 좋아요/북마크 상태를 포함해 Route Detail 흐름을 확인하고 완성한다.

# 참고 문서

- [[AGENTS]]
- [[PROJECT]]
- [[docs/HANDOFF]]
- [[docs/source/architecture]]
- [[docs/source/api-spec]]
- [[docs/source/design-system]]
- [[docs/FRONTEND-BOARD]]
- [[docs/task/TASK-030-frontend-common-api-types]]

# 작업 범위

- [ ] Route Detail 응답 타입을 확인한다.
- [ ] Route Detail Service를 확인한다.
- [ ] Route Detail Hook을 확인한다.
- [ ] 지도와 메타데이터 렌더링 상태를 확인한다.

# 제외 범위

- Comment 구현
- Route history
- 유사 경로 추천
- API 응답 구조 변경

# 완료 조건

- [ ] Detail이 Service와 Hook 계층을 통해 로드된다.
- [ ] PRIVATE 또는 권한 없는 경로 동작을 처리한다.
- [ ] 로딩, 빈 상태, 오류 상태를 확인했다.
- [ ] 변경 파일을 기록했다.
- [ ] 검증 결과를 기록했다.

# 변경 파일

- 시작 전

# 검증 결과

- 미검증

# 남은 이슈

- 구현 전에 현재 백엔드 Detail 응답 형식을 확인해야 한다.
