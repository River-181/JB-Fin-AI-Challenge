#!/usr/bin/env node
// canon-moc-sync — 중복 파일명 검사 + frontmatter 검증 + MOC 위키링크 자동 추가
// 표준 라이브러리만 사용.

import fs from "node:fs";
import path from "node:path";

const VAULT_ROOT = path.join(process.cwd(), "08_본선");
const DEFAULT_MOC = path.join(VAULT_ROOT, "_MOC_HOME.md");
const SYSTEM_DIR  = path.join(VAULT_ROOT, "_system");

const args = process.argv.slice(2);
const DRY_RUN = args.includes("--dry-run");
const mocArg  = args.indexOf("--moc");
const MOC_PATH = mocArg !== -1 ? path.resolve(args[mocArg + 1]) : DEFAULT_MOC;

// ── 모든 .md 파일 수집 ────────────────────────────────────────────────────
function collectMd(dir, results = []) {
  let entries;
  try { entries = fs.readdirSync(dir, { withFileTypes: true }); } catch { return results; }
  for (const e of entries) {
    const full = path.join(dir, e.name);
    if (e.isDirectory()) collectMd(full, results);
    else if (e.isFile() && e.name.endsWith(".md")) results.push(full);
  }
  return results;
}

// ── frontmatter 파싱 ──────────────────────────────────────────────────────
function parseFrontmatter(text) {
  if (!text.startsWith("---")) return {};
  const end = text.indexOf("\n---", 4);
  if (end === -1) return {};
  const fm = text.slice(4, end);
  const fields = {};
  for (const line of fm.split("\n")) {
    const m = line.match(/^(\w[\w-]*):/);
    if (m) fields[m[1]] = true;
  }
  return fields;
}

// ── MOC에서 기존 위키링크 추출 ───────────────────────────────────────────
function extractWikilinks(text) {
  const set = new Set();
  for (const m of text.matchAll(/\[\[([^\]|#]+?)(?:\|[^\]]*)?\]\]/g)) {
    set.add(m[1].trim());
  }
  return set;
}

// ── 메인 ─────────────────────────────────────────────────────────────────
function main() {
  const allFiles = collectMd(VAULT_ROOT);
  let exitCode = 0;

  // 1. 중복 파일명 검사
  const nameMap = {};
  for (const f of allFiles) {
    const base = path.basename(f, ".md");
    if (!nameMap[base]) nameMap[base] = [];
    nameMap[base].push(f);
  }
  const duplicates = Object.entries(nameMap).filter(([, arr]) => arr.length > 1);
  if (duplicates.length) {
    process.stdout.write(`[canon-moc-sync] 중복 파일명: ${duplicates.length}건 ⚠️\n`);
    for (const [name, paths] of duplicates) {
      process.stdout.write(`  - "${name}"\n`);
      for (const p of paths) process.stdout.write(`      ${path.relative(process.cwd(), p)}\n`);
    }
    exitCode = 1;
  } else {
    process.stdout.write("[canon-moc-sync] 중복 파일명: 없음 ✓\n");
  }

  // 2. frontmatter 필수 필드 검증
  const REQUIRED = ["tags", "date", "up"];
  const fmIssues = [];
  for (const f of allFiles) {
    let text;
    try { text = fs.readFileSync(f, "utf8"); } catch { continue; }
    const fields = parseFrontmatter(text);
    const missing = REQUIRED.filter(k => !fields[k]);
    if (missing.length) fmIssues.push({ file: f, missing });
  }
  if (fmIssues.length) {
    process.stdout.write(`[canon-moc-sync] frontmatter 누락: ${fmIssues.length}건\n`);
    for (const { file, missing } of fmIssues) {
      process.stdout.write(`  - ${path.relative(process.cwd(), file)} (누락: ${missing.join(", ")})\n`);
    }
  } else {
    process.stdout.write("[canon-moc-sync] frontmatter: 전체 정합 ✓\n");
  }

  // 3. MOC 위키링크 자동 추가
  if (!fs.existsSync(MOC_PATH)) {
    process.stdout.write(`[canon-moc-sync] MOC 파일 없음: ${MOC_PATH}\n`);
    process.exit(exitCode);
  }

  const mocText = fs.readFileSync(MOC_PATH, "utf8");
  const existing = extractWikilinks(mocText);

  // 대상: _system 제외, _MOC_ / _ 접두어 제외
  const candidates = allFiles.filter(f => {
    if (f.startsWith(SYSTEM_DIR)) return false;
    const base = path.basename(f, ".md");
    if (base.startsWith("_")) return false;
    if (base.startsWith("_MOC_")) return false;
    if (f === MOC_PATH) return false;
    return true;
  });

  const toAdd = candidates
    .map(f => path.basename(f, ".md"))
    .filter(name => !existing.has(name));

  if (toAdd.length) {
    process.stdout.write(`[canon-moc-sync] MOC 신규 링크 추가: ${toAdd.length}건\n`);
    toAdd.forEach(n => process.stdout.write(`  + [[${n}]]\n`));

    if (!DRY_RUN) {
      const linkBlock = toAdd.map(n => `- [[${n}]]`).join("\n");
      let newMoc;
      const MARKER = "<!-- AUTO-LINKS -->";
      if (mocText.includes(MARKER)) {
        newMoc = mocText.replace(
          MARKER,
          `${MARKER}\n${linkBlock}`
        );
      } else {
        newMoc = mocText.trimEnd() + `\n\n${MARKER}\n${linkBlock}\n`;
      }
      fs.writeFileSync(MOC_PATH, newMoc);
      process.stdout.write("[canon-moc-sync] MOC 파일 갱신 완료\n");
    } else {
      process.stdout.write("[canon-moc-sync] --dry-run: 파일 수정 없음\n");
    }
  } else {
    process.stdout.write("[canon-moc-sync] MOC: 신규 링크 없음 ✓\n");
  }

  process.exit(exitCode);
}

main();
