---
id: TASK-040
title: LLM Wiki 최종 정합성 보정
status: completed
area: documentation
feature: llm-wiki
priority: medium
depends_on: [TASK-039]
created: 2026-07-26
updated: 2026-07-26
---

# 목적

[[docs/guide/08-llm-wiki-guide]] 기준으로 템플릿, 인덱스, 기능 가이드, HANDOFF의 링크와 운영 정책 드리프트를 보정한다.

# 작업 범위

- [x] 폴더 경로를 잘못 표현한 Wikilink를 일반 경로로 교정한다.
- [x] TASK 템플릿의 source 링크를 현행화한다.
- [x] 기능 가이드의 필수 항목을 보완한다.
- [x] Task 상태값과 decisions 경로를 단일 기준으로 명시한다.
- [x] 과거 HANDOFF 상태가 현재 상태로 오인되지 않게 표기한다.
- [x] 인덱스 누락과 오타를 수정한다.

# 제외 범위

- 기존 TASK 파일 이동 또는 이름 변경
- 개인 `To-Do/` 문서
- 코드, API, DB 스키마 변경

# 변경 파일

- `.templates/TASK.md`
- `todo.md`
- `HANDOFF.md`
- `docs/archive-or-legacy/HANDOFF-history.md`
- `docs/INDEX.md`
- `docs/guide/08-llm-wiki-guide.md`
- `docs/feature/*.md`
- `docs/source/routelog-design-system.md`
- `docs/task/TASK-040-llm-wiki-final-lint.md`

# 검증 결과

- 폐기된 `docs/decision/` 및 이전 source 링크 검색: 없음
- 폴더 경로용 `[[docs/task]]`, `[[docs/issue]]` 검색: 없음
- 잘못된 `[[...]].md` 표기 검색: 없음
- TASK 템플릿의 source 대상 파일 존재 확인: 모두 존재
- 기능 가이드 필수 제목 확인: 누락 없음
- Task 인덱스 등록 확인: 누락 없음
- `git diff --check`: 통과, 줄 끝 변환 경고만 발생

# 남은 이슈

- `docs/task/TASK-007-record-finish`는 확장자가 없지만 기존 TASK-001~028 파일의 위치와 이름을 유지한다는 정책 때문에 이번 Task에서 이름을 변경하지 않는다.
