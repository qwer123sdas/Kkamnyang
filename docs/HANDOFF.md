# KKamyang HANDOFF

## 2026-06-04 최신 인계 요약

### 현재 완료 상태

- Feed QA Refresh 이후 public RUN Feed 카드 표시 검증 완료.
- Feed 카드 기준 Like / Bookmark 버튼 표시 및 색상 변경 검증 완료.
- Route Detail API `200 OK`, Detail 화면 표시, 상태 표시 검증 완료.
- 댓글 임시 기능은 Detail 화면 진입 대신 Feed QA 영역에서 바로 접근하도록 변경 완료.
- 사용자가 실제 기기/화면에서 다음 흐름을 검증 완료:

```text
Feed QA Refresh
-> Open Route Detail / Comments 버튼 표시
-> 버튼 클릭 시 같은 Feed 화면 아래에 댓글 입력 영역 표시
-> Save / Delete 버튼 표시
-> 실제 DB route_comments 입력/수정/삭제 반영
```

### 이번 작업에서 변경한 핵심 내용

Backend:

```text
PATCH  /api/v1/routes/{route_id}/comments/{comment_id}
DELETE /api/v1/routes/{route_id}/comments/{comment_id}
```

- 댓글 수정 API 추가.
- 댓글 삭제 API 추가.
- 댓글 삭제는 물리 삭제가 아니라 `deleted_yn = Y`, `deleted_at` 세팅 방식의 soft delete로 처리.
- 댓글 create/delete 이후 `routes.comment_count` 재계산 반영.
- 댓글 update/delete는 로그인 사용자 본인 댓글만 가능하도록 service 계층에서 owner check 수행.

Frontend:

- `Open Route Detail / Comments` 버튼에서 `navigation.navigate("RouteDetail")` 호출 제거.
- 버튼 클릭 시 Feed QA 영역 아래에 댓글 입력창 표시.
- 입력창 오른쪽에 `Save`, `Delete` 버튼 표시.
- `Save` 동작:
  - 선택된 댓글이 없으면 create.
  - 댓글 목록에서 기존 댓글을 선택한 상태면 update.
- `Delete` 동작:
  - 선택된 댓글이 있으면 실제 backend DELETE API 호출.
  - 선택된 댓글이 없으면 입력 draft만 초기화.
- Feed 화면에서 `useAuth()` 구독을 사용하지 않음.
  - 이전 무한 루프 재발 방지를 위해 버튼 액션 시점에만 `authService.getSession()` 호출.

### 관련 변경 파일

```text
backend/api/route_api.py
backend/services/route_service.py
backend/repositories/route_repository.py
backend/tests/test_route_feed.py
backend/tests/test_route_repository.py

kkamyang-app/src/services/apiClient.ts
kkamyang-app/src/services/commentService.ts
kkamyang-app/src/types/route.ts
kkamyang-app/src/hooks/useFeedQaComments.ts
kkamyang-app/src/screens/route/RouteFeedScreen.tsx
```

주의:

```text
git status에는 이전 TASK-010/TASK-011/TASK-012 작업에서 이미 수정된 파일도 함께 보일 수 있다.
이번 인계 기준 핵심 신규 파일은 kkamyang-app/src/hooks/useFeedQaComments.ts 이다.
```

### 검증 결과

Backend:

```powershell
python -m pytest backend\tests -q
```

결과:

```text
41 passed
```

주의:

```text
PytestCacheWarning은 .pytest_cache 디렉터리 쓰기 권한 문제이다.
테스트 실패가 아니며 현재 테이블 생성 상태와도 무관하다.
```

Frontend:

```powershell
npx.cmd tsc --noEmit
```

결과:

```text
통과
```

Diff 검사:

```powershell
git diff --check
```

결과:

```text
whitespace error 없음
CRLF 변환 경고만 표시됨
```

### 현재 남아있는 주의사항

- `route_comments` 테이블은 이미 생성되어 있으므로 추가 DDL 작업은 하지 않는다.
- `.env` 실제 값은 확인하거나 문서화하지 않는다.
- Screen 직접 fetch 금지 규칙 유지.
  - Screen -> Hook -> Service -> apiClient 흐름 유지.
- Feed 화면에서 인증 상태 구독 훅을 추가하지 않는다.
  - 이전 무한 루프 원인은 Feed 화면 렌더/인증 구독/Feed refresh가 서로 엮인 반복 호출이었다.
- HANDOFF 기존 본문은 인코딩이 깨진 상태로 보인다.
  - 이번 인계는 상단의 정상 UTF-8 섹션을 최신 기준으로 사용한다.

### 이후 작업해야 할 내용

1. 댓글 임시 UI를 정식 댓글 컴포넌트로 분리

```text
현재는 QA 목적상 RouteFeedScreen 내부에 FeedQaCommentEditor가 있다.
다음 단계에서는 재사용 가능한 CommentEditor 또는 RouteCommentPanel 컴포넌트로 분리한다.
```

2. 댓글 목록 UX 정리

```text
- 선택된 댓글 표시 방식 개선
- update 모드 / create 모드 구분 표시
- 저장 완료 후 draft 초기화 여부 정책 결정
- 삭제 전 확인 UX 필요 여부 결정
```

3. Detail 화면 댓글 기능과 Feed QA 임시 기능의 역할 정리

```text
현재 요구사항은 Detail 진입보다 Feed QA 영역에서 댓글 입력이었다.
추후 실제 제품 UX에서는 Route Detail 화면에 정식 댓글 작성/목록을 유지할지,
Feed QA 임시 패널은 제거할지 결정해야 한다.
```

4. Like / Bookmark 실제 API 연동 상태 재점검

```text
현재 Feed QA 버튼 색상 변경은 화면 상태 표현 중심이다.
TASK-011에서 구현된 실제 like/bookmark API와 Feed QA 버튼이 완전히 연결되어 있는지
최종 제품 흐름 기준으로 재확인한다.
```

5. TASK 문서 정리

```text
TASK-010 route detail
TASK-011 like/bookmark
TASK-012 comments
```

각 문서에 다음을 최신화한다:

```text
- 구현 완료 범위
- 실행한 명령
- QA 로그/결과
- 남은 임시 구현
- 정식 UX 전환 시 해야 할 일
```

6. pycache 상태 정리

```text
pytest 실행 후 tracked __pycache__ 파일이 수정 상태로 나타날 수 있다.
기능 변경이 아니므로 커밋 전 제외하거나 원복한다.
일반 git restore가 .git/index.lock 권한 문제로 실패할 수 있으므로,
필요 시 승인된 권한으로 pycache만 정리한다.
```

---

## 아래 기존 본문에 대한 정정

아래 본문은 과거 Feed backend 완료 시점의 기록이다.
아래에 남아 있는 `TASK-010-route-detail` 문구는 당시의 다음 작업이었고, 최신 상태가 아니다.

현재 기준:

```text
TASK-010 route detail: 진행 및 검증 완료
TASK-011 like/bookmark: 진행 및 검증 완료
TASK-012 comments: 진행 및 검증 완료
```

이후 작업은 문서 상단 `2026-06-04 최신 인계 요약`의 `이후 작업해야 할 내용`을 따른다.

---

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

```text
docs/task/TASK-013.md
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
