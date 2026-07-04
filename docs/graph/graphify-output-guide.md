# Graphify 산출물 가이드

향후 graphify 분석 보고서에는 이 템플릿을 사용한다.

## 보고서 템플릿

```text
날짜:
도구:
입력 범위:
산출 파일:
관련 기능:
관련 Task 문서:
요약:
중요 관계:
불명확하거나 충돌하는 발견:
후속 조치:
```

## 관계 형식

프론트엔드:

```text
Screen -> Hook -> Service -> apiClient -> Backend API
```

백엔드:

```text
API -> Service -> Repository -> Database
```

문서:

```text
README/HANDOFF
-> docs/INDEX.md
-> docs/feature/*.md
-> docs/task/TASK-*.md
-> source files
-> tests
```

## 검증 규칙

graph 산출물을 수정 작업의 기준으로 사용하기 전에 중요한 관계를 현재 소스 트리와 대조해 검증한다.
