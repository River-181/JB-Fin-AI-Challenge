const navigation = [
  {
    section: "Command",
    items: [
      { id: "dashboard", icon: "⌂", label: "대시보드", countKey: "dashboard" },
      { id: "inbox", icon: "!", label: "알림함", countKey: "inbox" },
    ],
  },
  {
    section: "Work",
    items: [
      { id: "cases", icon: "C", label: "케이스 목록", countKey: "cases" },
      { id: "approvals", icon: "A", label: "승인 큐", countKey: "approvals" },
      { id: "runs", icon: "R", label: "AgentRun", countKey: "runs" },
      { id: "goals", icon: "G", label: "운영 목표", countKey: "goals" },
    ],
  },
  {
    section: "Institution",
    items: [
      { id: "agents", icon: "T", label: "에이전트 팀", countKey: "agents" },
      { id: "skills", icon: "K", label: "Skill Registry", countKey: "skills" },
      { id: "routines", icon: "H", label: "Heartbeat", countKey: "routines" },
      { id: "activity", icon: "L", label: "처리 이력", countKey: "activity" },
      { id: "budget", icon: "₩", label: "API 예산", countKey: "budget" },
      { id: "settings", icon: "S", label: "설정", countKey: "settings" },
    ],
  },
];

const evidence = [
  {
    id: "jb-ai-mou",
    type: "JB Official",
    title: "JB금융그룹-네이버클라우드 AI 업무협약",
    source: "JB금융그룹",
    url: "https://www.jbfg.com/ko/prcenter/press/detail/17.do",
    implication:
      "기업대출 상담, 심사, 사후관리에서 상담 기록과 문서 데이터를 구조화하고 승인 판단 근거를 생성하는 방향과 연결된다.",
  },
  {
    id: "jb-network",
    type: "JB Official",
    title: "JB금융그룹 계열사와 지역 금융 접점",
    source: "JB금융그룹",
    url: "https://www.jbfg.com/ko/about/network.do",
    implication:
      "전북은행, 광주은행, JB우리캐피탈을 중심으로 지역 고객과 금융 사후관리 접점이 있다.",
  },
  {
    id: "smallbiz-burden",
    type: "News",
    title: "소상공인 금융비용 부담과 연체율 상승",
    source: "쿠키뉴스",
    url: "https://www.kukinews.com/article/view/kuk202602170018",
    implication:
      "금융비용과 내수 침체가 동시에 부담으로 나타나 cashflow triage가 필요하다.",
  },
  {
    id: "rate-shock",
    type: "News",
    title: "자영업자 대출 잔액과 금리 민감도",
    source: "연합뉴스",
    url: "https://www.yna.co.kr/view/AKR20260328043600002",
    implication:
      "금리 상승과 다중채무 부담이 지역 사업자 상환 위험으로 전이될 수 있다.",
  },
  {
    id: "fraud-ai",
    type: "Policy",
    title: "보이스피싱 AI 플랫폼과 고도화된 사기 위험",
    source: "금융위원회",
    url: "https://www.fsc.go.kr/no010101/86063",
    implication:
      "딥페이크와 음성변조 등 AI 악용 사기에 대해 Fraud Shield Agent가 외부 경보를 연결해야 한다.",
  },
  {
    id: "digital-gap",
    type: "News",
    title: "고령층 디지털 금융 역량 격차",
    source: "브라보마이라이프",
    url: "https://bravo.etoday.co.kr/view/atc_view/19103",
    implication:
      "고객 직접 자동화보다 RM 승인형 안내와 쉬운 콜백 스크립트가 적합하다.",
  },
];

const skillRack = [
  ["case-os-core", "orchestration", "Case 생성, 상태 전이, 담당 Agent 배정", "internal only", "low"],
  ["evidence-harvest", "research", "기사, 공식 발표, 상담 노트에서 위험 근거 수집", "internal only", "low"],
  ["source-ranker", "research", "공식성, 최신성, 금융 관련성을 점수화", "internal only", "low"],
  ["pain-classifier", "reasoning", "cashflow, rate, fraud, policy, digital-barrier 분류", "internal only", "low"],
  ["cashflow-stress", "finance", "매출 둔화, 금리 부담, 상환 압박 판단", "RM review", "medium"],
  ["rate-relief", "finance", "금리 충격과 대환 검토 필요성 판단", "RM review", "medium"],
  ["policy-match", "finance", "정책금융, 대환, 필요 서류 후보 매칭", "RM review", "medium"],
  ["document-checklist", "operations", "상담 전 필요한 서류와 확인 질문 생성", "RM review", "low"],
  ["fraud-shield", "risk", "보이스피싱, 딥페이크, 이상 콜백 위험 차단", "blocks external action", "high"],
  ["do-not-contact-rule", "risk", "고위험 fraud case의 외부 고객 접촉 금지", "mandatory", "high"],
  ["notification-brief", "communication", "RM 메모와 고객 콜백 스크립트 작성", "approval required", "medium"],
  ["compliance-guard", "compliance", "과장 표현, 개인정보, 준법 리스크 검토", "mandatory", "high"],
  ["approval-gate", "control", "외부 행동 전 사람 승인 요구", "mandatory", "high"],
  ["audit-ledger", "control", "근거, 판단, 행동, 승인 내역 기록", "mandatory", "low"],
  ["portfolio-signal", "analytics", "지점/계열사별 위험 클러스터 집계", "internal only", "low"],
].map(([slug, type, purpose, approval, risk]) => ({
  slug,
  type,
  purpose,
  approval,
  risk,
  enabled: true,
}));

const agents = [
  {
    id: "orchestrator",
    name: "LocalGuard Orchestrator",
    type: "orchestrator",
    status: "running",
    reportsTo: "Human RM Lead",
    budget: 180000,
    spent: 42000,
    heartbeat: "38s",
    queue: 4,
    currentCase: "전주 중앙로 카페",
    skills: ["case-os-core", "approval-gate", "audit-ledger"],
    role: "지시 해석, Agent 배정, 승인 레벨 산정",
  },
  {
    id: "pain-radar",
    name: "Pain Radar Agent",
    type: "research",
    status: "running",
    reportsTo: "LocalGuard Orchestrator",
    budget: 90000,
    spent: 31000,
    heartbeat: "1m",
    queue: 6,
    currentCase: "portfolio scan",
    skills: ["evidence-harvest", "source-ranker", "pain-classifier"],
    role: "기사, 공식자료, 상담 메모에서 pain signal 탐지",
  },
  {
    id: "cashflow",
    name: "Cashflow Triage Agent",
    type: "finance",
    status: "pending_approval",
    reportsTo: "LocalGuard Orchestrator",
    budget: 120000,
    spent: 58000,
    heartbeat: "2m",
    queue: 3,
    currentCase: "전주 중앙로 카페",
    skills: ["cashflow-stress", "rate-relief"],
    role: "상환 스트레스, 금리 민감도, 조기 연체 위험 판단",
  },
  {
    id: "policy",
    name: "Policy Match Agent",
    type: "finance",
    status: "idle",
    reportsTo: "LocalGuard Orchestrator",
    budget: 85000,
    spent: 18000,
    heartbeat: "5m",
    queue: 2,
    currentCase: "광주 송정 도소매",
    skills: ["policy-match", "document-checklist"],
    role: "정책금융 후보와 제출 서류 체크리스트 생성",
  },
  {
    id: "fraud",
    name: "Fraud Shield Agent",
    type: "risk",
    status: "running",
    reportsTo: "Compliance Guard",
    budget: 110000,
    spent: 64000,
    heartbeat: "42s",
    queue: 1,
    currentCase: "군산 부품 제조업",
    skills: ["fraud-shield", "do-not-contact-rule"],
    role: "고위험 사기 징후 탐지, 외부 행동 차단",
  },
  {
    id: "rm-copilot",
    name: "RM Copilot Agent",
    type: "communication",
    status: "idle",
    reportsTo: "Human RM Lead",
    budget: 95000,
    spent: 26000,
    heartbeat: "4m",
    queue: 5,
    currentCase: "callback drafts",
    skills: ["notification-brief", "tone-control"],
    role: "RM 메모, 통화 스크립트, 후속 태스크 초안 생성",
  },
  {
    id: "compliance",
    name: "Compliance Guard Agent",
    type: "compliance",
    status: "running",
    reportsTo: "Human Compliance Lead",
    budget: 140000,
    spent: 52000,
    heartbeat: "1m",
    queue: 2,
    currentCase: "approval queue",
    skills: ["compliance-guard", "privacy-redaction", "claim-limiter"],
    role: "금지 표현, 개인정보, 확정 혜택 표현 검토",
  },
  {
    id: "analytics",
    name: "Analytics Agent",
    type: "analytics",
    status: "idle",
    reportsTo: "LocalGuard Orchestrator",
    budget: 70000,
    spent: 16000,
    heartbeat: "8m",
    queue: 0,
    currentCase: "portfolio dashboard",
    skills: ["portfolio-signal", "trend-summary", "case-metrics"],
    role: "지점별 case cluster, queue health, 예산 흐름 집계",
  },
];

const initialCases = [
  {
    id: "jeonju-cafe",
    code: "JBG-104",
    customerName: "전주 중앙로 카페",
    affiliate: "전북은행",
    segment: "개인사업자",
    region: "전북 전주",
    industry: "카페",
    riskScore: 88,
    status: "Approval Pending",
    priority: "urgent",
    zeroHuman: "L2 초안 + 편집 후 발송",
    sla: "2h",
    owner: "Cashflow Triage Agent",
    stage: "pending_approval",
    due: "오늘 16:00",
    exposure: "운전자금 1.8억 · 카드매출 둔화",
    primaryPain: "금리 부담 + 매출 둔화",
    nextAction: "RM 콜백 초안과 상환 스트레스 점검",
    approvalTitle: "상환 스트레스 확인 콜백 + 정책금융 검토 안내",
    pains: ["cashflow-stress", "rate-shock", "policy-match"],
    rootCauses: ["금융비용 부담", "내수 침체", "디지털 신청 장벽"],
    evidenceIds: ["jb-ai-mou", "smallbiz-burden", "rate-shock", "digital-gap"],
    gates: [
      ["금융조건 확정 표현 금지", "passed"],
      ["개인정보 마스킹", "passed"],
      ["RM 승인 후 고객 콜백", "pending"],
    ],
    agents: ["pain-radar", "cashflow", "policy", "rm-copilot", "compliance"],
    transcript: [
      "Pain Radar: 소상공인 금융비용 부담과 상담 메모가 같은 방향입니다.",
      "Cashflow: 상환 스트레스 점검 우선순위 High입니다.",
      "Compliance: 혜택 확정 표현을 검토 가능성 중심으로 낮췄습니다.",
    ],
    audit: [
      ["09:14", "Case opened from RM note and small-business risk feed."],
      ["09:18", "Evidence Harvest attached 4 sources."],
      ["09:22", "Approval request created for RM callback draft."],
    ],
  },
  {
    id: "gwangju-wholesale",
    code: "JBG-118",
    customerName: "광주 송정 도소매",
    affiliate: "광주은행",
    segment: "개인사업자",
    region: "광주 광산구",
    industry: "도소매",
    riskScore: 72,
    status: "New",
    priority: "high",
    zeroHuman: "L1 초안 + 원클릭 승인",
    sla: "1d",
    owner: "Policy Match Agent",
    stage: "todo",
    due: "내일 10:00",
    exposure: "대환 상담 후보 · 서류 미비",
    primaryPain: "정책금융 탐색 비용",
    nextAction: "대환 가능성 검토와 서류 체크리스트",
    approvalTitle: "정책금융 상담 전 필요 서류 안내",
    pains: ["policy-match", "documentation", "digital-barrier"],
    rootCauses: ["지원제도 탐색 비용", "서류 누락", "디지털 신청 장벽"],
    evidenceIds: ["jb-network", "jb-ai-mou", "smallbiz-burden", "digital-gap"],
    gates: [
      ["지원 가능성 확정 표현 금지", "pending"],
      ["필요 서류 안내만 허용", "passed"],
      ["RM 승인 후 안내", "pending"],
    ],
    agents: ["pain-radar", "policy", "rm-copilot"],
    transcript: [
      "Policy Match: 사업자등록, 매출 증빙, 기존 대출 조건 확인이 필요합니다.",
      "RM Copilot: 고객 안내 문구를 확정형이 아닌 검토형으로 작성했습니다.",
    ],
    audit: [["10:02", "Policy match case created from branch request."]],
  },
  {
    id: "gunsan-manufacturing",
    code: "JBG-127",
    customerName: "군산 부품 제조업",
    affiliate: "JB우리캐피탈",
    segment: "법인사업자",
    region: "전북 군산",
    industry: "제조",
    riskScore: 94,
    status: "Escalated",
    priority: "critical",
    zeroHuman: "L4 정보 제공만",
    sla: "30m",
    owner: "Fraud Shield Agent",
    stage: "blocked",
    due: "즉시",
    exposure: "리스 계약 · 의심 콜백 URL",
    primaryPain: "보이스피싱 의심 콜백",
    nextAction: "외부 행동 차단과 보안 escalation",
    approvalTitle: "보안팀 escalation memo",
    pains: ["fraud", "callback-risk", "do-not-contact"],
    rootCauses: ["긴급 송금 요청", "외부 URL", "음성변조 의심"],
    evidenceIds: ["jb-network", "fraud-ai", "jb-ai-mou"],
    gates: [
      ["고객-facing 자동 발송 금지", "blocked"],
      ["보안팀 내부 escalation만 허용", "passed"],
      ["개인정보 마스킹", "passed"],
    ],
    agents: ["fraud", "compliance", "orchestrator"],
    transcript: [
      "Fraud Shield: 긴급 송금 요청과 콜백 URL이 결합되어 고위험입니다.",
      "Orchestrator: 외부 고객 접촉은 차단하고 내부 escalation만 허용합니다.",
    ],
    audit: [
      ["11:20", "Suspicious callback report converted to high-risk fraud case."],
      ["11:23", "Fraud Shield blocked customer-facing action."],
    ],
  },
  {
    id: "iksan-restaurant",
    code: "JBG-133",
    customerName: "익산 음식점",
    affiliate: "전북은행",
    segment: "개인사업자",
    region: "전북 익산",
    industry: "음식점",
    riskScore: 67,
    status: "Agent Running",
    priority: "medium",
    zeroHuman: "L1 초안 + 원클릭 승인",
    sla: "1d",
    owner: "Pain Radar Agent",
    stage: "in_progress",
    due: "내일 15:00",
    exposure: "매출 계절성 · 카드매출 변동",
    primaryPain: "매출 변동성",
    nextAction: "위험 원인 분류 후 RM briefing",
    approvalTitle: "RM briefing note",
    pains: ["cashflow-stress", "seasonality"],
    rootCauses: ["매출 계절성", "원재료비 변동"],
    evidenceIds: ["smallbiz-burden", "jb-network"],
    gates: [
      ["내부 브리핑만 허용", "passed"],
      ["고객 안내 전 RM 승인", "pending"],
    ],
    agents: ["pain-radar", "cashflow", "analytics"],
    transcript: [
      "Pain Radar: 매출 변동과 원재료비 이슈를 분리해 확인 중입니다.",
    ],
    audit: [["13:08", "Case assigned to Pain Radar Agent."]],
  },
];

const routines = [
  ["평일 08:30", "지역 소상공인 pain radar scan", "Pain Radar Agent", "enabled"],
  ["매일 10:00", "승인 대기 case SLA 점검", "LocalGuard Orchestrator", "enabled"],
  ["매일 14:00", "보이스피싱 경보 동기화", "Fraud Shield Agent", "enabled"],
  ["금요일 17:00", "지점별 case cluster 리포트", "Analytics Agent", "paused"],
];

const goals = [
  ["Triage time", "RM이 원인과 다음 행동을 파악하는 시간을 50% 단축", 64],
  ["Evidence traceability", "Agent 판단 100%에 근거 링크 또는 내부 이벤트 연결", 91],
  ["Approval safety", "고객-facing 행동 100% 승인 게이트 통과", 100],
  ["Fraud block", "고위험 사기 case 외부 발송 차단", 100],
];

let cases = JSON.parse(JSON.stringify(initialCases));
let selectedCaseId = "jeonju-cafe";
let activeView = "dashboard";
let activity = [
  ["13:12", "Cashflow Triage Agent", "created approval", "JBG-104"],
  ["13:08", "Pain Radar Agent", "checked out", "JBG-133"],
  ["11:23", "Fraud Shield Agent", "blocked outbound action", "JBG-127"],
  ["10:02", "Policy Match Agent", "created document checklist", "JBG-118"],
];

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function currentCase() {
  return cases.find((item) => item.id === selectedCaseId) || cases[0];
}

function statusClass(status) {
  if (status === "Agent Running") return "status-running";
  if (status === "Approval Pending") return "status-pending";
  if (status === "Approved") return "status-approved";
  if (status === "Escalated") return "status-escalated";
  if (status === "Rejected") return "status-rejected";
  return "status-new";
}

function statusToColumn(status) {
  if (status === "Approved") return "done";
  if (status === "Approval Pending") return "approval";
  if (status === "Agent Running") return "running";
  if (status === "Escalated" || status === "Rejected") return "blocked";
  return "todo";
}

function counts() {
  return {
    dashboard: cases.length,
    inbox: cases.filter((item) => item.status === "Escalated").length,
    cases: cases.length,
    approvals: cases.filter((item) => item.status === "Approval Pending").length,
    runs: cases.filter((item) => item.status === "Agent Running").length,
    agents: agents.length,
    skills: skillRack.length,
    routines: routines.filter((item) => item[3] === "enabled").length,
    goals: goals.length,
    activity: activity.length,
    budget: agents.reduce((sum, agent) => sum + agent.spent, 0),
    settings: 3,
  };
}

function renderNavigation() {
  const currentCounts = counts();
  document.getElementById("nav-list").innerHTML = navigation
    .map(
      (group) => `
        <div class="nav-section">
          <div class="nav-section-title">${escapeHtml(group.section)}</div>
          ${group.items
            .map(
              (item) => `
                <button class="nav-button ${activeView === item.id ? "is-active" : ""}" type="button" data-view="${escapeHtml(item.id)}">
                  <span class="nav-button-main">
                    <span class="nav-icon">${escapeHtml(item.icon)}</span>
                    <span class="nav-label">${escapeHtml(item.label)}</span>
                  </span>
                  <span class="nav-count">${escapeHtml(currentCounts[item.countKey])}</span>
                </button>
              `,
            )
            .join("")}
        </div>
      `,
    )
    .join("");

  document.querySelectorAll("[data-view]").forEach((button) => {
    button.addEventListener("click", () => {
      activeView = button.dataset.view;
      render();
    });
  });
}

function renderMetrics() {
  const highRisk = cases.filter((item) => item.riskScore >= 85).length;
  const pending = cases.filter((item) => item.status === "Approval Pending").length;
  const running = cases.filter((item) => item.status === "Agent Running").length;
  const spend = agents.reduce((sum, agent) => sum + agent.spent, 0);
  const total = agents.reduce((sum, agent) => sum + agent.budget, 0);
  const cards = [
    ["High Risk", highRisk, "Fraud, rate shock, delinquency watch"],
    ["Approval Queue", pending, "RM 또는 준법 승인 대기"],
    ["Live AgentRun", running, "현재 실행 중인 Agent 작업"],
    ["API Budget", `${Math.round((spend / total) * 100)}%`, `₩${spend.toLocaleString()} / ₩${total.toLocaleString()}`],
  ];
  document.getElementById("metric-grid").innerHTML = cards
    .map(
      ([label, value, detail]) => `
        <article class="metric-card">
          <span>${escapeHtml(label)}</span>
          <strong>${escapeHtml(value)}</strong>
          <p>${escapeHtml(detail)}</p>
        </article>
      `,
    )
    .join("");
}

function renderBoard() {
  const columns = [
    ["todo", "TODO"],
    ["running", "IN PROGRESS"],
    ["approval", "APPROVAL"],
    ["done", "DONE"],
    ["blocked", "BLOCKED"],
  ];

  document.getElementById("case-board").innerHTML = columns
    .map(([key, label]) => {
      const items = cases.filter((item) => statusToColumn(item.status) === key);
      return `
        <section class="board-column">
          <h4><span>${label}</span><span>${items.length}</span></h4>
          ${
            items.length
              ? items.map(renderCaseCard).join("")
              : '<div class="empty-state">대기 case 없음</div>'
          }
        </section>
      `;
    })
    .join("");

  document.querySelectorAll("[data-case-id]").forEach((button) => {
    button.addEventListener("click", () => {
      selectedCaseId = button.dataset.caseId;
      render();
    });
  });
}

function renderCaseCard(item) {
  return `
    <button class="case-card ${item.id === selectedCaseId ? "is-active" : ""}" type="button" data-case-id="${escapeHtml(item.id)}">
      <span class="mini-line">
        <span>${escapeHtml(item.code)}</span>
        <span>${escapeHtml(item.affiliate)}</span>
        <span>SLA ${escapeHtml(item.sla)}</span>
      </span>
      <strong>${escapeHtml(item.customerName)}</strong>
      <span class="case-meta">
        <span>${escapeHtml(item.region)}</span>
        <span>${escapeHtml(item.segment)}</span>
      </span>
      <span class="status-pill ${statusClass(item.status)}">${escapeHtml(item.status)}</span>
      <div class="risk-bar"><i style="width:${item.riskScore}%"></i></div>
      <div class="tag-row">${item.pains.map((pain) => `<span class="tag">${escapeHtml(pain)}</span>`).join("")}</div>
    </button>
  `;
}

function renderLiveRuns() {
  const live = cases.filter((item) => item.status === "Agent Running" || item.status === "Approval Pending");
  document.getElementById("live-count").textContent = live.length;
  document.getElementById("live-runs").innerHTML = live
    .map((item) => {
      const progress = item.status === "Approval Pending" ? 86 : 52;
      return `
        <article class="run-card">
          <div class="run-head">
            <strong><span class="pulse"></span>${escapeHtml(item.owner)}</strong>
            <span class="status-pill ${statusClass(item.status)}">${escapeHtml(item.status)}</span>
          </div>
          <p>${escapeHtml(item.code)} · ${escapeHtml(item.customerName)}</p>
          <div class="progress-track"><i style="width:${progress}%"></i></div>
          <p>${escapeHtml(item.transcript[item.transcript.length - 1] || "Waiting for run output...")}</p>
        </article>
      `;
    })
    .join("") || '<div class="empty-state">실행 중인 AgentRun 없음</div>';
}

function renderWorkbench() {
  const views = [
    ["dashboard", "Dashboard"],
    ["inbox", "Inbox"],
    ["cases", "Cases"],
    ["approvals", "Approvals"],
    ["runs", "Runs"],
    ["agents", "Agents"],
    ["skills", "Skills"],
    ["routines", "Routines"],
    ["goals", "Goals"],
    ["activity", "Activity"],
    ["budget", "Budget"],
    ["settings", "Settings"],
  ];
  document.getElementById("view-tabs").innerHTML = views
    .map(
      ([id, label]) => `<button class="${activeView === id ? "is-active" : ""}" type="button" data-view="${id}">${label}</button>`,
    )
    .join("");

  let body = "";
  if (activeView === "dashboard") body = dashboardView();
  if (activeView === "inbox") body = inboxView();
  if (activeView === "cases") body = casesView();
  if (activeView === "approvals") body = approvalsView();
  if (activeView === "runs") body = runsView();
  if (activeView === "agents") body = agentsView();
  if (activeView === "skills") body = skillsView();
  if (activeView === "routines") body = routinesView();
  if (activeView === "goals") body = goalsView();
  if (activeView === "activity") body = activityView();
  if (activeView === "budget") body = budgetView();
  if (activeView === "settings") body = settingsView();

  document.getElementById("view-body").innerHTML = body;
  document.querySelectorAll("[data-view]").forEach((button) => {
    button.addEventListener("click", () => {
      activeView = button.dataset.view;
      render();
    });
  });
}

function dashboardView() {
  return `
    <div class="work-grid">
      ${workItem("지시 입력 바", "자연어 지시를 Orchestrator가 Case와 AgentRun으로 변환한다.", "대시보드 상단 고정")}
      ${workItem("라이브 에이전트 패널", "실행 중인 Agent, 연결 case, transcript preview를 보여준다.", "실시간 상태")}
      ${workItem("4개 지표 카드", "High Risk, Approval, Live Run, API Budget을 요약한다.", "운영 현황")}
      ${workItem("최근 활동", "Agent checked out, approval created, status changed를 감사 로그처럼 표시한다.", "Activity")}
      ${workItem("최근 케이스", "지역 금융 위험 case를 TODO/RUNNING/APPROVAL/BLOCKED로 구분한다.", "Kanban")}
      ${workItem("오늘 후속조치", "SLA 만료 전 담당 RM 승인 또는 escalation을 유도한다.", "Follow-up")}
    </div>
  `;
}

function inboxView() {
  return `
    <div class="work-grid">
      ${cases
        .filter((item) => item.status === "Escalated" || item.status === "Approval Pending")
        .map((item) => workItem(`${item.code} · ${item.customerName}`, item.nextAction, item.status))
        .join("")}
    </div>
  `;
}

function casesView() {
  return `
    <div class="two-col">
      ${cases.map((item) => workItem(`${item.code} · ${item.customerName}`, `${item.primaryPain} · ${item.exposure}`, `${item.status} · ${item.zeroHuman}`)).join("")}
    </div>
  `;
}

function approvalsView() {
  const approvals = cases.filter((item) => item.status === "Approval Pending");
  return approvals.length
    ? `<div class="two-col">${approvals.map((item) => workItem(item.approvalTitle, `${item.code} · ${item.customerName} · ${item.nextAction}`, item.zeroHuman)).join("")}</div>`
    : '<div class="empty-state">승인 대기 항목 없음</div>';
}

function runsView() {
  return `
    <div class="two-col">
      ${cases
        .map((item) => workItem(`${item.owner} on ${item.code}`, item.transcript.join(" / "), `${item.status} · ${item.sla}`))
        .join("")}
    </div>
  `;
}

function agentsView() {
  return `
    <div class="agent-grid">
      ${agents
        .map(
          (agent) => `
            <article class="agent-card">
              <div class="item-head">
                <strong>${escapeHtml(agent.name)}</strong>
                <span class="status-pill ${agent.status === "running" ? "status-running" : agent.status === "pending_approval" ? "status-pending" : "status-new"}">${escapeHtml(agent.status)}</span>
              </div>
              <p>${escapeHtml(agent.role)}</p>
              <div class="tag-row">${agent.skills.map((skill) => `<span class="tag">${escapeHtml(skill)}</span>`).join("")}</div>
              <p>reportsTo: ${escapeHtml(agent.reportsTo)} · heartbeat ${escapeHtml(agent.heartbeat)} · queue ${agent.queue}</p>
            </article>
          `,
        )
        .join("")}
    </div>
  `;
}

function skillsView() {
  return `
    <div class="skill-grid">
      ${skillRack
        .map(
          (skill) => `
            <article class="skill-card">
              <div class="item-head">
                <strong>${escapeHtml(skill.slug)}</strong>
                <span class="source-badge">${escapeHtml(skill.type)}</span>
              </div>
              <p>${escapeHtml(skill.purpose)}</p>
              <span class="risk-chip ${skill.risk === "high" ? "status-escalated" : skill.risk === "medium" ? "status-pending" : "status-approved"}">${escapeHtml(skill.risk)} · ${escapeHtml(skill.approval)}</span>
            </article>
          `,
        )
        .join("")}
    </div>
  `;
}

function routinesView() {
  return `<div class="work-grid">${routines.map((item) => workItem(item[1], `${item[0]} · ${item[2]}`, item[3])).join("")}</div>`;
}

function goalsView() {
  return `
    <div class="work-grid">
      ${goals
        .map(
          (goal) => `
            <article class="work-item">
              <div class="item-head"><strong>${escapeHtml(goal[0])}</strong><span>${goal[2]}%</span></div>
              <p>${escapeHtml(goal[1])}</p>
              <div class="progress-track"><i style="width:${goal[2]}%"></i></div>
            </article>
          `,
        )
        .join("")}
    </div>
  `;
}

function activityView() {
  return `
    <div class="two-col">
      ${activity
        .map(
          ([time, agent, action, code]) => `
            <article class="activity-item">
              <span class="audit-time">${escapeHtml(time)}</span>
              <strong>${escapeHtml(agent)} ${escapeHtml(action)}</strong>
              <p>on ${escapeHtml(code)}</p>
            </article>
          `,
        )
        .join("")}
    </div>
  `;
}

function budgetView() {
  return `
    <div class="budget-grid">
      ${agents
        .map((agent) => {
          const percent = Math.round((agent.spent / agent.budget) * 100);
          return `
            <div class="budget-row">
              <strong>${escapeHtml(agent.name)}</strong>
              <div class="progress-track"><i style="width:${percent}%"></i></div>
              <span>${percent}%</span>
            </div>
          `;
        })
        .join("")}
    </div>
  `;
}

function settingsView() {
  return `
    <div class="work-grid">
      ${workItem("Organization profile", "전북은행 · 광주은행 · JB우리캐피탈 mock tenant를 전환한다.", "local_trusted")}
      ${workItem("Approval policy", "L0-L4 zero-human 레벨과 금지 자동 실행 항목을 관리한다.", "mandatory")}
      ${workItem("External integrations", "뉴스/공식자료/RM 상담 기록/보안 경보 adapter를 연결한다.", "mocked")}
    </div>
  `;
}

function workItem(title, description, meta) {
  return `
    <article class="work-item">
      <div class="item-head">
        <strong>${escapeHtml(title)}</strong>
        <span class="source-badge">${escapeHtml(meta)}</span>
      </div>
      <p>${escapeHtml(description)}</p>
    </article>
  `;
}

function renderProperties() {
  const item = currentCase();
  document.getElementById("property-title").textContent = item.customerName;
  const status = document.getElementById("property-status");
  status.textContent = item.status;
  status.className = `status-pill ${statusClass(item.status)}`;
  document.getElementById("case-properties").innerHTML = `
    <div class="property-list">
      ${propertyRow("Code", item.code)}
      ${propertyRow("Affiliate", item.affiliate)}
      ${propertyRow("Region", `${item.region} · ${item.industry}`)}
      ${propertyRow("Risk", `${item.riskScore}/100 · ${item.priority}`)}
      ${propertyRow("Zero-human", item.zeroHuman)}
      ${propertyRow("Owner", item.owner)}
      ${propertyRow("Exposure", item.exposure)}
      ${propertyRow("Due", item.due)}
    </div>
    <div class="tag-row">${item.rootCauses.map((cause) => `<span class="tag">${escapeHtml(cause)}</span>`).join("")}</div>
  `;

  document.getElementById("approval-gates").innerHTML = item.gates
    .map(
      ([label, gateStatus]) => `
        <article class="gate-row">
          <div class="item-head">
            <strong>${escapeHtml(label)}</strong>
            <span class="status-pill ${gateStatus === "passed" ? "status-approved" : gateStatus === "blocked" ? "status-escalated" : "status-pending"}">${escapeHtml(gateStatus)}</span>
          </div>
        </article>
      `,
    )
    .join("");

  document.getElementById("approve-action").disabled = item.status !== "Approval Pending";
  document.getElementById("reject-action").disabled = item.status !== "Approval Pending";
}

function propertyRow(label, value) {
  return `<div class="property-row"><span>${escapeHtml(label)}</span><strong>${escapeHtml(value)}</strong></div>`;
}

function renderEvidence() {
  const item = currentCase();
  document.getElementById("evidence-feed").innerHTML = evidence
    .filter((entry) => item.evidenceIds.includes(entry.id))
    .map(
      (entry) => `
        <article class="evidence-card">
          <span class="source-badge">${escapeHtml(entry.type)} · ${escapeHtml(entry.source)}</span>
          <a href="${escapeHtml(entry.url)}" target="_blank" rel="noreferrer">${escapeHtml(entry.title)}</a>
          <p>${escapeHtml(entry.implication)}</p>
        </article>
      `,
    )
    .join("");
}

function renderAudit() {
  const item = currentCase();
  document.getElementById("audit-log").innerHTML = item.audit
    .slice()
    .reverse()
    .map(
      ([time, text]) => `
        <article class="audit-item">
          <span class="audit-time">${escapeHtml(time)}</span>
          <p>${escapeHtml(text)}</p>
        </article>
      `,
    )
    .join("");
}

function timestamp() {
  return new Intl.DateTimeFormat("ko-KR", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).format(new Date());
}

function runAgents() {
  const item = currentCase();
  item.status = "Agent Running";
  item.stage = "in_progress";
  item.audit.push([timestamp(), "AgentRun started. Mounted skills and injected case context."]);
  activity.unshift([timestamp(), item.owner, "checked out", item.code]);
  render();

  window.setTimeout(() => {
    const selected = currentCase();
    if (selected.status !== "Agent Running") return;
    selected.status = selected.id === "gunsan-manufacturing" ? "Escalated" : "Approval Pending";
    selected.stage = selected.status === "Escalated" ? "blocked" : "pending_approval";
    selected.transcript.push(
      selected.status === "Escalated"
        ? "Fraud Shield: Customer-facing action remains blocked. Internal escalation only."
        : "Approval Gate: Draft action is ready for human review.",
    );
    selected.audit.push([timestamp(), "AgentRun completed and approval policy evaluated."]);
    activity.unshift([timestamp(), "Approval Gate", "created approval", selected.code]);
    render();
  }, 480);
}

function approveAction() {
  const item = currentCase();
  if (item.status !== "Approval Pending") return;
  item.status = "Approved";
  item.stage = "done";
  item.audit.push([timestamp(), "Human RM approved the proposed action. Demo outbound task recorded."]);
  activity.unshift([timestamp(), "Human RM", "approved action", item.code]);
  render();
}

function rejectAction() {
  const item = currentCase();
  if (item.status !== "Approval Pending") return;
  item.status = "Rejected";
  item.stage = "blocked";
  item.audit.push([timestamp(), "Human reviewer rejected the draft and requested revision."]);
  activity.unshift([timestamp(), "Human reviewer", "rejected draft", item.code]);
  render();
}

function dispatchCommand() {
  const item = currentCase();
  const command = document.getElementById("command-input").value.trim();
  item.audit.push([timestamp(), `Orchestrator command received: ${command || "empty command"}`]);
  item.status = "Agent Running";
  item.stage = "in_progress";
  activity.unshift([timestamp(), "LocalGuard Orchestrator", "dispatched command", item.code]);
  activeView = "runs";
  render();
}

function newCaseDemo() {
  selectedCaseId = "gwangju-wholesale";
  activeView = "cases";
  currentCase().audit.push([timestamp(), "Opened from New Case button demo."]);
  render();
}

function bindActions() {
  document.getElementById("run-agents").addEventListener("click", runAgents);
  document.getElementById("approve-action").addEventListener("click", approveAction);
  document.getElementById("reject-action").addEventListener("click", rejectAction);
  document.getElementById("dispatch-command").addEventListener("click", dispatchCommand);
  document.getElementById("new-case-button").addEventListener("click", newCaseDemo);
  document.getElementById("sidebar-search").addEventListener("input", (event) => {
    const query = event.target.value.toLowerCase();
    const found = cases.find((item) => `${item.customerName} ${item.code} ${item.affiliate}`.toLowerCase().includes(query));
    if (found) {
      selectedCaseId = found.id;
      render();
    }
  });
}

function render() {
  renderNavigation();
  renderMetrics();
  renderBoard();
  renderLiveRuns();
  renderWorkbench();
  renderProperties();
  renderEvidence();
  renderAudit();
}

bindActions();
render();
