# 경로 상세 기능

## 범위

경로 상세, 댓글, 좋아요/북마크, 유사 경로, 경로 기록 탐색을 다룬다.

## MVP 우선순위

경로 상세는 `RUN` MVP를 지원한다.
유사 경로 동작은 프로젝트 정책에 이미 정의된 유사 경로 규칙을 따른다.

## 프론트엔드 경로

```text
kkamyang-app/src/screens/route/RouteDetailScreen.tsx
-> kkamyang-app/src/hooks/useRouteDetail.ts
-> kkamyang-app/src/services/routeService.ts
-> kkamyang-app/src/services/apiClient.ts
```

관련 프론트엔드 경로:

```text
kkamyang-app/src/hooks/useRouteComments.ts
kkamyang-app/src/hooks/useRouteCluster.ts
kkamyang-app/src/hooks/useRouteHistory.ts
kkamyang-app/src/services/commentService.ts
kkamyang-app/src/services/likeService.ts
kkamyang-app/src/services/bookmarkService.ts
kkamyang-app/src/services/routeClusterService.ts
kkamyang-app/src/services/routeHistoryService.ts
```

## 백엔드 경로

```text
backend/api/route_api.py
-> backend/services/route_service.py
-> backend/repositories/route_repository.py
```

## 관련 Task 문서

- `../task/TASK-010-route-detail.md`
- `../task/TASK-011-like-bookmark.md`
- `../task/TASK-012-comments.md`
- `../task/TASK-013-route-cluster.md`
- `../task/TASK-014-route-history.md`

## 경로 유사도 규칙

다음 조건을 만족하면 유사 경로로 묶는다.

1. `activity_type`이 동일하다.
2. 시작점이 반경 300m 이내다.
3. 종료점이 반경 300m 이내다.
4. 거리 차이가 ±15% 이내다.

## 변경 금지 메모

- Route Cluster 및 Activity 기반 History 규칙을 Task 없이 변경하지 않는다.
- API 응답, Router, DB 스키마를 기능 문서만 근거로 변경하지 않는다.
