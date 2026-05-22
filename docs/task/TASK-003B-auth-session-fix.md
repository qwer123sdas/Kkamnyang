# TASK-003B-auth-session-fix

## Goal

Google OAuth Session 영속성을 위한 인증 설정을 보완한다.

---

# Scope

작업:

```text
1. expo-crypto 설치

2. AsyncStorage 설치

3. Supabase auth storage 연결

4. Session 유지 설정 보완
```

---

제외:

```text
Google Login UI

login_id

Naver OAuth

GPS

Google Maps
```

---

# Commands

설치:

```bash
npx expo install expo-crypto

npx expo install @react-native-async-storage/async-storage
```

---

# Deliverables

```text
package.json

src/config/supabase.ts
```

---

# Verification

```text
1. TypeScript 오류 없음

2. Session Storage 연결 완료

3. 앱 재실행 후 세션 유지 가능
```

---

# Next Task

```text
TASK-004-login-id
```