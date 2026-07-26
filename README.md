# KKamyang

KKamyang은 GPS 기반 러닝 기록 및 경로 공유 앱 RouteLog의 프로젝트 작업공간이다.

현재 MVP 범위는 `RUN` 중심이다.
`RIDE`, `HIKE`는 향후 확장 항목이며, Task 문서에서 명시하지 않는 한 MVP 의사결정 기준으로 삼지 않는다.

## 시작 지점

먼저 다음 문서를 읽는다.

1. [[AGENTS]]
2. [[HANDOFF]]
3. [[docs/INDEX]]
4. [[docs/guide/08-llm-wiki-guide]]
5. 관련 `docs/task/TASK-*.md`

## 문서 구조

```text
docs/
  INDEX.md
  guide/
    01-overview.md
    02-architecture.md
    03-api-spec.md
    04-db-schema.md
    05-decisions.md
    06-error-log.md
    07-codex-prompts.md
    08-llm-wiki-guide.md
    09-graphify-guide.md
  source/
    requirements.md
    architecture.md
    api-spec.md
    frontend-backend-contract.md
    db-schema.md
    design-system.md
  feature/
  task/
  graph/
  archive-or-legacy/
```

기존 원본 문서는 보존한다.
번호가 붙은 문서는 Task에서 별도 지정하지 않는 한 탐색 및 운영 가이드 역할을 한다.

## 개발 경계

이 저장소는 기존 프로젝트 정책을 따른다.

- Task 범위 없이 프로젝트 구조를 변경하지 않는다.
- Task 범위 없이 DB 스키마를 변경하지 않는다.
- Task 범위 없이 API 응답 구조를 변경하지 않는다.
- Task 범위 없이 Router 구조를 변경하지 않는다.
- Task 범위 없이 라이브러리를 추가하지 않는다.
- `.env` 실제 값을 읽거나 출력하지 않는다.

## 프론트엔드 흐름

프론트엔드 기능은 다음 흐름으로 이해한다.

```text
Screen -> Hook -> Service -> apiClient -> Backend API
```

백엔드 기능은 다음 흐름으로 이해한다.

```text
API -> Service -> Repository -> Database
```
