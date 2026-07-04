# Graphify 가이드

이 문서는 향후 graphify 산출물을 어디에 보관하고 어떻게 사용할지 정의한다.

## 산출물 디렉터리

graphify 및 코드/문서 관계 분석 산출물은 다음 위치에 보관한다.

```text
docs/graph/
```

## 예상 산출물 유형

권장 파일명:

```text
docs/graph/YYYY-MM-DD-code-graph.md
docs/graph/YYYY-MM-DD-doc-graph.md
docs/graph/YYYY-MM-DD-feature-map.md
docs/graph/YYYY-MM-DD-dependency-notes.md
```

graphify가 기계가 읽을 수 있는 파일을 생성하면 보고서와 함께 보관한다.

```text
docs/graph/YYYY-MM-DD-graphify-output.json
docs/graph/YYYY-MM-DD-graphify-output.md
```

## 운영 규칙

- graph 산출물로 원본 문서를 대체하지 않는다.
- graph 산출물은 기준 문서가 아니라 분석 결과로 취급한다.
- graph 산출물은 Task 문서와 기능 가이드에 다시 연결한다.
- graph 산출물이 코드와 충돌하면 문서를 수정하기 전에 코드를 기준으로 검증한다.
- graph 산출물이 오래된 문서와 충돌하면 기존 내용을 삭제하지 말고 불일치를 기록한다.

## 유용한 관계 패턴

프론트엔드:

```text
Screen -> Hook -> Service -> apiClient -> Backend API
```

백엔드:

```text
API -> Service -> Repository -> Database
```

기능:

```text
feature guide -> task document -> source files -> tests -> graph artifact
```
