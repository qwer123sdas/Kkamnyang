s# Manual MVP Test Checklist

## 실행

- [x] npm start 성공
- [x] 8081 포트 충돌 시 `npm start -- --port 8082` 실행 성공
- [x] Expo Go 또는 에뮬레이터 실행 성공
- [x] 앱 첫 화면 표시
- [x] env 필수값 누락 상태에서도 import 단계 크래시 없음

## Auth

- [x] Google 로그인 버튼 표시
- [x] Supabase 설정 누락 시 Google 로그인 버튼 클릭 후 에러 메시지 표시
- [x] Google OAuth 화면 이동
- [x] 로그인 성공 후 앱 복귀
- [x] 앱 재실행 후 세션 유지
- [x] login_id 미설정 시 설정 화면 이동
- [x] login_id 저장 성공

## Map / GPS

- [x] 지도 표시
- [x] Google Maps API key 누락 시 Record 화면 fallback 표시
- [x] GPS 권한 요청
- [x] Find Current Location 버튼 클릭 시 현재 위치 조회
- [x] 권한 허용 시 현재 위치 수집
- [x] 기록 시작 가능
- [x] 기록 중 좌표 수집
- [x] Polyline 표시
- [x] 기록 종료 가능

## Route

- [x] 피드 화면 표시
- [x] Route 상세 진입
- [x] 좋아요 가능
- [x] 북마크 가능
- [x] 댓글 작성 가능
- [x] 유사 루트 화면 진입
- [x] Route History 화면 진입

## Profile

- [x] Profile 화면 표시
- [x] My Routes 진입
- [x] Bookmarks 진입

## 실패 기록

|항목|현상|수정 필요 파일|
|---|---|---|
| | | |

## Record Live Metrics

- [x] Distance is visible on Record screen
- [x] Duration is visible on Record screen
- [x] Pace is visible on Record screen
- [ ] Duration increments while activity status is STARTED
- [ ] Distance updates when GPS points move more than the GPS noise threshold
- [ ] Pace changes after distance becomes greater than 0
