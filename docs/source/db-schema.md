# DB Schema

## 문서 역할

이 문서는 RouteLog 데이터베이스의 공통 스키마 정책과 주요 테이블 목록을 관리한다.
실행 가능한 전체 생성·변경 SQL을 복제하지 않는다.

```text
공통 PK/Audit/Soft Delete 정책 -> 이 문서
현재 생성 SQL과 초기 데이터    -> docs/db/db_dml.md
증분 DDL과 검증 SQL            -> docs/db/db_ddl.md
```

문서와 SQL이 다르면 임의로 스키마를 변경하지 않고 관련 Task에 불일치를 기록한다.
승인된 DB 변경만 이 문서와 관련 SQL에 함께 반영한다.

2026-07-26 정적 정합성 감사 결과와 문서 분리 결정은 [[docs/task/TASK-039-db-document-consistency]]에서 확인한다.
현재 SQL에는 기준 스키마와 증분/QA SQL 중복 및 PostGIS 스키마 표기 차이가 있으므로 실제 DB 확인 없이 재실행하지 않는다.

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
```

---

## 2. 주요 테이블

| 테이블 | 역할 |
|---|---|
| `login_provider` | 로그인 제공자 코드 |
| `users` | 사용자와 공개 식별자 |
| `routes` | 저장·공유되는 운동 경로 |
| `route_clusters` | 유사 Route 그룹 |
| `activities` | 사용자의 Route 실행 기록 |
| `route_likes` | Route 좋아요 |
| `route_comments` | Route 댓글 |
| `route_bookmarks` | Route 북마크 |

정확한 컬럼, 타입, FK, 인덱스와 지리 데이터 정의는 [[docs/db/db_ddl]]과 [[docs/db/db_dml]]에서 확인한다.
`route_cluster` 판정 기준과 Activity 기반 Route History 규칙은 [[AGENTS]]를 따른다.

---

## 관련 문서

- [[AGENTS]]
- [[PROJECT]]
- [[docs/source/requirements]]
- [[docs/source/architecture]]
- [[docs/db/db_ddl]]
- [[docs/db/db_dml]]
- [[HANDOFF]]
- [[docs/FRONTEND-BOARD]]
- [[todo]]
