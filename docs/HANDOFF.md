# KKamyang HANDOFF

## 프로젝트 상태

- MVP 안정화 및 QA 진행 중
- Android 실기기 기준 Google OAuth 및 `GET /api/v1/users/me` 연결 검증 완료
- 다음 우선순위: Supabase 저장 결과 확인, `GET /api/v1/routes/feed` 백엔드 구현

---

## 완료 내용

### 1. 소셜 회원 식별자 정책

```text
소셜 회원:
- user_id = Supabase Auth UUID
- auth_provider = GOOGLE 또는 NAVER
- login_id = social_ + Supabase Auth UUID hex 앞 23자리
- email = 소셜 이메일
- created_by = login_id
- updated_by = login_id

일반 회원:
- auth_provider = LOCAL
- login_id = 사용자가 ^[a-z0-9_]{4,30}$ 규칙에 맞춰 설정

공통 audit:
- 초기 시스템 데이터 = SYSTEM
- 회원 생성 및 사용자 작업 = login_id
- 이메일 또는 사람 이름은 audit actor로 저장하지 않음
```

### 2. 로그인 제공자 관리 정책

`auth_provider` CHECK 제약조건 대신 참조 테이블 FK 방식을 사용한다.

```text
login_provider:
- provider_code varchar(20) PK
- is_active boolean
- sort_order integer
- created_at timestamptz
- created_by varchar(50)
- updated_at timestamptz
- updated_by varchar(50)

초기 데이터:
- GOOGLE
- NAVER
- LOCAL

FK:
- fk_users_login_provider
- users.auth_provider → login_provider.provider_code
```

신규 DB 전체 DDL:

```text
docs/db/db_dml.md
```

기존 DB migration:

```text
docs/task/TASK-024-social-user-identity-stabilization.md
```

### 3. 백엔드 구현

완료:

```text
GET /api/v1/health
GET /api/v1/users/me
Supabase Auth access_token 검증
public.users 조회 및 신규 소셜 회원 생성
auth_provider 파싱
social_ login_id 자동 생성
login_id 기반 created_by, updated_by 저장
```

백엔드 테스트:

```text
python -m pytest backend/tests
5 passed
```

### 4. 환경변수 분리

```text
backend/.env
- SUPABASE_URL
- SUPABASE_ANON_KEY
- SUPABASE_SERVICE_ROLE_KEY

kkamyang-app/.env
- EXPO_PUBLIC_API_BASE_URL
- EXPO_PUBLIC_SUPABASE_URL
- EXPO_PUBLIC_SUPABASE_ANON_KEY
- EXPO_PUBLIC_GOOGLE_MAPS_API_KEY
```

주의:

```text
SUPABASE_SERVICE_ROLE_KEY는 백엔드 전용 secret
Expo 앱 또는 EXPO_PUBLIC_* 변수로 노출 금지
.env 실제 값 문서화 및 로그 출력 금지
```

백엔드는 `.env` 자동 로딩을 하지 않으므로 다음 명령으로 실행한다.

```powershell
python -m uvicorn app.main:app --reload --app-dir backend --host 0.0.0.0 --port 8000 --env-file backend\.env
```

### 5. Android 실기기 연결

Expo Go 개발 중 Android cleartext HTTP 요청이 실패했으며 HTTPS 터널로 연결했다.

```text
휴대폰 앱
→ https://...trycloudflare.com
→ cloudflared
→ http://127.0.0.1:8000 또는 http://localhost:8000
→ FastAPI
```

실제 tunnel URL과 `.env` 실제 값은 문서화하지 않는다.

### 6. 최신 앱 검증 로그

확인 완료:

```text
[API] response status GET /users/me 200
[API] response success GET /users/me true
[Auth] users/me response user exists true
[Auth] users/me response login_id not-null
```

---

## 남은 작업

### 1. Supabase 저장 결과 확인

Supabase SQL Editor에서 신규 소셜 회원 row를 확인한다.

```sql
select
  auth_provider,
  login_id,
  created_by,
  updated_by,
  deleted_yn
from public.users;
```

정상 기준:

```text
auth_provider = GOOGLE
login_id = social_ 접두사
created_by = login_id
updated_by = login_id
deleted_yn = N
```

`login_provider` 및 FK도 확인한다.

```sql
select provider_code, is_active, sort_order, created_by, updated_by
from public.login_provider
order by sort_order, provider_code;

select conname, pg_get_constraintdef(oid)
from pg_constraint
where conrelid = 'public.users'::regclass;
```

정상 기준:

```text
GOOGLE, NAVER, LOCAL 존재
초기 created_by, updated_by = SYSTEM
fk_users_login_provider 존재
```

### 2. Routes Feed 백엔드 구현

현재 앱 로그:

```text
GET /api/v1/routes/feed?page=1&size=20&activity_type=RUN
→ 404 Not Found
```

원인:

```text
프론트 routeService는 Feed API를 호출하지만 FastAPI에는 해당 endpoint가 아직 없음
```

구현 대상:

```text
GET /api/v1/routes/feed
```

참고 문서:

```text
docs/api-spec.md
docs/task/TASK-009-route-feed.md
```

추가 확인:

```text
Feed 요청 로그에서 authorization exists false 확인
Feed를 공개 API로 유지할지, 로그인 사용자 token을 전달할지 API 정책 검토 필요
FastAPI 기본 404 응답에서 API 로그가 undefined undefined로 출력되므로 공통 오류 처리 보강 검토
```

### 3. HTTPS 개발 방식 결정

```text
선택지 A: Expo Go 유지, 개발 중 cloudflared HTTPS tunnel 사용
선택지 B: Development build 사용, Expo SDK 54 공식 문서 기준 Android cleartext 설정 검토
```

---

## 개발 규칙

- Screen → Hook → Service → apiClient
- Screen 직접 fetch 금지
- 최소 수정 원칙
- 큰 리팩토링 금지
- Secret/env 실제 값 출력 금지
- `SUPABASE_SERVICE_ROLE_KEY`는 백엔드 외부로 노출 금지
- `.env` 실제 값 문서화 금지
