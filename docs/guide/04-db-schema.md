# DB 스키마 작업 가이드

이 문서는 컬럼과 데이터 타입을 반복하지 않고, DB 작업 전에 확인할 원문과 변경 절차를 안내한다.

## 판단 기준

- 테이블, PK, Audit 컬럼, Soft Delete 정책은 [[docs/source/db-schema|DB 스키마 원문]]을 기준으로 한다.
- 실제 DDL과 DML은 [[docs/db/db_ddl|DB DDL]], [[docs/db/db_dml|DB DML]]에서 확인한다.
- 프로젝트 공통 DB 제한은 [[AGENTS|Agent 작업 규칙]]을 최우선으로 따른다.

## 확인 순서

```text
AGENTS.md
-> 관련 Task 문서
-> docs/source/db-schema.md
-> docs/db/db_ddl.md
-> docs/db/db_dml.md
-> Backend Schema / Repository
-> 관련 테스트
```

## 변경 절차

1. 명시적인 Task가 스키마 변경을 허용하는지 확인한다.
2. 원본 스키마, DDL, Repository 및 API 영향을 함께 확인한다.
3. 문서와 코드가 다르면 어느 한쪽을 즉시 고치기 전에 불일치를 기록한다.
4. 승인된 변경은 `docs/source/db-schema.md`와 관련 DDL·DML에 반영한다.
5. 이 가이드는 탐색 순서나 변경 절차가 바뀐 경우에만 갱신한다.

## 관련 문서

- [[docs/source/db-schema|DB 스키마 원문]]
- [[docs/db/db_ddl|DB DDL]]
- [[docs/db/db_dml|DB DML]]
- [[docs/source/api-spec|API 명세 원문]]
- [[docs/source/architecture|아키텍처 원문]]
