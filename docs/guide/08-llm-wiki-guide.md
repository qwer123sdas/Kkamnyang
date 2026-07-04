# LLM WIKI 가이드

이 문서는 AI가 읽기 좋은 프로젝트 지식베이스를 유지하는 방법을 정의한다.

## 목적

LLM WIKI 계층은 Codex와 다른 AI 도구가 다음 질문에 빠르게 답할 수 있게 해야 한다.

- 이 프로젝트는 무엇인가?
- 현재 MVP 범위는 무엇인가?
- 어떤 문서를 먼저 읽어야 하는가?
- 특정 기능과 관련된 파일은 무엇인가?
- 무엇을 변경하면 안 되는가?

## 핵심 규칙

- 기존 문서를 보존한다.
- 긴 중복 요약보다 짧은 인덱스 문서를 우선한다.
- 원본 문서를 복사하지 말고 링크한다.
- 기능 가이드는 탐색과 경계에 집중한다.
- Secret이나 실제 환경변수 값을 저장하지 않는다.
- 추측하지 말고 불확실성을 표시한다.

## 필수 프로젝트 사실

- KKamyang은 작업공간이다.
- RouteLog는 제품이다.
- MVP 활동 유형은 `RUN`이다.
- `RIDE`, `HIKE`는 향후 확장 항목이다.
- 프론트엔드 흐름은 `Screen -> Hook -> Service -> apiClient`다.
- 백엔드 흐름은 `API -> Service -> Repository -> Database`다.

## AI 권장 읽기 순서

```text
AGENTS.md
-> README.md
-> HANDOFF.md
-> docs/00-index.md
-> docs/01-overview.md
-> related docs/feature/*.md
-> related docs/task/TASK-*.md
-> source code
```

## 기능 가이드 규칙

각 기능 가이드는 다음을 포함한다.

- 범위
- MVP 우선순위
- 프론트엔드 파일
- 백엔드 파일
- 관련 Task 문서
- 변경 금지 메모

## 정보가 충돌할 때

문서와 코드가 충돌하면 다음 순서를 따른다.

1. 기록을 조용히 덮어쓰지 않는다.
2. 관련 Task 또는 분석 메모에 충돌 내용을 기록한다.
3. 최신 Task 문서가 오래된 메모를 명확히 대체한다면 최신 Task 문서를 우선한다.
4. 올바른 기준이 애매하면 사용자에게 질문한다.
