# TASK-020-runtime-fix

## Goal

MVP 수동 검증에서 발견된 런타임 진입 문제를 최소 수정한다.

---

# Scope

```text
1. env 필수값 누락 시 앱 크래시 방지
2. LoginScreen에 Google 로그인 버튼 연결
3. RouteFeedScreen에서 RouteDetail 진입 연결
4. 초기 화면에서 Record/Profile 진입 버튼 추가
5. 8081 포트 충돌 대응 실행 명령 문서화
```

---

# Excluded

```text
신규 기능 추가
UI 리디자인
API 스펙 변경
DB 스키마 변경
OAuth 로직 재설계
Route Cluster 수정
GPS 로직 수정
성능 최적화
```

---

# Deliverables

```text
src/config/env.ts
src/config/supabase.ts
src/screens/auth/LoginScreen.tsx
src/screens/route/RouteFeedScreen.tsx
src/navigation/MainNavigator.tsx
README.md 또는 docs/test/manual-mvp-checklist.md
```

---

# Constraints

```text
1. 최소 수정만 허용
2. 신규 라이브러리 추가 금지
3. 기존 API 계약 변경 금지
4. 기존 Navigation 구조 대규모 변경 금지
5. Supabase 설정 누락 시 앱이 즉시 크래시하지 않도록 처리
6. Google 로그인은 기존 authService/useAuth 흐름만 사용
7. Feed -> Detail 이동만 연결
8. Record/Profile 진입은 임시 버튼 또는 기존 화면 내 최소 링크로 처리
```

---

# Verification

```text
1. TypeScript 오류 없음
2. env 미설정 상태에서도 import 단계 크래시 없음
3. LoginScreen에 Google 로그인 버튼 표시
4. Feed에서 Route Detail 이동 가능
5. Record 화면 진입 가능
6. Profile 화면 진입 가능
7. 신규 기능 추가 없음
8. API 스펙 변경 없음
```

---

# Notes

8081 포트 충돌 시 다음 명령 사용:

```bash
npm start -- --port 8082
```

또는 기존 node/expo 프로세스를 종료한 후 실행한다.

---

# Next Task

```text
TASK-021-manual-retest
```