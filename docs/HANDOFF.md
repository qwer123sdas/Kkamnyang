# KKamyang HANDOFF

## 프로젝트 상태

- MVP 단계
- 신규 기능보다 안정화 및 QA 우선

---

## 구현 완료

### Auth

- Google OAuth 연결
- Supabase Session 유지
- login_id 설정 흐름

상태:
- Google OAuth 성공 확인
- Supabase Session 생성 성공 확인
- Supabase user 존재 확인
- access_token 존재 확인
- 로그인 후 `/users/me` API 호출 단계 디버깅 중

### Running

- 러닝 시작
- GPS 수집
- 종료
- Polyline 생성
- 지도 표시

상태:
- 완료

### Route

- Feed
- Detail
- Like
- Bookmark
- Comment
- Cluster
- History

상태:
- 완료

### Profile

- 프로필
- 내 Route
- 북마크 목록

상태:
- 완료

---

## 현재 최우선 이슈

### Android 앱에서 `/users/me` fetch 실패

확정된 내용:

- 프론트 `.env` 필수 키 존재 확인
- 실제 env 값은 보안 정책상 문서화하지 않음
- Google OAuth 성공
- Supabase Session 존재
- Supabase user 존재
- access_token 존재
- 프론트에서 `GET /users/me` 호출 시작 확인
- Authorization 헤더 포함 확인
- 앱 요청 target은 `http:` + `IP_ADDRESS` + `PORT` + `/api/v1/users/me`
- 백엔드 `GET /api/v1/users/me` 구현 존재
- 백엔드는 Android 실기기 테스트용 `0.0.0.0:8000` 실행 확인
- 휴대폰 브라우저에서 `/api/v1/health` success 확인
- 휴대폰 브라우저에서 `/api/v1/users/me` AUTH_REQUIRED JSON 응답 확인

현재 남은 문제:

```text
Android 앱 fetch:
GET /users/me
TypeError Network request failed
```

해석:

- 백엔드 미구현 문제 아님
- Google OAuth 문제 아님
- Supabase Session 생성 문제 아님
- 백엔드 라우트 접근 문제 아님
- 휴대폰 네트워크에서 PC FastAPI 접근 가능
- 현재는 Android 앱 런타임의 `http:` fetch 실패 문제로 좁혀짐

가장 유력한 원인:

```text
Android cleartext HTTP 요청 차단 가능성
```

참고:
- Expo SDK 54 `expo-build-properties`의 `android.usesCleartextTraffic` 옵션 확인 필요
- Expo Go에서는 프로젝트 native 설정 적용이 제한될 수 있음

---

## 다음 작업

1. HTTPS API URL로 우회 테스트

목적:
- `http:` cleartext 차단 여부를 확인

방법:
- 백엔드를 HTTPS 터널로 노출
- 휴대폰 브라우저에서 아래 응답 확인

```text
https://.../api/v1/users/me
```

기대 결과:

```text
AUTH_REQUIRED JSON
```

그 다음:
- `EXPO_PUBLIC_API_BASE_URL`을 동일한 HTTPS base URL로 변경
- Expo 재시작
- Android 앱에서 Google 로그인 재시도

2. 로그 판단

```text
[API] response status GET /users/me 200
```

이면:
- OAuth / Session / API 연결 성공

```text
[API] response status GET /users/me 401
```

이면:
- 앱 fetch는 성공
- 백엔드 Supabase token 검증 설정 확인 필요

```text
[API] response status GET /users/me 500
```

이면:
- 앱 fetch는 성공
- 백엔드 Supabase DB/service role/users 테이블 처리 확인 필요

```text
[API] fetch error GET /users/me TypeError Network request failed
```

이면:
- HTTPS URL 반영 여부
- Expo 재시작 여부
- Android cleartext/native network policy 재검토

3. 개발 방식 결정

HTTPS 우회로 성공하면 다음 중 하나 선택:

- Expo Go 유지: 개발 중 API base URL을 HTTPS 터널로 사용
- Development build 사용: `expo-build-properties`로 Android cleartext 허용 설정 검토

---

## 개발 규칙

- Screen → Hook → Service → apiClient
- Screen 직접 fetch 금지
- 최소 수정 원칙
- 큰 리팩토링 금지
- 애매하면 질문
- 임의 결정 금지
- Secret/env 실제 값 출력 금지
