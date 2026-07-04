# 경로 피드 기능

## 범위

공개 경로 목록과 경로 탐색 진입점을 다룬다.

## MVP 우선순위

경로 피드는 `RUN` MVP를 지원한다.
명시적인 Task 범위 없이 향후 활동 유형 중심으로 확장하지 않는다.

## 프론트엔드 경로

```text
kkamyang-app/src/screens/route/RouteFeedScreen.tsx
-> kkamyang-app/src/hooks/useRouteFeed.ts
-> kkamyang-app/src/services/routeService.ts
-> kkamyang-app/src/services/apiClient.ts
```

## 백엔드 경로

```text
backend/api/route_api.py
-> backend/services/route_service.py
-> backend/repositories/route_repository.py
```

## 관련 Task 문서

- `../task/TASK-009-route-feed.md`

## 관련 분석 문서

- `../01-plan/features/route-feed-backend.plan.md`
- `../02-design/features/route-feed-backend.design.md`
- `../03-analysis/route-feed-backend.analysis.md`
- `../04-report/route-feed-backend.report.md`
