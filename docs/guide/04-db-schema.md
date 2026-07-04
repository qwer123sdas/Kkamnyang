# DB 스키마 가이드

이 문서는 보존된 DB 문서로 안내하는 가이드다.

## 원본 문서

- `db-schema.md`
- `db/db_ddl.md`
- `db/db_dml.md`

## 프로젝트 규칙

사용자 기본 키:

```text
user_id UUID
```

기타 기본 키:

```text
route_id BIGSERIAL
activity_id BIGSERIAL
comment_id BIGSERIAL
bookmark_id BIGSERIAL
like_id BIGSERIAL
```

공통 감사 컬럼:

```text
created_at
created_by
updated_at
updated_by
```

Soft Delete 컬럼:

```text
deleted_yn
deleted_at
```

## 변경 규칙

명시적인 Task 범위 없이 DB 스키마를 변경하지 않는다.
스키마와 코드가 불일치해 보이면 스키마 파일을 수정하기 전에 분석 메모를 생성하거나 업데이트한다.
