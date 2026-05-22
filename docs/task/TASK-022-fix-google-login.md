# 작업명
Google 로그인 실패 원인 분석 및 최소 수정

## 프로젝트

KKamyang

러닝 Route 기록/공유 앱
현재 MVP 안정화 및 QA 단계

---

## 현재 상태

실행 상태:

- Expo 실행 성공
- Expo Go 설치 완료
- 실제 휴대폰 연결 완료
- QR 실행 가능

현재 문제:

- Google 로그인이 동작하지 않음

현재 확인 결과:

### .env 상태

다음 필수 값이 없음 확인됨

EXPO_PUBLIC_SUPABASE_URL
EXPO_PUBLIC_SUPABASE_ANON_KEY
EXPO_PUBLIC_API_BASE_URL
EXPO_PUBLIC_GOOGLE_MAPS_API_KEY

---

## 원인 우선순위

1. .env 값 누락 (확정)

2. Supabase Google Provider 비활성

3. Google Client ID / Secret 누락

4. Redirect URL 불일치

5. app.json 또는 app.config.ts scheme 문제

6. authService OAuth 처리 문제

---

## 필수 작업 규칙

반드시 준수:

- Screen → Hook → Service → apiClient
- Screen 직접 fetch 금지
- Type 기반 설계
- MVP 우선
- 최소 수정 원칙
- 신규 기능 추가 금지
- 대규모 리팩토링 금지
- 작업 범위 외 수정 금지
- 임의 결정 금지
- 애매한 것은 질문 후 진행
- Deliverables 외 수정 시 이유 설명

---

## 확인 작업

### 1. 환경 변수 확인

확인 대상:

.env

필수 항목:

EXPO_PUBLIC_SUPABASE_URL
EXPO_PUBLIC_SUPABASE_ANON_KEY
EXPO_PUBLIC_API_BASE_URL
EXPO_PUBLIC_GOOGLE_MAPS_API_KEY

확인 내용:

- 파일 존재 여부
- 값 존재 여부
- EXPO_PUBLIC prefix 적용 여부
- 코드 참조 위치 확인

---

### 2. Supabase 설정 확인

확인:

Authentication
→ Providers
→ Google

확인 항목:

- Enable 여부
- Client ID 존재 여부
- Client Secret 존재 여부

추가 확인:

Authentication
→ URL Configuration

확인:

- Redirect URLs
- Site URL

---

### 3. 앱 설정 확인

확인 파일:

app.json
app.config.ts

확인 항목:

- scheme
- deep link
- redirect 설정

---

### 4. 로그인 구현 확인

확인 파일:

src/services/authService.ts
src/hooks/useAuth.ts

확인 항목:

- signInWithOAuth()
- redirectTo
- Linking.createURL()
- session 처리

---

## Deliverables

반드시 아래 형식으로 응답:

1. 원인 분석
2. 수정 필요 파일
3. 최소 수정 제안
4. 테스트 방법
5. 검증 결과
6. 문서와 충돌한 사항

주의:

관련 없는 파일 수정 금지
신규 기능 추가 금지
임의 구현 금지