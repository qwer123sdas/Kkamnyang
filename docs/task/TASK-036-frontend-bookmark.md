---
id: TASK-036
title: 프론트엔드 Bookmark
status: completed
area: frontend
feature: bookmark
priority: medium
depends_on: [TASK-030, TASK-031, TASK-033]
created: 2026-07-01
updated: 2026-07-26
---

# 목적

Bookmark 생성, 취소, My Bookmarks 프론트엔드 흐름을 확인하고 완성한다.

# 참고 문서

- [[AGENTS]]
- [[PROJECT]]
- [[docs/archive-or-legacy/HANDOFF-history]]
- [[docs/source/architecture]]
- [[docs/source/api-spec]]
- [[docs/source/design-system]]
- [[docs/FRONTEND-BOARD]]
- [[docs/task/TASK-030-frontend-common-api-types]]

# 작업 범위

- [x] Bookmark Service 메서드를 확인한다.
- [x] Bookmark Hook 동작을 확인한다.
- [x] Route Detail의 Bookmark 상태를 확인한다.
- [x] My Bookmarks 목록 상태를 확인한다.

# 제외 범위

- 추천 로직
- 오프라인 동기화
- 백엔드 endpoint 변경

# 실행 명령

```powershell
npx.cmd tsc --noEmit
python -m pytest backend/tests
```

# 완료 조건

- [x] 중복 요청 없이 Bookmark 상태 변경이 반영된다.
- [x] My Bookmarks 목록을 확인했다.
- [x] 변경 파일을 기록했다.
- [x] 검증 결과를 기록했다.

# 변경 파일

- `kkamyang-app/src/components/common/AsyncStateMessage.tsx`
- `kkamyang-app/src/screens/bookmark/BookmarkScreen.tsx`
- `docs/task/TASK-036-frontend-bookmark.md`

# 검증 결과

- `npx.cmd tsc --noEmit`: 통과
- `python -m pytest backend/tests`: 57 passed, 131 warnings
- Bookmark 생성/취소/count/boolean 백엔드 자동화 테스트 통과
- `isBookmarkUpdating`으로 Detail 중복 요청 방지 확인
- Bookmarks 목록 오류 재시도와 빈 상태 확인

# 남은 이슈

- 실제 사용자 세션 목록은 TASK-038 외부 환경 차단 항목으로 남는다.
