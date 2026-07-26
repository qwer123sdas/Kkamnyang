---
id: TASK-041
title: 상세 HANDOFF 보관 전환
status: completed
area: docs
feature: documentation
priority: medium
depends_on: []
created: 2026-07-26
updated: 2026-07-26
---

# 목적

과거 상세 인수인계와 검증 결과를 담은 `docs/HANDOFF.md`를 보관 영역으로 이동하고, 현재 인수인계의 단일 기준을 루트 [[HANDOFF]]로 통일한다.

# 참고 문서

- [[AGENTS]]
- [[PROJECT]]
- [[HANDOFF]]
- [[docs/INDEX]]
- [[docs/guide/08-llm-wiki-guide]]

# 작업 범위

- `docs/HANDOFF.md`를 `docs/archive-or-legacy/HANDOFF-history.md`로 이동한다.
- 현재 운영 문서와 템플릿의 인수인계 링크를 루트 [[HANDOFF]]로 변경한다.
- 과거 작업 기록의 링크는 보관 문서를 가리키도록 변경한다.
- 문서 인덱스와 보관 문서 맵의 설명을 현재 역할에 맞게 변경한다.

# 제외 범위

- 애플리케이션 코드 변경
- API, DB 스키마, Router, 상태관리 구조 변경
- 과거 HANDOFF 본문의 내용 수정 또는 재작성

# 실행 및 검증 명령

```powershell
rg -n --hidden --glob '!.git/**' --glob '!*.env*' "docs/HANDOFF|\[\[docs/HANDOFF" AGENTS.md PROJECT.md README.md HANDOFF.md todo.md .templates docs record To-Do
git diff --check
git status --short
```

# 완료 조건

- [x] 과거 상세 HANDOFF가 `docs/archive-or-legacy/`에 보존된다.
- [x] 현재 운영 규칙은 루트 [[HANDOFF]]만 현재 인수인계로 안내한다.
- [x] `docs/HANDOFF`를 가리키는 활성 링크가 남지 않는다.
- [x] 역사적 참조가 새 보관 경로를 가리킨다.
- [x] 검증 결과와 변경 파일이 기록된다.

# 변경 파일

- `docs/HANDOFF.md` → `docs/archive-or-legacy/HANDOFF-history.md`
- `HANDOFF.md`
- `AGENTS.md`
- `PROJECT.md`
- `todo.md`
- `.templates/TASK.md`
- `docs/INDEX.md`
- `docs/FRONTEND-BOARD.md`
- `docs/archive-or-legacy/00-DOC-MAP.md`
- `docs/guide/08-llm-wiki-guide.md`
- `docs/decisions/2026/2026-07.md`
- `docs/source/*.md`의 HANDOFF 참조 문서
- `docs/task/TASK-014`, `TASK-018`, `TASK-019`, `TASK-030`~`TASK-038`, `TASK-040`
- `My_Note/records/2026/07/2026-07-26_RouteLog - LLM Wiki와 프론트엔드 작업 회고.md`
- `To-Do/2026-07/2026-07-05.md`
- `docs/task/TASK-041-archive-detailed-handoff.md`

# 검증 결과

- 활성 문서의 `[[docs/HANDOFF]]` 링크가 제거되었다.
- 검색 결과에 남은 `docs/HANDOFF` 문자열은 이 Task가 이동 전 경로와 검증 명령을 기록한 부분뿐이다.
- `git diff --check`가 통과했다. 기존 작업 트리 전체에 대한 LF→CRLF 경고만 확인되었다.
- `git status --short`로 이동 대상과 변경 문서를 확인했다.

# 후속 이슈

- 없음
