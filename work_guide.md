# RouteLog 작업 원칙 요약

이 문서는 RouteLog 작업의 최소 진입 경로와 작업 경계를 요약한다.
상세 기준은 링크된 현재 문서를 따르며, 작업 이력이나 임시 실행 기록을 이 문서에 누적하지 않는다.

## 문서 읽기 순서

1. [[AGENTS]]
2. [[HANDOFF]]
3. [[docs/INDEX]]
4. 관련 `docs/feature/*.md`
5. 관련 `docs/task/TASK-*.md`
6. 필요한 `docs/source/*.md`와 코드

## 문서 역할

- [[PROJECT]]: 프로젝트 범위와 핵심 작업 순서
- [[HANDOFF]]: 현재 상태, 다음 작업, 차단 사항
- [[docs/INDEX]]: 프로젝트 문서의 최상위 탐색 인덱스
- `docs/guide/`: 현재 적용 요약과 작업 절차
- `docs/source/`: 요구사항, API, DB 등 상세 판단 기준
- `docs/feature/`: 기능별 탐색 경로와 변경 경계
- `docs/task/`: 승인된 작업 범위, 실행 명령, 검증 결과
- `docs/decisions/`: 장기적으로 보존할 결정과 이유
- `docs/archive-or-legacy/`: 현재 기준으로 사용하지 않는 과거 기록

## 구현 흐름

Frontend:

```text
Screen -> Hook -> Service -> apiClient -> Backend API
```

Backend:

```text
API -> Service -> Repository -> Database
```

## 작업 경계

- 명시된 Task 범위 안에서만 코드와 문서를 변경한다.
- API 응답, DB 스키마, Router, 상태관리 구조를 임의로 변경하지 않는다.
- 라이브러리를 임의로 추가하지 않는다.
- 프로젝트 생성, 패키지 설치, 실행 명령은 관련 Task 문서에 기록된 범위만 사용한다.
- `.env`와 `EXPO_PUBLIC_*`의 실제 값을 읽거나 출력하지 않는다.
- 프로젝트 지식과 `My_Note/`의 개인 기록을 분리한다.

## 현재 작업 확인

- 프로젝트 현재 상태: [[HANDOFF]]
- 프론트엔드 상태: [[docs/FRONTEND-BOARD]]
- 장기 결정: [[docs/guide/05-decisions]]
- LLM Wiki 운영 규칙: [[docs/guide/08-llm-wiki-guide]]

오래된 구조나 과거 작업을 확인해야 할 때만 `docs/archive-or-legacy/`를 참고한다.
