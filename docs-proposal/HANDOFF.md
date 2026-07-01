# HANDOFF

## 현재 목표

프론트엔드 MVP 기능을 백엔드 API와 안정적으로 연동하고 실기기 통합 QA를 완료한다.

## 완료된 범위

- FastAPI 백엔드 기본 구조 및 주요 MVP API
- Supabase Google OAuth 및 세션 처리 기반
- 활동 시작·종료, 경로 Feed·상세, 좋아요·북마크 기반
- React Native + Expo + TypeScript 프론트엔드 스켈레톤

## 현재 작업

- 프론트엔드 문서와 실제 구현 상태 대조
- 공통 API 타입과 응답 처리 정리
- 화면별 Type → Service → Hook → Screen 구현·검증

## 다음 작업

1. [[docs/task/TASK-030-frontend-common-api-types]]
2. [[docs/task/TASK-031-frontend-auth-flow]]
3. [[docs/task/TASK-032-frontend-route-feed]]
4. [[docs/task/TASK-033-frontend-route-detail]]
5. [[docs/task/TASK-034-frontend-running-record]]
6. [[docs/task/TASK-035-frontend-profile]]
7. [[docs/task/TASK-036-frontend-bookmark]]
8. [[docs/task/TASK-037-frontend-common-states]]
9. [[docs/task/TASK-038-frontend-integration-qa]]

## 현재 확인할 이슈

- Expo 개발 서버 포트 충돌 여부
- 실기기에서 FastAPI 서버 접근 가능 여부
- OAuth Redirect URL과 PKCE 저장소 일치 여부
- 문서의 API 응답과 실제 백엔드 응답 일치 여부
- 스켈레톤 파일 존재 여부와 MVP 구현 대상 여부 혼동 방지

## 반드시 지킬 규칙

- Screen 직접 API 호출 금지
- Screen → Hook → Service → apiClient
- Type 기반 설계
- MVP 우선 및 최소 변경
- 범위 밖 기능 추가 금지
- 애매한 요구사항을 임의로 결정하지 않음

## 관련 문서

- [[PROJECT]]
- [[AGENTS]]
- [[docs/architecture]]
- [[docs/api-spec]]
- [[docs/design-system]]
- [[docs/FRONTEND-BOARD]]
- [[todo]]
