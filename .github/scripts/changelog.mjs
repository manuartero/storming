// Prints the CHANGELOG section for <version>, built from the Conventional
// Commits since the last v* tag. Usage: node .github/scripts/changelog.mjs 0.9.0
import { execFileSync } from "node:child_process";
import { readFileSync } from "node:fs";

const version = process.argv[2];
if (!/^\d+\.\d+\.\d+$/.test(version ?? "")) {
  console.error(`usage: changelog.mjs <major.minor.patch>, got "${version}"`);
  process.exit(1);
}

const git = (...args) => execFileSync("git", args, { encoding: "utf8" }).trim();

const repo = JSON.parse(readFileSync("package.json", "utf8"))
  .repository.url.replace(/^git\+/, "")
  .replace(/\.git$/, "");
const previous = git("describe", "--tags", "--abbrev=0", "--match", "v*");
const commits = git("log", `${previous}..HEAD`, "--format=%H%x09%s")
  .split("\n")
  .filter(Boolean)
  .map((line) => line.split("\t"));

const SECTIONS = [
  ["Features", ["feat"]],
  ["Fixes", ["fix"]],
  ["Visual", ["style"]],
  ["Internal", ["chore", "refactor", "perf", "test", "docs", "ci", "build"]],
];
const CONVENTIONAL = /^(\w+)(?:\(([^)]+)\))?(!)?: (.+)$/;

const entries = new Map(SECTIONS.map(([title]) => [title, []]));
for (const [sha, subject] of commits) {
  const [, type = "chore", scope, breaking, text = subject] =
    subject.match(CONVENTIONAL) ?? [];
  if (type === "chore" && scope === "release") continue;
  const section =
    SECTIONS.find(([, types]) => types.includes(type))?.[0] ?? "Internal";
  const prefix = `${breaking ? "**BREAKING** " : ""}${scope ? `**${scope}:** ` : ""}`;
  const linked = text.replace(/\(#(\d+)\)/g, `([#$1](${repo}/issues/$1))`);
  const commit = `([${sha.slice(0, 7)}](${repo}/commit/${sha}))`;
  entries.get(section).push(`* ${prefix}${linked} ${commit}`);
}

const date = new Date().toISOString().slice(0, 10);
let out = `# [${version}](${repo}/compare/${previous}...v${version}) (${date})\n`;
for (const [title, lines] of entries) {
  if (lines.length) out += `\n### ${title}\n\n${lines.join("\n")}\n`;
}
process.stdout.write(`${out}\n`);
