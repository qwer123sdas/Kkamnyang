# TASK-008A-map-config

## Goal

Google Maps API Key 설정을 Expo app config에 반영한다.

---

# Scope

```text
1. EXPO_PUBLIC_GOOGLE_MAPS_API_KEY 환경변수 확인
2. app.json 또는 app.config.ts에 Google Maps API Key 설정
3. Android 지도 렌더링 설정
4. iOS 지도 렌더링 설정 확인
```

---

# Excluded

```text
Google Places API
지도 검색
근처 경로 조회
Route Feed
Route Cluster
GPS 로직 수정
```

---

# Deliverables

```text
app.json 또는 app.config.ts
src/config/env.ts
```

---

# Verification

```text
1. TypeScript 오류 없음
2. Google Maps API key가 코드에 하드코딩되지 않음
3. 환경변수 기반으로 설정됨
4. Route/GPS 로직 변경 없음
```

---

# Next Task

```text
TASK-009-route-feed.md
```