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
| created_by | varchar(50) | 생성자 login_id 또는 시스템 actor |
| updated_at | timestamptz | 수정일시 |
| updated_by | varchar(50) | 수정자 login_id 또는 시스템 actor |

Audit actor는 이메일 또는 사람 이름을 저장하지 않는다.

```text
초기 시스템 데이터: SYSTEM
회원 생성 및 사용자 작업: login_id
```

### 사용자 인증 구분

| 컬럼 | 타입 | 설명 |
|---|---|---|
| auth_provider | varchar(20) | login_provider.provider_code FK |

### 로그인 제공자

`login_provider` 테이블에서 로그인 제공자 코드를 관리한다.

| 컬럼 | 타입 | 설명 |
|---|---|---|
| provider_code | varchar(20) | PK, 로그인 제공자 코드 |
| is_active | boolean | 사용 여부, 기본값 `true` |
| sort_order | integer | 정렬 순서, 기본값 `0` |
| created_at | timestamptz | 생성일시 |
| created_by | varchar(50) | 생성자 login_id 또는 `SYSTEM` |
| updated_at | timestamptz | 수정일시 |
| updated_by | varchar(50) | 수정자 login_id 또는 `SYSTEM` |

`login_id` 정책:

```text
소셜 회원: social_ + Supabase Auth UUID hex 앞 23자리
일반 회원: 사용자가 ^[a-z0-9_]{4,30}$ 규칙에 맞춰 설정
```

### Soft Delete 컬럼

모든 주요 테이블에 포함한다.

| 컬럼 | 타입 | 설명 |
|---|---|---|
| deleted_yn | char(1) | 삭제 여부 Y/N |
| deleted_at | timestamptz | 삭제일시 |

기본값:

```sql
deleted_yn default 'N'
