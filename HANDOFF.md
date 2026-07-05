# KKamyang HANDOFF

이 파일은 다음 작업자가 바로 이어받기 위한 현재 상태 요약이다.
상세 결정, 긴 작업 이력, 개인 로그를 누적하지 않고 관련 프로젝트 문서로 연결한다.

## 현재 상태

- Obsidian / LLM WIKI 관리는 `docs/` 중심으로 운영한다.
- 문서 진입점은 `docs/INDEX.md`다.
- LLM WIKI 운영 규칙은 `docs/guide/08-llm-wiki-guide.md`를 따른다.
- graphify 산출물은 `docs/graph/`에 보관한다.
- 프론트엔드 현재 작업판은 `docs/FRONTEND-BOARD.md`를 사용한다.
- `docs/todo/current.md`는 현재 만들지 않는다. 프로젝트 전체 TODO 허브가 필요해질 때만 추가한다.
- 프로젝트 지식 문서에서는 개인 작업 로그로 향하는 링크를 만들지 않는다.

## 바로 다음 작업

- [x] Obsidian에서 `docs/INDEX.md` 링크 이동 확인 ✅ 2026-07-05
- [ ] `docs/guide/05-decisions.md`가 의사결정 인덱스로 유지되는지 확인
- [ ] 월별 결정 로그는 `docs/decisions/2026/2026-07.md`에 누적
- [ ] 프론트엔드 작업 상태는 `docs/FRONTEND-BOARD.md`에서 관리

## 주요 링크

- 문서 인덱스: `docs/INDEX.md`
- LLM WIKI 가이드: `docs/guide/08-llm-wiki-guide.md`
- graphify 가이드: `docs/guide/09-graphify-guide.md`
- 의사결정 인덱스: `docs/guide/05-decisions.md`
- 월별 결정 로그: `docs/decisions/2026/2026-07.md`
- 프론트엔드 보드: `docs/FRONTEND-BOARD.md`
- 상세 인수인계 이력: `docs/HANDOFF.md`

## HANDOFF 문서 역할

- `HANDOFF.md`: 현재 상태, 다음 작업, 주의사항, 주요 링크만 담는 짧은 상태판
- `docs/HANDOFF.md`: 과거 상세 인수인계와 검증 결과를 보존하는 이력 문서

## 현재 결정 요약

- MVP는 `RUN` 중심이다.
- `RIDE`, `HIKE`는 향후 확장 항목이다.
- 프론트엔드 흐름은 `Screen -> Hook -> Service -> apiClient`를 따른다.
- 백엔드 흐름은 `API -> Service -> Repository -> Database`를 따른다.
- 상세 결정은 `docs/decisions/YYYY/YYYY-MM.md`에 기록한다.
- 장기 정책 단위 결정은 월별 결정 로그와 관련 `docs/guide/` 문서에서 확인한다.
- 개인 작업 로그는 프로젝트 지식과 분리하고, 프로젝트 지식은 `docs/`에 남긴다.

## 주의사항

- 기존 코드 수정 금지. 명시적 Task가 있을 때만 코드 변경한다.
- 기존 문서 삭제 금지. 필요한 경우 인덱스, 링크, 보강 문서를 추가한다.
- `.env` 실제 값 읽기, 출력, 요약 금지.
- `EXPO_PUBLIC_*` 값도 출력하지 않는다.
- 환경변수는 `SET` / `NOT_SET` 여부만 확인한다.
- API 응답 구조, DB 스키마, Router 구조, 상태관리 라이브러리는 Task 범위 없이 변경하지 않는다.
