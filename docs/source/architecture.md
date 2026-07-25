# Architecture

## 1. 문서 목적

이 문서는 GPS 기반 러닝/라이딩/등산 경로 기록 및 공유 앱의 시스템 아키텍처를 정의한다.

목적은 다음과 같다.

- 프로젝트 구조 고정
- AI/Codex 작업 범위 제한
- 임의 리팩토링 방지
- 데이터 흐름 명확화
- Frontend / Backend / DB 책임 분리
- MVP 범위 유지

이 문서에 정의되지 않은 구조 변경은 금지한다.

### 문서 소유 범위

이 문서는 다음 내용을 소유한다.

- 전체 시스템 구성
- Frontend와 Backend 계층 및 책임
- 주요 데이터 흐름
- 기술 선택과 확장 방향

다음 상세 정책은 각 원본 문서가 소유한다.

| 내용 | 원본 |
|---|---|
| 현재 MVP 기능 범위 | [[docs/source/requirements]] |
| API 엔드포인트와 요청·응답 필드 | [[docs/source/api-spec]] |
| Frontend와 Backend 통합 계약 | [[docs/source/frontend-backend-contract]] |
| DB 컬럼과 타입 | [[docs/source/db-schema]], [[docs/db/db_ddl]], [[docs/db/db_dml]] |
| 작업 금지, GPS 수치, 보안 정책 | [[AGENTS]] |
| UI 디자인 기준 | [[docs/source/design-system]] |

중복된 상세 값이 서로 다르면 위 원본과 최신 검증 Task를 우선하고, 이 문서의 관련 설명을 갱신한다.

---

# 2. 서비스 개요

## 2.1 서비스명

```text
RouteLog
```

## 2.2 핵심 기능

```text
1. GPS 기반 활동 기록
2. 지도 위 경로 표시
3. 경로 저장
4. 경로 공유
5. 좋아요
6. 북마크
7. 근처 경로 조회
```

## 2.3 지원 활동 유형

현재 MVP

```text
RUN
```

향후

```text
RIDE
HIKE
```

---

# 3. 전체 시스템 구성

```text
[Mobile App]
React Native + Expo

        │
        │ HTTPS
        ▼

[API Layer]
FastAPI / Serverless API

        │
        │ SQL / Supabase Client
        ▼

[Supabase]
PostgreSQL + PostGIS
Auth
Storage

        │
        ▼

[External Services]
Google Maps API
Google OAuth
Naver OAuth
```

---

# 4. 기술 스택

## 4.1 Frontend

```text
React Native
Expo
TypeScript
Google Maps
```

## 4.2 Backend

```text
FastAPI
Python
Serverless 배포 가능 구조
```

## 4.3 Database

```text
Supabase PostgreSQL
PostGIS
pgcrypto
```

## 4.4 Authentication

```text
Google OAuth
Naver OAuth
Supabase Auth
```

## 4.5 Map

```text
Google Maps API
Encoded Polyline
GeoJSON
```

---

# 5. 아키텍처 원칙

## 5.1 MVP 우선

초기 목표는 완벽한 확장 구조가 아니라 빠르게 검증 가능한 MVP다.

따라서 다음을 우선한다.

```text
단순성
명확한 책임 분리
낮은 비용
빠른 구현
테스트 가능한 구조
```

## 5.2 금지 원칙

다음은 금지한다.

```text
전체 프로젝트 구조 변경
임의 상태관리 라이브러리 추가
임의 API 응답 형식 변경
임의 DB 스키마 변경
임의 폴더 구조 변경
불필요한 리팩토링
화면 간 과도한 의존
비즈니스 로직의 화면 직접 작성
```

## 5.3 허용 원칙

다음은 허용한다.

```text
명세된 Task 범위 내 파일 생성
명세된 Task 범위 내 버그 수정
테스트 코드 추가
타입 정의 추가
유틸 함수 추가
```

---

# 6. Frontend Architecture

## 6.1 디렉토리 구조

아래 구조는 계층 책임을 설명하기 위한 논리 구조다.
실제 파일 경로를 확정하는 목록이 아니며, 작업 시 현재 저장소와 관련 Task를 먼저 확인한다.
기존 Router 또는 디렉터리 구조는 명시적인 Task 없이 이 예시에 맞춰 변경하지 않는다.

```text
src/

 ├─ app/
 │   ├─ App.tsx
 │   └─ providers.tsx
 │
 ├─ navigation/
 │   ├─ RootNavigator.tsx
 │   ├─ AuthNavigator.tsx
 │   └─ MainNavigator.tsx
 │
 ├─ screens/
 │   ├─ auth/
 │   │   ├─ LoginScreen.tsx
 │   │   └─ LoginIdSetupScreen.tsx
 │   │
 │   ├─ record/
 │   │   └─ RecordScreen.tsx
 │   │
 │   ├─ route/
 │   │   ├─ RouteFeedScreen.tsx
 │   │   ├─ RouteDetailScreen.tsx
 │   │   └─ MyRoutesScreen.tsx
 │   │
 │   ├─ bookmark/
 │   │   └─ BookmarkScreen.tsx
 │   │
 │   └─ profile/
 │       └─ ProfileScreen.tsx
 │
 ├─ components/
 │   ├─ common/
 │   ├─ map/
 │   ├─ route/
 │   └─ form/
 │
 ├─ hooks/
 │   ├─ useAuth.ts
 │   ├─ useGPSRecorder.ts
 │   ├─ useRouteFeed.ts
 │   └─ useNearbyRoutes.ts
 │
 ├─ services/
 │   ├─ apiClient.ts
 │   ├─ authService.ts
 │   ├─ activityService.ts
 │   ├─ routeService.ts
 │   ├─ commentService.ts
 │   ├─ likeService.ts
 │   └─ bookmarkService.ts
 │
 ├─ types/
 │   ├─ user.ts
 │   ├─ route.ts
 │   ├─ activity.ts
 │   ├─ api.ts
 │   └─ geo.ts
 │
 ├─ utils/
 │   ├─ polyline.ts
 │   ├─ gps.ts
 │   ├─ distance.ts
 │   ├─ date.ts
 │   └─ validation.ts
 │
 ├─ constants/
 │   ├─ activity.ts
 │   ├─ api.ts
 │   ├─ gps.ts
 │   └─ map.ts
 │
 └─ config/
     ├─ env.ts
     └─ supabase.ts
```

---

## 6.2 Frontend 계층 책임

### screens

역할:

```text
화면 UI 구성
사용자 이벤트 연결
Hook 호출
Navigation 처리
```

금지:

```text
API 직접 호출 금지
복잡한 비즈니스 로직 작성 금지
GPS 계산 로직 작성 금지
DB 구조 의존 금지
```

---

### components

역할:

```text
재사용 가능한 UI 컴포넌트
Map 컴포넌트
Route Card
Button
Input
Modal
```

금지:

```text
API 호출 금지
전역 상태 직접 변경 금지
```

---

### hooks

역할:

```text
화면 상태 관리
Service 호출
GPS 상태 관리
비동기 요청 상태 관리
```

예:

```text
useGPSRecorder
useRouteFeed
useAuth
```

---

### services

역할:

```text
API 호출 담당
Request/Response 변환
Error 처리
```

규칙:

```text
모든 외부 API 호출은 services에서만 수행한다.
screen에서 fetch/axios 직접 호출 금지.
```

---

### utils

역할:

```text
순수 함수
GPS 계산
Polyline 인코딩/디코딩
거리 계산
날짜 포맷
검증 함수
```

규칙:

```text
상태를 가지지 않는다.
API 호출을 하지 않는다.
```

---

### types

역할:

```text
TypeScript 타입 정의
API DTO 정의
Domain 타입 정의
```

---

# 7. Backend Architecture

## 7.1 디렉토리 구조

아래 구조는 계층 책임을 설명하기 위한 논리 구조다.
현재 저장소에 없는 파일을 구현된 것으로 간주하지 않으며, 예시에 맞추기 위한 파일 이동이나 Router 변경을 하지 않는다.

```text
backend/

 ├─ app/
 │   ├─ main.py
 │   ├─ config.py
 │   └─ dependencies.py
 │
 ├─ api/
 │   ├─ auth_api.py
 │   ├─ user_api.py
 │   ├─ activity_api.py
 │   ├─ route_api.py
 │   ├─ comment_api.py
 │   ├─ like_api.py
 │   └─ bookmark_api.py
 │
 ├─ schemas/
 │   ├─ auth_schema.py
 │   ├─ user_schema.py
 │   ├─ activity_schema.py
 │   ├─ route_schema.py
 │   ├─ comment_schema.py
 │   └─ common_schema.py
 │
 ├─ services/
 │   ├─ auth_service.py
 │   ├─ activity_service.py
 │   ├─ route_service.py
 │   ├─ comment_service.py
 │   ├─ like_service.py
 │   └─ bookmark_service.py
 │
 ├─ repositories/
 │   ├─ user_repository.py
 │   ├─ activity_repository.py
 │   ├─ route_repository.py
 │   ├─ comment_repository.py
 │   ├─ like_repository.py
 │   └─ bookmark_repository.py
 │
 ├─ utils/
 │   ├─ gps.py
 │   ├─ polyline.py
 │   ├─ geojson.py
 │   └─ response.py
 │
 └─ tests/
     ├─ test_activity.py
     ├─ test_route.py
     └─ test_auth.py
```

---

## 7.2 Backend 계층 책임

### api

역할:

```text
HTTP 요청 수신
Request 검증
Service 호출
Response 반환
```

금지:

```text
SQL 직접 작성 금지
비즈니스 로직 작성 금지
```

---

### schemas

역할:

```text
Request DTO
Response DTO
Validation Rule
```

---

### services

역할:

```text
비즈니스 로직
권한 검증
상태 변경 규칙
트랜잭션 단위 조합
```

예:

```text
활동 종료
→ route 생성
→ activity 상태 변경
```

---

### repositories

역할:

```text
DB 접근
Query 실행
CRUD 처리
```

금지:

```text
HTTP Response 생성 금지
비즈니스 판단 금지
```

---

### utils

역할:

```text
GPS 계산
Polyline 처리
GeoJSON 변환
공통 응답 생성
```

---

# 8. Database Architecture

이 절은 데이터 계층의 역할과 주요 엔터티 관계만 설명한다.
정확한 컬럼, 타입, 제약조건과 실행 SQL은 [[docs/source/db-schema]], [[docs/db/db_ddl]], [[docs/db/db_dml]]을 기준으로 한다.

## 8.1 주요 테이블

```text
users
routes
activities
route_likes
route_comments
route_bookmarks
```

## 8.2 PK 정책

```text
users.user_id = UUID

routes.route_id = BIGSERIAL

activities.activity_id = BIGSERIAL

route_likes.like_id = BIGSERIAL

route_comments.comment_id = BIGSERIAL

route_bookmarks.bookmark_id = BIGSERIAL
```

## 8.3 Audit 정책

모든 테이블은 아래 컬럼을 가진다.

```text
created_at
created_by
updated_at
updated_by
```

## 8.4 Soft Delete 정책

실제 DELETE는 금지한다.

```text
deleted_yn
deleted_at
```

조회 시 항상 조건 추가:

```sql
deleted_yn = 'N'
```

---

# 9. Authentication Architecture

## 9.1 로그인 방식

지원:

```text
Google OAuth
Naver OAuth
```

향후 추가:

```text
일반 회원가입
이메일/비밀번호 로그인
```

## 9.2 사용자 생성 흐름

```text
사용자 OAuth 로그인

↓

OAuth Provider에서 사용자 정보 수신

↓

Supabase Auth 인증

↓

users 테이블 조회

↓

없으면 users 생성

↓

access_token 반환
```

## 9.3 login_id 정책

```text
login_id는 중복될 수 없다.
login_id는 최초 설정 후 변경할 수 없다.
login_id는 영문 소문자, 숫자, '_'만 허용한다.
```

정규식:

```text
^[a-z0-9_]{4,30}$
```

---

# 10. GPS Recording Architecture

이 절은 GPS 기록 흐름을 설명한다.
수집 주기와 노이즈 제거 수치가 다를 경우 [[AGENTS]]를 최우선으로 적용한다.

## 10.1 기록 흐름

```text
사용자 활동 시작

↓

GPS 권한 확인

↓

GPS 좌표 수집 시작

↓

좌표 배열 메모리 저장

↓

노이즈 제거

↓

거리 계산

↓

Polyline 생성

↓

GeoJSON 생성

↓

활동 종료 API 호출

↓

routes 저장

↓

activities 업데이트
```

---

## 10.2 GPS 수집 정책

```text
RUN  = 3초
```

## 10.3 GPS 노이즈 제거 정책

제거 조건:

```text
속도 > 40km/h
거리 변화 < 5m
좌표 정확도 부족
```

## 10.4 저장 데이터

```text
encoded_polyline
route_geojson
start_point
end_point
distance_km
duration_sec
```

---

# 11. Map Architecture

## 11.1 지도 역할

```text
현재 위치 표시
기록 중 경로 표시
저장된 경로 표시
근처 경로 표시
```

## 11.2 Google Maps 사용 범위

```text
지도 렌더링
Polyline 표시
현재 위치 표시
```

## 11.3 Polyline 사용

역할:

```text
앱 지도 렌더링용
데이터 압축
빠른 표시
```

## 11.4 GeoJSON 사용

역할:

```text
GIS 확장
근처 경로 추천
경로 분석
향후 유사 경로 검색
```

---

## Route Similarity Architecture

routes

↓

route_cluster_id

↓

route_clusters

↓

유사한 경로 그룹


유사도 계산:

1. activity_type 동일

2. 시작점 반경 300m

3. 종료점 반경 300m

4. 거리 차이 ±15%

## Route History Architecture

routes

↓

activities


동일 Route 반복 기록은 Activity 기준으로 조회한다.

---

# 12. Data Flow

## 12.1 활동 시작

```text
RecordScreen

↓

useGPSRecorder.start()

↓

activityService.start()

↓

POST /api/v1/activities/start

↓

activities 생성

↓

activity_id 반환
```

---

## 12.2 활동 종료

```text
RecordScreen

↓

useGPSRecorder.finish()

↓

GPS 좌표 정리 & 시간 및 기록 정리

↓

encoded_polyline 생성

↓

route_geojson 생성

↓

activityService.finish()

↓

POST /api/v1/activities/{activity_id}/finish

↓

routes 생성

↓

activities 업데이트
```

---

## 12.3 피드 조회

```text
RouteFeedScreen

↓

useRouteFeed()

↓

routeService.getFeed()

↓

GET /api/v1/routes/feed

↓

routes 목록 반환

↓

RouteCard 렌더링
```

---

## 12.4 좋아요

```text
RouteDetailScreen

↓

likeService.like(route_id)

↓

POST /api/v1/routes/{route_id}/like

↓

route_likes 생성

↓

routes.like_count 증가

↓

UI 상태 반영
```

---

# 13. API Communication Rules

이 절은 통신 계층의 방향만 설명한다.
공통 응답과 엔드포인트별 상세 계약은 [[docs/source/api-spec]]과 [[docs/source/frontend-backend-contract]]을 기준으로 한다.

## 13.1 공통 응답

```json
{
  "success": true,
  "data": {},
  "message": null
}
```

## 13.2 공통 에러

```json
{
  "success": false,
  "data": null,
  "message": "error message",
  "error_code": "ERROR_CODE"
}
```

## 13.3 API 호출 위치

```text
API 호출은 services 디렉토리에서만 수행한다.
```

금지:

```text
screens에서 직접 API 호출
components에서 직접 API 호출
utils에서 API 호출
```

---

# 14. State Management

## 14.1 MVP 기본 정책

MVP에서는 별도 전역 상태관리 라이브러리를 도입하지 않는다.

사용:

```text
React useState
React useEffect
React Context
Custom Hooks
```

## 14.2 도입 금지

초기 MVP에서 금지:

```text
Redux
MobX
Recoil
Zustand
Jotai
```

## 14.3 예외

다음 조건이 발생하면 재검토한다.

```text
다수 화면에서 동일 상태 공유
캐시 무효화 복잡도 증가
오프라인 동기화 필요
```

---

# 15. Error Handling

## 15.1 Frontend

```text
API 에러는 services에서 1차 처리
화면에서는 사용자 메시지만 표시
```

## 15.2 Backend

```text
예외는 공통 에러 응답 형식으로 반환
민감한 시스템 에러 메시지는 노출하지 않음
```

## 15.3 공통 Error Code

```text
AUTH_REQUIRED
INVALID_TOKEN
FORBIDDEN
NOT_FOUND
VALIDATION_ERROR
INTERNAL_ERROR
```

---

# 16. Security Rules

이 절은 아키텍처 수준의 보안 방향을 설명한다.
Secret 처리와 Agent 작업 보안 정책은 [[AGENTS]]를 최우선으로 적용한다.

## 16.1 인증

```text
로그인이 필요한 API는 Bearer Token 필수
```

## 16.2 권한

```text
PRIVATE route는 작성자만 조회 가능
route 수정/삭제는 작성자만 가능
comment 삭제는 작성자만 가능
like/bookmark 취소는 본인만 가능
```

## 16.3 비밀번호

```text
password_hash만 저장
plain password 저장 금지
```

## 16.4 환경변수

```text
API Key
Supabase URL
Supabase Key
Google Maps Key
OAuth Secret
```

환경변수는 코드에 직접 작성하지 않는다.

---

# 17. Deployment Architecture

## 17.1 MVP 배포 구조

```text
Mobile App
Expo

Backend
Vercel Serverless or Supabase Edge Function

Database
Supabase PostgreSQL

Storage
Supabase Storage
```

## 17.2 운영 전략

```text
초기에는 Supabase 중심으로 운영
복잡한 연산이 필요한 기능만 FastAPI로 분리
사용자 증가 시 Backend API를 별도 서버로 분리
```

---

# 18. Scalability

## 18.1 초기 구조

```text
React Native App

↓

FastAPI / Serverless

↓

Supabase PostgreSQL
```

## 18.2 사용자 증가 시 확장

```text
React Native App

↓

API Server

↓

PostgreSQL

↓

Redis Cache

↓

Background Worker
```

## 18.3 확장 시 추가 후보

```text
Redis
Celery
PostGIS 고도화
Read Replica
Object Storage CDN
```

---

# 19. Vendor Lock-in Strategy

## 19.1 Supabase 의존 최소화

```text
DB는 PostgreSQL 표준을 우선한다.
Supabase 전용 기능은 인증/Storage 중심으로 제한한다.
비즈니스 로직은 Backend Service 계층에 둔다.
```

## 19.2 Map Lock-in 최소화

```text
경로 데이터는 encoded_polyline과 GeoJSON을 함께 저장한다.
Google Maps 전용 데이터 구조만 저장하지 않는다.
```

---

# 20. Testing Strategy

## 20.1 MVP 테스트 범위

```text
GPS 거리 계산 & 거리와 시간 따른 속도 계산
Polyline 생성
Route 저장
Activity 종료
Like 중복 방지
Bookmark 중복 방지
Comment 생성/삭제
권한 검증
```

## 20.2 테스트 기준

```text
GPS 거리 오차 ±5%
API 응답 형식 일관성
Soft Delete 정상 동작
PRIVATE route 접근 제한
```

---

# 21. Codex / AI 작업 규칙

## 21.1 작업 단위

AI에게는 반드시 Task 문서 단위로 작업을 요청한다.

```text
TASK-001-project-skeleton.md
TASK-002-auth.md
TASK-003-gps-record.md
```

## 21.2 요청 형식

```text
다음 Task 문서만 기준으로 작업해라.
architecture.md, api-spec.md, db-schema.md의 규칙을 반드시 준수해라.
명시되지 않은 구조 변경은 하지 마라.
```

## 21.3 AI 금지사항

```text
전체 구조 변경 금지
임의 라이브러리 추가 금지
DB 스키마 변경 금지
API 응답 형식 변경 금지
리팩토링 금지
라우팅 구조 변경 금지
```

---

# 22. MVP 제외 항목

초기 MVP에서는 제외한다.

```text
팔로우
DM
실시간 채팅
푸시 알림
결제
광고
고급 추천 알고리즘
실시간 위치 공유
관리자 페이지
신고/차단
```

---

# 23. 관련 문서

- [[AGENTS]]
- [[PROJECT]]
- [[docs/source/requirements]]
- [[docs/source/api-spec]]
- [[docs/source/frontend-backend-contract]]
- [[docs/source/db-schema]]
- [[docs/source/design-system]]
- [[docs/HANDOFF]]
- [[docs/FRONTEND-BOARD]]
- [[todo]]
