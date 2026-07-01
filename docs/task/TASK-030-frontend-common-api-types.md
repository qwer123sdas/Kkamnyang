---
id: TASK-030
title: 프론트엔드 공통 API 타입 및 응답 처리
status: ready
area: frontend
feature: common
priority: high
depends_on: []
created: 2026-07-01
updated: 2026-07-01
---

# 목적

백엔드 공통 응답 형식을 기준으로 프론트엔드 공통 API 응답 타입, 페이지네이션 타입, 오류 처리를 정의하고 검증한다.

# 참고 문서

- [[AGENTS]]
- [[PROJECT]]
- [[docs/HANDOFF]]
- [[docs/architecture]]
- [[docs/api-spec]]
- [[docs/db-schema]]
- [[docs/design-system]]
- [[docs/FRONTEND-BOARD]]

# 작업 범위

- [ ] 기존 API 클라이언트 동작을 확인한다.
- [ ] 공통 성공/오류 응답 타입을 확인한다.
- [ ] 페이지네이션 응답 타입을 확인한다.
- [ ] 프론트엔드 가정과 백엔드 응답의 차이를 문서화한다.

# 제외 범위

- API 응답 구조 변경
- 백엔드 구현
- 신규 상태관리 라이브러리
- 광범위한 리팩토링

# 완료 조건

- [ ] Screen에서 API를 직접 호출하지 않는다.
- [ ] 공통 API 응답 처리가 [[docs/api-spec]]와 일치한다.
- [ ] TypeScript 오류를 해결했거나 문서화했다.
- [ ] 변경 파일을 기록했다.
- [ ] 검증 결과를 기록했다.

# 변경 파일

- 시작 전

# 검증 결과

- 미검증

# 남은 이슈

- 시작 전에 현재 저장소 구현을 비교해야 한다.
