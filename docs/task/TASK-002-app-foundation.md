# TASK-002-app-foundation

## Goal

프로젝트 공통 기반 설정을 구성한다.

## Scope

- env 설정
- Supabase config placeholder 생성
- apiClient placeholder 생성
- activity/api/gps/map 상수 생성
- 공통 API 타입 생성
- user/route/activity/geo 타입 생성
- providers.tsx 연결 상태 확인
- Navigation 연결 상태 확인

## Constraints

- 실제 Supabase client 연결 금지
- 실제 API 호출 구현 금지
- OAuth 구현 금지
- GPS 구현 금지
- Google Maps 구현 금지
- DB 연결 금지
- UI 상세 구현 금지

## Deliverables

- src/config/env.ts
- src/config/supabase.ts
- src/services/apiClient.ts
- src/constants/activity.ts
- src/constants/api.ts
- src/constants/gps.ts
- src/constants/map.ts
- src/types/api.ts
- src/types/activity.ts
- src/types/geo.ts
- src/types/route.ts
- src/types/user.ts

## Verification

- TypeScript compile error 없음
- Expo 앱 실행 가능
- 실제 API 호출 없음
- 실제 Supabase 연결 없음
- 실제 GPS 기능 없음