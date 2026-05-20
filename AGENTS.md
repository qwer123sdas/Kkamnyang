# Project Rules

Project Name

RouteLog

Description

GPS 기반 운동 기록 및 공유 플랫폼

지원 활동:

현재 MVP:

```text
RUN
```

향후 지원 예정:

```text
RIDE
HIKE
```

---------------------------------------

# Stack

Frontend

- React Native
- Expo

Backend

- FastAPI
- Supabase

Database

- PostgreSQL

Map

- Google Maps API

Storage

- Supabase Storage

---------------------------------------

# Database Rules

USER

PK:

user_id UUID

기타 테이블:

- route_id BIGSERIAL
- activity_id BIGSERIAL
- comment_id BIGSERIAL
- bookmark_id BIGSERIAL
- like_id BIGSERIAL

Audit Columns

모든 테이블 공통:

created_at
created_by
updated_at
updated_by

Soft Delete

deleted_yn
deleted_at

---------------------------------------

# Login Rules

지원:

- Google OAuth
- Naver OAuth
- 일반 회원가입(향후)

login_id:

- UNIQUE
- 변경 불가

정규식:

^[a-z0-9_]{4,30}$

---------------------------------------

# GPS Rules

수집주기

RUN

3초

향후:

RIDE = 5초
HIKE = 8초

노이즈 제거

속도 >40km/h 제거

거리 변화

5m 이하 무시

저장 방식

encoded_polyline

route_geojson

start_point

end_point

---------------------------------------

# Route Similarity Rules

Route Cluster 사용

유사 경로 판정:

1. activity_type 동일

2. 시작점 반경 300m 이내

3. 종료점 반경 300m 이내

4. 거리 차이 ±15%

유사한 Route는 동일 route_cluster에 속한다.

# Route History Rules

동일 Route에 대한 사용자 실행 기록은 Activity 기준으로 조회한다.

---------------------------------------

# Forbidden

금지:

- 전체 프로젝트 구조 변경
- DB 스키마 임의 수정
- API 응답 구조 변경
- 상태관리 라이브러리 변경
- 임의 라이브러리 추가
- 리팩토링
- Router 구조 변경

---------------------------------------

# Allowed

허용:

- Task 범위 내 수정
- 신규 파일 생성
- 테스트 코드 생성
- 버그 수정

---------------------------------------

# Response Format

반드시 출력:

1. 변경 파일

2. 변경 내용

3. 변경 이유

4. 테스트 방법

5. 다음 작업