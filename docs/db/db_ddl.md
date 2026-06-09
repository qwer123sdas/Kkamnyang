# RouteLog DB DDL Notes

## 2026-06-09 Route Similar / History QA DDL

### Purpose

```text
1. Support RouteDetail -> View Similar Routes QA
2. Support RouteDetail -> View History QA
3. Link existing routes rows with route_cluster_id
4. Verify route_clusters / activities based endpoints
```

### Schema DDL

Run this in Supabase SQL Editor or an admin DB session.

```sql
create table if not exists public.route_clusters (
  route_cluster_id bigserial primary key,
  representative_route_id bigint,
  activity_type varchar(10) not null,
  route_geojson jsonb,
  center_point geography(Point, 4326),
  route_count integer default 0,
  created_at timestamptz not null default now(),
  created_by varchar(50) not null default 'SYSTEM',
  updated_at timestamptz,
  updated_by varchar(50),
  deleted_yn char(1) default 'N',
  deleted_at timestamptz,
  constraint chk_cluster_type check (activity_type in ('RUN'))
);

alter table public.routes
add column if not exists route_cluster_id bigint;

do $$
begin
  if not exists (
    select 1
    from pg_constraint
    where conname = 'fk_route_cluster'
  ) then
    alter table public.routes
    add constraint fk_route_cluster
    foreign key (route_cluster_id)
    references public.route_clusters(route_cluster_id);
  end if;
end $$;

create table if not exists public.activities (
  activity_id bigserial primary key,
  user_id uuid not null references public.users(user_id),
  route_id bigint references public.routes(route_id),
  activity_type varchar(10) not null,
  started_at timestamptz not null,
  ended_at timestamptz,
  distance_km numeric(8,3),
  duration_sec integer,
  status varchar(20) default 'STARTED',
  created_at timestamptz not null default now(),
  created_by varchar(50) not null default 'SYSTEM',
  updated_at timestamptz,
  updated_by varchar(50),
  deleted_yn char(1) default 'N',
  deleted_at timestamptz,
  constraint chk_activities_type check (activity_type = 'RUN'),
  constraint chk_activities_status check (
    status in ('STARTED', 'FINISHED', 'CANCELED')
  )
);

create index if not exists ix_activities_user
on public.activities(user_id);

create index if not exists ix_activities_route
on public.activities(route_id);

notify pgrst, 'reload schema';
```

### Verification SQL

```sql
select
  table_name
from information_schema.tables
where table_schema = 'public'
  and table_name in ('routes', 'activities', 'route_clusters')
order by table_name;

select
  table_name,
  column_name,
  data_type
from information_schema.columns
where table_schema = 'public'
  and (
    (table_name = 'routes' and column_name in ('route_id', 'route_cluster_id', 'deleted_yn'))
    or
    (table_name = 'activities' and column_name in (
      'activity_id',
      'route_id',
      'status',
      'deleted_yn',
      'distance_km',
      'duration_sec',
      'started_at',
      'ended_at'
    ))
  )
order by table_name, column_name;
```

### QA Data

QA seed data is stored in a separate SQL file.

```text
docs/test/route-similar-history-qa.sql
```

전제:

```text
1. public.route_clusters table exists
2. public.routes.route_cluster_id column exists
3. public.activities table exists
4. public.routes.route_id = 1 exists and deleted_yn = 'N'
```

QA 기대 결과:

```text
1. RouteDetail route_id=1
2. View Similar Routes -> QA Similar RUN Route 표시
3. View History -> FINISHED activity 표시
```

## Reference Queries

### Nearby Public Routes

```sql
select *
from public.routes
where visibility = 'PUBLIC'
  and deleted_yn = 'N'
  and ST_DWithin(
    start_point,
    ST_SetSRID(ST_MakePoint(:lng, :lat), 4326)::geography,
    3000
  )
order by created_at desc;
```

### Soft Delete Route

```sql
update public.routes
set deleted_yn = 'Y',
    deleted_at = now(),
    updated_at = now(),
    updated_by = :login_id
where route_id = :route_id;
```
