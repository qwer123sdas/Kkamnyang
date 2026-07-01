---
id: ISSUE-001
title: 로컬 개발 환경 및 실기기 연결
status: open
area: infra
created: 2026-07-01
updated: 2026-07-01
---

# 증상

- Expo 기본 포트가 다른 프로세스에서 사용 중일 수 있다.
- 실기기에서 로컬 FastAPI 서버에 접근하지 못할 수 있다.
- OAuth 완료 후 Redirect 또는 PKCE 관련 오류가 발생할 수 있다.

# 확인 항목

- [ ] Uvicorn이 `0.0.0.0:8000`으로 실행되는지 확인
- [ ] `EXPO_PUBLIC_API_BASE_URL`이 휴대폰에서 접근 가능한 주소인지 확인
- [ ] PC와 휴대폰이 같은 네트워크인지 확인
- [ ] Windows 방화벽의 8000 포트 허용 여부 확인
- [ ] Expo 포트 8081 사용 프로세스 확인
- [ ] Supabase Redirect URL 확인
- [ ] OAuth를 시작한 브라우저와 콜백 저장소가 일치하는지 확인
