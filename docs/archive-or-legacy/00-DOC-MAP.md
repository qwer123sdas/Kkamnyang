# 문서 맵

> [!WARNING]
> 이 문서는 과거 시점의 구조를 보존한 기록이다. 링크와 경로가 현재 구조와 일치하지 않을 수 있으며, 현재 기준은 [[docs/INDEX]]를 따른다.

이 문서는 RouteLog 문서와 코드의 위치를 빠르게 찾기 위한 색인이다.
기존 문서의 원문을 대체하지 않는다.

## 1. 핵심 문서

| 영역 | 파일 | 목적 |
| --- | --- | --- |
| Agent rules | `AGENTS.md` | 프로젝트 규칙, 금지 사항, 응답 형식 |
| Work guide | `work_guide.md` | 작업 방식 참고 |
| Entry | `docs/00-LLM-ENTRY.md` | AI Agent 작업 시작 진입점 |
| Architecture | `docs/architecture.md` | 시스템 구조와 책임 범위 |
| Requirements | `docs/requirements.md` | 기능/비기능 요구사항 |
| API | `docs/api-spec.md` | API 명세 |
| Frontend/Backend contract | `docs/frontend-backend-contract.md` | 프론트/백엔드 연동 계약 |
| DB schema | `docs/db-schema.md` | DB 구조 요약 |
| Design system | `docs/design-system.md` | UI 스타일과 컴포넌트 방향 |
| Handoff | `HANDOFF.md` | 현재 작업 상태와 인수인계 |
| Handoff history | `docs/archive-or-legacy/HANDOFF-history.md` | 과거 상세 인수인계와 검증 결과 |

## 2. Task 문서

Task 문서는 `docs/task` 아래에 있다.

| 범위 | 초점 |
| --- | --- |
| `TASK-001` - `TASK-008A` | 프로젝트 기반, 인증, 기록 시작, GPS, 지도 |
| `TASK-009` - `TASK-014` | Route feed/detail, like/bookmark, comments, cluster, history |
| `TASK-015` - `TASK-018` | Profile, my routes, bookmarks, MVP stabilization |
| `TASK-019` - `TASK-023` | Device test, runtime fix, retest, Google login, backend skeleton |
| `TASK-024` - `TASK-028` | Social identity, health metrics, integration, QA, UX/UI direction |

작업 시작 시 가장 가까운 Task 문서를 먼저 확인한다.

## 3. 기능 맵

| 기능 | 프론트엔드 | 백엔드 | Task 문서 |
| --- | --- | --- | --- |
| Auth/Login | `kkamyang-app/src/screens/auth`<br>`kkamyang-app/src/hooks/useAuth.ts`<br>`kkamyang-app/src/services/authService.ts` | `backend/api/user_api.py`<br>`backend/services/auth_service.py`<br>`backend/services/user_service.py`<br>`backend/repositories/user_repository.py` | `TASK-003-auth.md`<br>`TASK-003A-auth-infra.md`<br>`TASK-004-login-id.md`<br>`TASK-022-fix-google-login.md`<br>`TASK-024-social-user-identity-stabilization.md` |
| Record/GPS | `kkamyang-app/src/screens/record/RecordScreen.tsx`<br>`kkamyang-app/src/hooks/useGPSRecorder.ts`<br>`kkamyang-app/src/services/activityService.ts` | Route/activity persistence path in backend route modules | `TASK-005-record-start.md`<br>`TASK-006-gps-record.md`<br>`TASK-007-record-finish`<br>`TASK-020-runtime-fix.md` |
| Route Feed | `kkamyang-app/src/screens/route/RouteFeedScreen.tsx`<br>`kkamyang-app/src/hooks/useRouteFeed.ts`<br>`kkamyang-app/src/services/routeService.ts` | `backend/api/route_api.py`<br>`backend/services/route_service.py`<br>`backend/repositories/route_repository.py` | `TASK-009-route-feed.md` |
| Route Detail | `kkamyang-app/src/screens/route/RouteDetailScreen.tsx`<br>`kkamyang-app/src/hooks/useRouteDetail.ts` | `backend/api/route_api.py`<br>`backend/services/route_service.py` | `TASK-010-route-detail.md` |
| Like/Bookmark | `kkamyang-app/src/services/likeService.ts`<br>`kkamyang-app/src/services/bookmarkService.ts`<br>`kkamyang-app/src/hooks/useBookmarks.ts` | Route/user related backend modules | `TASK-011-like-bookmark.md`<br>`TASK-017-bookmarks.md` |
| Comments | `kkamyang-app/src/hooks/useRouteComments.ts`<br>`kkamyang-app/src/services/commentService.ts` | Route related backend modules | `TASK-012-comments.md` |
| Route Cluster | `kkamyang-app/src/screens/route/RouteClusterScreen.tsx`<br>`kkamyang-app/src/hooks/useRouteCluster.ts`<br>`kkamyang-app/src/services/routeClusterService.ts` | Route related backend modules | `TASK-013-route-cluster.md` |
| Route History | `kkamyang-app/src/screens/route/RouteHistoryScreen.tsx`<br>`kkamyang-app/src/hooks/useRouteHistory.ts`<br>`kkamyang-app/src/services/routeHistoryService.ts` | Route related backend modules | `TASK-014-route-history.md` |
| Profile/My Routes | `kkamyang-app/src/screens/profile/ProfileScreen.tsx`<br>`kkamyang-app/src/screens/route/MyRoutesScreen.tsx`<br>`kkamyang-app/src/hooks/useProfile.ts`<br>`kkamyang-app/src/hooks/useMyRoutes.ts` | User/route related backend modules | `TASK-015-profile.md`<br>`TASK-016-my-routes.md` |

## 4. 데이터베이스 문서

| 파일 | 목적 |
| --- | --- |
| `docs/db-schema.md` | DB 스키마 개요 |
| `docs/db/db_ddl.md` | DDL 참고 |
| `docs/db/db_dml.md` | DML 참고 |

DB 변경은 Task 범위와 명시적 승인 없이 진행하지 않는다.

## 5. 분석 및 보고 문서

| 디렉터리 | 목적 |
| --- | --- |
| `docs/01-plan` | 계획 문서 |
| `docs/02-design` | 설계 문서 |
| `docs/03-analysis` | 분석 문서 |
| `docs/04-report` | 결과 보고 문서 |
| `docs/superpowers` | 외부 워크플로 산출물 |
| `docs/test` | 테스트/수동 QA 문서 |

## 6. 업데이트 규칙

문서 업데이트 기준:

- 기능 단위 변경은 관련 Task 문서에 근거를 둔다.
- 전체 구조를 바꾸지 않고 색인, 관계, 링크를 추가한다.
- 실행 명령을 새로 사용해야 하면 먼저 Task 문서 기록 여부를 확인한다.
- 오래된 내용이 의심되면 기존 본문을 덮어쓰지 말고 별도 분석 또는 보강 문서로 남긴다.
