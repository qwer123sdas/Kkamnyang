# TASK-005-record-start

## Goal

러닝 기록 시작 기능을 구현한다.

이번 단계에서는 GPS 좌표 수집은 하지 않고, 기록 시작 상태와 Activity 생성만 구현한다.

---

# Scope

이번 작업:

```text
1. RecordScreen 구현

2. 기록 시작 버튼 구현

3. POST /api/v1/activities/start 연결

4. activity_id 저장

5. 상태 STARTED 저장

6. useActivity Hook 생성
```

---

작업 제외:

```text
GPS 좌표 수집

Google Maps

Polyline 생성

Route 생성

거리 계산

시간 계산

활동 종료
```

---

# Constraints

반드시 준수:

```text
AGENTS.md
docs/source/api-spec.md
docs/source/architecture.md
```

금지:

```text
GPS 구현

Google Maps 구현

Route 저장

비즈니스 로직 Screen 내부 구현

직접 fetch 사용
```

---

# Deliverables

```text
src/screens/record/RecordScreen.tsx

src/hooks/useActivity.ts

src/services/activityService.ts

src/types/activity.ts
```

---

# Verification

```text
1. Record 화면 표시

2. 기록 시작 버튼 표시

3. 시작 버튼 클릭 가능

4. activity_id 저장 확인

5. 상태 STARTED 저장

6. TypeScript 오류 없음
```

---

# Next Task

```text
TASK-006-gps-record
```
