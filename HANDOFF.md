# KKamyang HANDOFF

이 파일은 다음 작업자가 바로 이어받기 위한 현재 상태 요약이다.
상세 결정, 긴 작업 이력, 개인 로그를 누적하지 않고 관련 프로젝트 문서로 연결한다.

## 현재 상태

- Obsidian / LLM WIKI 관리는 `docs/` 중심으로 운영한다.
- 문서 진입점은 [[docs/INDEX]]다.
- LLM WIKI 운영 규칙은 docs/guide/[[08-llm-wiki-guide]].md를 따른다.
- graphify 산출물은 `docs/graph/`에 보관한다.
- 프론트엔드 현재 작업판은 docs/[[FRONTEND-BOARD]].md를 사용한다.
- `docs/todo/current.md`는 현재 만들지 않는다. 프로젝트 전체 TODO 허브가 필요해질 때만 추가한다.
- 프로젝트 지식 문서에서는 개인 작업 로그로 향하는 링크를 만들지 않는다.
- `todo`, `docs/task/`, `docs/decisions/`, `My_Note/records/`의 기록 중복을 줄이는 운영 단순화를 검토했다.
- 아직 기존 폴더를 이동하거나 삭제하지 않았으며, 앞으로의 기록부터 승격 조건을 적용하는 방향이다.

## 바로 다음 작업

- [ ] 기록 관리 단순화 원칙을 관련 운영 가이드와 템플릿에 반영
- [ ] 환경 설정 후 Android 실기기에서 Login → Feed → Detail → Record → Profile 흐름 재검증

## 주요 링크

- 문서 인덱스: `docs/INDEX.md`
- LLM WIKI 가이드: `docs/guide/08-llm-wiki-guide.md`
- graphify 가이드: `docs/guide/09-graphify-guide.md`
- 의사결정 인덱스: `docs/guide/05-decisions.md`
- 월별 결정 로그: `docs/decisions/2026/2026-07.md`
- 프론트엔드 보드: `docs/FRONTEND-BOARD.md`
- 과거 상세 인수인계 이력: `docs/archive-or-legacy/HANDOFF-history.md`

## HANDOFF 문서 역할

- `HANDOFF.md`: 현재 상태, 다음 작업, 주의사항, 주요 링크만 담는 짧은 상태판
- `docs/archive-or-legacy/HANDOFF-history.md`: 과거 상세 인수인계와 검증 결과를 보존하는 보관 문서

## 현재 결정 요약

- MVP는 `RUN` 중심이다.
- `RIDE`, `HIKE`는 향후 확장 항목이다.
- 프론트엔드 흐름은 `Screen -> Hook -> Service -> apiClient`를 따른다.
- 백엔드 흐름은 `API -> Service -> Repository -> Database`를 따른다.
- 상세 결정은 `docs/decisions/YYYY/YYYY-MM.md`에 기록한다.
- 장기 정책 단위 결정은 월별 결정 로그와 관련 `docs/guide/` 문서에서 확인한다.
- 개인 작업 로그는 프로젝트 지식과 분리하고, 프로젝트 지식은 `docs/`에 남긴다.

## 기록 관리 개선 방향

- `docs/task/`를 프로젝트 작업 범위, 주요 판단, 변경 결과와 검증 근거의 단일 기준으로 사용한다.
- `todo`와 `To-Do/`는 확정 전 임시 수집 및 개인 Daily Note로만 사용하고 완료 이력을 누적하지 않는다.
- `docs/decisions/`에는 여러 Task에 영향을 주고 장기간 유지할 결정만 승격한다.
- `My_Note/records/`는 의미 있는 개인적 배움이나 회고가 있을 때만 선택적으로 작성한다.
- Task 완료를 이유로 Decision이나 My Note를 자동 생성하지 않는다.
- 기존 기록은 삭제하지 않고 유지하되, 새 기록부터 단순화된 기준을 적용한다.

## 현재 차단 사항

- Android 실기기 OAuth, 지도, 위치 권한 및 end-to-end 검증은 로컬 환경 설정이 필요하다.
- 상세 사유는 [[docs/task/TASK-038-frontend-integration-qa]]와 [[docs/issue/ISSUE-001-local-development]]에서 확인한다.

## 주의사항

- 기존 코드 수정 금지. 명시적 Task가 있을 때만 코드 변경한다.
- 기존 문서 삭제 금지. 필요한 경우 인덱스, 링크, 보강 문서를 추가한다.
- `.env` 실제 값 읽기, 출력, 요약 금지.
- `EXPO_PUBLIC_*` 값도 출력하지 않는다.
- 환경변수는 `SET` / `NOT_SET` 여부만 확인한다.
- API 응답 구조, DB 스키마, Router 구조, 상태관리 라이브러리는 Task 범위 없이 변경하지 않는다.
