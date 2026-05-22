# TASK-019-device-test

## Goal

MVP 기능을 실제 Expo 실행 환경에서 점검한다.

## Scope

- npm start 실행
- Expo Go 또는 시뮬레이터 실행
- 로그인 화면 확인
- 지도 렌더링 확인
- GPS 권한 요청 확인
- 기록 시작/종료 흐름 확인
- 피드/상세/댓글/북마크 화면 접근 확인

## Excluded

- 신규 기능 추가
- UI 리디자인
- DB 스키마 변경
- API 스펙 변경

## Verification

- 앱 실행 성공
- TypeScript 오류 없음
- 지도 화면 오류 없음
- GPS 권한 요청 정상
- 화면 이동 오류 없음
- 런타임 크래시 없음