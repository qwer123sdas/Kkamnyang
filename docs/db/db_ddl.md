# GPS polyce

SELECT *
FROM routes
WHERE visibility = 'PUBLIC'
AND deleted_yn = 'N'
AND ST_DWithin(
    start_point,
    ST_SetSRID(ST_MakePoint(:lng, :lat), 4326)::geography,
    3000
)
ORDER BY created_at DESC;

# Soft delete

UPDATE routes
SET deleted_yn = 'Y',
    deleted_at = now(),
    updated_at = now(),
    updated_by = :login_id
WHERE route_id = :route_id;