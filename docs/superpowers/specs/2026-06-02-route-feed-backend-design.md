# Route Feed Backend Design

## Goal

Implement the public Route Feed backend endpoint required by `TASK-009-route-feed.md`.

```http
GET /api/v1/routes/feed?page=1&size=20&activity_type=RUN
```

## Scope

- Add a public FastAPI endpoint with no authentication dependency.
- Support only `activity_type=RUN`.
- Require `page >= 1` and `1 <= size <= 50`.
- Return only public, non-deleted routes written by non-deleted users.
- Sort by route creation time descending.
- Preserve the response structure defined in `docs/api-spec.md`.
- Keep the existing `api -> service -> repository -> Supabase PostgREST` structure.

## Out Of Scope

- Personalized like or bookmark state
- Route detail
- Route cluster
- Nearby route
- Like, comment, or bookmark mutation
- Database schema changes
- Frontend changes

## Architecture

Add three backend modules:

```text
backend/api/route_api.py
backend/services/route_service.py
backend/repositories/route_repository.py
```

Register the Route router in `backend/app/main.py`. Add a dependency provider in
`backend/app/dependencies.py` following the existing `UserService` pattern.

## Data Query

Use one Supabase PostgREST request with an embedded `users` select based on the
existing `routes.user_id -> users.user_id` foreign key.

Apply these filters:

```text
routes.visibility = PUBLIC
routes.deleted_yn = N
routes.activity_type = RUN
users.deleted_yn = N
```

Apply these query options:

```text
order = created_at.desc
offset = (page - 1) * size
limit = size + 1
```

Requesting one additional row allows the service to calculate `has_next`
without a separate count query.

## Response

Return:

```json
{
  "success": true,
  "data": {
    "items": [],
    "page": 1,
    "size": 20,
    "has_next": false
  },
  "message": null
}
```

Each item contains:

```text
route_id
title
description
activity_type
visibility
encoded_polyline
distance_km
duration_sec
like_count
comment_count
bookmark_count
created_at
user.user_id
user.login_id
user.nickname
```

## Error Handling

- Invalid `page`, `size`, or unsupported `activity_type` returns FastAPI query
  validation status `422`.
- Supabase configuration, network, HTTP, or malformed payload failures return
  the existing `500 INTERNAL_ERROR` response through `ApiError`.

## Testing

Add tests for:

- Public access without an Authorization header
- Response structure and `has_next` calculation
- Empty result behavior
- Query validation for invalid `page`, `size`, and `activity_type`
- Repository query filters, embedded user selection, ordering, offset, and
  `size + 1` limit

