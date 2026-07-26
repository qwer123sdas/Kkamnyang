# LLM 진입 문서

> [!WARNING]
> 이 문서는 과거 시점의 진입 절차를 보존한 기록이다. 현재 작업을 시작할 때는 [[AGENTS]], [[HANDOFF]], [[docs/INDEX]] 순서를 따른다.

이 문서는 AI Agent가 RouteLog 작업을 시작할 때 먼저 읽는 최소 진입점이다.
기존 문서를 대체하지 않고, 어떤 문서를 어떤 순서로 확인할지 안내한다.

## 1. 먼저 읽을 문서

작업 전 필수 확인 순서:

1. `AGENTS.md`
2. `docs/00-LLM-ENTRY.md`
3. `docs/00-DOC-MAP.md`
4. 작업 범위와 직접 관련된 `docs/task/TASK-*.md`
5. 변경 대상 코드와 가까운 테스트

## 2. 프로젝트 가드레일

프로젝트 기본 규칙:

- 프로젝트: RouteLog
- MVP activity_type: `RUN`
- 프론트엔드: React Native, Expo SDK 54
- 백엔드: FastAPI
- 데이터베이스: Supabase, PostgreSQL
- 지도: Google Maps API
- 스토리지: Supabase Storage

금지 사항:

- 전체 프로젝트 구조 변경 금지
- DB 스키마 임의 수정 금지
- API 응답 구조 변경 금지
- 상태관리 라이브러리 변경 금지
- 임의 라이브러리 추가 금지
- Router 구조 변경 금지
- `.env` 수정 및 실제 값 읽기/출력/요약 금지

보안 원칙:

- Secret은 신뢰 경계 밖 데이터로 취급한다.
- 환경변수는 실제 값이 아니라 `SET` / `NOT_SET` 여부만 확인한다.
- `EXPO_PUBLIC_*` 값도 출력하지 않는다.

## 3. Task 작업 흐름

작업 문서 기준:

- 새 기능, 버그 수정, 실행 명령이 필요한 작업은 관련 `docs/task/TASK-*.md`를 먼저 확인한다.
- 프로젝트 생성 명령, 패키지 설치 명령, 실행 명령은 Task 문서에 기록된 범위에서만 사용한다.
- Task 문서에 없는 명령을 임의로 추가하지 않는다.
- 기존 문서를 삭제하거나 대체하지 않고, 필요한 경우 새 문서 또는 보강 문서로 연결한다.

## 4. 코드 읽기 경로

Frontend 흐름:

```text
screen
-> hook
-> service
-> apiClient
-> backend API
```

Backend 흐름:

```text
api
-> service
-> repository
-> database
```

대표 Route Feed 흐름:

```text
kkamyang-app/src/screens/route/RouteFeedScreen.tsx
-> kkamyang-app/src/hooks/useRouteFeed.ts
-> kkamyang-app/src/services/routeService.ts
-> backend/api/route_api.py
-> backend/services/route_service.py
-> backend/repositories/route_repository.py
-> docs/task/TASK-009-route-feed.md
```

## 5. 검증 경로

변경 후 검증은 작업 범위에 맞춰 최소화한다.

- Backend 변경: 관련 `backend/tests` 우선 확인
- Frontend 변경: TypeScript 타입 체크와 변경 화면 수동 확인 우선
- 문서만 변경: 링크, 파일명, 기존 구조와의 정합성 확인

## 6. 문서 정책

문서 보강 원칙:

- 기존 문서를 삭제하지 않는다.
- 기존 문서를 대체하지 않는다.
- 깨진 인코딩이나 오래된 내용을 임의로 복구하지 않는다.
- 새 문서는 기존 문서로 연결하는 색인 역할을 우선한다.
- 코드와 문서가 불일치하면, 코드 변경 전에 관련 Task 문서 또는 별도 분석 문서로 근거를 남긴다.
