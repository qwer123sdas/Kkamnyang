# Route Feed Backend Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 공개 RUN Route Feed 조회 API를 기존 FastAPI 계층 구조에 추가한다.

**Architecture:** 기존 `api -> service -> repository -> Supabase PostgREST` 구조를 따른다. repository는 embedded `users` select로 Route와 작성자를 한 번에 조회하고, service는 `size + 1` 조회 결과를 잘라 `has_next`를 계산한다.

**Tech Stack:** Python 3.12, FastAPI, Supabase PostgREST, pytest

---

### Task 1: Feed API 공개 접근과 validation

**Files:**
- Create: `backend/tests/test_route_feed.py`
- Create: `backend/api/route_api.py`
- Modify: `backend/app/main.py`
- Modify: `backend/app/dependencies.py`

- [ ] 공개 접근, 응답 구조, query validation 실패 테스트를 작성한다.
- [ ] `python -m pytest backend/tests/test_route_feed.py -q`를 실행하여 route가 없어 실패하는지 확인한다.
- [ ] Route API와 service dependency를 최소 구현한다.
- [ ] 같은 테스트를 다시 실행하여 API 계층 테스트 통과를 확인한다.

### Task 2: Feed service pagination

**Files:**
- Create: `backend/services/route_service.py`
- Modify: `backend/tests/test_route_feed.py`

- [ ] `size + 1` 결과에서 `has_next`를 계산하고 items를 slicing하는 실패 테스트를 작성한다.
- [ ] 해당 테스트를 실행하여 service가 없어 실패하는지 확인한다.
- [ ] `RouteService.get_feed()`를 최소 구현한다.
- [ ] 해당 테스트를 다시 실행하여 통과를 확인한다.

### Task 3: Supabase Route repository

**Files:**
- Create: `backend/repositories/route_repository.py`
- Create: `backend/tests/test_route_repository.py`

- [ ] embedded user select, 공개/미삭제 필터, 최신순, offset, `size + 1` limit 실패 테스트를 작성한다.
- [ ] 해당 테스트를 실행하여 repository가 없어 실패하는지 확인한다.
- [ ] PostgREST 조회와 응답 변환을 구현한다.
- [ ] `distance_km`는 값이 있으면 `float`, `NULL`이면 `None`으로 변환한다.
- [ ] repository 테스트를 다시 실행하여 통과를 확인한다.

### Task 4: 전체 검증

**Files:**
- Modify: `docs/01-plan/features/route-feed-backend.plan.md`

- [ ] `python -m pytest backend/tests`를 실행한다.
- [ ] 실패가 있으면 최소 범위로 수정하고 전체 테스트를 재실행한다.
- [ ] PDCA gap analysis를 수행한다.

