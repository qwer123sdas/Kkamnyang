# route-feed-backend - Plan Document

> Version: 1.0.0 | Date: 2026-06-02 | Status: Approved
> Level: Dynamic

## 1. Overview

### 1.1 Purpose

공개 RUN Route 목록을 조회하는 `GET /api/v1/routes/feed` 백엔드를 구현한다.

### 1.2 Background

프론트엔드는 Feed API를 호출하지만 FastAPI 엔드포인트가 없어 `404 Not Found`가
발생한다.

## 2. Goals

- [x] 공개 Feed API 정책 확정
- [x] Route Feed API, service, repository 구현
- [x] 페이지네이션과 query validation 테스트

## 3. Scope

### 3.1 In Scope

- `PUBLIC`, 미삭제 Route 조회
- 미삭제 작성자 Route만 조회
- RUN only
- 최신순 정렬
- `page`, `size`, `has_next`
- `distance_km` JSON number 정규화

### 3.2 Out of Scope

- DB 스키마 변경
- 개인화 필드
- Route 상세 및 변경 API
- 프론트엔드 변경

## 4. Success Criteria

- [x] Authorization 헤더 없이 Feed API 호출 가능
- [x] 명세 응답 구조 유지
- [x] 잘못된 query는 `422`
- [x] `python -m pytest backend/tests` 통과

## 5. Risks & Mitigations

| Risk | Impact | Mitigation |
|---|---|---|
| PostgREST embedded user 응답이 비정상 | High | repository에서 payload 구조 검증 후 `500 INTERNAL_ERROR` 반환 |
| 페이지네이션 추가 조회 row가 노출됨 | Medium | service에서 `size`만큼 slicing |

## 6. References

- `docs/api-spec.md`
- `docs/task/TASK-009-route-feed.md`
- `docs/superpowers/specs/2026-06-02-route-feed-backend-design.md`
