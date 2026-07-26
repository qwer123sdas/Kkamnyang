---
id: TASK-032
title: 프론트엔드 Route Feed
status: completed
area: frontend
feature: route-feed
priority: high
depends_on: [TASK-030, TASK-031]
created: 2026-07-01
updated: 2026-07-26
---

# 목적

문서화된 백엔드 Feed API를 사용해 프론트엔드 Route Feed 흐름을 확인하고 완성한다.

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

- [x] Feed 응답 타입을 확인한다.
- [x] Route Feed Service를 확인한다.
- [x] Route Feed Hook을 확인한다.
- [x] 로딩, 빈 상태, 오류, 성공 UI 상태를 확인한다.

# 제외 범위

- Nearby Route
- Route Cluster
- Route History
- 추천 알고리즘

# 실행 명령

```powershell
npx.cmd tsc --noEmit
python -m pytest backend/tests
```

# 완료 조건

- [x] Feed가 Service와 Hook 계층을 통해 로드된다.
- [x] 페이지네이션 동작을 검증했거나 문서화했다.
- [x] Screen 직접 API 호출이 없다.
- [x] 변경 파일을 기록했다.
- [x] 검증 결과를 기록했다.

# 변경 파일

- `kkamyang-app/src/components/common/AsyncStateMessage.tsx`
- `kkamyang-app/src/screens/route/RouteFeedScreen.tsx`
- `docs/task/TASK-032-frontend-route-feed.md`

# 검증 결과

- `npx.cmd tsc --noEmit`: 통과
- `python -m pytest backend/tests`: 57 passed, 131 warnings
- `Service → Hook → Screen` 및 `page/size/has_next` 다음 페이지 흐름 확인
- 오류와 빈 상태가 동시에 표시되지 않도록 수정

# 남은 이슈

- 실데이터 렌더링과 네트워크 실패 수동 검증은 TASK-038 환경 차단 항목으로 이관한다.
