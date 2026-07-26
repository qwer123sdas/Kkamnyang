# RouteLog Mobile Design System

## 문서 역할

이 문서는 RouteLog 모바일 MVP의 구현 기준이다.
[[docs/source/design-system]]은 Lunit 공개 자료 조사 결과를 보존하는 `REFERENCE` 문서이며 RouteLog UI의 규범으로 사용하지 않는다.

근거는 [[docs/task/TASK-028-stitch-ux-ui-direction]]과 TASK-031~037의 구현 및 로컬 검증 결과다.

## 제품 원칙

- GPS 기반 운동 기록과 경로 공유가 중심이다.
- MVP 활동은 `RUN`만 노출한다.
- 마케팅 랜딩보다 Login → Feed → Detail → Record → Profile의 실제 흐름을 우선한다.
- 지도, 경로, 기록 상태, 주요 액션의 가독성을 장식보다 우선한다.
- 아직 지원하지 않는 건강 지표, RIDE, HIKE를 노출하지 않는다.

## 화면 기준

### Login

- Google Login을 기본 액션으로 제공한다.
- 설정 누락과 OAuth 실패를 사용자가 구분 가능한 오류 상태로 표시한다.
- Naver와 일반 회원가입은 구현 전까지 기본 액션으로 노출하지 않는다.

### Feed와 목록

- 로딩, 빈 상태, 오류, 성공 상태를 구분한다.
- Route 항목 전체가 Detail 이동 동작을 제공한다.
- Pull-to-refresh와 다음 페이지 로딩 중 중복 요청을 방지한다.

### Route Detail

- 경로 지도 또는 지도 fallback을 주요 시각 정보로 둔다.
- 제목, 활동 타입, 거리, 시간과 작성자 정보를 표시한다.
- 좋아요와 북마크는 요청 중 재호출을 막는다.
- 권한 없음과 존재하지 않는 Route를 복구 가능한 오류 상태로 표시한다.

### Record

- Distance, Duration, Pace를 항상 읽을 수 있게 유지한다.
- Start, Finish, Find Current Location을 명시적인 동작으로 제공한다.
- 위치 권한 거부와 지도 설정 누락을 크래시가 아닌 안내 상태로 처리한다.
- GPS 및 저장 규칙은 [[AGENTS]]와 [[docs/source/api-spec]]을 따른다.

### Profile, My Routes, Bookmarks

- Profile은 `/users/me` 응답을 기준으로 표시한다.
- 목록은 Feed와 동일한 Route Detail 이동 규칙을 사용한다.
- 데이터가 없을 때 빈 상태를 명확히 표시한다.

## 공통 상태

| 상태 | 원칙 |
|---|---|
| loading | 어떤 데이터를 불러오는지 표시 |
| empty | 데이터가 없음을 정상 상태로 안내 |
| error | 실패 원인 코드 또는 안전한 사용자 메시지 표시 |
| logged-out | 로그인이 필요한 동작임을 표시 |
| permission-denied | 필요한 권한과 재시도 동작 안내 |
| map-fallback | 지도 설정 누락을 앱 고장처럼 보이지 않게 안내 |

## 구현 제약

- 기존 React Native 기본 컴포넌트와 현재 의존성만 사용한다.
- 새 UI 라이브러리를 추가하지 않는다.
- Router와 상태관리 구조를 변경하지 않는다.
- Screen → Hook → Service → apiClient 흐름을 유지한다.
- 디자인 토큰과 컴포넌트 라이브러리 도입은 별도 승인 Task에서 결정한다.
