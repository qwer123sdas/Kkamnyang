# KKamyang HANDOFF

## 프로젝트 상태

- MVP 단계
- 신규 기능보다 안정화 및 QA 우선
- Android 실기기 기준 Google OAuth 이후 `/users/me` 연결 문제를 추적 중

---

## 구현 완료

### Auth

- Google OAuth 연결
- Supabase Session 유지
- login_id 설정 흐름
- FastAPI `GET /api/v1/users/me` 최소 구현
- Supabase Auth access_token 검증
- Supabase REST API를 통한 `public.users` 조회/생성

상태:
- Google OAuth 성공 확인
- Supabase Session 생성 성공 확인
- Supabase user 존재 확인
- access_token 존재 확인
- Android 앱에서 HTTPS 터널을 통한 `/users/me` 호출 성공 확인
- `/users/me` 응답 200 확인
- 현재 응답에서 `login_id = null` 확인

### Running

- 러닝 시작
- GPS 수집
- 종료
- Polyline 생성
- 지도 표시

상태:
- 완료

### Route

- Feed
- Detail
- Like
- Bookmark
- Comment
- Cluster
- History

상태:
- 완료

### Profile

- 프로필
- 내 Route
- 북마크 목록

상태:
- 완료

---

## 이번 디버깅에서 확인된 내용

### 1. Android HTTP 요청 실패

기존 증상:

```text
[API] target ... "protocol": "http:", "hostKind": "IP_ADDRESS", "port": "SET"
[API] fetch error GET /users/me TypeError Network request failed
```

확인 결과:
- 휴대폰 브라우저에서 PC FastAPI HTTP endpoint 접근 가능
- 앱 런타임에서 `http:` 요청 실패
- HTTPS 터널 적용 후 앱 로그가 `protocol: "https:"`로 변경됨

판단:
- Android cleartext HTTP 차단 가능성이 높음
- Expo Go에서는 native cleartext 설정 적용에 한계가 있으므로 개발 중 HTTPS 터널 사용이 유효함

현재 사용 방식:

```text
휴대폰 앱
→ https://...trycloudflare.com
→ cloudflared
→ http://127.0.0.1:8000 또는 http://localhost:8000
→ FastAPI
```

주의:
- 실제 tunnel URL은 문서화하지 않음
- `EXPO_PUBLIC_API_BASE_URL` 실제 값은 보안 정책상 기록하지 않음

### 2. 프론트 env 반영 문제

확인된 로그:

```text
[API] target ... "protocol": "http:", "hostKind": "IP_ADDRESS"
```

원인:
- Expo 앱이 읽는 파일은 `kkamyang-app/.env`
- 다른 위치의 `.env`를 수정하면 앱에 반영되지 않음

정상 로그:

```text
[API] target ... "protocol": "https:", "hostKind": "HOSTNAME", "port": "NOT_SET"
```

### 3. 백엔드 env 로딩 문제

기존 증상:

```text
INTERNAL_ERROR Supabase auth is not configured
```

원인:
- `backend/.env`에 값이 있어도 현재 백엔드 코드는 `.env`를 자동 로드하지 않음
- `backend/app/config.py`는 `os.getenv(...)`만 사용함
- uvicorn 실행 프로세스 환경변수에 아래 값이 있어야 함

필수 백엔드 환경변수:

```text
SUPABASE_URL
SUPABASE_ANON_KEY
SUPABASE_SERVICE_ROLE_KEY
```

주의:
- `SUPABASE_SERVICE_ROLE_KEY`는 백엔드 전용 secret
- Expo 앱 `.env`에 넣으면 안 됨
- secret 실제 값은 문서화하지 않음

### 4. Supabase users 테이블 누락

기존 증상:

```text
INTERNAL_ERROR Supabase database request failed
```

확인 결과:
- `public.users` 테이블이 존재하지 않았음
- 테이블 생성 후 다음 제약조건 충돌이 확인됨

### 5. users NOT NULL 제약 충돌

진단 로그로 확인된 원인:

```text
null value in column "login_id" violates not-null constraint
null value in column "created_by" violates not-null constraint
```

현재 백엔드 insert payload:

```text
login_id = null
created_by = null
updated_by = null
```

현재 임시 처리:
- `users.login_id` NOT NULL 해제
- `users.created_by` NOT NULL 해제
- `users.updated_by` NOT NULL 해제
- 이후 `/users/me` 200 응답 확인

성공 로그:

```text
[API] response status GET /users/me 200
[API] response success GET /users/me true
[Auth] users/me response login_id null
```

주의:
- 위 nullable 변경은 현재 동작 확인을 위한 임시 상태
- 사용자는 해당 컬럼들이 최종적으로 NULL이면 안 된다고 판단함
- 따라서 아래 대안 중 하나로 설계 정리가 필요함

---

## 남은 핵심 이슈

### users.login_id / created_by / updated_by NOT NULL 유지 대안

현재 문제:
- Google OAuth 직후에는 사용자가 아직 `login_id`를 정하지 않음
- 하지만 현재 백엔드는 `/users/me` 호출 중 `public.users` row를 즉시 생성함
- 이 시점에는 `login_id`, `created_by`, `updated_by`에 넣을 확정 login_id가 없음

권장 대안:

```text
GET /users/me에서 public.users row를 즉시 생성하지 않는다.
```

권장 흐름:

```text
1. Google OAuth 성공
2. Supabase Auth user 확인
3. GET /users/me 호출
4. public.users row가 있으면 그대로 반환
5. public.users row가 없으면 DB insert 없이 auth 정보 기반 임시 응답 반환
   - user_id: Supabase Auth user id
   - email: Auth email
   - nickname: Auth metadata nickname
   - profile_image_url: Auth metadata avatar
   - login_id: null
6. 앱은 login_id null을 보고 login_id 설정 화면으로 이동
7. POST /users/me/login-id에서 login_id 확정
8. 이 시점에 public.users row를 생성
   - login_id = 사용자가 선택한 login_id
   - created_by = login_id
   - updated_by = login_id
   - deleted_yn = 'N'
```

장점:
- `users.login_id` NOT NULL 유지 가능
- `created_by`, `updated_by` NOT NULL 유지 가능
- login_id 변경 불가 원칙과 충돌하지 않음
- API 응답 구조를 바꾸지 않고 현재 `login_id: null` 흐름 유지 가능

필요 변경:
- `UserService.get_or_create_user`를 즉시 생성 방식에서 조회/임시 응답 방식으로 변경
- `POST /users/me/login-id`에서 users row가 없으면 생성하도록 변경
- users row가 이미 있으면 login_id만 최초 1회 설정하도록 보호
- login_id 설정 완료 후 DB NOT NULL 제약 복구

DB 제약 복구 전 확인:
- `public.users`에 `login_id is null` row가 남아 있으면 NOT NULL 복구 불가
- 기존 테스트 row는 login_id 설정을 완료하거나 삭제/정리해야 함

복구 목표:

```sql
alter table public.users
alter column login_id set not null;

alter table public.users
alter column created_by set not null;

alter table public.users
alter column updated_by set not null;

notify pgrst, 'reload schema';
```

대안 B:

```text
OAuth 직후 임시 login_id를 서버가 자동 생성한다.
```

예:

```text
login_id = user_ + random suffix
created_by = login_id
updated_by = login_id
```

비권장 이유:
- login_id 변경 불가 규칙과 충돌 가능
- 사용자가 나중에 원하는 login_id를 설정하려면 변경이 필요함
- MVP 로그인 흐름과 맞지 않음

대안 C:

```text
Audit 컬럼 의미를 login_id가 아니라 system actor로 확장한다.
```

예:

```text
created_by = system
updated_by = system
```

비권장 이유:
- 현재 문서상 `created_by`, `updated_by`는 생성자/수정자 login_id로 정의됨
- DB 규칙을 다시 합의해야 함
- login_id NOT NULL 문제는 별도로 남음

---

## 다음 작업

1. login_id 설정 흐름 확인

현재 앱 로그:

```text
[Auth] users/me response login_id null
```

확인할 내용:
- 앱이 login_id 설정 화면으로 이동하는지 확인
- login_id 저장 API 호출이 정상 동작하는지 확인
- 저장 후 `/users/me`에서 login_id가 null이 아닌 상태로 반환되는지 확인

2. users NOT NULL 설계 정리

권장 방향:
- `GET /users/me`에서 row 자동 생성 제거
- `POST /users/me/login-id`에서 최초 users row 생성
- 이후 `login_id`, `created_by`, `updated_by` NOT NULL 제약 복구

3. 임시 DB 상태 정리

확인 대상:

```sql
select user_id, login_id, created_by, updated_by, deleted_yn
from public.users
where login_id is null
   or created_by is null
   or updated_by is null;
```

조치:
- 테스트 row이면 삭제 또는 login_id 설정 후 정리
- 운영 데이터이면 사용자의 확정 login_id 기준으로 보정

4. HTTPS 개발 방식 결정

선택지:
- Expo Go 유지: 개발 중 `cloudflared` HTTPS tunnel 사용
- Development build 사용: Expo SDK 54 `expo-build-properties`의 Android cleartext 설정 검토

---

## 개발 규칙

- Screen → Hook → Service → apiClient
- Screen 직접 fetch 금지
- 최소 수정 원칙
- 큰 리팩토링 금지
- 애매하면 질문
- 임의 결정 금지
- Secret/env 실제 값 출력 금지
- `SUPABASE_SERVICE_ROLE_KEY`는 백엔드 외부로 노출 금지
- `.env` 실제 값 문서화 금지
