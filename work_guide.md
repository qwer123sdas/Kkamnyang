# 문서 세트
project-root/

docs/

 ├─ vision.md
 ├─ requirements.md
 ├─ architecture.md
 ├─ db-schema.md
 ├─ api-spec.md
 ├─ screen/
 │     ├─ login.md
 │     ├─ record.md
 │     ├─ route-feed.md
 │     └─ profile.md
 │
 └─ task/

AGENTS.md

# Vision
## 서비스 목표

GPS 기반 운동 경로 기록/공유 앱

사용자 기능:

- 러닝

핵심 가치:

1. 기록
2. 저장
3. 공유
4. 커뮤니티

비핵심:

- 광고
- 결제
- 실시간 채팅
- 추천 AI

#작업순서
1. 문서 작성

↓

2. AGENTS.md 작성

↓

3. Expo Skeleton 생성

↓

4. 화면 Routing

↓

5. GPS Hook

↓

6. Map 화면

↓

7. Polyline

↓

8. Supabase 연결

↓

9. Feed

↓

10. Community 기능

# 체크리스트
□ vision.md 작성

□ requirements.md 작성

□ architecture.md 작성

□ db-schema.md 작성

□ api-spec.md 작성

□ AGENTS.md 작성

# 기술
□ Expo 생성

□ Supabase 프로젝트 생성

□ Google API Key 발급

□ 환경변수 분리

□ Git Repository 생성

□ 브랜치 전략 정의

# 하네스
□ 금지사항 정의

□ 응답 형식 정의

□ 작업 단위 정의

□ 검증 기준 정의

□ 파일 수정 범위 정의

# GPS
□ 위치 수집 주기 결정

□ 노이즈 정책 결정

□ Polyline 정책 결정

□ 거리 계산 방식 결정

---
# 2026.05.27
    cloudflared는 Cloudflare가 제공하는 터널 실행 도구입니다. 내 PC에서 실행 중인 로컬 서버를 인터넷에서 접근 가능한 임시 HTTPS 주소로 연결해 줍니다.

  예를 들어 현재 구조는 대략 이렇습니다.

cloudflared tunnel --url http://localhost:8000

  휴대폰 앱/브라우저
          ↓ HTTPS
  https://xxxx.trycloudflare.com
          ↓ Cloudflare 터널
  내 PC의 cloudflared
          ↓ HTTP
  http://localhost:8000
          ↓
  FastAPI 백엔드

  3. 변경 이유
     FastAPI는 지금 직접 HTTPS 서버로 실행 중인 것이 아닙니다. 실제 백엔드는 여전히 아래 주소에서 HTTP로 떠 있습니다.

  http://localhost:8000

  대신 cloudflared가 바깥에서는 HTTPS 주소를 제공하고, 그 요청을 내 PC의 http://localhost:8000으로 전달합니다. 그래서 Android 앱이 http: cleartext 요청을 하지 않고 https: 요청을 하게 만들 수 있습니다.

  4. 테스트 방법
     당신이 한 일은 다음과 같습니다.
  5. cloudflared를 설치했다.
  6. 로컬 백엔드 http://localhost:8000을 대상으로 터널을 열었다.
  7. Cloudflare가 https://xxxx.trycloudflare.com 형태의 임시 HTTPS 주소를 발급했다.
  8. 휴대폰에서 그 HTTPS 주소로 접속했다.
  9. 요청이 Cloudflare를 거쳐 내 PC의 FastAPI 백엔드까지 전달되는 것을 확인했다.

  이제 이 주소를 앱의 API base URL로 쓰면 Android 앱 입장에서는 HTTP가 아니라 HTTPS API를 호출하게 됩니다.
