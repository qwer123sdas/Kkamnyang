# KKamyang Project

## 현재 상태

- 백엔드: 주요 MVP API 구현 완료 단계
- 프론트엔드: 구현 및 백엔드 연동 진행 단계
- 현재 우선순위: 신규 기능보다 프론트엔드 완성, 안정화, 통합 QA

## 프로젝트 기준 문서

- [[AGENTS]]
- [[HANDOFF]]
- [[docs/architecture]]
- [[docs/api-spec]]
- [[docs/db-schema]]
- [[docs/design-system]]

## 작업 관리

- [[docs/FRONTEND-BOARD]]
- [[todo]]

## 프론트엔드 작업

- [[docs/task/TASK-030-frontend-common-api-types]]
- [[docs/task/TASK-031-frontend-auth-flow]]
- [[docs/task/TASK-032-frontend-route-feed]]
- [[docs/task/TASK-033-frontend-route-detail]]
- [[docs/task/TASK-034-frontend-running-record]]
- [[docs/task/TASK-035-frontend-profile]]
- [[docs/task/TASK-036-frontend-bookmark]]
- [[docs/task/TASK-037-frontend-common-states]]
- [[docs/task/TASK-038-frontend-integration-qa]]

## 핵심 개발 규칙

- Screen → Hook → Service → apiClient 의존 방향을 지킨다.
- Screen에서 직접 `fetch` 또는 HTTP 요청을 하지 않는다.
- API 응답 타입을 먼저 정의한 후 Service, Hook, Screen 순서로 구현한다.
- MVP 범위 밖 기능을 임의로 구현하지 않는다.
- 큰 리팩터링보다 최소 변경과 검증 가능한 작업 단위를 우선한다.
- 현재 단계에서는 RUN 활동만 대상으로 한다.

## MVP 제외 또는 후순위

- Naver OAuth
- Nearby Route
- Route Cluster
- Route History
- Comment
- 추천 알고리즘 고도화
- 실시간 위치 공유

## 권장 작업 순서

1. 공통 API 타입 및 응답 래퍼 점검
2. 인증 및 로그인 ID 설정 흐름 검증
3. Route Feed
4. Route Detail
5. Running Record
6. Profile / My Routes
7. Bookmark
8. 공통 로딩·빈 상태·오류 처리
9. 실기기 통합 QA
