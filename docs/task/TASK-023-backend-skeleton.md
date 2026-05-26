# TASK-023-backend-skeleton

## Goal

문서상 정의된 FastAPI 백엔드 최소 골격을 생성한다.

## Scope

```text
1. backend/ 생성
2. FastAPI 서버 최소 구성
3. GET /api/v1/health
4. GET /api/v1/users/me
5. Supabase access_token Bearer 인증 검증
6. users 테이블 조회/없으면 생성
```

## Out of Scope

```text
프론트 구조 변경
OAuth 재구현
DB 스키마 변경
Route/Activity/Comment/Like/Bookmark 구현
```

## Security Rules

```text
SUPABASE_SERVICE_ROLE_KEY는 FastAPI 서버 내부에서만 사용한다.
SUPABASE_SERVICE_ROLE_KEY는 프론트 .env 또는 Expo 환경변수로 전달하지 않는다.
/users/me는 user_id를 요청값으로 받지 않는다.
Bearer token 검증 후 Supabase Auth user.id를 사용한다.
users 생성/조회는 서버 내부에서만 SERVICE_ROLE_KEY를 사용한다.
RLS 우회는 users 생성/조회 범위로 제한한다.
```

## Files

```text
backend/
```

## Commands

Install:

```bash
pip install -r backend/requirements.txt
```

Run:

```bash
python -m uvicorn app.main:app --reload --app-dir backend
```

Run for Android physical device QA:

```bash
python -m uvicorn app.main:app --reload --app-dir backend --host 0.0.0.0 --port 8000
```

Test:

```bash
python -m pytest backend/tests
```

## Verification

```text
GET /api/v1/health 응답 확인
GET /api/v1/users/me Bearer 인증 확인
GET /api/v1/users/me 공통 응답 형식 확인
users 테이블 조회/생성은 서버 내부 service role key로만 수행
Android 실기기 QA 시 0.0.0.0:8000 LISTENING 확인
Android 실기기 브라우저에서 http://PC-IPv4:8000/api/v1/health success 확인
```

## Debug Notes

```text
Google OAuth 및 Supabase Session 생성은 성공 확인.
Network request failed 원인:
FastAPI가 127.0.0.1:8000 에만 바인딩되면 Android 실기기에서 접근할 수 없다.
Android 실기기 QA에서는 --host 0.0.0.0 --port 8000 으로 실행한다.
```
