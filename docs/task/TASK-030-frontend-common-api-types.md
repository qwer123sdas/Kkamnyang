---
id: TASK-030
title: 프론트엔드 공통 API 타입 및 응답 처리
status: completed
area: frontend
feature: common
priority: high
depends_on: []
created: 2026-07-01
updated: 2026-07-26
---

# 목적

백엔드 공통 응답 형식을 기준으로 프론트엔드 공통 API 응답 타입, 페이지네이션 타입, 오류 처리를 정의하고 검증한다.

# 참고 문서

- [[AGENTS]]
- [[PROJECT]]
- [[docs/archive-or-legacy/HANDOFF-history]]
- [[docs/source/architecture]]
- [[docs/source/api-spec]]
- [[docs/source/db-schema]]
- [[docs/source/design-system]]
- [[docs/FRONTEND-BOARD]]

# 작업 범위

- [x] 기존 API 클라이언트 동작을 확인한다.
- [x] 공통 성공/오류 응답 타입을 확인한다.
- [x] 페이지네이션 응답 타입을 확인한다.
- [x] 프론트엔드 가정과 백엔드 응답의 차이를 문서화한다.

# 실행 명령

```powershell
npx.cmd tsc --noEmit
git diff --check
```

# 제외 범위

- API 응답 구조 변경
- 백엔드 구현
- 신규 상태관리 라이브러리
- 광범위한 리팩토링

# 완료 조건

- [x] Screen에서 API를 직접 호출하지 않는다.
- [x] 공통 API 응답 처리가 [[docs/source/api-spec]]과 일치한다.
- [x] TypeScript 오류를 해결했거나 문서화했다.
- [x] 변경 파일을 기록했다.
- [x] 검증 결과를 기록했다.

# 변경 파일

- `kkamyang-app/src/constants/api.ts`
- `kkamyang-app/src/types/api.ts`
- `kkamyang-app/src/types/route.ts`
- `kkamyang-app/src/services/apiClient.ts`
- `docs/FRONTEND-BOARD.md`
- `HANDOFF.md`
- `docs/archive-or-legacy/HANDOFF-history.md`
- `docs/task/TASK-030-frontend-common-api-types.md`

# 검증 결과

- `npx.cmd tsc --noEmit`: 통과
- Screen의 직접 `fetch` 호출 검색: 없음
- `git diff --check`: 통과 (줄 끝 변환 경고만 발생)

# 남은 이슈

- 백엔드 공통 오류 응답의 `error_code`는 문자열이지만 프론트엔드는 현재 API 명세에 기록된 코드의 union으로 관리한다.
- 명세에 없는 신규 오류 코드가 백엔드에 추가될 때 `API_ERROR_CODES`와 [[docs/source/api-spec]]을 함께 갱신해야 한다.
- TASK-027에서 완료되지 않은 Android 실기기 검증은 TASK-038에서 재검증하거나 차단 사유를 기록한다.

# 구현 비교 결과

- 성공 응답 `{ success: true, data, message: null }`은 백엔드와 프론트엔드가 일치했다.
- 오류 응답 `{ success: false, data: null, message, error_code }`도 구조는 일치했다.
- 프론트엔드 오류 코드 목록에는 원본 API 명세의 일부 코드가 누락되어 있어 보완했다.
- Feed, My Routes, Bookmarks, Comments, Route History가 동일한 `items/page/size/has_next` 구조를 중복 선언하고 있어 `PaginatedResponse<TItem>`으로 통합했다.
- 기존 API 클라이언트는 실패 응답을 일반 `Error`로 변환하면서 `error_code`와 HTTP 상태를 잃고 있어 `ApiClientError`로 보존했다.
