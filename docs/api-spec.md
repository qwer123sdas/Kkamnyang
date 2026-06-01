# API Spec

## 1. 기본 규칙

### Base URL

```text
/api/v1
```

### Content-Type

```http
Content-Type: application/json
```

### Authorization

```http
Authorization: Bearer {access_token}
```

### 공통 성공 응답

```json
{
  "success": true,
  "data": {},
  "message": null
}
```

### 공통 에러 응답

```json
{
  "success": false,
  "data": null,
  "message": "error message",
  "error_code": "ERROR_CODE"
}
```

---

# 2. Auth API

## 2.1 OAuth 로그인

```http
POST /api/v1/auth/oauth
```

### Request

```json
{
  "provider": "GOOGLE",
  "provider_user_id": "google-user-id",
  "email": "user@test.com",
  "nickname": "러너"
}
```

### Response

```json
{
  "success": true,
  "data": {
    "access_token": "jwt-token",
    "user": {
      "user_id": "uuid",
      "login_id": "social_a1b2c3d4e5f678901234567",
      "email": "user@test.com",
      "nickname": "러너"
    }
  },
  "message": null
}
```

### Policy

- provider 값은 `GOOGLE`, `NAVER`만 허용한다.
- 최초 OAuth 로그인 시 `users` 테이블에 사용자를 생성한다.
- 기존 사용자는 로그인 처리한다.
- 향후 일반 회원가입을 추가할 수 있도록 `password_hash` 컬럼은 유지한다.
- 소셜 회원의 `login_id`는 `social_` + Supabase Auth UUID hex 앞 23자리로 서버가 자동 생성한다.
- 소셜 회원의 이메일은 `email` 컬럼에만 저장하며 `login_id` 또는 audit 컬럼에 사용하지 않는다.
- `created_by`, `updated_by`에는 자동 생성된 소셜 `login_id`를 저장한다.

---

# 2.2 내 정보 조회

```http
GET /api/v1/users/me
```

### Response

```json
{
  "success": true,
  "data": {
    "user_id": "uuid",
    "login_id": "social_a1b2c3d4e5f678901234567",
    "email": "user@test.com",
    "nickname": "러너",
    "profile_image_url": null
  },
  "message": null
}
```

### Policy

- 소셜 회원은 최초 로그인 시 서버가 생성한 `login_id`를 반환한다.
- 일반 회원은 향후 회원가입 흐름에서 사용자가 `login_id`를 설정한다.

---

# 2.3 일반 회원 login_id 설정

향후 일반 회원가입에서 `login_id`를 최초 설정할 경우 사용한다.

```http
POST /api/v1/users/me/login-id
```

### Request

```json
{
  "login_id": "runner2026"
}
```

### Response

```json
{
  "success": true,
  "data": {
    "login_id": "runner2026"
  },
  "message": null
}
```

### Validation

```text
^[a-z0-9_]{4,30}$
```

### Policy

- 중복 불가
- 최초 설정 후 변경 불가
- 일반 회원만 가능
- 허용 문자: 영문 소문자, 숫자, "_"
```

---

# 3.1 활동 시작

### activity_type

현재 MVP:

```text
RUN
```

향후:

```text
RIDE
HIKE
```

---

## 3.2 활동 종료

활동 종료 시 `routes` 데이터를 생성하고 `activities.route_id`를 연결한다.

```http
POST /api/v1/activities/{activity_id}/finish
```

### Request

```json
{
  "title": "한강 러닝 코스",
  "description": "가볍게 달리기 좋은 코스",
  "visibility": "PUBLIC",
  "encoded_polyline": "}_p~F~ps|U_ulLnnqC_mqNvxq`@",
  "route_geojson": {
    "type": "LineString",
    "coordinates": [
      [127.0001, 37.5001],
      [127.0002, 37.5002]
    ]
  },
  "start_point": {
    "lat": 37.5001,
    "lng": 127.0001
  },
  "end_point": {
    "lat": 37.5002,
    "lng": 127.0002
  },
  "distance_km": 5.21,
  "duration_sec": 1830
}
```

### Response

```json
{
  "success": true,
  "data": {
    "activity_id": 1,
    "route_id": 10,
    "status": "FINISHED"
  },
  "message": null
}
```

### Policy

- `encoded_polyline`은 필수다.
- `route_geojson`은 근처 경로 추천과 GIS 확장을 위해 저장한다.
- `start_point`, `end_point`는 근처 검색에 사용한다.
- 활동 종료 후 `activities.status`는 `FINISHED`로 변경한다.

---

## 3.3 내 활동 목록 조회

```http
GET /api/v1/activities/me?page=1&size=20
```

### Response

```json
{
  "success": true,
  "data": {
    "items": [
      {
        "activity_id": 1,
        "route_id": 10,
        "activity_type": "RUN",
        "distance_km": 5.21,
        "duration_sec": 1830,
        "status": "FINISHED",
        "started_at": "2026-05-19T10:00:00Z",
        "ended_at": "2026-05-19T10:30:30Z"
      }
    ],
    "page": 1,
    "size": 20,
    "has_next": false
  },
  "message": null
}
```

---

# 4. Route API

## 4.1 경로 생성

활동 기록 없이 수동으로 경로를 저장할 때 사용한다.

```http
POST /api/v1/routes
```

### Request

```json
{
  "title": "남산 등산 코스",
  "description": "초보자용 코스",
  "activity_type": "HIKE",
  "visibility": "PUBLIC",
  "encoded_polyline": "xxxxx",
  "route_geojson": {
    "type": "LineString",
    "coordinates": [
      [126.9882, 37.5512],
      [126.9901, 37.5531]
    ]
  },
  "start_point": {
    "lat": 37.5512,
    "lng": 126.9882
  },
  "end_point": {
    "lat": 37.5531,
    "lng": 126.9901
  },
  "distance_km": 3.4,
  "duration_sec": 3600
}
```

### Response

```json
{
  "success": true,
  "data": {
    "route_id": 10
  },
  "message": null
}
```

---

## 4.2 공개 피드 조회

```http
GET /api/v1/routes/feed?page=1&size=20&activity_type=RUN
```

### Response

```json
{
  "success": true,
  "data": {
    "items": [
      {
        "route_id": 10,
        "title": "한강 러닝 코스",
        "description": "가볍게 달리기 좋은 코스",
        "activity_type": "RUN",
        "visibility": "PUBLIC",
        "encoded_polyline": "xxxxx",
        "distance_km": 5.21,
        "duration_sec": 1830,
        "like_count": 10,
        "comment_count": 2,
        "bookmark_count": 4,
        "created_at": "2026-05-19T10:00:00Z",
        "user": {
          "user_id": "uuid",
          "login_id": "runner2026",
          "nickname": "러너"
        }
      }
    ],
    "page": 1,
    "size": 20,
    "has_next": true
  },
  "message": null
}
```

### Policy

- `visibility = PUBLIC`
- `deleted_yn = N`
- 최신순 정렬
- `size` 최대값은 50

---

## 4.3 경로 상세 조회

```http
GET /api/v1/routes/{route_id}
```

### Response

```json
{
  "success": true,
  "data": {
    "route_id": 10,
    "title": "한강 러닝 코스",
    "description": "가볍게 달리기 좋은 코스",
    "activity_type": "RUN",
    "visibility": "PUBLIC",
    "encoded_polyline": "xxxxx",
    "route_geojson": {
      "type": "LineString",
      "coordinates": []
    },
    "distance_km": 5.21,
    "duration_sec": 1830,
    "like_count": 10,
    "comment_count": 2,
    "bookmark_count": 4,
    "is_liked": true,
    "is_bookmarked": false,
    "created_at": "2026-05-19T10:00:00Z",
    "user": {
      "user_id": "uuid",
      "login_id": "runner2026",
      "nickname": "러너"
    }
  },
  "message": null
}
```

### Policy

- PUBLIC 경로는 모든 사용자가 조회 가능하다.
- PRIVATE 경로는 작성자만 조회 가능하다.

---

## 4.4 내 경로 목록 조회

```http
GET /api/v1/routes/me?page=1&size=20
```

### Response

```json
{
  "success": true,
  "data": {
    "items": [
      {
        "route_id": 10,
        "title": "한강 러닝 코스",
        "activity_type": "RUN",
        "visibility": "PRIVATE",
        "encoded_polyline": "xxxxx",
        "distance_km": 5.21,
        "duration_sec": 1830,
        "created_at": "2026-05-19T10:00:00Z"
      }
    ],
    "page": 1,
    "size": 20,
    "has_next": false
  },
  "message": null
}
```

---

## 4.5 경로 수정

```http
PATCH /api/v1/routes/{route_id}
```

### Request

```json
{
  "title": "수정된 코스명",
  "description": "수정된 설명",
  "visibility": "PRIVATE"
}
```

### Response

```json
{
  "success": true,
  "data": {
    "route_id": 10
  },
  "message": null
}
```

### 수정 가능 필드

- title
- description
- visibility

### 수정 불가 필드

- route_id
- user_id
- activity_type
- encoded_polyline
- route_geojson
- start_point
- end_point
- distance_km
- duration_sec

---

## 4.6 경로 삭제

```http
DELETE /api/v1/routes/{route_id}
```

### Response

```json
{
  "success": true,
  "data": {
    "route_id": 10
  },
  "message": null
}
```

### Policy

- 실제 DELETE 금지
- `deleted_yn = 'Y'`
- `deleted_at = now()`
- 작성자만 삭제 가능

---

# 5. Nearby Route API

## 5.1 근처 경로 조회

```http
GET /api/v1/routes/nearby?lat=37.5001&lng=127.0001&radius_m=3000&activity_type=RUN
```

### Response

```json
{
  "success": true,
  "data": {
    "items": [
      {
        "route_id": 10,
        "title": "한강 러닝 코스",
        "activity_type": "RUN",
        "encoded_polyline": "xxxxx",
        "distance_km": 5.21,
        "distance_from_user_m": 850,
        "like_count": 10
      }
    ]
  },
  "message": null
}
```

### Policy

- PUBLIC 경로만 조회한다.
- 삭제되지 않은 경로만 조회한다.
- 1차 MVP에서는 `start_point` 기준으로 검색한다.
- 이후 `route_geojson` 기반 경로 유사도 추천으로 확장한다.
- `radius_m` 기본값은 3000이다.
- `radius_m` 최대값은 10000이다.

---

# 6. Like API

## 6.1 좋아요

```http
POST /api/v1/routes/{route_id}/like
```

### Response

```json
{
  "success": true,
  "data": {
    "route_id": 10,
    "is_liked": true,
    "like_count": 11
  },
  "message": null
}
```

### Policy

- 로그인 사용자만 가능하다.
- 동일 사용자는 동일 경로에 한 번만 좋아요 가능하다.

---

## 6.2 좋아요 취소

```http
DELETE /api/v1/routes/{route_id}/like
```

### Response

```json
{
  "success": true,
  "data": {
    "route_id": 10,
    "is_liked": false,
    "like_count": 10
  },
  "message": null
}
```

---

# 7. Comment API

## 7.1 댓글 작성

```http
POST /api/v1/routes/{route_id}/comments
```

### Request

```json
{
  "content": "좋은 코스네요"
}
```

### Response

```json
{
  "success": true,
  "data": {
    "comment_id": 1,
    "route_id": 10,
    "content": "좋은 코스네요",
    "created_at": "2026-05-19T10:00:00Z"
  },
  "message": null
}
```

### Policy

- 로그인 사용자만 가능하다.
- 삭제된 경로에는 댓글 작성 불가.
- PRIVATE 경로에는 작성자만 댓글 작성 가능.

---

## 7.2 댓글 목록 조회

```http
GET /api/v1/routes/{route_id}/comments?page=1&size=20
```

### Response

```json
{
  "success": true,
  "data": {
    "items": [
      {
        "comment_id": 1,
        "content": "좋은 코스네요",
        "created_at": "2026-05-19T10:00:00Z",
        "user": {
          "user_id": "uuid",
          "login_id": "runner2026",
          "nickname": "러너"
        }
      }
    ],
    "page": 1,
    "size": 20,
    "has_next": false
  },
  "message": null
}
```

---

## 7.3 댓글 삭제

```http
DELETE /api/v1/routes/{route_id}/comments/{comment_id}
```

### Response

```json
{
  "success": true,
  "data": {
    "comment_id": 1
  },
  "message": null
}
```

### Policy

- 실제 DELETE 금지
- Soft Delete 처리
- 작성자만 삭제 가능

---

# 8. Bookmark API

## 8.1 북마크

```http
POST /api/v1/routes/{route_id}/bookmark
```

### Response

```json
{
  "success": true,
  "data": {
    "route_id": 10,
    "is_bookmarked": true,
    "bookmark_count": 5
  },
  "message": null
}
```

### Policy

- 로그인 사용자만 가능하다.
- 동일 사용자는 동일 경로에 한 번만 북마크 가능하다.

---

## 8.2 북마크 취소

```http
DELETE /api/v1/routes/{route_id}/bookmark
```

### Response

```json
{
  "success": true,
  "data": {
    "route_id": 10,
    "is_bookmarked": false,
    "bookmark_count": 4
  },
  "message": null
}
```

---

## 8.3 내 북마크 목록 조회

```http
GET /api/v1/bookmarks/me?page=1&size=20
```

### Response

```json
{
  "success": true,
  "data": {
    "items": [
      {
        "route_id": 10,
        "title": "한강 러닝 코스",
        "activity_type": "RUN",
        "encoded_polyline": "xxxxx",
        "distance_km": 5.21,
        "created_at": "2026-05-19T10:00:00Z"
      }
    ],
    "page": 1,
    "size": 20,
    "has_next": false
  },
  "message": null
}
```

# Route Cluster API

## 유사한 루트 조회

```http
GET /api/v1/routes/{route_id}/similar
```

Response

```json
{
    "success": true,
    "data": {

        "cluster_id":1,

        "items":[

            {
                "route_id":101,
                "title":"한강 러닝 코스",
                "distance_km":5.1,
                "similarity_score":87
            }
        ]
    },
    "message":null
}
```

Policy

- 시작점 반경 300m
- 종료점 반경 300m
- 거리 차이 ±15%

## 동일 Route 실행 기록 조회

```http
GET /api/v1/routes/{route_id}/history
```

Response

```json
{
    "success":true,
    "data":{

        "items":[

            {
                "activity_id":1,
                "distance_km":5.1,
                "duration_sec":1800,
                "started_at":"2026-05-19T10:00:00"
            }
        ]
    }
}
```

---

# 9. Error Code

| Code | 설명 |
|---|---|
| AUTH_REQUIRED | 인증 필요 |
| INVALID_TOKEN | 토큰 오류 |
| FORBIDDEN | 권한 없음 |
| NOT_FOUND | 데이터 없음 |
| DUPLICATE_LOGIN_ID | login_id 중복 |
| INVALID_LOGIN_ID | login_id 형식 오류 |
| INVALID_ACTIVITY_TYPE | 활동 타입 오류 |
| INVALID_VISIBILITY | 공개 범위 오류 |
| ROUTE_NOT_FOUND | 경로 없음 |
| ACTIVITY_NOT_FOUND | 활동 없음 |
| COMMENT_NOT_FOUND | 댓글 없음 |
| VALIDATION_ERROR | 요청값 오류 |
| INTERNAL_ERROR | 서버 오류 |

---

# 10. 권한 정책

## Route

| 기능 | 권한 |
|---|---|
| PUBLIC 조회 | 누구나 |
| PRIVATE 조회 | 작성자만 |
| 수정 | 작성자만 |
| 삭제 | 작성자만 |

## Comment

| 기능 | 권한 |
|---|---|
| 조회 | PUBLIC 경로 접근 가능 사용자 |
| 작성 | 로그인 사용자 |
| 삭제 | 작성자만 |

## Like / Bookmark

| 기능 | 권한 |
|---|---|
| 생성 | 로그인 사용자 |
| 취소 | 본인만 |

---

# 11. Pagination

## 기본 방식

```text
page + size
```

## 기본값

```text
page = 1
size = 20
```

## 최대값

```text
size = 50
```

## Response

```json
{
  "items": [],
  "page": 1,
  "size": 20,
  "has_next": false
}
```

---

# 12. MVP 제외 API

초기 MVP에서는 제외한다.

- 팔로우 API
- 신고 API
- 알림 API
- 관리자 API
- 추천 알고리즘 고도화 API
- 실시간 위치 공유 API
