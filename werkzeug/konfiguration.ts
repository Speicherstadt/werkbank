import { existsSync, readFileSync } from "node:fs";

/*
 * Einstellungen eines Projekts für die Werkzeuge der Werkbank, aus `.github/werkbank.json` im Repository, das die
 * Workflows aufruft. Alles hat einen Standard; ein Projekt nennt nur, was bei ihm anders ist. Pfade sind reguläre
 * Ausdrücke als Text, relativ zur Wurzel des Repositorys.
 */

export type Konfiguration = {
  /** Project (Board) der Organisation; null ohne Board */
  board: { owner: string; nummer: number } | null;
  /** Seite mit dem Abschnitt „Wenn eine Prüfung anschlägt“; null nennt docs/mitwirken.md */
  anleitung: string | null;
  /** Seite mit dem Abschnitt „Etwas übernehmen“; null nennt docs/mitwirken.md */
  uebernehmen: string | null;
  /** Wo die Konventionen stehen, für die Meldungen, etwa „docs/entwicklung.md, Konventionen“ */
  konventionen: string;
  /** Code, zu dem Doku gehört (Hinweis „Code ohne Doku“) */
  code: string[];
  /** Code, dessen Funktionen gegen die Grenze geprüft werden */
  funktionen: string[];
  /** Grenze für Funktionen in Zeilen */
  funktionMax: number;
  /** Ausnahmen für code und funktionen, etwa erzeugte Dateien */
  erzeugt: string[];
  /** Pfade, deren Änderung das OK des Maintainers braucht; leer ohne solche */
  heikel: string[];
  /** Alte große Dateien (checks file-size); null ohne die Liste */
  grosseDateien: string | null;
  /** Dateien, die wachsen dürfen, ohne Hinweis */
  duerfenWachsen: string[];
  /** Grenze für eine Seite unter docs/ in Wörtern */
  dokuWorte: number;
  /** Erzeugte Skills (Nachschlagewerk), für die die Grenze des Hauptteils nicht gilt */
  erzeugteSkills: string[];
};

export const STANDARD: Konfiguration = {
  board: null,
  anleitung: null,
  uebernehmen: null,
  konventionen: "docs/entwicklung.md, Konventionen",
  code: ["^(apps/[^/]+/src|packages/[^/]+/src)/.*\\.[cm]?[jt]sx?$"],
  funktionen: ["^(apps/[^/]+/src|packages/[^/]+/src|scripts)/.*\\.[cm]?[jt]sx?$"],
  funktionMax: 80,
  erzeugt: ["routeTree\\.gen\\.ts$"],
  heikel: [],
  grosseDateien: null,
  duerfenWachsen: [],
  dokuWorte: 8000,
  erzeugteSkills: [],
};

const ZAHLEN = ["funktionMax", "dokuWorte"] as const;
const LISTEN = ["code", "funktionen", "erzeugt", "heikel", "duerfenWachsen", "erzeugteSkills"] as const;
const TEXTE = ["konventionen"] as const;
const TEXTE_ODER_NULL = ["anleitung", "uebernehmen", "grosseDateien"] as const;

/** Prüft die Form und ergänzt die Standards; wirft bei Unbekanntem, damit ein Tippfehler nicht still verpufft */
export function konfigurationLesen(daten: unknown): Konfiguration {
  const roh = (daten ?? {}) as Record<string, unknown>;
  const bekannt = new Set(Object.keys(STANDARD));
  const unbekannt = Object.keys(roh).filter((schluessel) => !bekannt.has(schluessel) && !schluessel.startsWith("$"));
  if (unbekannt.length > 0) throw new Error(`werkbank.json: unbekannte Einstellung ${unbekannt.join(", ")}`);
  const fehler = (feld: string, art: string) => new Error(`werkbank.json: „${feld}“ ist kein ${art}`);
  for (const feld of ZAHLEN) if (feld in roh && !Number.isInteger(roh[feld])) throw fehler(feld, "ganze Zahl");
  for (const feld of TEXTE) if (feld in roh && typeof roh[feld] !== "string") throw fehler(feld, "Text");
  for (const feld of TEXTE_ODER_NULL) if (feld in roh && roh[feld] !== null && typeof roh[feld] !== "string") throw fehler(feld, "Text oder null");
  for (const feld of LISTEN) {
    if (!(feld in roh)) continue;
    const liste = roh[feld];
    if (!Array.isArray(liste) || !liste.every((eintrag) => typeof eintrag === "string")) throw fehler(feld, "Liste von Texten");
    for (const muster of liste) new RegExp(muster); // wirft bei einem kaputten Ausdruck
  }
  if ("board" in roh && roh.board !== null) {
    const { owner, nummer } = (roh.board ?? {}) as Record<string, unknown>;
    if (typeof owner !== "string" || !Number.isInteger(nummer)) throw fehler("board", "Objekt { owner, nummer } oder null");
  }
  return { ...STANDARD, ...(roh as Partial<Konfiguration>) };
}

/** Liest `.github/werkbank.json` (oder die Datei in WERKBANK_KONFIGURATION); ohne die Datei gelten die Standards */
export function konfigurationLaden(pfad = process.env.WERKBANK_KONFIGURATION || ".github/werkbank.json"): Konfiguration {
  return existsSync(pfad) ? konfigurationLesen(JSON.parse(readFileSync(pfad, "utf8"))) : STANDARD;
}

/** Trifft einer der Ausdrücke den Pfad? */
export function passt(muster: string[], datei: string): boolean {
  return muster.some((ausdruck) => new RegExp(ausdruck).test(datei));
}

/** Links in den Kommentaren des Boards */
export type BoardLinks = { board: string; anleitung: string };

export function boardLinks(k: Konfiguration & { board: { owner: string; nummer: number } }): BoardLinks {
  return {
    board: `[Board](https://github.com/orgs/${k.board.owner}/projects/${k.board.nummer})`,
    anleitung: anleitungsLink(k.uebernehmen, "Etwas übernehmen"),
  };
}

/** Konfiguration mit Board; ohne Board endet das Skript mit einem Hinweis, ohne Fehler */
export function mitBoard(k: Konfiguration, titel: string): Konfiguration & { board: { owner: string; nummer: number } } {
  if (k.board) return k as Konfiguration & { board: { owner: string; nummer: number } };
  console.log(`::notice title=${titel}::Kein Board in .github/werkbank.json, nichts zu tun.`);
  process.exit(0);
}

/** Link auf einen Abschnitt in docs/mitwirken.md, wenn das Projekt keine eigene Seite nennt */
export function anleitungsLink(url: string | null, abschnitt: string): string {
  return url ? `[${abschnitt}](${url})` : `„${abschnitt}“ in docs/mitwirken.md`;
}
