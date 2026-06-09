-- Route similar/history QA data.
-- Prerequisite schema:
-- 1. public.route_clusters table exists.
-- 2. public.routes.route_cluster_id column exists.
-- 3. public.activities table exists.
--
-- Target:
-- - RouteDetail route_id=1
-- - View Similar Routes should show "QA Similar RUN Route"
-- - View History should show one FINISHED activity
--
-- This script does not contain secrets or real user identifiers.
-- It derives user_id/actor from public.routes.route_id = 1.

begin;

do $$
declare
    target_route_id bigint := 1;
    target_user_id uuid;
    target_actor varchar(50);
    target_cluster_id bigint;
    qa_similar_route_id bigint;
begin
    select
        r.user_id,
        coalesce(nullif(r.created_by, ''), 'SYSTEM')
    into
        target_user_id,
        target_actor
    from public.routes r
    where r.route_id = target_route_id
      and r.deleted_yn = 'N';

    if target_user_id is null then
        raise exception 'QA target route_id=% does not exist or is deleted.', target_route_id;
    end if;

    select rc.route_cluster_id
    into target_cluster_id
    from public.route_clusters rc
    where rc.representative_route_id = target_route_id
      and rc.deleted_yn = 'N'
    order by rc.route_cluster_id
    limit 1;

    if target_cluster_id is null then
        insert into public.route_clusters (
            representative_route_id,
            activity_type,
            route_geojson,
            route_count,
            created_by,
            updated_by,
            deleted_yn
        )
        select
            r.route_id,
            r.activity_type,
            r.route_geojson,
            0,
            target_actor,
            target_actor,
            'N'
        from public.routes r
        where r.route_id = target_route_id
        returning route_cluster_id
        into target_cluster_id;
    end if;

    update public.routes
    set route_cluster_id = target_cluster_id,
        updated_at = now(),
        updated_by = target_actor
    where route_id = target_route_id;

    select r.route_id
    into qa_similar_route_id
    from public.routes r
    where r.title = 'QA Similar RUN Route'
      and r.user_id = target_user_id
      and r.deleted_yn = 'N'
    order by r.route_id
    limit 1;

    if qa_similar_route_id is null then
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
            route_cluster_id,
            created_by,
            updated_by,
            deleted_yn
        )
        select
            r.user_id,
            'QA Similar RUN Route',
            'QA route for View Similar Routes device test.',
            r.activity_type,
            'PUBLIC',
            r.encoded_polyline,
            r.route_geojson,
            r.start_point,
            r.end_point,
            coalesce(r.distance_km, 1.000),
            coalesce(r.duration_sec, 600),
            target_cluster_id,
            target_actor,
            target_actor,
            'N'
        from public.routes r
        where r.route_id = target_route_id
        returning route_id
        into qa_similar_route_id;
    else
        update public.routes
        set route_cluster_id = target_cluster_id,
            visibility = 'PUBLIC',
            deleted_yn = 'N',
            deleted_at = null,
            updated_at = now(),
            updated_by = target_actor
        where route_id = qa_similar_route_id;
    end if;

    update public.route_clusters
    set route_count = (
            select count(*)
            from public.routes r
            where r.route_cluster_id = target_cluster_id
              and r.deleted_yn = 'N'
        ),
        updated_at = now(),
        updated_by = target_actor
    where route_cluster_id = target_cluster_id;

    insert into public.activities (
        user_id,
        route_id,
        activity_type,
        started_at,
        ended_at,
        distance_km,
        duration_sec,
        status,
        created_by,
        updated_by,
        deleted_yn
    )
    select
        r.user_id,
        r.route_id,
        r.activity_type,
        now() - interval '45 minutes',
        now() - interval '15 minutes',
        coalesce(r.distance_km, 1.000),
        coalesce(r.duration_sec, 1800),
        'FINISHED',
        target_actor,
        target_actor,
        'N'
    from public.routes r
    where r.route_id = target_route_id
      and not exists (
          select 1
          from public.activities a
          where a.route_id = target_route_id
            and a.status = 'FINISHED'
            and a.deleted_yn = 'N'
            and a.created_by = target_actor
      );
end $$;

notify pgrst, 'reload schema';

commit;

-- Verification: similar routes should return at least one row.
select
    r.route_id,
    r.title,
    r.route_cluster_id,
    r.distance_km,
    r.deleted_yn
from public.routes r
where r.route_cluster_id = (
    select route_cluster_id
    from public.routes
    where route_id = 1
)
order by r.route_id;

-- Verification: route history should return at least one FINISHED activity.
select
    a.activity_id,
    a.route_id,
    a.status,
    a.distance_km,
    a.duration_sec,
    a.started_at,
    a.ended_at,
    a.deleted_yn
from public.activities a
where a.route_id = 1
  and a.status = 'FINISHED'
  and a.deleted_yn = 'N'
order by a.started_at desc;
