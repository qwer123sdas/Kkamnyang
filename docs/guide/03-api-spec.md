# API 명세 가이드

이 문서는 보존된 API 원본 문서로 안내하는 가이드다.

## 기준 문서

- [[api-spec|API-SPEC]] : `api-spec.md`
- [[frontend-backend-contract]] : `frontend-backend-contract.md`

## API 정책

- Task 범위 없이 API 응답 구조를 변경하지 않는다.
- Task 범위 없이 Router 구조를 변경하지 않는다.
- 프론트엔드 Service는 백엔드 API 계약과 맞춘다.
- 인증과 사용자 식별 동작은 관련 Task 문서를 먼저 확인한다.

## 읽기 경로

```text
Frontend Service
-> apiClient
-> backend/api
-> backend/services
-> backend/repositories
-> api-spec.md
```

## 문서 업데이트

유효한 Task 범위 안에서 API 동작이 변경되면 다음 순서를 따른다.

1. 관련 Task 문서를 업데이트한다.
2. 공개 계약이 바뀌면 `api-spec.md`를 업데이트한다.
3. 탐색 방식이나 정책이 바뀐 경우에만 이 가이드를 업데이트한다.
