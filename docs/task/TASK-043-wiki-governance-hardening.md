---
id: TASK-043
title: Wiki 운영 정합성 보강
status: completed
area: documentation
feature: llm-wiki
priority: medium
depends_on: [TASK-042]
created: 2026-07-26
updated: 2026-07-26
---

# 목적

RouteLog LLM Wiki의 현재 상태 문서, 인덱스, 레거시 경고, Task 메타데이터 정책과 개인 기록 경로 사이의 드리프트를 줄인다.

# 참고 문서

- [[AGENTS]]
- [[PROJECT]]
- [[HANDOFF]]
- [[docs/INDEX]]
- [[docs/guide/08-llm-wiki-guide]]
- [[My_Note/principles/ai-os-doc-rules]]

# 작업 범위

- 오래된 `work_guide.md`를 현행 문서 체계의 최소 작업 가이드로 교체한다.
- PROJECT, HANDOFF, FRONTEND-BOARD가 같은 현재 상태를 가리키게 한다.
- `docs/INDEX.md`에 최근 Task를 추가한다.
- archive 문서에 과거 기록 경고와 현재 진입점을 명시한다.
- 레거시 Task의 frontmatter 적용 범위를 명시한다.
- 핵심 source 문서의 검증 근거 및 Wiki lint 규칙을 정의한다.
- `My_Note` 실제 경로와 원칙 문서의 예시를 통일한다.

# 제외 범위

- 애플리케이션 코드 변경
- DB 스키마 또는 API 계약 변경
- 기존 Task 전체에 frontmatter 소급 추가
- 빈 `My_Note/index/` 디렉터리 생성

# 실행 및 검증 명령

```powershell
rg --files -g "*.md" -g "!.env*" -g "!node_modules/**" -g "!.git/**"
rg -n "TASK-041|TASK-042|TASK-043" docs/INDEX.md HANDOFF.md
rg -n "docs/00-LLM-ENTRY|docs/architecture.md" docs/archive-or-legacy
git diff --check
git status --short
```

# 완료 조건

- [x] 현재 작업 진입 경로가 하나의 체계로 연결된다.
- [x] 최신 Task가 인덱스에 포함된다.
- [x] 보관 문서를 현재 기준으로 오인하지 않게 경고한다.
- [x] Task frontmatter의 레거시 예외가 명시된다.
- [x] 정기 Wiki lint 기준이 문서화된다.
- [x] `My_Note` 경로 표기가 실제 구조와 일치한다.

# 변경 파일

- `PROJECT.md`
- `README.md`
- `HANDOFF.md`
- `work_guide.md`
- `docs/INDEX.md`
- `docs/guide/08-llm-wiki-guide.md`
- `docs/archive-or-legacy/00-DOC-MAP.md`
- `docs/archive-or-legacy/00-LLM-ENTRY.md`
- `My_Note/principles/ai-os-doc-rules.md`
- `docs/task/TASK-043-wiki-governance-hardening.md`

# 검증 결과

- `docs/INDEX.md`에서 TASK-041, TASK-042, TASK-043 링크를 확인했다.
- archive 문서에 남은 이전 경로는 상단 경고 아래 보존된 과거 내용임을 확인했다.
- `git diff --check`가 통과했다. 기존 작업 트리 전체의 LF→CRLF 안내만 출력되었다.
- 애플리케이션 코드는 변경하지 않으므로 코드 테스트는 실행하지 않는다.

# 남은 이슈

- Android 실기기 end-to-end 검증은 환경 설정 후 별도로 수행한다.
