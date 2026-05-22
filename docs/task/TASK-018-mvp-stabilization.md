# TASK-018-mvp-stabilization

## Goal

MVP 기능 구현 이후 앱 전체 안정성을 점검하고, 런타임 오류 가능성을 줄인다.

---

# Scope

```text
1. TypeScript 전체 점검
2. Navigation route param 점검
3. API 응답 타입 일관성 점검
4. 빈 데이터 상태 UI 점검
5. loading/error 상태 점검
6. 직접 fetch 사용 여부 점검
7. 범위 외 기능 침범 여부 점검
```

---

# Excluded

```text
신규 기능 추가
UI 디자인 고도화
상태관리 라이브러리 추가
API 스펙 변경
DB 스키마 변경
성능 최적화 고도화
```

---

# Deliverables

```text
필요 시 최소 파일 수정

단, 신규 기능 파일 생성 금지
```

---

# Constraints

```text
1. 새 기능 구현 금지
2. API 스펙 변경 금지
3. DB 스키마 변경 금지
4. 리팩토링 범위 확대 금지
5. 상태관리 라이브러리 추가 금지
6. UI 대규모 변경 금지
```

---

# Verification

```text
1. TypeScript 오류 없음
2. 모든 Screen import 오류 없음
3. Navigation param 타입 오류 없음
4. services 외 직접 fetch 없음
5. 빈 목록 상태 처리 있음
6. loading/error 상태 처리 있음
7. 범위 외 기능 추가 없음
```

---

# Next Task

```text
TASK-019-device-test
```