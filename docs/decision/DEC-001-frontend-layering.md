---
id: DEC-001
title: 프론트엔드 계층 구조
status: accepted
area: frontend
created: 2026-07-01
updated: 2026-07-01
---

# 배경

RouteLog는 화면이 늘어나도 프론트엔드 API 연동 흐름을 예측 가능하고 테스트하기 쉬운 구조로 유지해야 한다.

# 결정

프론트엔드는 다음 방향을 따른다.

```text
Screen -> Hook -> Service -> apiClient
```

# 규칙

- Screen은 렌더링과 사용자 이벤트 전달에 집중한다.
- Hook은 화면 상태와 비즈니스 흐름을 관리한다.
- Service는 API 기능 단위 함수를 제공한다.
- HTTP 요청은 `apiClient`를 거친다.
- Screen에서 `fetch`를 직접 호출하지 않는다.
- 화면 연동 전에 요청과 응답 타입을 정의하거나 검증한다.

# 영향 범위

- `kkamyang-app/src/screens`
- `kkamyang-app/src/hooks`
- `kkamyang-app/src/services`
- `kkamyang-app/src/types`
