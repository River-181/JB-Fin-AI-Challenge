# _MOC

Map of Contents입니다. GitHub 워크스페이스의 전체 탐색 시작점으로 사용합니다.

## 이 폴더의 역할

이 폴더는 저장소 전체 목차입니다. 심사자, 개발자, 발표 준비자가 각각 어느 문서를 먼저 봐야 하는지 빠르게 안내합니다.

## 워크스페이스 지도

| 폴더 | 내용 |
| --- | --- |
| [02_전략](../02_전략/README.md) | 자유주제 전략, JB 사업 적합성, 평가 대응 |
| [03_제품](../03_제품/README.md) | 제품 정의, 화면 구성, MVP 기능 |
| [04_증빙](../04_증빙/README.md) | 공식자료, 기사, 정책, 출처 추적 |
| [05_제출](../05_제출/README.md) | 제출 패키지, 체크리스트, 데모 검증 |
| [06_LLM위키](../06_LLM위키/README.md) | Agent 운영 패턴, 프롬프트, 다음 작업 지시문 |
| [07_아키텍처](../07_아키텍처/README.md) | Mermaid 기반 시스템/데이터/API/사용자 흐름 |
| [_체계](../_체계/README.md) | Case/AgentRun/Approval/Audit 운영 규칙 |
| [app](../app/README.md) | 실행 가능한 정적 MVP |
| [docs](../docs/README.md) | PRD, 기능명세, Agent, 제출, 증빙 상세 문서 |
| [scripts](../scripts/README.md) | 검증 스크립트 |
| [자산](../자산/README.md) | 앱, 스크립트, 원천 자료 인덱스 |
| [산출](../산출/README.md) | 최종 산출물과 작업 로그 |

## 심사자 5분 경로

1. [05_제출](../05_제출/README.md)
2. [MVP 제안서 초안](../docs/04_submission/mvp-proposal-draft.md)
3. [평가항목 대응표](../docs/04_submission/evaluation-fit.md)
4. [앱 실행](../app/index.html)
5. [아키텍처](../07_아키텍처/README.md)

## 개발자 경로

1. [app README](../app/README.md)
2. [기능 명세](../docs/02_product/function-spec.md)
3. [Agent 시스템](../docs/03_agents/agent-system.md)
4. [운영 체계](../_체계/README.md)
5. [검증 스크립트](../scripts/verify_static.py)

## 빠른 실행

```bash
cd ../app
python3 -m http.server 8000
```

브라우저에서 `http://127.0.0.1:8000/index.html`을 엽니다.

## 빠른 검증

```bash
cd ..
python3 scripts/verify_static.py
```
