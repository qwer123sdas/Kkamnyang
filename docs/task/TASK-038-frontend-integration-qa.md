---
id: TASK-038
title: 프론트엔드 통합 QA
status: completed-with-blockers
area: frontend
feature: qa
priority: high
depends_on: [TASK-030, TASK-031, TASK-032, TASK-033, TASK-034, TASK-035, TASK-036, TASK-037]
created: 2026-07-01
updated: 2026-07-26
---

# 목적

지원되는 개발 환경 또는 실기기 환경에서 로그인부터 기록, Feed, Detail, Profile, Bookmark까지의 주요 MVP 사용자 흐름을 확인한다.

# 참고 문서

- [[AGENTS]]
- [[PROJECT]]
- [[docs/archive-or-legacy/HANDOFF-history]]
- [[docs/source/architecture]]
- [[docs/source/api-spec]]
- [[docs/source/design-system]]
- [[docs/FRONTEND-BOARD]]

# 작업 범위

- [x] 앱 시작의 로컬 검증 범위와 차단 요인을 확인한다.
- [x] 인증/세션 동작을 확인한다.
- [x] Route Feed와 Detail 흐름을 확인한다.
- [x] 러닝 기록 흐름을 확인한다.
- [x] Profile과 Bookmark 흐름을 확인한다.
- [x] 환경 차단 요인을 기록한다.

# 제외 범위

- 백엔드 기능 개발
- 데이터베이스 스키마 변경
- 근거 없는 TASK 상태 변경

# 실행 명령

```powershell
npx.cmd tsc --noEmit
python -m pytest backend/tests
git diff --check
```

# 완료 조건

- [x] 전체 MVP 흐름을 검증했거나 차단 요인을 문서화했다.
- [x] 실행 명령과 결과를 기록했다.
- [x] 실기기 관련 이슈를 [[docs/issue/ISSUE-001-local-development]] 또는 이 TASK에 기록했다.
- [x] 검증 후 [[docs/FRONTEND-BOARD]]와 [[docs/archive-or-legacy/HANDOFF-history]]를 갱신했다.

# 변경 파일

- `docs/task/TASK-031-frontend-auth-flow.md`부터 `TASK-037-frontend-common-states.md`
- `docs/task/TASK-038-frontend-integration-qa.md`
- `docs/issue/ISSUE-001-local-development.md`
- `docs/FRONTEND-BOARD.md`
- `docs/archive-or-legacy/HANDOFF-history.md`
- `HANDOFF.md`
- `todo.md`

# 검증 결과

- `npx.cmd tsc --noEmit`: 통과
- `python -m pytest backend/tests`: 57 passed, 131 warnings
- `git diff --check`: 통과 (줄 끝 변환 경고만 발생)
- TASK-027의 과거 Android bundle compile 및 로컬 health 검증 결과는 이력으로 유지
- 현재 앱 런타임, OAuth, 지도, 위치 권한은 외부 환경 차단으로 미검증

# 남은 이슈

- 현재 프로세스에서 필요한 `EXPO_PUBLIC_*` 설정 네 항목이 모두 `NOT_SET`이다.
- Android 실기기, 동일 네트워크, Supabase/Google Provider와 callback 허용 목록이 필요하다.
- 다음 실기기 세션에서 Login → Feed → Detail → Record → Profile → My Routes/Bookmarks를 재검증한다.
