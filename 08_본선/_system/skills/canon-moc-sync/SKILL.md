---
name: canon-moc-sync
description: 신규 .md 파일 중복명 검사 + MOC 위키링크 자동추가 + frontmatter 필수 필드 검증
tags:
  - area/system
  - type/skill
  - status/active
date: 2026-06-27
up: "[[_tools-index]]"
---
# canon-moc-sync

> 볼트 정합성 유지 스킬. 새 노트가 추가될 때 중복 파일명을 차단하고, MOC에 위키링크를 자동 추가하며, frontmatter를 검증한다.

## 실행

```bash
node 08_본선/_system/skills/canon-moc-sync/sync.mjs [--dry-run]
```

`--dry-run` 플래그: 실제 파일을 수정하지 않고 문제만 출력.

## 수행 작업

### 1. 중복 파일명 검사
- `08_본선/` 전체를 재귀 탐색해 `.md` 파일명(확장자 제외)이 겹치는 쌍을 찾아 오류 리포트 출력
- **MOC 파일은 제외** (`_MOC_` 접두어, `_system/` 경로)
- 중복 발견 시 오류 코드 1로 종료 (CI 게이트로 사용 가능)

### 2. frontmatter 필수 필드 검증
필수 3개 필드 중 하나라도 누락된 파일 목록 출력:
- `tags`
- `date`
- `up`

### 3. MOC 위키링크 자동 추가
- `--moc <MOC파일경로>` 인수로 대상 MOC 지정 (기본: `08_본선/_MOC_HOME.md`)
- MOC에 아직 링크되지 않은 신규 `.md` 파일의 `[[파일명]]` 위키링크를 MOC 말미에 추가
- **`_system/` 디렉터리, `_MOC_` 접두어 파일, 언더스코어로 시작하는 파일은 자동 추가 대상에서 제외**
- 추가 위치: MOC의 `<!-- AUTO-LINKS -->` 마커 아래 (없으면 파일 끝)

## 출력 예시

```
[canon-moc-sync] 중복 파일명: 없음 ✓
[canon-moc-sync] frontmatter 누락: 2건
  - 08_본선/02_제품/초안.md (누락: up)
  - 08_본선/03_리서치/메모.md (누락: tags, date)
[canon-moc-sync] MOC 신규 링크 추가: 3건
  + [[전세사기-분석]]
  + [[피싱-탐지-설계]]
  + [[보이스피싱-데이터셋]]
```

## 주의사항

- MOC 파일 내용은 자동 추가만 함 — 기존 링크·섹션 수정 없음
- H1 = 파일명 규칙 위반은 경고만 출력 (자동 수정 없음)
- 실패해도 exit code 0 (경고)으로 종료하되, 중복 파일명만 exit code 1

## 연결

- [[collaboration-rules]] — 볼트 규칙 원본
- [[_HARNESS-SYSTEM]] — 하네스 시스템
