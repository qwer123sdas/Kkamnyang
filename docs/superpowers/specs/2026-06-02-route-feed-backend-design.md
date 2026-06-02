# Route Feed 백엔드 설계

## 목표

`TASK-009-route-feed.md`에서 요구하는 공개 Route Feed 백엔드 엔드포인트를 구현한다.

```http
GET /api/v1/routes/feed?page=1&size=20&activity_type=RUN
```

## 범위

- 인증 의존성이 없는 공개 FastAPI 엔드포인트를 추가한다.
- `activity_type=RUN`만 지원한다.
- `page >= 1`, `1 <= size <= 50` 조건을 적용한다.
- 삭제되지 않은 사용자가 작성한 공개 상태의 미삭제 Route만 반환한다.
- Route 생성일시 기준 내림차순으로 정렬한다.
- `docs/api-spec.md`에 정의된 응답 구조를 유지한다.
- 기존 `api -> service -> repository -> Supabase PostgREST` 구조를 유지한다.

## 제외 범위

- 사용자별 좋아요 또는 북마크 상태
- Route 상세
- Route Cluster
- 주변 Route
- 좋아요, 댓글 또는 북마크 변경
- 데이터베이스 스키마 변경
- 프론트엔드 변경

## 아키텍처

백엔드 모듈 세 개를 추가한다.

```text
backend/api/route_api.py
backend/services/route_service.py
backend/repositories/route_repository.py
```

`backend/app/main.py`에 Route router를 등록한다. 기존 `UserService` 패턴을 따라
`backend/app/dependencies.py`에 의존성 provider를 추가한다.

## 데이터 조회

기존 `routes.user_id -> users.user_id` 외래 키를 기반으로 `users` embedded select를
포함한 Supabase PostgREST 요청을 한 번 사용한다.

다음 필터를 적용한다.

```text
routes.visibility = PUBLIC
routes.deleted_yn = N
routes.activity_type = RUN
users.deleted_yn = N
```

다음 조회 옵션을 적용한다.

```text
order = created_at.desc
offset = (page - 1) * size
limit = size + 1
```

한 건을 추가로 요청하여 별도의 count 조회 없이 service에서 `has_next`를 계산한다.

## 응답

다음 구조로 반환한다.

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

각 item은 다음 필드를 포함한다.

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

## 오류 처리

- 잘못된 `page`, `size` 또는 지원하지 않는 `activity_type`은 FastAPI query
  validation 상태 코드 `422`를 반환한다.
- Supabase 설정, 네트워크, HTTP 또는 잘못된 payload 오류는 `ApiError`를 통해
  기존 `500 INTERNAL_ERROR` 응답을 반환한다.

## 테스트

다음 테스트를 추가한다.

- Authorization 헤더가 없는 공개 접근
- 응답 구조 및 `has_next` 계산
- 조회 결과가 없는 경우의 동작
- 잘못된 `page`, `size`, `activity_type`의 query validation
- Repository 조회 필터, embedded user 선택, 정렬, offset 및 `size + 1` limit
