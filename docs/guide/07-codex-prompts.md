# Codex 프롬프트

이 문서는 프로젝트에서 Codex를 안전하게 사용하기 위한 재사용 프롬프트를 보관한다.

## 문서 전용 작업

```text
먼저 AGENTS.md를 읽어라.
코드를 수정하지 마라.
기능을 구현하지 마라.
기존 문서를 보존하라.
인덱스, 링크, 요약, 새 가이드 문서만 추가하라.
수정 전에 변경 계획을 요약하라.
수정 후 변경 파일, 이유, 테스트 방법, 다음 작업을 보고하라.
```

## 기능 조사

```text
먼저 AGENTS.md, docs/INDEX.md, 관련 docs/task/TASK-*.md를 읽어라.
프론트엔드 조사는 Screen -> Hook -> Service -> apiClient 흐름을 따른다.
백엔드 조사는 API -> Service -> Repository -> Database 흐름을 따른다.
명시적인 Task 범위 없이 DB 스키마, API 응답 구조, Router 구조, 상태관리, 라이브러리를 변경하지 마라.
```

## 환경 보안

```text
실제 .env 값을 읽거나 출력하지 마라.
환경변수는 SET 또는 NOT_SET으로만 보고하라.
EXPO_PUBLIC_* 값도 출력하지 마라.
```
