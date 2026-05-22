# TASK-021-manual-retest

## Goal

TASK-020 수정 이후 MVP 런타임을 재검증한다.

## Scope

- 8081/8082 포트 점유 확인
- 필요 시 기존 node/expo 프로세스 종료
- npm start 실행
- Expo Go 또는 시뮬레이터 실행
- Login 화면 확인
- Feed → Detail 이동 확인
- Record 화면 진입 확인
- Profile 화면 진입 확인
- 지도 화면 진입 확인

## Excluded

- 신규 기능 추가
- UI 리디자인
- API 스펙 변경
- DB 스키마 변경

## Verification

- Expo dev server 실행 성공
- 앱 첫 화면 표시
- Google Login 버튼 표시
- Feed에서 Detail 이동 가능
- Record 화면 진입 가능
- Profile 화면 진입 가능
- 런타임 크래시 없음