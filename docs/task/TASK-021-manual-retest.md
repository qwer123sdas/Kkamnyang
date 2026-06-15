# TASK-021-manual-retest

## 2026-06-15 Progress

### Completed

```text
1. TASK-020 이후 MVP 런타임 재검증을 진행했다.
2. Expo dev server는 8081 포트 충돌 시 8082로 실행했다.
3. Android bundle compile을 확인했다: StatusCode 200.
4. 사용자가 실기기에서 앱 첫 화면 표시를 확인했다.
5. 사용자가 실기기에서 Google Login 버튼 표시를 확인했다.
6. 사용자가 실기기에서 Feed -> Detail 이동을 확인했다.
7. 사용자가 실기기에서 Record 화면 진입을 확인했다.
8. 사용자가 실기기에서 Profile 화면 진입을 확인했다.
9. 사용자가 실기기에서 지도 화면 진입을 확인했다.
10. 사용자가 실기기에서 런타임 크래시 없음을 확인했다.
11. TASK-021 complete.
```

### Deferred

```text
manual-mvp-checklist.md의 Record Live Metrics 세부 동작 3개는 이후 별도 확인한다.
1. Duration increments while activity status is STARTED.
2. Distance updates when GPS points move more than the GPS noise threshold.
3. Pace changes after distance becomes greater than 0.
```

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

- [x] Expo dev server 실행 성공
- [x] 앱 첫 화면 표시
- [x] Google Login 버튼 표시
- [x] Feed에서 Detail 이동 가능
- [x] Record 화면 진입 가능
- [x] Profile 화면 진입 가능
- [x] 지도 화면 진입 가능
- [x] 런타임 크래시 없음
