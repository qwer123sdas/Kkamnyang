---
id: DEC-001
title: 프론트엔드 계층 구조
status: accepted
area: frontend
created: 2026-07-01
updated: 2026-07-01
---

# 배경

화면마다 API 호출과 비즈니스 로직이 섞이면 테스트와 유지보수가 어려워진다.

# 결정

프론트엔드는 다음 의존 방향을 고정한다.

```text
Screen → Hook → Service → apiClient
```

# 세부 규칙

- Screen은 화면 표시와 사용자 이벤트 전달에 집중한다.
- Hook은 화면 상태와 비즈니스 흐름을 관리한다.
- Service는 API 기능 단위를 제공한다.
- 모든 HTTP 요청은 apiClient를 거친다.
- Screen의 직접 `fetch`는 금지한다.
- 요청·응답 타입은 `src/types`에 먼저 정의한다.

# 영향 범위

- `kkamyang-app/src/screens`
- `kkamyang-app/src/hooks`
- `kkamyang-app/src/services`
- `kkamyang-app/src/types`
