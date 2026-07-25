# 아키텍처 작업 가이드

이 문서는 아키텍처 명세를 복제하지 않고, 구현 전에 확인할 원문과 코드 탐색 순서를 안내한다.

## 현재 적용 요약

```text
Frontend: Screen -> Hook -> Service -> apiClient
Backend:  API -> Service -> Repository -> Database
```

각 계층의 상세 책임, 디렉터리 구조, 데이터 흐름은 [[docs/source/architecture|아키텍처 원문]]을 기준으로 판단한다.
프론트엔드와 백엔드 사이의 요청·응답 책임은 [[docs/source/frontend-backend-contract|Frontend Backend Contract]]에서 확인한다.

## 구현 전 확인 순서

1. [[AGENTS|Agent 작업 규칙]]
2. 관련 `docs/task/TASK-*.md`
3. 관련 `docs/feature/*.md`
4. [[docs/source/architecture|아키텍처 원문]]
5. [[docs/source/frontend-backend-contract|Frontend Backend Contract]]
6. 관련 소스 코드와 테스트

## 코드 탐색 경로

프론트엔드:

```text
Screen
-> Hook
-> Service
-> apiClient
-> 공통 API 타입
```

백엔드:

```text
API
-> Service
-> Repository
-> Database
-> Schema/Test
```

## 변경 시 확인 사항

- Task 범위 밖의 계층, Router, 상태관리 또는 전체 프로젝트 구조를 변경하지 않는다.
- 계층 책임이나 데이터 흐름을 바꿔야 한다면 먼저 관련 Task와 의사결정 문서에 근거를 남긴다.
- 확정된 상세 구조는 이 문서에 복사하지 않고 `docs/source/architecture.md`에 반영한다.
- API 계약이 영향을 받으면 `docs/source/frontend-backend-contract.md`와 `docs/source/api-spec.md`도 확인한다.

## 관련 문서

- [[docs/source/architecture|아키텍처 원문]]
- [[docs/source/frontend-backend-contract|Frontend Backend Contract]]
- [[docs/source/api-spec|API 명세 원문]]
- [[docs/source/db-schema|DB 스키마 원문]]
- [[docs/guide/05-decisions|의사결정 인덱스]]
