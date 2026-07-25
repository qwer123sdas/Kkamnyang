---
id: TASK-035
title: 프론트엔드 Profile 및 My Routes
status: ready
area: frontend
feature: profile
priority: medium
depends_on: [TASK-030, TASK-031]
created: 2026-07-01
updated: 2026-07-01
---

# 목적

Profile과 My Routes 프론트엔드 흐름을 확인하고 완성한다.

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

- [ ] Profile 응답 타입을 확인한다.
- [ ] `users/me` 사용 흐름을 확인한다.
- [ ] My Routes Service와 Hook을 확인한다.
- [ ] 로딩, 빈 상태, 오류, 성공 UI 상태를 확인한다.

# 제외 범위

- 프로필 이미지 업로드
- 계정 삭제
- 인증 Provider 관리

# 완료 조건

- [ ] Profile과 My Routes 데이터가 Service와 Hook 계층을 통해 로드된다.
- [ ] 인증 세션 접근이 기존 규칙을 따른다.
- [ ] 변경 파일을 기록했다.
- [ ] 검증 결과를 기록했다.

# 변경 파일

- 시작 전

# 검증 결과

- 미검증

# 남은 이슈

- 구현 전에 현재 화면 스켈레톤과 API 지원 범위를 비교해야 한다.
