# TASK-006-gps-record

## Goal

러닝 중 GPS 좌표 수집 기능을 구현한다.

이번 단계에서는 지도 표시, Polyline 생성, Route 저장은 구현하지 않는다.

---

# Scope

이번 작업:

```text
1. Expo Location 설치
2. 위치 권한 요청
3. GPS 수집 시작
4. GPS 수집 중지
5. 수집된 좌표 배열 저장
6. useGPSRecorder Hook 구현
```

---

작업 제외:

```text
Google Maps
Polyline 생성
Route 저장
거리 계산
시간 계산
활동 종료 API
Route Cluster
```

---

# Commands

```bash
npx expo install expo-location
```

---

# Deliverables

```text
package.json
package-lock.json
src/hooks/useGPSRecorder.ts
src/types/geo.ts
src/constants/gps.ts
```

---

# Verification

```text
1. 위치 권한 요청 가능
2. GPS 수집 시작 가능
3. GPS 수집 중지 가능
4. 좌표 배열 저장 가능
5. TypeScript 오류 없음
6. Google Maps 구현 없음
7. Polyline 구현 없음
8. Route 저장 없음
```

---

# Next Task

```text
TASK-007-record-finish.md
```