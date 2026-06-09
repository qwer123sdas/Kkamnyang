# RouteLog HANDOFF

## 2026-06-09 Latest Summary

### Current QA Baseline

```text
Login
-> RouteFeed
-> RouteCard / Open Detail
-> RouteDetail
-> Comments / Similar Routes / History
-> Profile
-> My Routes / Bookmarks
-> RouteDetail
```

### Completed Today

TASK-017 bookmarks:

```text
1. Backend GET /api/v1/bookmarks/me endpoint added
2. RouteService.get_bookmarks added
3. RouteRepository.list_bookmarked_routes added
4. useBookmarks useAuth subscription removed
5. Bookmarks fetch now calls authService.getSession() once
6. BookmarkScreen -> RouteCard -> RouteDetail flow kept
```

TASK-018 MVP stabilization:

```text
1. TypeScript full check completed
2. Backend full test completed
3. Navigation param usage checked
4. Direct fetch usage checked
5. Detail/Profile/MyRoutes/Bookmarks hook useAuth subscription checked
6. RouteClusterScreen missing routeId and empty state messages added
```

TASK-019 device test / route similar-history:

```text
1. Device QA found /routes/{route_id}/similar 404
2. Device QA found /routes/{route_id}/history 404
3. Backend GET /api/v1/routes/{route_id}/similar endpoint added
4. Backend GET /api/v1/routes/{route_id}/history endpoint added
5. RouteService.get_similar_routes added
6. RouteService.get_route_history added
7. RouteRepository.list_similar_routes added
8. RouteRepository.list_route_history added
9. Device QA then found Supabase 500 on both endpoints
10. SupabaseRequestError added to preserve postgrest_code
11. PGRST204/PGRST205 schema-missing cases return optional empty states
12. Schema DDL documented in docs/db/db_ddl.md
13. QA data SQL added in docs/test/route-similar-history-qa.sql
```

### Important Behavior

```text
1. Similar routes do not calculate similarity in backend.
2. Similar routes use existing routes.route_cluster_id.
3. similarity_score is returned as 100 for routes in the same cluster.
4. If route_cluster_id/schema is missing, similar returns cluster_id=null, items=[].
5. History uses activities rows where status=FINISHED and deleted_yn=N.
6. If activities schema is missing, history returns items=[].
7. General Supabase failures still return INTERNAL_ERROR.
```

### DB Work Done By User

User can edit DB directly.

DDL used today is documented here:

```text
docs/db/db_ddl.md
```

QA seed SQL is here:

```text
docs/test/route-similar-history-qa.sql
```

Required DB objects for full similar/history QA:

```text
1. public.route_clusters
2. public.routes.route_cluster_id
3. public.activities
4. public.routes.route_id = 1 exists and deleted_yn = N
```

After DDL changes:

```sql
notify pgrst, 'reload schema';
```

### Changed Files

Backend:

```text
backend/api/route_api.py
backend/services/route_service.py
backend/repositories/route_repository.py
backend/tests/test_route_feed.py
backend/tests/test_route_repository.py
```

Frontend:

```text
kkamyang-app/src/hooks/useBookmarks.ts
kkamyang-app/src/screens/route/RouteClusterScreen.tsx
```

Docs:

```text
docs/HANDOFF.md
docs/db/db_ddl.md
docs/task/TASK-017-bookmarks.md
docs/task/TASK-018-mvp-stabilization.md
docs/task/TASK-019-device-test.md
docs/test/route-similar-history-qa.sql
```

### Verification Completed

Backend:

```powershell
python -m pytest backend\tests -q
```

Result:

```text
55 passed
```

Frontend:

```powershell
npx.cmd tsc --noEmit
```

Result:

```text
passed
```

Diff check:

```powershell
git diff --check
```

Result:

```text
No whitespace errors.
CRLF conversion warnings only.
```

Additional checks:

```text
1. Direct fetch exists only inside kkamyang-app/src/services/apiClient.ts.
2. Detail/Profile/MyRoutes/Bookmarks hooks do not use useAuth subscription.
3. /bookmarks/me is called only through bookmarkService on frontend.
4. /routes/{route_id}/similar is called only through routeClusterService on frontend.
5. /routes/{route_id}/history is called only through routeHistoryService on frontend.
```

### Current QA To Run Next

Run on Android device:

```text
1. Login
2. Route Feed
3. Open route_id=1 detail
4. View Similar Routes
5. Confirm QA Similar RUN Route appears
6. Back to RouteDetail
7. View History
8. Confirm FINISHED activity appears
9. Profile
10. My Routes
11. Open Detail
12. Profile
13. Bookmarks
14. Open Detail
```

Expected fallback if QA seed data is not present:

```text
View Similar Routes -> No similar routes
View History -> No activity history
```

### If QA Still Fails

Check backend log line:

```text
Supabase routes request failed status=... postgrest_code=...
```

Interpretation:

```text
PGRST204/PGRST205
-> schema/cache missing. DDL or notify reload likely needed.

Other postgrest_code
-> inspect code-specific query failure.

500 without postgrest_code
-> network/config/Supabase access issue.
```

### Rules To Preserve

```text
1. Do not read, output, or summarize .env actual values.
2. Screen direct fetch is forbidden.
3. Screen -> Hook -> Service -> apiClient flow must remain.
4. Detail/Profile/MyRoutes/Bookmarks hooks must not subscribe to useAuth.
5. Use authService.getSession() once at the required action/load point.
6. Do not change API response structure casually.
7. Do not change DB schema without task/documented approval.
8. Do not add state management libraries.
9. Do not change router structure.
10. Do not add arbitrary libraries.
```

### Next Work

Next task:

```text
Continue TASK-019 device test
```

Concrete next steps:

```text
1. User runs docs/test/route-similar-history-qa.sql if not already run.
2. User verifies Similar Routes and History on Android.
3. If both pass, update docs/task/TASK-019-device-test.md with final QA result.
4. Then proceed to docs/task/TASK-020-runtime-fix.md only if runtime issues remain.
```

### Cleanup Note

Pytest may modify tracked `__pycache__` files.

```text
Those files are not functional changes.
Before commit, exclude or restore tracked __pycache__ changes only.
```
