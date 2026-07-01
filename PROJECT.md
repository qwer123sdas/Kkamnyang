# RouteLog 프로젝트

## 현재 상태

- 백엔드 MVP API와 프론트엔드 연동 작업이 진행 중이다.
- 현재 우선순위는 프론트엔드 완성, 안정적인 백엔드 연동, 실기기 QA다.
- MVP 활동 타입은 `RUN`만 지원한다.

## 핵심 문서

- [[AGENTS]]
- [[docs/HANDOFF]]
- [[docs/architecture]]
- [[docs/api-spec]]
- [[docs/db-schema]]
- [[docs/design-system]]

## 작업 관리

- [[docs/FRONTEND-BOARD]]
- [[todo]]

## 프론트엔드 TASK 순서

- [[docs/task/TASK-030-frontend-common-api-types]]
- [[docs/task/TASK-031-frontend-auth-flow]]
- [[docs/task/TASK-032-frontend-route-feed]]
- [[docs/task/TASK-033-frontend-route-detail]]
- [[docs/task/TASK-034-frontend-running-record]]
- [[docs/task/TASK-035-frontend-profile]]
- [[docs/task/TASK-036-frontend-bookmark]]
- [[docs/task/TASK-037-frontend-common-states]]
- [[docs/task/TASK-038-frontend-integration-qa]]

## 운영 규칙

- `Screen -> Hook -> Service -> apiClient` 방향을 유지한다.
- Screen에서 백엔드 API를 직접 호출하지 않는다.
- UI 연동 전에 API 응답 타입을 정의하거나 검증한다.
- MVP 범위 밖 기능을 추가하지 않는다.
- 검증 가능한 최소 문서 변경과 구현 변경을 우선한다.
- 승인된 TASK 없이 API 응답 구조, 데이터베이스 스키마, Router 구조, 상태관리 라이브러리를 변경하지 않는다.
