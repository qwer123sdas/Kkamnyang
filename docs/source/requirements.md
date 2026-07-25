# Project Requirements

## 1. 프로젝트

- 제품명: RouteLog
- 목적: 사용자가 GPS 기반 운동 경로를 기록하고 공유할 수 있는 플랫폼 제공
- 현재 MVP 활동 유형: `RUN`
- 향후 지원 예정: `RIDE`, `HIKE`

`RIDE`, `HIKE`는 별도 Task에서 범위를 명시적으로 승인하기 전까지 API 입력값과 구현 범위에 포함하지 않는다.

## 2. MVP 범위

### 포함

1. Google OAuth 로그인과 세션 복구
2. 사용자 식별 및 프로필 기본 조회
3. `RUN` GPS 기록 시작과 종료
4. 경로 저장과 지도 표시
5. 공개·비공개 경로
6. 공개 경로 Feed와 경로 상세
7. 내 경로 조회
8. 좋아요
9. 댓글 조회·작성·수정·삭제
10. 북마크와 내 북마크 조회
11. 유사 Route Cluster 조회
12. 동일 Route의 Activity 기록 조회

### 현재 MVP 제외

- `RIDE`
- `HIKE`
- 일반 회원가입
- Naver OAuth 프론트엔드 구현
- 프로필 이미지 업로드
- 팔로우
- 광고
- 결제
- 실시간 채팅
- 실시간 위치 공유
- 푸시 알림
- 관리자 기능
- 신고·차단
- AI 추천 및 고급 추천 알고리즘
- 건강 플랫폼·스마트워치 연동

## 3. 기능 요구사항

### FR-001 인증

사용자는 Google OAuth로 로그인할 수 있어야 한다.
Naver OAuth와 일반 회원가입은 향후 지원 항목으로 관리한다.

### FR-002 사용자 식별

소셜 회원은 서버가 생성한 변경 불가능한 `login_id`를 가져야 한다.
정확한 생성 규칙과 DB 정책은 [[AGENTS]]와 [[docs/source/db-schema]]를 따른다.

### FR-003 활동 시작

사용자는 `RUN` 활동 기록을 시작할 수 있어야 한다.

입력:

```text
activity_type = RUN
```

### FR-004 활동 종료

사용자는 시작한 활동을 종료할 수 있어야 한다.

결과:

- 거리
- 시간
- 경로
- 연결된 Route

GPS 수집과 노이즈 제거 기준은 [[AGENTS]]를 따른다.

### FR-005 경로 조회

사용자는 공개 Route Feed, Route 상세 및 자신의 Route 목록을 조회할 수 있어야 한다.
비공개 Route는 권한 정책을 따라야 한다.

### FR-006 좋아요

인증된 사용자는 허용된 Route에 좋아요를 추가하거나 취소할 수 있어야 한다.

### FR-007 댓글

사용자는 허용된 Route의 댓글을 조회할 수 있어야 한다.
인증된 사용자는 댓글을 작성할 수 있고 자신의 댓글을 수정하거나 삭제할 수 있어야 한다.

### FR-008 북마크

인증된 사용자는 Route를 북마크하거나 취소하고 자신의 북마크 목록을 조회할 수 있어야 한다.

### FR-009 유사 Route

사용자는 같은 Route Cluster에 속한 유사 Route를 조회할 수 있어야 한다.

판정 기준:

1. `activity_type` 동일
2. 시작점 반경 300m 이내
3. 종료점 반경 300m 이내
4. 거리 차이 ±15%

### FR-010 Route 실행 기록

사용자는 동일 Route에 연결된 이전 `Activity` 목록을 조회할 수 있어야 한다.

## 4. 비기능 요구사항

- Secret과 access token을 로그 또는 문서에 노출하지 않는다.
- API, DB, Router 및 상태관리 구조는 승인된 Task 없이 변경하지 않는다.
- 프론트엔드는 로딩, 빈 상태, 오류, 성공 및 미인증 상태를 처리한다.
- GPS 거리 검증 목표는 1km 이동 기준 오차 ±5%다.
- API 응답시간 500ms 이하는 목표값이며, 실제 운영 보장값으로 간주하지 않는다.
- 가용성 99%는 운영 목표이며, MVP에서 검증 완료된 SLA로 간주하지 않는다.

## 5. 검증 기준

- 구현된 API 목록과 요청·응답 계약은 [[docs/source/api-spec]]에서 확인한다.
- 프론트엔드 통합 상태는 관련 `docs/task/TASK-*.md`의 검증 결과로 판단한다.
- 백엔드 구현 상태는 Router와 자동화 테스트를 함께 확인한다.
- Task가 `ready` 또는 `미검증`이면 완료된 기능의 근거로 사용하지 않는다.

## 관련 문서

- [[AGENTS]]
- [[docs/source/architecture]]
- [[docs/source/api-spec]]
- [[docs/source/frontend-backend-contract]]
- [[docs/source/db-schema]]
- [[docs/FRONTEND-BOARD]]
