# 의사결정 인덱스

이 문서는 의사결정의 본문을 길게 누적하지 않는다.
현재 지켜야 할 핵심 정책과 상세 결정 문서 링크만 관리한다.

## 읽는 방법

- 현재 적용 중인 핵심 정책은 이 문서에서 확인한다.
- 상세 결정 배경과 영향은 월별 결정 로그에서 확인한다.
- 장기 정책 단위 결정은 관련 `docs/guide/` 문서에서 확인한다.

## 월별 결정 로그

- [[docs/decisions/2026/2026-07]] (`docs/decisions/2026/2026-07.md`)

## 관련 정책 문서

- [[docs/guide/01-overview]] (`docs/guide/01-overview.md`)
- [[docs/guide/02-architecture]] (`docs/guide/02-architecture.md`)

## 현재 핵심 정책

- MVP는 `RUN` 중심이다.
- `RIDE`, `HIKE`는 향후 확장 항목이다.
- 프론트엔드는 `Screen -> Hook -> Service -> apiClient` 구조를 따른다.
- 백엔드는 `API -> Service -> Repository -> Database` 구조를 따른다.
- `HANDOFF.md`는 현재 상태와 다음 작업만 짧게 유지한다.
- 상세 결정은 `docs/decisions/YYYY/YYYY-MM.md`에 기록한다.
- 프로젝트 전체 현재 TODO 허브가 필요해질 때만 `docs/todo/current.md`를 만든다.
- 현재 프론트엔드 작업 관리는 `docs/FRONTEND-BOARD.md`를 사용한다.
- 프로젝트 지식 문서에서는 개인 작업 로그로 향하는 링크를 만들지 않는다.

## 기록 규칙

새로운 결정은 다음 기준으로 기록한다.

- 지금 당장 이어받아야 하는 상태: `HANDOFF.md`
- 장기적으로 남길 결정: `docs/decisions/YYYY/YYYY-MM.md`
- 확정된 작업 단위: `docs/task/TASK-*.md`
- 프론트엔드 작업 상태: `docs/FRONTEND-BOARD.md`
- 개인 작업 로그와 AI 대화 흐름: 프로젝트 지식 문서에서 링크하지 않는다.

## 결정 기록 템플릿

```markdown
## YYYY-MM-DD - 결정 제목

### 결정

### 이유

### 영향

### 관련 문서
```
