# TASK-008-map-display

## Goal

RecordScreen에 Google Map을 표시하고, 기록 중 수집된 GPS 좌표를 지도 위에 Polyline으로 표시한다.

이번 단계에서는 지도 표시와 현재 기록 중 경로 시각화만 구현한다.

---

# Scope

이번 작업:

```text
1. react-native-maps 설치

2. RecordScreen에 MapView 추가

3. 현재 위치 기준 초기 region 설정

4. 수집된 GPS 좌표를 Polyline으로 표시

5. GPS 좌표가 없을 때 기본 상태 처리
```

---

# Commands

```bash
npx expo install react-native-maps
```

---

# Deliverables

```text
package.json

package-lock.json

src/screens/record/RecordScreen.tsx

src/components/map/RunningMap.tsx

src/types/geo.ts

src/constants/map.ts
```

---

# Constraints

반드시 준수:

```text
AGENTS.md

docs/architecture.md

docs/api-spec.md
```

금지:

```text
Route Feed 구현

Route Detail 구현

Route Cluster 구현

좋아요/댓글/북마크 구현

Google Places API 구현

검색 기능 구현

근처 경로 조회 구현

지도 스타일 고도화

Background GPS 구현
```

---

# Map Policy

현재 MVP:

```text
Google Maps 사용

RecordScreen에서 현재 러닝 경로 표시

좌표 배열 기반 Polyline 표시
```

---

# Verification

```text
1. RecordScreen에 지도 표시

2. GPS 좌표가 있으면 Polyline 표시

3. GPS 좌표가 없어도 화면 오류 없음

4. TypeScript 오류 없음

5. Route Feed/Cluster 구현 없음
```

---

# Next Task

```text
TASK-009-route-feed.md
```