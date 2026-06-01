# TASK-024-social-user-identity-stabilization

## Goal

소셜 회원 생성 시 공개 가능한 자동 `login_id`를 저장하고 로그인 제공자를 참조 테이블로 관리한다.

## Scope

```text
1. login_provider 관리 테이블 추가
2. users.auth_provider를 login_provider FK로 연결
3. created_by, updated_by를 문자열 audit actor 기준으로 유지
4. 기존 null 테스트 row 삭제
5. 소셜 회원 login_id 자동 생성
6. Google OAuth users 생성 흐름 검증
```

## Policy

```text
소셜 회원 login_id = social_ + Supabase Auth UUID hex 앞 23자리
created_by = login_id
updated_by = login_id
초기 시스템 데이터 actor = SYSTEM
email은 email 컬럼에만 저장
```

## Supabase SQL

실행 전 영향 row를 확인한다.

```sql
select user_id, login_id, created_by, updated_by
from public.users
where login_id is null
   or created_by is null
   or updated_by is null;
```

현재 MVP 테스트 row만 존재하는 것을 확인한 후 실행한다.

```sql
delete from public.users
where login_id is null
   or created_by is null
   or updated_by is null;

alter table public.users
add column if not exists auth_provider varchar(20);

alter table public.users
alter column auth_provider type varchar(20),
alter column created_by type varchar(50),
alter column updated_by type varchar(50);

alter table public.users
alter column login_id set not null,
alter column created_by set not null,
alter column updated_by set not null,
alter column auth_provider set not null;

create table if not exists public.login_provider (
    provider_code varchar(20) primary key,
    is_active boolean not null default true,
    sort_order integer not null default 0,
    created_at timestamptz not null default now(),
    created_by varchar(50) not null,
    updated_at timestamptz not null default now(),
    updated_by varchar(50) not null
);

comment on table public.login_provider
is '로그인 제공자 관리 테이블';

comment on column public.login_provider.provider_code
is '로그인 제공자 코드';

comment on column public.login_provider.is_active
is '사용 여부';

comment on column public.login_provider.sort_order
is '정렬 순서';

insert into public.login_provider (
    provider_code,
    created_by,
    updated_by
)
values
    ('GOOGLE', 'SYSTEM', 'SYSTEM'),
    ('NAVER', 'SYSTEM', 'SYSTEM'),
    ('LOCAL', 'SYSTEM', 'SYSTEM')
on conflict (provider_code) do nothing;
```

기존 CHECK 제약조건 존재 여부를 확인한다.

```sql
select conname, pg_get_constraintdef(oid)
from pg_constraint
where conrelid = 'public.users'::regclass
  and contype = 'c';
```

기존 CHECK를 제거하고 FK를 생성한다.

```sql
alter table public.users
drop constraint if exists users_auth_provider_check;

alter table public.users
add constraint fk_users_login_provider
foreign key (auth_provider)
references public.login_provider(provider_code);

notify pgrst, 'reload schema';
```

주의:

```text
null row 외 기존 데이터가 있으면 삭제하지 않는다.
기존 CHECK 이름이 다르면 조회 결과의 실제 이름으로 제거한다.
fk_users_login_provider가 이미 존재하면 FK 추가 문장은 다시 실행하지 않는다.
```

## Commands

패키지 설치 명령은 사용하지 않는다.

Test:

```bash
python -m pytest backend/tests
```

## Verification

```text
1. 신규 Google OAuth 로그인
2. GET /api/v1/users/me 200 확인
3. users.login_id가 social_ 접두사를 갖는지 확인
4. users.auth_provider가 GOOGLE인지 확인
5. users.created_by, users.updated_by가 login_id와 같은지 확인
6. 이메일이 login_id 또는 audit 컬럼에 저장되지 않았는지 확인
7. fk_users_login_provider 존재 확인
```
