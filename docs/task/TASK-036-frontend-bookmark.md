---
id: TASK-036
title: 프론트엔드 Bookmark
status: ready
area: frontend
feature: bookmark
priority: medium
depends_on: [TASK-030, TASK-031, TASK-033]
created: 2026-07-01
updated: 2026-07-01
---

# 목적

Bookmark 생성, 취소, My Bookmarks 프론트엔드 흐름을 확인하고 완성한다.

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

- [ ] Bookmark Service 메서드를 확인한다.
- [ ] Bookmark Hook 동작을 확인한다.
- [ ] Route Detail의 Bookmark 상태를 확인한다.
- [ ] My Bookmarks 목록 상태를 확인한다.

# 제외 범위

- 추천 로직
- 오프라인 동기화
- 백엔드 endpoint 변경

# 완료 조건

- [ ] 중복 요청 없이 Bookmark 상태 변경이 반영된다.
- [ ] My Bookmarks 목록을 확인했다.
- [ ] 변경 파일을 기록했다.
- [ ] 검증 결과를 기록했다.

# 변경 파일

- 시작 전

# 검증 결과

- 미검증

# 남은 이슈

- 현재 백엔드 count 및 boolean 상태 동작을 확인해야 한다.
