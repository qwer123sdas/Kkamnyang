# route-feed-backend - Design Document

> Version: 1.0.0 | Date: 2026-06-02 | Status: Approved
> Level: Dynamic | Plan: docs/01-plan/features/route-feed-backend.plan.md

## 1. Overview

공개 RUN Route Feed를 FastAPI와 Supabase PostgREST로 조회한다.

## 2. Architecture

```text
GET /api/v1/routes/feed
-> Route API
-> RouteService
-> RouteRepository
-> Supabase PostgREST routes + embedded users
```

## 3. Data Flow

- 인증 없이 공개 호출을 허용한다.
- `page >= 1`, `1 <= size <= 50`, `activity_type=RUN`을 검증한다.
- `visibility=PUBLIC`, Route `deleted_yn=N`, User `deleted_yn=N`을 조회한다.
- `created_at.desc`, offset, `size + 1` limit을 적용한다.
- service에서 `has_next`를 계산하고 `size`만큼 반환한다.
- `distance_km`는 값이 있으면 JSON number로 정규화한다.

## 4. Files

```text
backend/api/route_api.py
backend/services/route_service.py
backend/repositories/route_repository.py
backend/tests/test_route_feed.py
backend/tests/test_route_repository.py
```

## 5. Error Handling

- Query validation 오류는 FastAPI 기본 `422`
- Supabase 및 payload 오류는 기존 `500 INTERNAL_ERROR`

## 6. Security

- 공개 Feed API이므로 Authorization 헤더를 요구하지 않는다.
- Supabase Service Role Key는 repository 내부 요청에만 사용한다.

