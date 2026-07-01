---
id: TASK-038
title: 프론트엔드 통합 QA
status: ready
area: frontend
feature: qa
priority: high
depends_on: [TASK-030, TASK-031, TASK-032, TASK-033, TASK-034, TASK-035, TASK-036, TASK-037]
created: 2026-07-01
updated: 2026-07-01
---

# 목적

지원되는 개발 환경 또는 실기기 환경에서 로그인부터 기록, Feed, Detail, Profile, Bookmark까지의 주요 MVP 사용자 흐름을 확인한다.

# 참고 문서

- [[AGENTS]]
- [[PROJECT]]
- [[docs/HANDOFF]]
- [[docs/architecture]]
- [[docs/api-spec]]
- [[docs/design-system]]
- [[docs/FRONTEND-BOARD]]

# 작업 범위

- [ ] 앱 시작을 확인한다.
- [ ] 인증/세션 동작을 확인한다.
- [ ] Route Feed와 Detail 흐름을 확인한다.
- [ ] 러닝 기록 흐름을 확인한다.
- [ ] Profile과 Bookmark 흐름을 확인한다.
- [ ] 환경 차단 요인을 기록한다.

# 제외 범위

- 백엔드 기능 개발
- 데이터베이스 스키마 변경
- 근거 없는 TASK 상태 변경

# 완료 조건

- [ ] 전체 MVP 흐름을 검증했거나 차단 요인을 문서화했다.
- [ ] 실행 명령과 결과를 기록했다.
- [ ] 실기기 관련 이슈를 [[docs/issue/ISSUE-001-local-development]] 또는 이 TASK에 기록했다.
- [ ] 검증 후 [[docs/FRONTEND-BOARD]]와 [[docs/HANDOFF]]를 갱신했다.

# 변경 파일

- 시작 전

# 검증 결과

- 미검증

# 남은 이슈

- 실기기 QA는 사용자 확인이 필요할 수 있다.
