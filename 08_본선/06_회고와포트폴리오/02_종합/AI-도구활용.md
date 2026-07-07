---
tags:
  - area/retrospective
  - type/synthesis
  - status/active
date: 2026-07-07
up: "[[08_본선/06_회고와포트폴리오/README|06 회고와 포트폴리오]]"
---
# AI 도구 활용

> [[08_본선/06_회고와포트폴리오/02_종합/협업-방법론|협업 방법론]]이 "우리가 어떤 순서·규율로 일했나"를 다룬다면, 이 문서는 그 일을 실제로 실행한 **도구 자체**를 다룬다 — 무엇을 썼고, 어디서 받고, 어떻게 설치하는지. 팀원이든 외부인이든 이 한 장만 읽고 같은 환경을 그대로 재현할 수 있게 하는 게 목적이다.

## 1. Claude Code — 메인 하네스

본선 48시간의 실제 작업 시간 대부분은 Claude Code 세션 안에서 이뤄졌다. 한 사람이 순서대로 코딩하는 대신 여러 세션을 동시에 띄우고 한 세션이 총괄을 맡는 구조를 실전 규모로 썼는데("Fable 총괄 + Sonnet 6팀" 같은 패턴, 근거는 [[08_본선/06_회고와포트폴리오/02_종합/협업-방법론|협업 방법론]] §1), 이게 가능했던 건 Claude Code가 서브에이전트 팬아웃과 병렬 세션을 기본 기능으로 지원하기 때문이다.

작업 순서는 브레인스토밍·스펙·계획을 먼저 굳히고 코드는 그다음이라는 원칙을 지켰고(`superpowers` 스킬 묶음의 brainstorming/writing-plans, 팀 자체 제작 `harness-engineering` 스킬의 PRD/DDBM 계약이 이 단계를 담당), 세션이 끝나기 전에는 무슨 일을 했는지 로그에 남기는 것("Capture-by-default")을 기본값으로 삼았다 — `session-log.md`·`decision-log.md`·`프롬프트-로그.md` 세 계층으로 나눠 append-only로 쌓은 기록이 이 회고 문서 전체의 근거가 됐다.

- **다운로드**: [claude.com/download](https://claude.com/download) (Mac/Windows 앱, 네이티브 설치 권장) · CLI 소스는 [github.com/anthropics/claude-code](https://github.com/anthropics/claude-code) · 상세 설치 가이드는 [code.claude.com/docs/en/setup](https://code.claude.com/docs/en/setup)
- **설치**: 네이티브 설치 스크립트(권장, Node 불요) 또는 `npm install -g @anthropic-ai/claude-code`(Node 22+ 필요). Pro/Max/Team/Enterprise 플랜 또는 Console 계정 필요.

## 2. Codex(OpenAI) — 위임 실행 엔진

Codex는 Claude Code와 나란히 쓴 두 번째 엔진이다. 팀은 망상궤도 공용 계정으로 Codex Pro 20× 플랜을 결제해(2026-06-27 회의 결정, 상세 금액·계정 정보는 [[코덱스-유료결제]] 원칙에 따라 이 문서에 적지 않는다) 팀원 전원이 토큰을 공유했다.

실제 위임 패턴은 세 갈래였다. 첫째는 Claude Code 안에서 `codex` 플러그인의 `/codex:rescue`·`/codex:setup` 커맨드로 특정 작업을 통째로 넘기는 방식(볼트 태그·부모(up) 전면 정합화를 "Codex 검토 → Claude 판단 → Codex 수정" 순으로 돌린 사례, `decision-log.md` 2026-07-01)이고, 둘째는 문서량이 많은 작업을 아예 Codex 전담으로 배정하는 방식(CaseOps 확장 문서 6종·약 200KB를 Codex가 작성, `session-log.md` 2026-07-04 "CaseOps 확장 분기(Codex 6문서)"), 셋째는 제품 런타임 자체에 claude/codex CLI 라우팅을 붙여 두 엔진을 동급 추론 경로로 쓴 것이다(`api-proxy.mjs`의 `/llm` 라우트, "Ollama 아님 → claude/codex CLI 라우팅"으로 정정한 결정 `decision-log.md` 2026-07-04). 텔레메트리 백필(`codex-cli-telemetry.mjs`) 기준 대회 기간 Codex 스레드는 최종 140여 건까지 누적됐다.

- **다운로드**: [github.com/openai/codex](https://github.com/openai/codex) — 설치 스크립트 `curl -fsSL https://chatgpt.com/codex/install.sh | sh`, 또는 `npm install -g @openai/codex`, 또는 `brew install --cask codex`. 실행 후 ChatGPT 계정으로 로그인.
- **Claude Code 연동 플러그인**: [github.com/openai/codex-plugin-cc](https://github.com/openai/codex-plugin-cc) — `/plugin marketplace add openai/codex-plugin-cc` → `/plugin install codex@openai-codex` → `/codex:setup`으로 준비 상태 확인. 실제 위임은 `/codex:rescue`, 리뷰는 `/codex:review`.

## 3. 주로 쓴 스킬·플러그인

| 이름 | 용도 | 설치·다운로드 |
|---|---|---|
| `superpowers` | 브레인스토밍·스펙 우선·TDD·서브에이전트 구동 방법론 묶음 | [github.com/obra/superpowers](https://github.com/obra/superpowers) — `/plugin marketplace add anthropics/claude-plugins-official` → `/plugin install superpowers@claude-plugins-official` |
| `ponytail` | 최소 구현 규율("사다리" 원칙 — 이미 있으면 재사용, 없으면 최소 코드) | [github.com/DietrichGebert/ponytail](https://github.com/DietrichGebert/ponytail) — `/plugin marketplace add DietrichGebert/ponytail` → `/plugin install ponytail@ponytail` (개인 전역 사용, 팀 세트 미동기화) |
| `humanize-korean` (im-not-ai) | AI 문체 제거·자연스러운 한국어 윤문 | [github.com/epoko77-ai/im-not-ai](https://github.com/epoko77-ai/im-not-ai) — `/plugin marketplace add epoko77-ai/im-not-ai` → `/plugin install humanize-korean@im-not-ai` |
| `harness-engineering` | 본선 문서생성 21종 계약(PRD·DDBM·surface-map 등) — 팀 자체 제작 스킬팩 | 팀 레포 [github.com/River-181/harness-engineering-skills](https://github.com/River-181/harness-engineering-skills) — `/plugin marketplace add River-181/harness-engineering-skills` |
| `web-demo-video` | Playwright 녹화 + ffmpeg 인코딩으로 자막형 시연 영상 자동 제작 | 팀 자체 제작 — 로컬 설치(`~/.claude/skills/web-demo-video/`) · 공개 배포처 [확인 필요] |
| `deep-research` | 멀티소스 팬아웃 검색 + 적대적 팩트체크 리서치 하네스 | 로컬 설치(`~/.claude/skills/`) · 공개 배포처 [확인 필요] |
| `obsidian` (obsidian-skills) | 볼트 CLI·Markdown·Canvas·Bases 조작 | [github.com/kepano/obsidian-skills](https://github.com/kepano/obsidian-skills) — `/plugin marketplace add kepano/obsidian-skills` → `/plugin install obsidian@obsidian-skills` |
| `figma` | Figma 디자인 읽기·쓰기·Code Connect 연동 | Anthropic 공식 마켓플레이스 [github.com/anthropics/claude-plugins-official](https://github.com/anthropics/claude-plugins-official) — `/plugin install figma@claude-plugins-official` |
| `ui-ux-pro-max` / `frontend-design` | 디자인 스타일·색상·폰트 페어링 등 UI/UX 설계 지능, 프론트엔드 컴포넌트 생성 | ui-ux-pro-max: [github.com/nextlevelbuilder/ui-ux-pro-max-skill](https://github.com/nextlevelbuilder/ui-ux-pro-max-skill) — `/plugin marketplace add nextlevelbuilder/ui-ux-pro-max-skill`. frontend-design: `claude-plugins-official` 내장 |
| `dataviz` | 차트·대시보드 색상/레이아웃 일관성 가이드 | Claude Code 표준 스킬(추가 마켓플레이스 등록 불필요) · 공개 배포처 [확인 필요] |

> 팀 baseline 세트(clone 시 자동 적용)는 `.claude/settings.json`에 SSOT로 고정돼 있고, `plugin-sync` 스킬(`node 08_본선/_system/skills/plugin-sync/sync.mjs --dry-run`)이 실제 설치 명령을 그때그때 다시 뽑아준다 — 위 표가 표류하면 이 명령의 출력이 정답이다.

## 4. MCP 서버

| 이름 | 용도 | 설치 |
|---|---|---|
| `perplexity` (perplexity-web-mcp) | 웹 검색 + GPT-5.4/Claude/Gemini 등 프리미엄 모델 쿼리 | [github.com/jacob-bd/perplexity-web-mcp](https://github.com/jacob-bd/perplexity-web-mcp) — `claude mcp add perplexity`, Perplexity 계정 인증 필요 |
| `context7` | 라이브러리·프레임워크 최신 문서를 프롬프트에 직접 주입 | [github.com/upstash/context7](https://github.com/upstash/context7) — `claude mcp add --scope user context7 -- npx -y @upstash/context7-mcp --api-key <API_KEY>`(API 키는 context7.com/dashboard, 없어도 기본 사용 가능) |
| `claude-in-chrome` | 브라우저 자동화·스크린샷·콘솔/네트워크 로그 읽기 | Anthropic 공식 Chrome 확장 — [Chrome 웹스토어](https://chromewebstore.google.com/detail/claude/fcoeoabgfenejglbffodgkkbkcdhcgfn), 설치 후 Claude Code에서 `claude mcp add claude-in-chrome` |
| Notion / Figma / Google Drive | 문서·디자인·파일 CRUD 연동 | Claude.ai 설정의 Connectors에서 계정 OAuth로 연결 — 별도 바이너리 설치 없이 `claude mcp add claude.ai/Notion` 등으로 세션에 등록 |

## 5. feynman 리서치 CLI

논문·인용 단위로 깊게 파야 하는 리서치는 WebSearch 서브에이전트보다 feynman을 우선 썼다. Pi 런타임 위에 얹힌 research-first 에이전트 셸로, `deepresearch`(출처 많은 브리프)·`lit`(문헌 리뷰)·`compare`(출처 대조)·`summarize`(원문 요약) 같은 커맨드를 제공하고 모든 주장에 출처 링크가 붙는다. 로그인은 `feynman model login <provider>`로 하며, 대회 기간에는 openai-codex/gpt-5.5 엔진에 연결해 썼다.

- **다운로드**: [github.com/companion-inc/feynman](https://github.com/companion-inc/feynman) · 공식 사이트 [feynman.is](https://www.feynman.is/) — 스탠드얼론 설치 스크립트, 또는 Claude Code/Codex/OpenCode에만 리서치 스킬 라이브러리를 붙이는 skills-only 설치도 별도로 제공.

## 연결

[[08_본선/06_회고와포트폴리오/02_종합/협업-방법론|협업 방법론]] · `08_본선/_system/tools/registry-skills.md` · `08_본선/_system/tools/registry-plugins.md` · `08_본선/_system/tools/registry-mcp.md` · `08_본선/_system/tools/registry-cli.md`
