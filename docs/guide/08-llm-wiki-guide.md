# LLM Wiki 가이드

이 문서는 AI Agent가 RouteLog 프로젝트 문서 지식 베이스를 읽고 유지하는 방법을 정의한다.
`LLM-Wiki.md`는 참고용 아이디어 문서이며, 그 구조나 내용을 그대로 이 프로젝트에 복사하지 않는다.

이 프로젝트는 이미 `docs/` 아래에 문서 구조를 가지고 있다.
따라서 `docs/`를 프로젝트 Wiki로 간주하고, 별도 Wiki 구조를 만들지 않는다.

## 목적

LLM Wiki 계층은 Codex와 다른 AI 도구가 다음 질문에 빠르게 답할 수 있게 해야 한다.

- 이 프로젝트는 무엇인가?
- 현재 MVP 범위는 무엇인가?
- 어떤 문서를 먼저 읽어야 하는가?
- 특정 기능과 관련된 파일은 무엇인가?
- 무엇을 변경하면 안 되는가?

## 적용 범위

- 기본 Wiki 영역: `docs/`
- 프로젝트 규칙:  [[AGENTS]]
- 현재 인수인계: [[HANDOFF]]
- 과거 상세 인수인계 이력: [[docs/archive-or-legacy/HANDOFF-history]]
- 참고 아이디어 문서: [[LLM-Wiki]]

명시적으로 승인된 Task가 없다면 별도의 `wiki/`, `raw/`, `archive/` 구조를 만들지 않는다.

## 디렉터리 매핑

`LLM-Wiki.md`의 일반 개념은 KKamyang의 기존 위치로 대체한다.

```text
LLM Wiki 개념       KKamyang 대체 위치
-----------------   -----------------------------------------
wiki/               docs/
raw/                docs/source/ + 루트 기준 문서 + 코드
archive/            docs/archive-or-legacy/
index.md            docs/INDEX.md
log.md              HANDOFF.md + docs/task/ + docs/archive-or-legacy/HANDOFF-history.md
schema/rules        AGENTS.md + docs/guide/
```

## 기존 구조 역할

### docs/

`docs/`는 프로젝트의 유지 관리 대상 지식 베이스다.
AI Agent는 Task 범위 안에서 기존 구조에 맞는 문서를 생성하거나 갱신할 수 있다.

별도의 최상위 `wiki/` 디렉터리는 만들지 않는다. `docs/`와 역할이 중복되기 때문이다.

### docs/source/

`docs/source/`는 `LLM-Wiki.md`의 `raw/` 개념을 프로젝트에 맞게 대체한다.

요구사항, 아키텍처, API, DB, 디자인, 프론트엔드-백엔드 계약 같은 기준 문서를 보관한다.
이 문서들은 완전 불변 원본이 아니라 승인된 Task로만 갱신하는 안정적인 기준 자료다.
기준 문서 변경이 Task 범위에 포함된 경우에만 수정한다.

루트의 `PROJECT.md`, `README.md`, `AGENTS.md`, `HANDOFF.md`, `todo.md`도 기준 문서로 취급한다.
`backend/`와 `kkamyang-app/`의 코드는 구현 기준 정보다.

### docs/archive-or-legacy/

`docs/archive-or-legacy/`는 `LLM-Wiki.md`의 `archive/` 개념을 대체한다.

오래되었거나, 중복되었거나, 현재 기본 진입점으로 쓰지 않는 문서를 보존할 때 사용한다.

명시적인 정리 Task가 없다면 기존 문서를 이 폴더로 이동하거나 삭제하지 않는다.

### docs/INDEX.md

[[docs/INDEX]]는 프로젝트 문서 탐색 인덱스다.

장기 유지할 문서를 추가할 때는 기존 인덱스에 필요한 링크만 최소로 추가한다.
서식 통일이나 재분류 목적의 전체 재작성은 하지 않는다.

### HANDOFF와 Task 문서

[[HANDOFF]]와 `docs/task/TASK-*.md`는 현재 작업 흐름과 결과를 기록하고, [[docs/archive-or-legacy/HANDOFF-history]]는 과거 상세 인수인계 이력을 보존한다.

별도의 `log.md`를 만들지 않는다. 작업 결과는 관련 Task 또는 HANDOFF 문서에 연결되어야 한다.

## 핵심 규칙

- 기존 문서 구조를 보존한다.
- 명시적 승인 없이 기존 문서를 이동, 삭제, 대량 재작성하지 않는다.
- 중복 요약 문서를 만들기보다 기존 문서 링크를 우선한다.
- 원본 문서를 복사하지 말고 링크한다.
- 기능 가이드는 탐색과 경계에 집중한다.
- Task별 발견 사항은 먼저 관련 Task 문서에 기록한다.
- 장기 운영 규칙은 `docs/guide/`에 기록한다.
- 프로젝트 의사결정은 `docs/decisions/YYYY/YYYY-MM.md`에 기록한다.
- 현재 상태와 인수인계는 [[HANDOFF]]에 기록한다.
- 불확실한 내용은 추정하지 않고 불확실성을 표시한다.
- `.env` 실제 값이나 Secret은 읽거나, 출력하거나, 요약하거나, 문서에 저장하지 않는다.
- 프로젝트 지식 문서에서는 개인 작업 로그로 향하는 링크를 만들지 않는다.

## 필수 프로젝트 사실

- KKamyang은 작업공간이다.
- RouteLog는 제품명이다.
- MVP 활동 유형은 `RUN`이다.
- `RIDE`, `HIKE`는 향후 확장 항목이다.
- 프론트엔드 흐름은 `Screen -> Hook -> Service -> apiClient`다.
- 백엔드 흐름은 `API -> Service -> Repository -> Database`다.

## AI 권장 읽기 순서

```text
AGENTS.md
-> README.md
-> HANDOFF.md
-> docs/INDEX.md
-> 관련 docs/feature/*.md
-> 관련 docs/task/TASK-*.md
-> source code
```

## 토큰 절약 규칙

Codex는 기본적으로 다음 문서만 읽는다.

1. [[AGENTS]].md
2. [[HANDOFF]]
3. [[docs/INDEX]]
4. 관련 feature 문서
5. 관련 task 문서

다음 문서는 필요할 때만 읽는다.

- docs/guide/[[05-decisions]].md
- `docs/decisions/**`
- `docs/graph/**`
- 개인 작업 로그

개인 작업 로그는 사용자가 명시적으로 요청하지 않는 한 읽지 않는다.
프로젝트 지식 문서에서는 개인 작업 로그로 향하는 링크를 만들지 않는다.

## 기능 가이드 규칙

각 기능 가이드는 다음을 포함한다.

- 범위
- MVP 우선순위
- 프론트엔드 파일
- 백엔드 파일
- 관련 Task 문서
- 변경 금지 메모

## Task 상태값

신규 Task와 frontmatter가 이미 있는 Task의 `status`는 다음 값을 사용한다.

```text
draft
ready
in-progress
completed
completed-with-blockers
```

`completed-with-blockers`는 로컬 범위와 문서화는 완료했지만 실기기, 외부 Provider, 운영 환경처럼 현재 작업자가 해결할 수 없는 검증이 남았을 때만 사용한다.

`TASK-001`부터 이어지는 일부 기존 문서는 frontmatter가 없는 레거시 문서다.
문서 정리만을 목적으로 기존 Task 전체에 frontmatter를 소급 추가하지 않는다.
레거시 Task를 실제 작업 범위에서 갱신할 때는 현재 템플릿에 맞춰 frontmatter를 추가할 수 있다.

## 핵심 문서 검증 정보

API, DB, 프론트엔드-백엔드 계약처럼 구현과 함께 바뀌는 `docs/source/` 문서는 검증 근거를 본문에 남긴다.
불필요한 메타데이터를 모든 문서에 강제하지 않고, 다음 정보 중 실제로 확인한 항목만 기록한다.

- 문서의 역할과 상태
- 마지막으로 정합성을 확인한 날짜
- 근거가 된 Task
- 확인한 코드 또는 테스트 경로
- 아직 실제 환경에서 확인하지 못한 제약

검증하지 않은 날짜나 근거를 추정해서 기록하지 않는다.

## 정기 Lint 체크리스트

문서 추가, 이동 또는 상태 변경 후에는 작업 범위에 맞춰 다음을 확인한다.

- Wikilink 대상 파일이 존재하는가?
- 장기 유지 문서와 신규 Task가 [[docs/INDEX]]에서 누락되지 않았는가?
- 같은 basename을 가진 문서 때문에 짧은 Wikilink가 모호하지 않은가?
- Task `status`가 허용값을 사용하는가?
- [[PROJECT]], [[HANDOFF]], [[docs/FRONTEND-BOARD]]의 현재 상태가 충돌하지 않는가?
- 보관 문서의 이전 경로를 현재 기준 경로처럼 안내하지 않는가?
- 프로젝트 지식 문서가 `My_Note/`의 개인 기록을 기준 문서로 링크하지 않는가?

문서 전용 검증은 링크와 정합성 확인으로 제한한다.
새 실행 명령이 필요하면 관련 Task 문서의 명령 기록 규칙을 먼저 따른다.

## 정보가 충돌할 때

문서와 코드가 충돌하면 다음 순서를 따른다.

1. 기록 없이 조용히 덮어쓰지 않는다.
2. 관련 Task 또는 분석 메모에 충돌 내용을 기록한다.
3. 최신 Task 문서가 오래된 메모를 명확히 대체한다면 최신 Task 문서를 우선한다.
4. 올바른 기준을 판단하기 어렵다면 사용자에게 질문한다.

## 금지

- 생성형 프로젝트 지식 저장을 위한 새 `wiki/` 디렉터리 생성
- 소스 자료 저장을 위한 새 `raw/` 디렉터리 생성
- `docs/archive-or-legacy/`가 있는데 별도 `archive/` 디렉터리 생성
- 승인된 Task 없이 외부 Wiki, 검색, Obsidian, RAG 도구 도입
- `LLM-Wiki.md`의 범용 구조를 이 프로젝트에 그대로 적용
- 탐색 링크 추가 범위를 넘는 `docs/INDEX.md` 재작성
