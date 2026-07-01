# KKamyang Obsidian 문서화 TODO

## 1. 이번에 준비한 변경 사항

- [x] 프로젝트 홈 문서 `PROJECT.md` 작성
- [x] 현재 상태 중심의 `HANDOFF.md` 초안 작성
- [x] 프론트엔드 작업 보드 `docs/FRONTEND-BOARD.md` 작성
- [x] TASK 템플릿 `.templates/TASK.md` 작성
- [x] 기술 결정 템플릿 `.templates/DECISION.md` 작성
- [x] 프론트엔드 계층 결정 문서 `docs/decision/DEC-001-frontend-layering.md` 작성
- [x] MVP 범위 결정 문서 `docs/decision/DEC-002-mvp-scope.md` 작성
- [x] 로컬 개발·실기기 연결 이슈 문서 `docs/issue/ISSUE-001-local-development.md` 작성
- [x] 프론트엔드 TASK-030~038 초안 작성
- [x] 옵시디언 내부 링크를 사용해 PROJECT → HANDOFF → BOARD → TASK 구조 연결

## 2. 실제 저장소에 반영할 파일

다음 파일과 폴더를 `C:\project\Kkamnyang` 루트 기준으로 복사한다.

```text
PROJECT.md
HANDOFF.md
todo.md
.templates/
docs/FRONTEND-BOARD.md
docs/decision/
docs/issue/
docs/task/TASK-030-frontend-common-api-types.md
docs/task/TASK-031-frontend-auth-flow.md
docs/task/TASK-032-frontend-route-feed.md
docs/task/TASK-033-frontend-route-detail.md
docs/task/TASK-034-frontend-running-record.md
docs/task/TASK-035-frontend-profile.md
docs/task/TASK-036-frontend-bookmark.md
docs/task/TASK-037-frontend-common-states.md
docs/task/TASK-038-frontend-integration-qa.md
```

## 3. 기존 파일과 병합할 때 주의할 사항

- [ ] 기존 `HANDOFF.md`를 바로 덮어쓰지 말고 최신 구현 상태를 새 초안에 병합한다.
- [ ] 기존 TASK 번호가 030 이상을 이미 사용하는지 확인한다.
- [ ] 번호가 충돌하면 TASK 번호만 현재 마지막 번호 이후로 변경한다.
- [ ] `docs/architecture.md`, `docs/api-spec.md`, `docs/db-schema.md`, `docs/design-system.md`는 이동하지 않는다.
- [ ] 기존 TASK 문서도 이동하지 않고 현재 위치를 유지한다.
- [ ] 별도의 Obsidian 전용 문서 복사본을 만들지 않는다.
- [ ] 프로젝트 루트 `C:\project\Kkamnyang`을 Vault로 연다.

## 4. `.gitignore` 반영

루트 `.gitignore`에 다음 항목이 없다면 추가한다.

```gitignore
# Obsidian local settings
.obsidian/
```

- [ ] 기존 `.gitignore`에 중복 항목이 없는지 확인
- [ ] 팀에서 Obsidian 설정 공유가 필요한지 결정하기 전까지 `.obsidian/` 전체 제외

## 5. 기존 기준 문서에 추가할 링크

다음 문서 하단에 `관련 문서` 섹션을 추가하되, 기존 내용을 변경하지 않는다.

대상:

- [ ] `AGENTS.md`
- [ ] `docs/architecture.md`
- [ ] `docs/api-spec.md`
- [ ] `docs/design-system.md`

권장 링크:

```markdown
## 관련 문서

- [[PROJECT]]
- [[HANDOFF]]
- [[docs/FRONTEND-BOARD]]
- [[todo]]
```

## 6. 실제 소스와 문서 대조

문서 패키지는 현재 알려진 프로젝트 상태를 바탕으로 만든 초안이다. 실제 저장소를 기준으로 다음을 확인해야 한다.

- [ ] `backend/` 구현 완료 API 목록 확인
- [ ] `kkamyang-app/src/types`의 실제 타입 확인
- [ ] `kkamyang-app/src/services`의 실제 API 메서드 확인
- [ ] `kkamyang-app/src/hooks`의 구현·미구현 구분
- [ ] `kkamyang-app/src/screens`의 구현·스켈레톤 구분
- [ ] API Spec과 실제 FastAPI 응답 형식 비교
- [ ] 이미 완료된 TASK를 `done`으로 변경
- [ ] 진행 중인 TASK 하나를 `in-progress`로 변경
- [ ] `docs/FRONTEND-BOARD.md` 상태 갱신
- [ ] `HANDOFF.md` 현재 작업과 다음 작업 갱신

## 7. 프론트엔드 권장 실행 순서

- [ ] TASK-030 공통 API 타입 및 응답 처리
- [ ] TASK-031 인증 및 login_id 설정 흐름
- [ ] TASK-032 Route Feed
- [ ] TASK-033 Route Detail
- [ ] TASK-034 Running Record
- [ ] TASK-035 Profile / My Routes
- [ ] TASK-036 Bookmark
- [ ] TASK-037 공통 로딩·빈 상태·오류 처리
- [ ] TASK-038 실기기 통합 QA

## 8. 각 TASK 완료 시 공통 절차

- [ ] TASK의 완료 조건 체크
- [ ] 변경 파일 목록 기록
- [ ] 실행한 검증 명령 기록
- [ ] 실기기 확인 결과 기록
- [ ] 남은 이슈 기록
- [ ] TASK 상태 변경
- [ ] `FRONTEND-BOARD.md` 이동
- [ ] `HANDOFF.md` 갱신

## 9. 범위 통제

다음 기능은 스켈레톤 파일이 존재하더라도 현재 프론트엔드 작업 범위에서 제외한다.

- [ ] Naver OAuth 구현하지 않음
- [ ] Nearby Route 구현하지 않음
- [ ] Route Cluster 구현하지 않음
- [ ] Route History 구현하지 않음
- [ ] Comment 구현하지 않음
- [ ] 추천 알고리즘 고도화하지 않음
- [ ] 실시간 위치 공유 구현하지 않음

## 10. 반영 후 검증

```bash
cd /c/project/Kkamnyang
git status
git diff -- PROJECT.md HANDOFF.md todo.md docs .templates .gitignore
```

프론트엔드 검증은 프로젝트 `package.json`에 정의된 스크립트를 먼저 확인한 후 실행한다.

```bash
cd kkamyang-app
npm run
```

확인된 스크립트에 따라 다음을 실행한다.

```bash
npm run typecheck
npm run lint
npm test
```

존재하지 않는 스크립트는 임의로 실행하지 않고 TASK의 남은 이슈에 기록한다.
