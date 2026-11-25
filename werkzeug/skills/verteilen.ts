import { execFileSync } from "node:child_process";
import { cpSync, existsSync, mkdtempSync, readdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { MANIFEST, manifestLesen, manifestText, planen, prBeschreibung } from "./verteilung.ts";

/*
 * Bringt die Skills aus skills/ per Pull Request in jedes Projekt aus verteilung.json, nach .agents/skills/
 * (.github/workflows/skills-verteilen.yml). Was genau, entscheidet planen() in verteilung.ts. Je Projekt ein Branch
 * `werkbank/skills`, den nur dieses Skript schreibt; ein offener Pull Request von dort wird aktualisiert.
 *
 * Secret SKILLS_TOKEN: Token mit Schreibrecht auf Inhalte und Pull Requests der Projekte.
 *
 *   bun werkzeug/skills/verteilen.ts            öffnet oder aktualisiert die Pull Requests
 *   bun werkzeug/skills/verteilen.ts --probe    zeigt nur, was sich ändern würde
 */

const probe = process.argv.includes("--probe");
const token = process.env.SKILLS_TOKEN ?? "";
const BRANCH = "werkbank/skills";
const TITEL = "Skills: Stand der Werkbank übernehmen";
const werkbank = new URL("../..", import.meta.url).pathname;
const sha = execFileSync("git", ["rev-parse", "HEAD"], { cwd: werkbank, encoding: "utf8" }).trim();

const ordner = (pfad: string) =>
  existsSync(pfad)
    ? readdirSync(pfad, { withFileTypes: true })
        .filter((eintrag) => eintrag.isDirectory())
        .map((eintrag) => eintrag.name)
    : [];

async function github<T>(pfad: string, init: RequestInit = {}): Promise<T> {
  const antwort = await fetch(`https://api.github.com${pfad}`, {
    ...init,
    headers: { authorization: `Bearer ${token}`, accept: "application/vnd.github+json", "content-type": "application/json", "user-agent": "werkbank-skills" },
  });
  if (!antwort.ok) throw new Error(`GitHub ${init.method ?? "GET"} ${pfad}: ${antwort.status} ${await antwort.text()}`);
  return (await antwort.json()) as T;
}

if (!token && !probe) {
  console.log("::notice title=Skills::SKILLS_TOKEN fehlt, nichts verteilt.");
  process.exit(0);
}

const { repos } = JSON.parse(readFileSync(join(werkbank, "verteilung.json"), "utf8")) as { repos: string[] };
const skills = ordner(join(werkbank, "skills"));

for (const repo of repos) {
  const arbeit = mkdtempSync(join(tmpdir(), "werkbank-skills-"));
  try {
    // Lesend geht es ohne Token (öffentliche Projekte); geschrieben wird nur mit Token
    const url = token ? `https://x-access-token:${token}@github.com/${repo}.git` : `https://github.com/${repo}.git`;
    const git = (...args: string[]) => execFileSync("git", args, { cwd: arbeit, encoding: "utf8", stdio: ["ignore", "pipe", "pipe"] });
    git("clone", "--depth", "1", "--quiet", url, ".");
    const basis = git("rev-parse", "--abbrev-ref", "HEAD").trim();
    const ziel = join(arbeit, ".agents/skills");
    const manifestPfad = join(arbeit, MANIFEST);
    const plan = planen(skills, ordner(ziel), manifestLesen(existsSync(manifestPfad) ? readFileSync(manifestPfad, "utf8") : null));

    for (const name of [...plan.ersetzen, ...plan.entfernen]) rmSync(join(ziel, name), { recursive: true, force: true });
    for (const name of plan.ersetzen) cpSync(join(werkbank, "skills", name), join(ziel, name), { recursive: true });
    writeFileSync(manifestPfad, manifestText(plan.ersetzen));

    git("add", "--all", ".agents/skills");
    if (git("status", "--porcelain").trim() === "") {
      console.log(`${repo}: aktuell`);
      continue;
    }
    console.log(
      `${repo}: ersetzt ${plan.ersetzen.length}, entfernt ${plan.entfernen.length}, Konflikte ${plan.konflikte.join(", ") || "keine"}${probe ? " (Probe)" : ""}`,
    );
    if (probe) continue;

    git("-c", "user.name=werkbank[bot]", "-c", "user.email=werkbank@users.noreply.github.com", "commit", "--quiet", "-m", TITEL);
    git("push", "--force", "--quiet", "origin", `HEAD:refs/heads/${BRANCH}`);
    const [owner] = repo.split("/");
    const offen = await github<{ number: number }[]>(`/repos/${repo}/pulls?state=open&head=${owner}:${BRANCH}`);
    const body = prBeschreibung(sha, plan);
    if (offen.length > 0) {
      await github(`/repos/${repo}/pulls/${offen[0].number}`, { method: "PATCH", body: JSON.stringify({ body }) });
      console.log(`${repo}: Pull Request #${offen[0].number} aktualisiert`);
    } else {
      const pr = await github<{ number: number }>(`/repos/${repo}/pulls`, {
        method: "POST",
        body: JSON.stringify({ title: TITEL, head: BRANCH, base: basis, body }),
      });
      console.log(`${repo}: Pull Request #${pr.number} geöffnet`);
    }
  } finally {
    rmSync(arbeit, { recursive: true, force: true });
  }
}
