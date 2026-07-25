# 프로젝트 개요 가이드

이 문서는 RouteLog의 상세 명세를 반복하지 않고, 프로젝트 범위와 관련 원본 문서를 빠르게 찾기 위한 진입점으로 사용한다.

## 현재 적용 요약

- 제품 이름: RouteLog
- 현재 MVP 활동 유형: `RUN`
- 향후 확장 활동 유형: `RIDE`, `HIKE`
- Task에 명시되지 않은 확장 기능은 현재 범위에 포함하지 않는다.

정확한 범위와 기능 요구사항은 [[docs/source/requirements|요구사항 원문]]을 기준으로 판단한다.
기술 스택과 시스템 구성은 [[docs/source/architecture|아키텍처 원문]]에서 확인한다.
프로젝트 전체 금지 사항과 보안 규칙은 [[AGENTS|Agent 작업 규칙]]을 최우선으로 따른다.

## 작업 시작 전 읽기 순서

```text
AGENTS.md
-> README.md
-> HANDOFF.md
-> docs/INDEX.md
-> 관련 feature 문서
-> 관련 Task 문서
-> 관련 source 원문
-> 코드
```

## 변경 시 확인 사항

1. 변경하려는 기능이 현재 MVP와 관련 Task 범위에 포함되는지 확인한다.
2. 구현 전에 관련 feature 문서와 source 원문을 확인한다.
3. 요구사항이 바뀌면 guide에 상세 내용을 복사하지 않고 source 원문과 관련 Task를 갱신한다.
4. 작업 상태와 검증 결과는 HANDOFF 또는 관련 Task 문서에 기록한다.

## 관련 문서

- [[docs/INDEX|문서 인덱스]]
- [[docs/source/requirements|요구사항 원문]]
- [[docs/source/architecture|아키텍처 원문]]
- [[docs/guide/05-decisions|의사결정 인덱스]]
