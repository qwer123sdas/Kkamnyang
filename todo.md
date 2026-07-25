# RouteLog Obsidian TODO

## 문서 구조

- [x] 루트 프로젝트 인덱스 생성: [[PROJECT]]
- [x] 프론트엔드 보드 생성: [[docs/FRONTEND-BOARD]]
- [x] TASK 템플릿 생성: [[.templates/TASK]]
- [x] 결정 기록 템플릿 생성: [[.templates/DECISION]]
- [x] 결정 기록을 월별 로그와 guide 문서 중심으로 정리
- [x] [[docs/issue]] 아래 이슈 기록 생성
- [x] [[docs/task]] 아래 프론트엔드 `TASK-030`부터 `TASK-038`까지 생성
- [x] 루트 프로젝트 인덱스를 현재 인수인계 문서에 연결: [[docs/HANDOFF]]

## 다음 문서 점검

- [ ] TASK 상태가 바뀌면 [[docs/HANDOFF]]를 함께 갱신한다.
- [ ] [[docs/FRONTEND-BOARD]]의 `진행 중` 항목은 최대 1~2개만 유지한다.
- [ ] TASK를 완료로 이동하기 전에 변경 파일과 검증 결과를 각 TASK에 기록한다.
- [ ] 기존 `TASK-001`부터 `TASK-028`까지의 파일은 현재 위치에 유지한다.

## 프론트엔드 TASK 순서

- [ ] [[docs/task/TASK-030-frontend-common-api-types]]
- [ ] [[docs/task/TASK-031-frontend-auth-flow]]
- [ ] [[docs/task/TASK-032-frontend-route-feed]]
- [ ] [[docs/task/TASK-033-frontend-route-detail]]
- [ ] [[docs/task/TASK-034-frontend-running-record]]
- [ ] [[docs/task/TASK-035-frontend-profile]]
- [ ] [[docs/task/TASK-036-frontend-bookmark]]
- [ ] [[docs/task/TASK-037-frontend-common-states]]
- [ ] [[docs/task/TASK-038-frontend-integration-qa]]

## Source 원본 명세 후속 정리

- [ ] `TASK-001`부터 `TASK-017`까지 남아 있는 이전 문서 경로(`docs/api-spec.md`, `docs/architecture.md`, `docs/db-schema.md`)를 `docs/source/` 기준으로 교정한다.
- [ ] [[docs/source/api-spec]]의 `PLANNED` API마다 구현 근거 Task 또는 보류·폐기 사유를 연결한다.
- [ ] `PLANNED` API를 구현 대상으로 확정하기 전 실제 Router와 기존 Task 범위를 다시 검토한다.
- [ ] [[docs/source/architecture]]에 남아 있는 API 응답, DB 타입, GPS 수치의 상세 복제를 원본 링크 중심으로 축소한다.
- [ ] [[docs/db/db_dml]]에 혼재된 DDL, DML, 검증 SQL의 역할을 조사하고 별도 Task에서 정리 방안을 확정한다.
- [ ] [[docs/source/db-schema]], [[docs/db/db_ddl]], [[docs/db/db_dml]] 사이의 컬럼, 타입, FK, 인덱스 정합성을 검증한다.
- [ ] [[docs/source/design-system]]과 분리된 RouteLog 모바일 디자인 시스템 원문을 TASK-028 및 실제 UI 검증 결과를 기준으로 작성한다.
- [ ] RouteLog 디자인 원문이 확정되면 Lunit 문서는 `REFERENCE` 자료로 유지할지 `docs/archive-or-legacy/`로 이동할지 결정한다.

## 이번 문서 반영 범위 제외

- 프론트엔드 구현
- 백엔드 구현
- 데이터베이스 스키마 변경
- API 응답 구조 변경
- Router 변경
- 상태관리 라이브러리 변경
