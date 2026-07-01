---
id: TASK-031
title: 프론트엔드 인증 흐름
status: ready
area: frontend
feature: auth
priority: high
depends_on: [TASK-030]
created: 2026-07-01
updated: 2026-07-01
---

# 목적

Google OAuth, 세션 복구, `users/me`, 최초 `login_id` 설정에 대한 프론트엔드 흐름을 확인하고 완성한다.

# 참고 문서

- [[AGENTS]]
- [[PROJECT]]
- [[docs/HANDOFF]]
- [[docs/architecture]]
- [[docs/api-spec]]
- [[docs/db-schema]]
- [[docs/design-system]]
- [[docs/FRONTEND-BOARD]]
- [[docs/task/TASK-030-frontend-common-api-types]]

# 작업 범위

- [ ] 인증 Service 메서드를 확인한다.
- [ ] 인증 Hook 상태 전환을 확인한다.
- [ ] 로그인 및 login-id 설정 화면을 확인한다.
- [ ] Secret을 노출하지 않고 OAuth 차단 상태를 문서화한다.

# 제외 범위

- Naver OAuth
- 백엔드 인증 정책 변경
- `.env` 값 변경 또는 노출

# 완료 조건

- [ ] Google 인증 흐름을 검증했거나 차단 사유를 문서화했다.
- [ ] 세션 복구 동작을 확인했다.
- [ ] Screen 직접 API 호출이 없다.
- [ ] 변경 파일을 기록했다.
- [ ] 검증 결과를 기록했다.

# 변경 파일

- 시작 전

# 검증 결과

- 미검증

# 남은 이슈

- Supabase OAuth Provider 설정이 외부 차단 요인으로 남을 수 있다.
