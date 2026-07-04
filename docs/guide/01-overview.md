# 프로젝트 개요

## 프로젝트

- 작업공간 이름: KKamyang
- 제품 이름: RouteLog
- 목적: GPS 기반 운동 경로 기록 및 공유

## MVP 범위

MVP는 다음에 집중한다.

- `RUN`
- GPS 기록
- 경로 저장 및 표시
- 경로 피드/상세
- 프로필과 사용자 식별 기본 기능
- Task에서 이미 다루는 좋아요, 북마크, 댓글, 경로 기록 기능

향후 활동 유형:

- `RIDE`
- `HIKE`

향후 활동 유형은 Task에서 범위를 명시적으로 바꾸지 않는 한 후순위로 둔다.

## 기술 스택

- 프론트엔드: React Native, Expo SDK 54
- 백엔드: FastAPI
- 데이터베이스: Supabase, PostgreSQL
- 지도: Google Maps API
- 스토리지: Supabase Storage

## 문서화 정책

기존 문서는 보존한다.
새 문서는 다음 역할을 우선한다.

- 인덱스
- 요약
- 운영 규칙
- 원본 문서 링크

보기 좋게 만들기 위한 목적으로만 기존 문서를 다시 쓰지 않는다.
문서와 코드가 다르면 어느 한쪽을 바꾸기 전에 불일치를 먼저 기록한다.

## 필수 읽기 흐름

```text
AGENTS.md
-> README.md
-> HANDOFF.md
-> docs/INDEX.md
-> related feature guide
-> related task document
-> code
```
