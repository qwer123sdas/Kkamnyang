---
id: TASK-033
title: 프론트엔드 Route Detail
status: completed
area: frontend
feature: route-detail
priority: high
depends_on: [TASK-030, TASK-032]
created: 2026-07-01
updated: 2026-07-26
---

# 목적

표시되는 경로 메타데이터와 사용자별 좋아요/북마크 상태를 포함해 Route Detail 흐름을 확인하고 완성한다.

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

- [x] Route Detail 응답 타입을 확인한다.
- [x] Route Detail Service를 확인한다.
- [x] Route Detail Hook을 확인한다.
- [x] 지도와 메타데이터 렌더링 상태를 확인한다.

# 제외 범위

- Comment 구현
- Route history
- 유사 경로 추천
- API 응답 구조 변경

# 실행 명령

```powershell
npx.cmd tsc --noEmit
python -m pytest backend/tests
```

# 완료 조건

- [x] Detail이 Service와 Hook 계층을 통해 로드된다.
- [x] PRIVATE 또는 권한 없는 경로 동작을 처리한다.
- [x] 로딩, 빈 상태, 오류 상태를 확인했다.
- [x] 변경 파일을 기록했다.
- [x] 검증 결과를 기록했다.

# 변경 파일

- `kkamyang-app/src/components/common/AsyncStateMessage.tsx`
- `kkamyang-app/src/screens/route/RouteDetailScreen.tsx`
- `docs/task/TASK-033-frontend-route-detail.md`

# 검증 결과

- `npx.cmd tsc --noEmit`: 통과
- `python -m pytest backend/tests`: 57 passed, 131 warnings
- PUBLIC/PRIVATE/미존재 Route 백엔드 자동화 테스트 통과
- Detail 오류에 재시도 동작 추가

# 남은 이슈

- 지도 실표시와 인증된 PRIVATE Route는 TASK-038 실기기 환경에서 재검증한다.
