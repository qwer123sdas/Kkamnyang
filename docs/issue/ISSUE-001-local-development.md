---
id: ISSUE-001
title: 로컬 개발 및 실기기 연결
status: open
area: infra
created: 2026-07-01
updated: 2026-07-26
---

# 증상

- Expo 기본 포트가 이미 사용 중일 수 있다.
- 실기기에서 로컬 FastAPI 서버에 접근하지 못할 수 있다.
- Redirect URL 또는 PKCE 저장소 설정이 맞지 않으면 OAuth 완료가 실패할 수 있다.

# 확인 항목

- [ ] 실기기 네트워크에서 Uvicorn에 접근 가능한지 확인한다.
- [ ] `EXPO_PUBLIC_API_BASE_URL` 값은 노출하지 않고 설정 여부만 확인한다.
- [ ] PC와 실기기가 호환 가능한 네트워크에 있는지 확인한다.
- [ ] 필요한 경우 Windows 방화벽이 백엔드 포트를 허용하는지 확인한다.
- [ ] Expo 포트 사용 가능 여부를 확인한다.
- [ ] Supabase Redirect URL 설정을 확인한다.
- [ ] OAuth 콜백 처리 후 앱으로 복귀하는지 확인한다.

# 2026-07-26 상태

- 프로세스 환경에서 API URL, Supabase URL, Supabase Anon Key, Google Maps Key는 모두 `NOT_SET`으로 확인됐다.
- 실제 값은 읽거나 출력하지 않았다.
- TypeScript와 백엔드 자동화 테스트는 통과했다.
- Android 실기기 네트워크, Expo Go 실행, Google OAuth callback, 위치 권한, 실제 지도 표시는 현재 세션에서 검증할 수 없다.
- 위 항목은 실패가 아니라 외부 환경 미구성으로 인한 미검증 상태다.
