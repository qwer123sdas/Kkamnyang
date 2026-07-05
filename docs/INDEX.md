# 문서 인덱스

이 문서는 KKamyang / RouteLog 문서 구조의 최상위 진입점이다.
Obsidian에서 상위 문서인 이 파일을 열었을 때 하위 문서로 바로 이동할 수 있도록 Wikilink, `[[...]]`, 링크를 사용한다.

---
# 1. 프로젝트 진입점(/docs)

- [[README|루트 README]] : README
- [[HANDOFF|루트 HANDOFF]] : HANDOFF
- [[AGENTS|Agent 규칙]] : PROJECT
- [[work_guide|작업 가이드]] : work_guide
- [[docs/HANDOFF|상세 인수인계 이력]]

## 1.1 HANDOFF 역할

- [[HANDOFF|루트 HANDOFF]]: 현재 상태, 다음 작업, 주의사항, 주요 링크만 담는 짧은 상태판
- [[docs/HANDOFF|docs HANDOFF]]: 과거 상세 인수인계와 검증 결과를 보존하는 이력 문서

---
# 2. 운영 가이드(/guide)

운영 가이드는 작업자가 빠르게 확인해야 하는 현재 적용 규칙과 탐색 경로를 모은다.
긴 원본 명세를 반복하지 않고, 필요한 원본 문서와 결정 문서로 연결하는 역할을 한다.

- [[docs/guide/01-overview|프로젝트 개요]] : 01-overview
- [[docs/guide/02-architecture|아키텍처 가이드]] : 02-architecture
- [[docs/guide/03-api-spec|API 명세 가이드]] : 03-api-spec
- [[docs/guide/04-db-schema|DB 스키마 가이드]] : 04-db-schema
- [[docs/guide/05-decisions|의사결정 인덱스]] : 05-decisions
- [[docs/guide/06-error-log|오류 기록]] : 06-error-log
- [[docs/guide/07-codex-prompts|Codex 프롬프트]] : 07-codex-prompts
- [[docs/guide/08-llm-wiki-guide|LLM WIKI 가이드]] : 08-llm-wiki-guide
- [[docs/guide/09-graphify-guide|Graphify 가이드]] : 09-graphify-guide

## 2.1 현재 작업 상태

현재 진행 중인 작업, 준비된 작업, 완료/차단 상태는 작업판에서 확인한다.

- [[docs/FRONTEND-BOARD|프론트엔드 작업 상태판]]

현재는 `docs/todo/current.md`를 만들지 않는다.
프로젝트 전체 TODO 허브가 필요해질 때만 별도로 추가한다.

## 2.2  의사결정 진입점

현재 지켜야 할 합의는 `docs/guide/05-decisions`에서 확인한다.
결정 배경과 변경 이력은 `docs/decisions/YYYY/YYYY-MM.md`에 기록한다.
확정된 정책은 관련 `docs/guide/` 문서에 반영한다.

  - [[docs/guide/05-decisions|의사결정 인덱스]] : /guide/05-decisions
  - [[docs/decisions/2026/2026-07|2026년 7월 상세 결정 로그]] : decisions/2026/2026-07
  - [[docs/guide/01-overview|프로젝트 개요]] : /guide/01-overview
  - [[docs/guide/02-architecture|아키텍처 가이드]] : /guide/02-architecture
 
---
# 3. 보존 원문 명세(/source)

`/source`는 요구사항, 아키텍처, API, DB, 디자인 시스템의 원본 명세를 보존하는 영역이다.
`/guide`가 작업용 요약과 탐색 경로라면, `/source`는 판단 기준이 되는 상세 원문이다.

작업 중 요약만으로 판단이 부족하거나, 구조/API/DB 기준을 확인해야 할 때 이 문서를 읽는다.

  - [[docs/source/requirements|요구사항 원문]]  : requirements
  - [[docs/source/architecture|아키텍처 원문]] : architecture
  - [[docs/source/api-spec|API 명세 원문]]  : api-spec
  - [[docs/source/frontend-backend-contract|프론트엔드-백엔드 계약 원문]] : frontend-backend-contract
  - [[docs/source/db-schema|DB 스키마 원문]] : db-schema
  - [[docs/source/design-system|디자인 시스템 원문]] : design-system

---
# 4. 기능 문서(/feature)

- [[docs/feature/auth|인증]] : auth
- [[docs/feature/running|러닝 기록]]  : running
- [[docs/feature/route-feed|경로 피드]]  : froute-feed
- [[docs/feature/route-detail|경로 상세]]  : route-detail
- [[docs/feature/profile|프로필]]  : profile

---
# 5. Task 문서(/task)

Task 문서는 `docs/task/` 아래에 유지한다.
문서 정리 작업 중 기존 Task 문서를 이름 변경하거나 삭제하지 않는다.

## 5.1 기존 MVP / 백엔드 / QA Task

- [[docs/task/TASK-001-project-skeleton|TASK-001 프로젝트 스켈레톤]]
- [[docs/task/TASK-002-app-foundation|TASK-002 앱 기반]]
- [[docs/task/TASK-003-auth|TASK-003 인증]]
- [[docs/task/TASK-003A-auth-infra|TASK-003A 인증 인프라]]
- [[docs/task/TASK-004-login-id|TASK-004 login_id]]
- [[docs/task/TASK-005-record-start|TASK-005 기록 시작]]
- [[docs/task/TASK-006-gps-record|TASK-006 GPS 기록]]
- [[docs/task/TASK-007-record-finish|TASK-007 기록 종료]]
- [[docs/task/TASK-008-map-display|TASK-008 지도 표시]]
- [[docs/task/TASK-008A-map-config|TASK-008A 지도 설정]]
- [[docs/task/TASK-009-route-feed|TASK-009 경로 피드]]
- [[docs/task/TASK-010-route-detail|TASK-010 경로 상세]]
- [[docs/task/TASK-011-like-bookmark|TASK-011 좋아요/북마크]]
- [[docs/task/TASK-012-comments|TASK-012 댓글]]
- [[docs/task/TASK-013-route-cluster|TASK-013 경로 클러스터]]
- [[docs/task/TASK-014-route-history|TASK-014 경로 기록]]
- [[docs/task/TASK-015-profile|TASK-015 프로필]]
- [[docs/task/TASK-016-my-routes|TASK-016 내 경로]]
- [[docs/task/TASK-017-bookmarks|TASK-017 북마크]]
- [[docs/task/TASK-018-mvp-stabilization|TASK-018 MVP 안정화]]
- [[docs/task/TASK-019-device-test|TASK-019 디바이스 테스트]]
- [[docs/task/TASK-020-runtime-fix|TASK-020 런타임 수정]]
- [[docs/task/TASK-021-manual-retest|TASK-021 수동 재테스트]]
- [[docs/task/TASK-022-fix-google-login|TASK-022 Google 로그인 수정]]
- [[docs/task/TASK-023-backend-skeleton|TASK-023 백엔드 스켈레톤]]
- [[docs/task/TASK-024-social-user-identity-stabilization|TASK-024 소셜 사용자 식별 안정화]]
- [[docs/task/TASK-025-health-metrics-roadmap|TASK-025 건강 지표 로드맵]]
- [[docs/task/TASK-026-frontend-backend-integration|TASK-026 프론트/백엔드 통합]]
- [[docs/task/TASK-027-mobile-manual-qa-regression|TASK-027 모바일 수동 QA 회귀]]
- [[docs/task/TASK-028-stitch-ux-ui-direction|TASK-028 Stitch UX/UI 방향]]

## 5.2 프론트엔드 Task

- [[docs/task/TASK-030-frontend-common-api-types|TASK-030 프론트엔드 공통 API 타입]]
- [[docs/task/TASK-031-frontend-auth-flow|TASK-031 프론트엔드 인증 흐름]]
- [[docs/task/TASK-032-frontend-route-feed|TASK-032 프론트엔드 경로 피드]]
- [[docs/task/TASK-033-frontend-route-detail|TASK-033 프론트엔드 경로 상세]]
- [[docs/task/TASK-034-frontend-running-record|TASK-034 프론트엔드 러닝 기록]]
- [[docs/task/TASK-035-frontend-profile|TASK-035 프론트엔드 프로필]]
- [[docs/task/TASK-036-frontend-bookmark|TASK-036 프론트엔드 북마크]]
- [[docs/task/TASK-037-frontend-common-states|TASK-037 프론트엔드 공통 상태]]
- [[docs/task/TASK-038-frontend-integration-qa|TASK-038 프론트엔드 통합 QA]]

---
# 6. 계획 / 설계 / 분석 / 보고 문서

- [[docs/01-plan/features/route-feed-backend.plan|Route Feed Backend 계획]]
- [[docs/02-design/features/route-feed-backend.design|Route Feed Backend 설계]]
- [[docs/03-analysis/route-feed-backend.analysis|Route Feed Backend 분석]]
- [[docs/04-report/route-feed-backend.report|Route Feed Backend 보고]]

---
# 7. Issue 문서

- [[docs/issue/ISSUE-001-local-development|로컬 개발 이슈]]

---
# 8. DB 문서

- [[docs/db/db_ddl|DB DDL]]
- [[docs/db/db_dml|DB DML]]

---
# 9. 테스트 문서

- [[docs/test/manual-mvp-checklist|수동 MVP 체크리스트]]

SQL 파일은 Obsidian 링크 대신 경로로 관리한다.

- `docs/test/feed-exclusion-qa.sql`
- `docs/test/route-similar-history-qa.sql`

---
# 10. Graphify 산출물

graphify 및 코드/문서 분석 산출물은 `docs/graph/`에 보관한다.

- [[docs/guide/09-graphify-guide|Graphify 가이드]]
- [[docs/graph/README|Graph 산출물 README]]
- [[docs/graph/graphify-output-guide|Graphify 산출물 가이드]]

---
# 11. 관리 메타 파일

아래 파일은 Obsidian 문서 링크 대상이 아니라 관리용 파일로 경로만 기록한다.

- `docs/.pdca-status.json`
- `docs/graph/.gitkeep`

---
# 12. Superpowers 산출물

- [[docs/superpowers/plans/2026-06-02-route-feed-backend|Route Feed Backend superpowers 계획]]
- [[docs/superpowers/specs/2026-06-02-route-feed-backend-design|Route Feed Backend superpowers 설계]]

---
# 13. 보관 문서

이전 legacy 문서 또는 중복된 색인 문서는 `docs/archive-or-legacy/`에 보관한다.
보관 문서는 삭제하지 않고, 필요할 때도 참고하지 않는다.

- [[docs/archive-or-legacy/00-LLM-ENTRY|이전 LLM 진입 문서]]
- [[docs/archive-or-legacy/00-DOC-MAP|이전 문서 맵]]

---
# 14. 문서 우선순위

`/guide`는 빠르게 읽는 작업 가이드이고, `/source`는 가이드가 참조하는 상세 기준 원문이다.

문서 내용이 충돌할 경우 다음 순서로 판단한다.

```text
AGENTS.md
-> 최신 의사결정 문서
-> 관련 Task 문서
-> /source 원문 명세
-> /guide 작업 가이드
```

최신 의사결정 문서는 `docs/decisions/YYYY/YYYY-MM.md`와 관련 `docs/guide/` 문서를 포함한다.

---
# 15. 운영 범위

이 프로젝트의 Obsidian/LLM WIKI 관리 범위는 `docs/`를 중심으로 한다.
단, `AGENTS.md`, `README.md`, `HANDOFF.md`, `work_guide.md`는 루트 운영 문서로 링크 참조한다.
프로젝트 지식 문서에서는 개인 작업 로그로 향하는 링크를 만들지 않는다.
