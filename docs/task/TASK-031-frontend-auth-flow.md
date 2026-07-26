---
id: TASK-031
title: 프론트엔드 인증 흐름
status: completed
area: frontend
feature: auth
priority: high
depends_on: [TASK-030]
created: 2026-07-01
updated: 2026-07-26
---

# 목적

Google OAuth, 세션 복구, `users/me`, 최초 `login_id` 설정에 대한 프론트엔드 흐름을 확인하고 완성한다.

# 참고 문서

- [[AGENTS]]
- [[PROJECT]]
- [[docs/archive-or-legacy/HANDOFF-history]]
- [[docs/source/architecture]]
- [[docs/source/api-spec]]
- [[docs/source/db-schema]]
- [[docs/source/design-system]]
- [[docs/FRONTEND-BOARD]]
- [[docs/task/TASK-030-frontend-common-api-types]]

# 작업 범위

- [x] 인증 Service 메서드를 확인한다.
- [x] 인증 Hook 상태 전환을 확인한다.
- [x] 로그인 및 login-id 설정 화면을 확인한다.
- [x] Secret을 노출하지 않고 OAuth 차단 상태를 문서화한다.

# 제외 범위

- Naver OAuth
- 백엔드 인증 정책 변경
- `.env` 값 변경 또는 노출

# 실행 명령

```powershell
npx.cmd tsc --noEmit
```

환경변수는 실제 값을 출력하지 않고 `SET` / `NOT_SET`만 확인한다.

# 완료 조건

- [x] Google 인증 흐름을 검증했거나 차단 사유를 문서화했다.
- [x] 세션 복구 동작을 확인했다.
- [x] Screen 직접 API 호출이 없다.
- [x] 변경 파일을 기록했다.
- [x] 검증 결과를 기록했다.

# 변경 파일

- `kkamyang-app/src/hooks/useAuth.ts`
- `kkamyang-app/src/screens/auth/LoginScreen.tsx`
- `docs/task/TASK-031-frontend-auth-flow.md`

# 검증 결과

- `npx.cmd tsc --noEmit`: 통과
- 세션 복구: `getSession → users/me` 및 auth state/callback 재로딩 경로 정적 확인
- Google 로그인 중복 호출 방지 상태 추가
- 프로세스 환경 확인: API URL, Supabase URL/Anon Key, Google Maps Key 모두 `NOT_SET`
- Secret 실제 값은 읽거나 출력하지 않음

# 남은 이슈

- Supabase/Google Provider 설정과 Android callback은 현재 환경변수 및 실기기가 없어 미검증이다.
- 소셜 사용자는 백엔드에서 `login_id`를 자동 생성한다. 일반 회원용 `/users/me/login-id`는 API 명세상 `DEFERRED`이므로 실제 호출 검증 대상이 아니다.
