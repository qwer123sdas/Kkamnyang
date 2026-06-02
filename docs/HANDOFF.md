# KKamyang HANDOFF

## 현재 상태

- MVP 안정화 및 Android 실기기 QA 진행 중
- Google OAuth 및 `GET /api/v1/users/me` 연결 정상
- 공개 RUN Route Feed 백엔드 구현 완료
- Supabase `public.routes` 생성 후 Feed API `200 OK` 확인
- 다음 우선순위: Feed 데이터 렌더링 QA, 변경사항 전체 검증 및 커밋, `TASK-010-route-detail`

---

## 이번 작업 결과

### 1. 공개 Route Feed 백엔드

구현:

```text
GET /api/v1/routes/feed?page=1&size=20&activity_type=RUN
```

정책:

```text
- 공개 API: Authorization 헤더 없이 호출 가능
- activity_type = RUN only
- page >= 1
- 1 <= size <= 50
- visibility = PUBLIC
- routes.deleted_yn = N
- 작성자 users.deleted_yn = N
- created_at 기준 최신순
- size + 1 조회 후 has_next 계산
- distance_km은 JSON number로 정규화
```

구현 파일:

```text
backend/api/route_api.py
backend/services/route_service.py
backend/repositories/route_repository.py
backend/app/dependencies.py
backend/app/main.py
backend/tests/test_route_feed.py
backend/tests/test_route_repository.py
```

### 2. Supabase routes 테이블 확인

초기 오류:

```text
Supabase routes request failed status=404 postgrest_code=PGRST205
```

원인:

```text
PostgREST schema cache에서 public.routes 테이블을 찾지 못함
```

조치 후 확인:

```text
GET /api/v1/routes/feed?page=1&size=20&activity_type=RUN
200 OK
```

### 3. PostGIS geography 타입

`start_point`, `end_point`는 GPS 위치 저장과 거리 기반 검색을 위해 PostGIS
`geography(POINT, 4326)` 타입을 사용한다.

필요 기능:

```text
- 주변 Route 조회
- Route Similarity 시작점 반경 300m 판정
- Route Similarity 종료점 반경 300m 판정
- GIST 공간 인덱스 기반 검색
```

주의:

```text
- geography는 PostgreSQL 기본 타입이 아니라 PostGIS extension 제공 타입
- PostGIS가 활성화되지 않으면 type "geography" does not exist 오류 발생
- PostGIS 설치 스키마에 따라 스키마 한정 타입명을 사용
- 좌표 입력 순서는 POINT(longitude latitude)
```

설치 위치 확인 SQL:

```sql
select
  e.extname,
  n.nspname as extension_schema
from pg_extension e
join pg_namespace n on n.oid = e.extnamespace
where e.extname = 'postgis';

select
  n.nspname as type_schema,
  t.typname
from pg_type t
join pg_namespace n on n.oid = t.typnamespace
where t.typname = 'geography';
```

PostgREST schema cache 갱신:

```sql
NOTIFY pgrst, 'reload schema';
```

---

## 남은 작업

### 1. Feed 데이터 렌더링 QA

현재 빈 Feed 요청은 `200 OK`까지 확인했다.

다음 확인:

```text
1. public.routes에 테스트용 PUBLIC, RUN, deleted_yn = N row 준비
2. 작성자는 users.deleted_yn = N 상태 유지
3. Android 앱에서 Feed 카드 렌더링 확인
4. PRIVATE Route와 삭제 Route가 Feed에 노출되지 않는지 확인
5. 작성자가 삭제 처리된 Route가 Feed에 노출되지 않는지 확인
```

실제 UUID, login_id, 이메일, Secret은 문서 또는 로그에 기록하지 않는다.

### 2. 백엔드 전체 검증

Feed 구현 직후 검증 결과:

```text
python -m pytest backend/tests -q
12 passed
```

이후 Supabase 오류 원인 식별을 위해 안전한 진단 로그 테스트를 추가했다.
변경사항 커밋 전 전체 테스트를 다시 실행한다.

```powershell
python -m pytest backend/tests -q
git diff --check
```

### 3. 변경사항 검토 및 커밋

현재 Feed 구현, 테스트, PDCA 문서, DDL 참고 문구 변경사항이 아직 커밋되지 않았다.

검토 대상:

```text
backend/
docs/db/db_dml.md
docs/01-plan/
docs/02-design/
docs/03-analysis/
docs/04-report/
docs/superpowers/
docs/HANDOFF.md
```

### 4. 다음 기능

Feed QA와 커밋 이후 진행:

```text
docs/task/TASK-010-route-detail.md
```

---

## 실행 명령

백엔드:

```powershell
python -m uvicorn app.main:app --reload --app-dir backend --host 0.0.0.0 --port 8000 --env-file backend\.env
```

Android 실기기 연결:

```text
휴대폰 앱
→ HTTPS tunnel
→ FastAPI
```

실제 tunnel URL과 `.env` 값은 문서화하지 않는다.

---

## 개발 규칙

- Screen → Hook → Service → apiClient
- Screen 직접 fetch 금지
- 최소 수정 원칙
- 큰 리팩토링 금지
- Secret/env 실제 값 출력 금지
- `SUPABASE_SERVICE_ROLE_KEY`는 백엔드 외부로 노출 금지
- `.env` 실제 값 문서화 금지
