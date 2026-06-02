# Gap Analysis: route-feed-backend

> Date: 2026-06-02 | Design: docs/02-design/features/route-feed-backend.design.md

## Match Rate: 100%

## Summary

설계된 공개 Route Feed API와 테스트를 모두 구현했다.

## Implemented Items

- [x] 인증 없는 `GET /api/v1/routes/feed`
- [x] `page >= 1`, `1 <= size <= 50`, `activity_type=RUN` validation
- [x] `PUBLIC`, Route 미삭제, User 미삭제 필터
- [x] 생성일시 내림차순 정렬
- [x] offset 및 `size + 1` limit
- [x] service의 `has_next` 계산 및 slicing
- [x] embedded 작성자 응답 변환
- [x] `distance_km` JSON number 정규화
- [x] Supabase 및 malformed payload 오류의 `500 INTERNAL_ERROR` 처리

## Missing Items

- 없음

## Changed Items

- 없음

## Verification

```text
python -m pytest backend/tests -q
12 passed
```

