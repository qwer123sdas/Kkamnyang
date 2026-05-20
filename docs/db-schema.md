# DB Schema

## 1. 공통 규칙

### DB

- PostgreSQL
- Supabase 사용
- PostGIS 사용 예정

### PK 규칙

| 테이블 | PK |
|---|---|
| users | user_id UUID |
| routes | route_id BIGSERIAL |
| activities | activity_id BIGSERIAL |
| route_likes | like_id BIGSERIAL |
| route_comments | comment_id BIGSERIAL |
| route_bookmarks | bookmark_id BIGSERIAL |

### Audit 컬럼

모든 테이블에 포함한다.

| 컬럼 | 타입 | 설명 |
|---|---|---|
| created_at | timestamptz | 생성일시 |
| created_by | varchar(30) | 생성자 login_id |
| updated_at | timestamptz | 수정일시 |
| updated_by | varchar(30) | 수정자 login_id |

### Soft Delete 컬럼

모든 주요 테이블에 포함한다.

| 컬럼 | 타입 | 설명 |
|---|---|---|
| deleted_yn | char(1) | 삭제 여부 Y/N |
| deleted_at | timestamptz | 삭제일시 |

기본값:

```sql
deleted_yn default 'N'