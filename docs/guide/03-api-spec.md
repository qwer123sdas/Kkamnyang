# API 작업 가이드

이 문서는 API 명세를 반복하지 않고, API 작업 시 확인할 계약 문서와 변경 절차를 안내한다.

## 판단 기준

- 엔드포인트, 요청·응답 필드, 오류 코드는 [[docs/source/api-spec|API 명세 원문]]을 기준으로 한다.
- 프론트엔드와 백엔드의 계층별 책임과 공통 응답 처리는 [[docs/source/frontend-backend-contract|Frontend Backend Contract]]를 기준으로 한다.
- API 응답 구조와 Router 구조는 명시적인 Task 범위 없이 변경하지 않는다.

## 읽기 경로

```text
관련 Task와 feature 문서
-> docs/source/api-spec.md
-> docs/source/frontend-backend-contract.md
-> Frontend Service / apiClient
-> Backend API / Service / Repository
-> 관련 테스트
```

## 변경 절차

1. 관련 Task가 변경을 허용하는지 확인한다.
2. 영향을 받는 요청, 응답, 오류 및 인증 조건을 확인한다.
3. 구현과 테스트를 변경한다.
4. 공개 계약이 바뀌면 `docs/source/api-spec.md`를 갱신한다.
5. 계층 책임이나 공통 처리 방식이 바뀌면 `docs/source/frontend-backend-contract.md`를 갱신한다.
6. 이 가이드는 탐색 순서나 변경 절차가 바뀐 경우에만 갱신한다.

## 관련 문서

- [[docs/source/api-spec|API 명세 원문]]
- [[docs/source/frontend-backend-contract|Frontend Backend Contract]]
- [[docs/source/architecture|아키텍처 원문]]
