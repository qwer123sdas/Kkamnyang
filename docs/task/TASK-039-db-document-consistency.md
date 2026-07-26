---
id: TASK-039
title: DB 문서 역할 및 정합성 감사
status: completed
area: documentation
feature: database
priority: medium
depends_on: []
created: 2026-07-26
updated: 2026-07-26
---

# 목적

[[docs/source/db-schema]], [[docs/db/db_ddl]], [[docs/db/db_dml]]의 역할과 현재 불일치를 조사하고, 스키마를 변경하지 않은 채 후속 정리 기준을 확정한다.

# 작업 범위

- [x] 세 문서의 역할을 조사한다.
- [x] 컬럼, 타입, FK, 인덱스 정합성을 정적 비교한다.
- [x] DDL, 초기 데이터, 검증 SQL의 분리 기준을 결정한다.
- [x] 실제 DB에 접속하지 않고 문서상 불일치를 기록한다.

# 결정

- `docs/source/db-schema.md`: 공통 정책과 주요 테이블 목록
- `docs/db/db_dml.md`: 현재 전체 기준 스키마와 초기 기준 데이터
- `docs/db/db_ddl.md`: 날짜별 증분 DDL, 검증 SQL, QA 전제
- 파일명 `db_dml.md`는 실제 내용과 맞지 않지만 기존 링크 안정성을 위해 이번 Task에서 이름을 변경하지 않는다.
- 향후 승인된 DB 변경 Task에서 기준 스키마와 증분 SQL을 함께 갱신한다.

# 정합성 결과

- PK 타입은 프로젝트 규칙과 세 문서에서 일치한다.
- 주요 테이블의 Audit 및 Soft Delete 컬럼은 기준 스키마에 존재한다.
- `routes.route_cluster_id`, `route_clusters`, `activities` 정의가 `db_dml.md`와 증분 `db_ddl.md`에 중복되어 있다.
- `db_dml.md` 하단에 `db_ddl.md`의 Route Similar/History QA 내용이 복제되어 역할이 혼재되어 있다.
- PostGIS 설치 스키마 표기가 `public` 기본 탐색 경로와 `extensions.geography` 방식으로 혼재한다.
- 실제 Supabase 적용 상태를 확인하지 않았으므로 어느 SQL을 재실행해도 된다고 판단하지 않는다.

# 변경 파일

- `docs/task/TASK-039-db-document-consistency.md`
- `docs/source/db-schema.md`
- `todo.md`

# 검증 결과

- 정적 문서 비교 완료
- DB 스키마 변경 없음
- SQL 실행 없음

# 후속 원칙

중복 SQL 제거, 파일 이름 변경, PostGIS 스키마 통일은 데이터베이스 변경 권한과 실제 Supabase 검사 결과가 포함된 별도 Task에서만 수행한다.
