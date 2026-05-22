# TASK-013-route-cluster

## Goal

Route 상세 화면에서 유사한 러닝 루트 목록을 조회하고 표시한다.

이번 단계에서는 서버에서 계산된 유사 루트 결과를 조회해서 보여주는 것만 구현한다.

---

# Scope

```text
1. GET /api/v1/routes/{route_id}/similar 연결
2. routeClusterService 생성
3. useRouteCluster Hook 생성
4. RouteClusterScreen 구현
5. 유사 Route 목록 표시
6. RouteDetailScreen에서 유사 루트 보기 진입 연결
```

---

# Excluded

```text
유사도 계산 로직
PostGIS 직접 계산
Route Cluster 생성 로직
Nearby Route
Route History
Like
Bookmark
Comment
Route 수정/삭제
```

---

# Deliverables

```text
src/services/routeClusterService.ts
src/hooks/useRouteCluster.ts
src/screens/route/RouteClusterScreen.tsx
src/components/route/RouteClusterList.tsx
src/types/route.ts
src/navigation/MainNavigator.tsx

src/screens/route/RouteDetailScreen.tsx
```

---

# Constraints

```text
1. API 호출은 routeClusterService에서만 수행
2. Screen 직접 fetch 금지
3. 유사도 계산은 프론트에서 하지 않음
4. 서버 응답을 그대로 표시
5. Route History 구현 금지
6. Nearby Route 구현 금지
```

---

# Verification

```text
1. TypeScript 오류 없음
2. /routes/{route_id}/similar 호출은 routeClusterService에만 존재
3. RouteClusterScreen 표시
4. 유사 Route 목록 렌더링
5. 유사도 계산 로직 없음
6. Route History 구현 없음
7. Nearby Route 구현 없음
```

---

# Next Task

```text
TASK-014-route-history
```