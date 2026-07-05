# 아키텍처 가이드

이 문서는 아키텍처 작업을 위한 탐색 계층이다.
보존된 아키텍처 원본 문서는 `architecture.md`다.

## 원본 문서

- [[architecture]] : `architecture.md`
- [[frontend-backend-contract]] : `frontend-backend-contract.md`
- [[api-spec|API]] : `api-spec.md`
- [[db-schema|SCHEMA]] : `db-schema.md`

## 프론트엔드 원칙

프론트엔드 코드는 다음 구조를 기준으로 읽고 변경한다.

```text
Screen -> Hook -> Service -> apiClient
```

기대 책임:

- Screen: UI 구성과 사용자 상호작용
- Hook: 화면 상태와 기능 흐름
- Service: API와 맞닿은 기능 함수
- apiClient: 공통 HTTP 경계

명시적인 Task 범위 없이 이 구조를 우회하지 않는다.

## 백엔드 원칙

백엔드 코드는 다음 구조를 기준으로 읽고 변경한다.

```text
API -> Service -> Repository -> Database
```

기대 책임:

- API: 요청/응답 경계
- Service: 비즈니스 규칙과 흐름 조율
- Repository: 영속성 접근
- Database: PostgreSQL/Supabase 스키마와 데이터

## MVP 경계

아키텍처 의사결정은 `RUN`을 우선한다.
`RIDE`, `HIKE`는 향후 확장 경로로 취급한다.

## 변경 규칙

아키텍처에 영향을 주는 코드를 변경하기 전에 다음을 확인한다.

1. `AGENTS.md`
2. 관련 Task 문서
3. `frontend-backend-contract.md`
4. `api-spec.md`
5. 인접 테스트
