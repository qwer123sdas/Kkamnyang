-- Feed exclusion QA data.
-- Replace <YOUR_USER_ID> and <YOUR_LOGIN_ID> before running.
-- Expected Feed-visible QA row already exists from the public RUN QA insert.

begin;

insert into public.routes (
    user_id,
    title,
    description,
    activity_type,
    visibility,
    encoded_polyline,
    route_geojson,
    start_point,
    end_point,
    distance_km,
    duration_sec,
    created_by,
    updated_by,
    deleted_yn
)
values
(
    '<YOUR_USER_ID>'::uuid,
    'Feed QA Private RUN Route',
    'This route must not appear in public Feed.',
    'RUN',
    'PRIVATE',
    '_p~iF~ps|U_ulLnnqC_mqNvxq`@',
    '{"type":"LineString","coordinates":[[127.030000,37.500000],[127.031000,37.501000]]}'::jsonb,
    'SRID=4326;POINT(127.030000 37.500000)'::extensions.geography,
    'SRID=4326;POINT(127.031000 37.501000)'::extensions.geography,
    0.800,
    300,
    '<YOUR_LOGIN_ID>',
    '<YOUR_LOGIN_ID>',
    'N'
),
(
    '<YOUR_USER_ID>'::uuid,
    'Feed QA Deleted RUN Route',
    'This soft-deleted route must not appear in public Feed.',
    'RUN',
    'PUBLIC',
    '_p~iF~ps|U_ulLnnqC_mqNvxq`@',
    '{"type":"LineString","coordinates":[[127.032000,37.502000],[127.033000,37.503000]]}'::jsonb,
    'SRID=4326;POINT(127.032000 37.502000)'::extensions.geography,
    'SRID=4326;POINT(127.033000 37.503000)'::extensions.geography,
    0.900,
    330,
    '<YOUR_LOGIN_ID>',
    '<YOUR_LOGIN_ID>',
    'Y'
);

insert into public.users (
    login_id,
    email,
    auth_provider,
    provider_user_id,
    nickname,
    created_by,
    updated_by,
    deleted_yn,
    deleted_at
)
values (
    'feedqa_deleted_user',
    null,
    'LOCAL',
    'feedqa_deleted_user',
    'Feed QA Deleted User',
    '<YOUR_LOGIN_ID>',
    '<YOUR_LOGIN_ID>',
    'Y',
    now()
)
on conflict (login_id) do update
set deleted_yn = 'Y',
    deleted_at = now(),
    updated_at = now(),
    updated_by = excluded.updated_by;

insert into public.routes (
    user_id,
    title,
    description,
    activity_type,
    visibility,
    encoded_polyline,
    route_geojson,
    start_point,
    end_point,
    distance_km,
    duration_sec,
    created_by,
    updated_by,
    deleted_yn
)
select
    user_id,
    'Feed QA Deleted User RUN Route',
    'This route by a deleted user must not appear in public Feed.',
    'RUN',
    'PUBLIC',
    '_p~iF~ps|U_ulLnnqC_mqNvxq`@',
    '{"type":"LineString","coordinates":[[127.034000,37.504000],[127.035000,37.505000]]}'::jsonb,
    'SRID=4326;POINT(127.034000 37.504000)'::extensions.geography,
    'SRID=4326;POINT(127.035000 37.505000)'::extensions.geography,
    1.000,
    360,
    '<YOUR_LOGIN_ID>',
    '<YOUR_LOGIN_ID>',
    'N'
from public.users
where login_id = 'feedqa_deleted_user';

commit;

-- These rows must be excluded by the Feed query.
select
    count(*) as excluded_rows_visible_count
from public.routes r
join public.users u on u.user_id = r.user_id
where r.visibility = 'PUBLIC'
  and r.deleted_yn = 'N'
  and r.activity_type = 'RUN'
  and u.deleted_yn = 'N'
  and r.title in (
      'Feed QA Private RUN Route',
      'Feed QA Deleted RUN Route',
      'Feed QA Deleted User RUN Route'
  );

-- Expected result:
-- excluded_rows_visible_count = 0
