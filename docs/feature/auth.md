# 인증 기능

## 범위

인증과 사용자 식별 설정을 다룬다.

지원 로그인 경로:

- Google OAuth
- Naver OAuth
- 일반 회원가입은 향후 범위

## MVP 우선순위

인증은 `RUN` MVP에 필요한 기반 기능이다.

## 프론트엔드 경로

```text
kkamyang-app/src/screens/auth
-> kkamyang-app/src/hooks/useAuth.ts
-> kkamyang-app/src/services/authService.ts
-> kkamyang-app/src/services/apiClient.ts
```

## 백엔드 경로

```text
backend/api/user_api.py
-> backend/services/auth_service.py
-> backend/services/user_service.py
-> backend/repositories/user_repository.py
```

## 관련 Task 문서

- `../task/TASK-003-auth.md`
- `../task/TASK-003A-auth-infra.md`
- `../task/TASK-004-login-id.md`
- `../task/TASK-022-fix-google-login.md`
- `../task/TASK-024-social-user-identity-stabilization.md`

## 변경 금지 메모

- `login_id`는 고유하며 변경할 수 없다.
- `login_id` 정규식: `^[a-z0-9_]{4,30}$`
- 실제 인증 토큰이나 환경변수 값을 출력하지 않는다.
- Task 범위 없이 인증 Provider 정책, API 응답 또는 Router를 변경하지 않는다.
