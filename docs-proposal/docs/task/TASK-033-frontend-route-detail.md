---
id: TASK-033
title: Route Detail 프론트엔드
status: ready
area: frontend
feature: route
priority: high
depends_on: []
created: 2026-07-01
updated: 2026-07-01
---

# 목적

경로 상세 정보와 polyline 지도를 표시하고 좋아요·북마크 상태를 연동한다.

# 참고 문서

- [[../../AGENTS]]
- [[../architecture]]
- [[../api-spec]]
- [[../design-system]]
- [[../FRONTEND-BOARD]]

# 작업 원칙

- Type → Service → Hook → Screen 순서로 확인한다.
- Screen에서 직접 API를 호출하지 않는다.
- 기존 구현을 우선 점검하고 필요한 부분만 최소 수정한다.
- API 문서와 실제 백엔드 응답이 다르면 임의로 맞추지 않고 차이를 기록한다.

# 작업 범위

- [ ] 관련 타입 확인 및 보완
- [ ] Service API 연동 확인
- [ ] Hook 상태 및 비즈니스 흐름 확인
- [ ] Screen 렌더링 및 사용자 동작 확인
- [ ] 로딩·빈 상태·오류 처리 확인

# 제외 범위

- Nearby Route
- Route Cluster
- Route History
- Comment
- 추천 알고리즘 고도화
- 범위 밖 대규모 리팩터링

# 완료 조건

- [ ] 기능 요구사항이 실기기 또는 개발 환경에서 동작한다.
- [ ] Screen 직접 API 호출이 없다.
- [ ] 중복 요청과 무한 렌더링이 없다.
- [ ] TypeScript 오류가 없다.
- [ ] 변경 파일을 기록했다.
- [ ] 검증 결과와 남은 이슈를 기록했다.

# 변경 파일

- 미작성

# 검증 결과

- 미검증

# 남은 이슈

- 실제 저장소 대조 후 작성
