---
id: TASK-037
title: 프론트엔드 공통 로딩 빈 상태 오류 상태
status: completed
area: frontend
feature: common-states
priority: medium
depends_on: [TASK-030]
created: 2026-07-01
updated: 2026-07-26
---

# 목적

MVP 프론트엔드 화면 전반의 공통 로딩, 빈 상태, 오류 상태 처리를 확인한다.

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

- [x] 반복되는 상태 패턴을 확인한다.
- [x] 사용자에게 표시되는 오류 메시지를 확인한다.
- [x] Feed, Routes, Bookmarks의 빈 상태를 확인한다.
- [x] 남은 불일치를 문서화한다.

# 제외 범위

- 신규 디자인 시스템
- 광범위한 UI 재설계
- 신규 UI 라이브러리

# 실행 명령

```powershell
npx.cmd tsc --noEmit
```

# 완료 조건

- [x] MVP 화면에서 안정적인 로딩, 빈 상태, 오류 상태를 제공한다.
- [x] 텍스트와 UI 동작이 기존 디자인 규칙을 따른다.
- [x] 변경 파일을 기록했다.
- [x] 검증 결과를 기록했다.

# 변경 파일

- `kkamyang-app/src/components/common/AsyncStateMessage.tsx`
- `kkamyang-app/src/screens/route/RouteFeedScreen.tsx`
- `kkamyang-app/src/screens/route/RouteDetailScreen.tsx`
- `kkamyang-app/src/screens/route/MyRoutesScreen.tsx`
- `kkamyang-app/src/screens/bookmark/BookmarkScreen.tsx`
- `kkamyang-app/src/screens/profile/ProfileScreen.tsx`
- `docs/source/routelog-design-system.md`
- `docs/task/TASK-037-frontend-common-states.md`

# 검증 결과

- `npx.cmd tsc --noEmit`: 통과
- 공통 상태 메시지와 선택적 재시도 동작 추가
- Feed/My Routes/Bookmarks에서 오류와 빈 상태의 동시 표시 제거
- Profile과 Detail의 로딩/오류/데이터 없음 상태 구분

# 남은 이슈

- 오류 문구는 현재 서버 코드 중심이다. 사용자 친화적 문구 매핑은 API 오류 정책 변경 없이 별도 UI Task에서 검토할 수 있다.
