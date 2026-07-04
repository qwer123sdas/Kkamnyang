# 문서 인덱스

이 문서는 KKamyang / RouteLog 문서 구조의 최상위 진입점이다.
기존 문서를 대체하지 않고, 현재 폴더 구조에 맞게 주요 문서 위치를 연결한다.

## 프로젝트 진입점

- 루트 가이드: `../README.md`
- 루트 인수인계: `../HANDOFF.md`
- Agent 규칙: `../AGENTS.md`
- 작업 가이드: `../work_guide.md`
- 상세 인수인계: `HANDOFF.md`

## 운영 가이드

- `guide/01-overview.md` - 프로젝트 범위와 MVP 경계
- `guide/02-architecture.md` - 아키텍처 탐색과 코드 흐름
- `guide/03-api-spec.md` - API 문서 진입점ㅋ
- `guide/04-db-schema.md` - DB 문서 진입점
- `guide/05-decisions.md` - 의사결정 기록
- `guide/06-error-log.md` - 오류 및 이슈 기록
- `guide/07-codex-prompts.md` - 재사용 가능한 Codex 프롬프트
- `guide/08-llm-wiki-guide.md` - AI가 읽기 좋은 지식베이스 운영 규칙
- `guide/09-graphify-guide.md` - graphify 운영 규칙

## 원본 문서

- `source/requirements.md`
- `source/architecture.md`
- `source/api-spec.md`
- `source/frontend-backend-contract.md`
- `source/db-schema.md`
- `source/design-system.md`

## 기능 문서

- `feature/auth.md`
- `feature/running.md`
- `feature/route-feed.md`
- `feature/route-detail.md`
- `feature/profile.md`

## Task 문서

Task 문서는 `task/` 아래에 유지한다.
문서 정리 작업 중 기존 Task 문서를 이름 변경하거나 삭제하지 않는다.

## DB 문서

- `db/db_ddl.md`
- `db/db_dml.md`

## 테스트 문서

- `test/manual-mvp-checklist.md`
- `test/feed-exclusion-qa.sql`
- `test/route-similar-history-qa.sql`

## Graphify 산출물

graphify 및 코드/문서 분석 산출물은 `graph/`에 보관한다.
자세한 규칙은 `guide/09-graphify-guide.md`와 `graph/README.md`를 확인한다.

## 보관 문서

이전 진입 문서 또는 중복된 색인 문서는 `archive-or-legacy/`에 보관한다.
보관 문서는 삭제하지 않고, 필요할 때 참조한다.


이 프로젝트의 Obsidian/LLM WIKI 관리 범위는 docs/를 중심으로 한다. 
단, AGENTS.md, README.md, HANDOFF.md, work_guide.md는 루트 운영 문서로 링크 참조한다.