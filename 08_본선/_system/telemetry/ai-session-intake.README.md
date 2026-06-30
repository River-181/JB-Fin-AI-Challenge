---
tags:
  - area/system
  - type/guide
  - status/active
date: 2026-06-27
up: "[[_HARNESS-SYSTEM]]"
---
# ai-session-intake.csv — 컬럼 가이드

> AI 세션 원시 데이터 수집 파일. `telemetry-aggregator` 스킬이 이 파일을 읽어 각종 통계 파일에 합산한다.
> Append-only — 행 삭제·수정 금지. 오류 행은 다음 행에 `_CORRECTION` 행 추가.

## 컬럼 정의

| 컬럼 | 타입 | 필수 | 설명 |
|------|------|------|------|
| `ts` | ISO 8601 (UTC) | Y | 세션 종료 타임스탬프. 예: `2026-06-27T14:30:00Z` |
| `engine` | 열거 | Y | AI 엔진 식별자. 아래 허용값 참조 |
| `agent` | 문자열 | Y | 에이전트/역할명. `orchestrator`, `builder`, `designer` 등. 직접 대화 시 `direct` |
| `member_slot` | 열거 | Y | 주도 팀원 슬롯. `M1`~`M4` 또는 `AI`(에이전트 자율) |
| `domain` | 열거 | Y | 작업 분야. 아래 허용값 참조 |
| `task` | 문자열 | Y | 세션 주요 작업 요약 (50자 이내) |
| `tokens_in` | 정수 | Y | 입력 토큰 수 (캐시 포함) |
| `tokens_out` | 정수 | Y | 출력 토큰 수 |
| `duration` | 문자열 | N | 소요 시간. `15m`, `1h30m` 형식. 미상 시 `—` |
| `tools` | 문자열 | N | 사용 툴 목록. `Read×3,Edit×2` 형식. 없으면 `—` |
| `exact_or_estimate` | 열거 | Y | 토큰 수치 신뢰도. `exact` 또는 `estimate` |
| `prompt_ref` | 문자열 | N | 프롬프트 로그 참조. `프롬프트-로그#2026-06-27-01` 형식. 없으면 `—` |

---

## engine 허용값

| 값 | 설명 |
|----|------|
| `claude` | Claude Code (Anthropic) — 기본값 |
| `codex` | OpenAI Codex / Codex CLI |
| `gemini` | Google Gemini |
| `gpt` | OpenAI GPT 시리즈 |
| `perplexity` | Perplexity AI |
| `other` | 그 외 엔진 (비고 컬럼에 명시) |

## domain 허용값

| 값 | 설명 |
|----|------|
| `dev` | 개발·코딩 |
| `design` | 디자인·UX |
| `doc` | 문서·명세서 |
| `research` | 리서치·분석 |
| `pitch` | 발표·스토리텔링 |
| `ops` | 운영·시스템·인프라 |
| `other` | 기타 |

## exact vs estimate

- **exact**: Stop 훅(`session-telemetry.mjs`)이 트랜스크립트에서 직접 파싱한 수치
- **estimate**: 수동 입력, 청구서 추정, 또는 파싱 실패 후 보정한 값

---

## 수동 추가 방법

CSV이므로 콤마가 포함된 값은 큰따옴표로 감싼다:
```
2026-06-27T15:00:00Z,claude,builder,M2,dev,"컴포넌트 리팩터링",12000,3500,45m,"Read×5,Edit×3",estimate,—
```

자동 추가는 `automation/session-telemetry.mjs`가 세션 종료 시 수행한다.
