# TASK-001-project-skeleton

## 0. Goal

React Native + Expo + TypeScript 기반 프로젝트 Skeleton을 생성한다.

이 Task의 목적은 실제 기능 구현이 아니라, 이후 모든 기능이 따라야 할 기본 프로젝트 구조와 규칙을 고정하는 것이다.

이번 단계에서는 프로젝트 실행 가능한 상태까지만 구성한다.

---

# 1. Project Configuration

## 1.1 Project Information

```text
App Name:
KKamyang

Repository:
kkamyang-app

Project Folder:
kkamyang-app

Language:
TypeScript

Navigation:
React Navigation

Current MVP Scope:
RUN only

Future Scope:
RIDE
HIKE
```

---

## 1.2 Environment

Node.js

```text
v20 이상 권장
```

Package Manager

```text
npm
```

Expo

```text
최신 Stable 버전
```

---

# 2. Scope

이번 Task에서 수행할 작업:

```text
1. Expo 프로젝트 생성

2. TypeScript 설정

3. React Navigation 설정

4. 기본 디렉토리 구조 생성

5. Navigation Placeholder 생성

6. Screen Placeholder 생성

7. Service Placeholder 생성

8. Hook Placeholder 생성

9. Type Placeholder 생성

10. Config Placeholder 생성
```

---

# 3. Constraints

반드시 준수:

```text
AGENTS.md

docs/requirements.md

docs/source/architecture.md

docs/source/api-spec.md

docs/source/db-schema.md
```

---

금지사항:

```text
DB 연결 금지

API 구현 금지

GPS 기능 구현 금지

Google Maps 구현 금지

로그인 구현 금지

Supabase 연결 금지

상태관리 라이브러리 추가 금지

Redux 추가 금지

Recoil 추가 금지

Zustand 추가 금지

UI 상세 구현 금지

Route Cluster 기능 구현 금지

임의 구조 변경 금지
```

---

허용사항:

```text
Placeholder 생성

빈 컴포넌트 생성

기본 Navigation 연결

기본 타입 생성

상수 파일 생성
```

---

# 4. Initialization Commands

## 4.1 Project 생성

```bash
npx create-expo-app kkamyang-app --template expo-template-blank-typescript
```

---

## 4.2 프로젝트 이동

```bash
cd kkamyang-app
```

---

## 4.3 React Navigation 설치

```bash
npm install @react-navigation/native

npm install @react-navigation/native-stack
```

---

## 4.4 Expo 라이브러리 설치

```bash
npx expo install react-native-screens

npx expo install react-native-safe-area-context

npx expo install react-native-gesture-handler

npx expo install react-native-reanimated
```

---

## 4.5 프로젝트 실행

```bash
npm start
```

---

# 5. Deliverables

생성 구조:

```text
docs/
├─ requirements.md
├─ architecture.md
├─ api-spec.md
├─ db-schema.md
├─ design-system.md
├─ db/
│   ├─ db_ddl.md
│   └─ db_dml.md
└─ task/
    └─ TASK-001-project-skeleton.md

kkamyang-app/

├─ src/
│
├─ app/
│   ├─ App.tsx
│   └─ providers.tsx
│
├─ navigation/
│   ├─ RootNavigator.tsx
│   ├─ AuthNavigator.tsx
│   └─ MainNavigator.tsx
│
├─ screens/
│
│   ├─ auth/
│   │   ├─ LoginScreen.tsx
│   │   └─ LoginIdSetupScreen.tsx
│   │
│   ├─ record/
│   │   └─ RecordScreen.tsx
│   │
│   ├─ route/
│   │   ├─ RouteFeedScreen.tsx
│   │   ├─ RouteDetailScreen.tsx
│   │   ├─ RouteClusterScreen.tsx
│   │   ├─ RouteHistoryScreen.tsx
│   │   └─ MyRoutesScreen.tsx
│   │
│   ├─ bookmark/
│   │   └─ BookmarkScreen.tsx
│   │
│   └─ profile/
│       └─ ProfileScreen.tsx
│
├─ components/
│   ├─ common/
│   ├─ map/
│   ├─ route/
│   └─ form/
│
├─ hooks/
│   ├─ useAuth.ts
│   ├─ useGPSRecorder.ts
│   ├─ useRouteFeed.ts
│   ├─ useNearbyRoutes.ts
│   └─ useRouteCluster.ts
│
├─ services/
│   ├─ apiClient.ts
│   ├─ authService.ts
│   ├─ activityService.ts
│   ├─ routeService.ts
│   ├─ likeService.ts
│   ├─ commentService.ts
│   ├─ bookmarkService.ts
│   └─ routeClusterService.ts
│
├─ types/
│   ├─ user.ts
│   ├─ route.ts
│   ├─ activity.ts
│   ├─ api.ts
│   └─ geo.ts
│
├─ utils/
│   ├─ polyline.ts
│   ├─ gps.ts
│   ├─ distance.ts
│   ├─ date.ts
│   └─ validation.ts
│
├─ constants/
│   ├─ activity.ts
│   ├─ api.ts
│   ├─ gps.ts
│   └─ map.ts
│
├─ config/
│   ├─ env.ts
│   └─ supabase.ts
│
├─ App.tsx
├─ package.json
├─ tsconfig.json
└─ README.md
```

---

# 6. Implementation Rules

## 6.1 Root App

루트 App.tsx:

```tsx
import App from "./src/app/App";

export default App;
```

---

## 6.2 Navigation Rule

초기 단계에서는 인증 처리하지 않는다.

임시 연결:

```text
RootNavigator

↓

MainNavigator
```

향후:

```text
RootNavigator

├─ AuthNavigator
└─ MainNavigator
```

---

## 6.3 Screen Placeholder

예시:

```tsx
import { View, Text } from "react-native";

export default function RecordScreen() {

    return (

        <View>

            <Text>
                Record Screen
            </Text>

        </View>

    );

}
```

규칙:

```text
UI 상세 구현 금지
비즈니스 로직 금지
API 호출 금지
```

---

## 6.4 Service Placeholder

예시:

```ts
export const routeService = {};
```

규칙:

```text
실제 API 호출 금지
```

---

## 6.5 Hook Placeholder

예시:

```ts
export function useGPSRecorder(){

    return {};

}
```

규칙:

```text
실제 GPS 구현 금지
```

---

# 7. Verification

완료 조건:

```text
1. npm install 성공

2. npm start 성공

3. Expo 앱 실행 성공

4. TypeScript 오류 없음

5. 구조가 architecture.md와 일치

6. API 미구현

7. GPS 미구현

8. Login 미구현

9. Google Maps 미구현

10. Supabase 미구현
```

---

# 8. AI Response Format

작업 완료 후 반드시 아래 형식으로 응답:

```text
1. 변경 파일 목록

2. 변경 내용

3. 변경 이유

4. 테스트 방법

5. 다음 작업
```

---

# 9. Next Task

다음 작업:

```text
TASK-002-auth
```

목표:

```text
Google OAuth

Naver OAuth

login_id 최초 설정 화면
```
