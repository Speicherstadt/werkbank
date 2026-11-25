import { schliessendeStichwoerter, verweise } from "../board/regel.ts";
import { type Konfiguration, passt } from "../konfiguration.ts";

/*
 * Regeln für Pull Requests aus docs/mitwirken.md des Projekts, die sich am Pull Request selbst prüfen lassen.
 * Was je Projekt anders ist (Pfade, Grenzen), kommt aus der Konfiguration (konfiguration.ts). Fehler halten den Pull Request auf, Hinweise erscheinen nur als Warnung an der Prüfung.
 */

export type Report = { level: "error" | "warning"; message: string };

const CONVENTIONAL = /^(feat|fix|docs|test|refactor|chore|style|perf|build|ci|revert)(\(.*\))?!?:/;
/**
 * Bereich: ein bis drei Wörter („Belege“, „E-Rechnung“, „Doku-Bilder“, „ELSTER“); klein nur, wenn ein Name so
 * geschrieben wird („sevDesk“). Die Issue-Nummer steht nur, wenn es ein Issue gibt; ob sie fehlt, prüft
 * checkTitleIssues.
 */
const TITLE = /^\p{L}[\p{L}\d-]*(?: [\p{L}\d-]+){0,2}: \S.*$/u;

/** Titel nach `Bereich: was sich ändert (#Issue)`; der Squash-Merge macht ihn zum Commit auf main */
export function checkTitle(title: string): Report[] {
  const trimmed = title.trim();
  if (CONVENTIONAL.test(trimmed)) {
    return [
      {
        level: "error",
        message: `Titel „${trimmed}“: Conventional Commits gelten für Commits im Pull Request, der Titel heißt „Bereich: was sich ändert“, mit „(#Issue)“, falls es eins gibt, etwa „Export: PDF mit Lesezeichen (#123)“.`,
      },
    ];
  }
  if (!TITLE.test(trimmed)) {
    return [
      {
        level: "error",
        message: `Titel „${trimmed}“ folgt nicht „Bereich: was sich ändert“ (mit „(#Issue)“, falls es eins gibt), etwa „Export: PDF mit Lesezeichen (#123)“.`,
      },
    ];
  }
  if (trimmed.endsWith(".")) return [{ level: "error", message: `Titel „${trimmed}“ endet ohne Punkt.` }];
  return [];
}

/**
 * `Umgesetzt #…` heißt: Dieses Issue wird fertig. Seine Nummer gehört in den Titel, sonst fehlt sie im Squash-Commit auf
 * main. `Refs` zeigt oft auch auf andere Pull Requests, die das
 * Skript von Issues nicht unterscheiden kann; dort nur ein Hinweis.
 */
export function checkTitleIssues(title: string, body: string | null): Report[] {
  const { refs, umgesetzt } = verweise(body ?? "");
  // Eigene Nummern: nicht „owner/repo#12“, nicht Anker wie „seite.html#12“
  const imTitel = new Set([...title.matchAll(/(?<![\w/.-])#(\d+)\b/g)].map((treffer) => Number(treffer[1])));
  const fehlend = (nummern: number[]) => nummern.filter((nummer) => !imTitel.has(nummer)).map((nummer) => `#${nummer}`);
  const reports: Report[] = [];
  const umgesetztFehlt = fehlend(umgesetzt);
  if (umgesetztFehlt.length > 0) {
    const liste = umgesetztFehlt.join(", ");
    reports.push({
      level: "error",
      message: `Titel: Die Beschreibung setzt ${liste} um, der Titel nennt ${umgesetztFehlt.length > 1 ? "sie" : "es"} nicht. Ans Ende gehört „(${liste})“, sonst fehlt die Nummer im Commit auf main.`,
    });
  }
  const refsFehlt = fehlend(refs);
  if (refsFehlt.length > 0) {
    const liste = refsFehlt.join(", ");
    reports.push({
      level: "warning",
      message: `Titel: Die Beschreibung verweist mit „Refs“ auf ${liste}. Ist das ein Issue, gehört „(${liste})“ ans Ende des Titels; bei einem Pull Request nicht.`,
    });
  }
  return reports;
}

/**
 * Issues verweist die Beschreibung mit `Refs #…` (Teil) oder `Umgesetzt #…` (fertig). `Closes` und `Fixes`
 * schlössen das Issue schon beim Merge; geschlossen wird aber erst beim Release (werkzeug/board).
 */
export function checkBody(body: string | null): Report[] {
  return schliessendeStichwoerter(body ?? "").map((treffer) => ({
    level: "error",
    message: `Beschreibung: „${treffer}“ schlösse das Issue schon beim Merge. Mit „Umgesetzt #…“ (fertig) oder „Refs #…“ (Teil) schließt es das Release.`,
  }));
}

const isTest = (file: string) => /\.(test|spec)\.[cm]?[jt]sx?$/.test(file) || file.includes("/e2e/") || file.startsWith("e2e/");
const isCode = (file: string, k: Konfiguration) => passt(k.code, file) && !isTest(file) && !passt(k.erzeugt, file);
const isFix = (subject: string) => /^fix(\(.*\))?!?:/.test(subject);

/**
 * Hinweise auf Regeln, die sich nicht sicher entscheiden lassen: Code ohne Doku, Fix ohne Test. Ein Refactor
 * braucht keine Doku, ein Fix an der CI keinen Test; deshalb nur Warnungen.
 */
export function hints(files: string[], commitSubjects: string[], k: Konfiguration): Report[] {
  const reports: Report[] = [];
  if (files.some((file) => isCode(file, k)) && !files.some((file) => file.startsWith("docs/"))) {
    reports.push({
      level: "warning",
      message: "Code geändert, aber nichts in docs/: Beschreibt eine Doku-Seite das geänderte Verhalten?",
    });
  }
  if (commitSubjects.some(isFix) && !files.some(isTest)) {
    reports.push({
      level: "warning",
      message: "fix-Commit ohne geänderten Test: Ein Bugfix beginnt mit einem Test, der fehlschlägt (docs/mitwirken.md).",
    });
  }
  return reports;
}

/**
 * Nur Markdown, docs/, mkdocs.yml oder LICENSE: das prüft doku-pruefen statt tdd-review
 */
const DOCS = /\.md$|^docs\/|^mkdocs\.yml$|^LICENSE$/;
const isDocsOnly = (files: string[]) => files.length > 0 && files.every((file) => DOCS.test(file));
/** Wer das Projekt pflegt, prüft und mergt selbst; author_association aus dem Ereignis von GitHub */
const MAINTAINERS = ["OWNER", "MEMBER", "COLLABORATOR"];

/**
 * Erinnerung an Selbstprüfung und unabhängiges Review (docs/mitwirken.md, Beiträge annehmen) für fremde Pull
 * Requests außerhalb des Entwurfs. Fest, ohne Blick auf die Kommentare: pr-regeln.yml läuft nicht bei neuen
 * Kommentaren, ein Hinweis, der von einem Kommentar abhängt, bliebe bis zum nächsten Push stehen.
 */
export function reviewHint(pr: { draft?: boolean; author_association?: string; user: { login: string; type?: string } }, files: string[]): Report[] {
  if (pr.draft || isBot(pr.user) || MAINTAINERS.includes(pr.author_association ?? "")) return [];
  const hasDocs = files.some((file) => DOCS.test(file));
  // Code und Markdown: zwei Prüfer nebeneinander (tdd-review, Schritt 0)
  const review = isDocsOnly(files)
    ? "`doku-pruefen` (nur Doku geändert)"
    : hasDocs
      ? "`tdd-review` für den Code und parallel `doku-pruefen` für die Markdown-Dateien"
      : "`tdd-review`";
  return [
    {
      level: "warning",
      message: `Vor dem Merge: Selbstprüfung mit \`beitrag-pruefen\` als Kommentar im Pull Request, dann ein unabhängiges Review mit ${review} durch jemand anderen oder einen frischen Agenten. Die Skills liegen in .agents/skills/ (AGENTS.md nennt sie); fehlt eins davon, prüfen wir den Pull Request nicht (docs/mitwirken.md, Beiträge annehmen).`,
    },
  ];
}

/** Dateien eines Pull Requests an heiklen Pfaden (Konfiguration `heikel`), ohne Markdown */
export function heikleDateien(files: string[], k: Konfiguration): string[] {
  return files.filter((file) => !file.endsWith(".md") && passt(k.heikel, file));
}

/**
 * Hinweis, dass der Merge auf das OK des Maintainers wartet. Für alle Pull Requests, auch von Maintainern: Ein Agent,
 * der sie abarbeitet (prs-abarbeiten), soll es am Pull Request sehen und nicht aus der Prosa des Skills ableiten.
 */
export function heikelHint(files: string[], k: Konfiguration): Report[] {
  const heikel = heikleDateien(files, k);
  if (heikel.length === 0) return [];
  const beispiele = heikel.slice(0, 3).join(", ") + (heikel.length > 3 ? ` und ${heikel.length - 3} weitere` : "");
  return [
    {
      level: "warning",
      message: `Fachlich heikel (${beispiele}): Quelle lesen und gegenrechnen, gemergt wird erst nach einem „OK“ des Maintainers (docs/mitwirken.md, Wer mergt was).`,
    },
  ];
}

/**
 * Wachstum, ab dem ein Hinweis kommt: Kleinere Änderungen an alten Dateien sind die Regel (in Haben hätte der Hinweis
 * ohne Schwelle bei 50 von 100 Pull Requests angeschlagen) und würden ihn überhören lassen.
 */
export const GROWTH_THRESHOLD = 20;

/** Alte große Dateien (Konfiguration `grosseDateien`), die im Pull Request gewachsen sind, mit Zeilen vorher und nachher */
export function grownOldFiles(
  before: Record<string, number>,
  after: Record<string, number>,
  oldFiles: string[],
): { file: string; before: number; after: number }[] {
  return oldFiles
    .filter((file) => file in before && file in after && after[file] > before[file])
    .map((file) => ({ file, before: before[file], after: after[file] }));
}

/** Hinweis auf alte große Dateien, die im Pull Request deutlich gewachsen sind (checks file-size) */
export function growthHints(grown: { file: string; before: number; after: number }[], k: Konfiguration): Report[] {
  return grown
    .filter(({ file, before, after }) => after - before >= GROWTH_THRESHOLD && !k.duerfenWachsen.includes(file))
    .map(({ file, before, after }) => ({
      level: "warning",
      message: `${file} wächst von ${before} auf ${after} Zeilen: Lässt sich das Neue in eine eigene Datei legen?`,
    }));
}

/** Wachstum einer schon langen Seite, ab dem ein Hinweis kommt; kleine Änderungen daran sind die Regel */
export const DOC_GROWTH = 300;

/** Wörter wie `wc -w`: alles zwischen Leerraum */
export function countWords(text: string): number {
  return text.split(/\s+/).filter(Boolean).length;
}

/**
 * Hinweis auf Seiten unter docs/, die im Pull Request über die Grenze (Konfiguration `dokuWorte`; in Haben las eine
 * Seite über 8.000 Wörter niemand mehr am Stück) wachsen oder darüber noch um DOC_GROWTH Wörter zulegen. `before` ist
 * 0 bei einer neuen Seite.
 */
export function docPageHints(pages: { file: string; before: number; after: number }[], k: Konfiguration): Report[] {
  const max = k.dokuWorte;
  return pages
    .filter(({ file }) => /^docs\/[^/]+\.md$/.test(file))
    .filter(({ before, after }) => after > max && (before <= max || after - before >= DOC_GROWTH))
    .map(({ file, after }) => ({
      level: "warning",
      message: `${file} hat ${after} Wörter, mehr als ${max}: Gehört ein Teil auf eine Unterseite?`,
    }));
}

/**
 * Pull Requests von Bots (Renovate) tragen deren eigene Titel wie „Lock file maintenance“. Sie bekommen keine
 * Titelprüfung, sonst würde der rote Check den Automerge von Renovate stoppen.
 */
export function isBot(user: { login: string; type?: string }): boolean {
  return user.type === "Bot" || user.login.endsWith("[bot]");
}
