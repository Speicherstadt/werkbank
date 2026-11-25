/*
 * Regeln für die Skills in .agents/skills/: Die Beschreibung entscheidet, wann ein
 * Agent den Skill lädt, und steht in jeder Session im Kontext; sie bleibt deshalb kurz. Der Hauptteil wird bei jedem
 * Aufruf ganz gelesen; was nur ein Teil der Aufrufe braucht, liegt unter references/ und wird bei Bedarf geladen.
 */

/** Zeichen der Beschreibung im Front Matter; die längsten vor der Einführung hatten über 900 */
export const BESCHREIBUNG_MAX = 320;
/** Wörter im Hauptteil (SKILL.md ohne Front Matter), wie `wc -w` */
export const HAUPTTEIL_MAX = 1500;

export type Skill = { ordner: string; inhalt: string; dateien: string[] };
export type Befund = { skill: string; message: string };

export function frontMatter(inhalt: string): { name?: string; description?: string; rumpf: string } {
  const treffer = /^---\n([\s\S]*?)\n---\n?/.exec(inhalt);
  if (!treffer) return { rumpf: inhalt };
  const feld = (name: string) => {
    const zeile = new RegExp(`^${name}:\\s*(.*)$`, "m").exec(treffer[1])?.[1].trim();
    return zeile?.replace(/^"(.*)"$/, "$1");
  };
  return { name: feld("name"), description: feld("description"), rumpf: inhalt.slice(treffer[0].length) };
}

const woerter = (text: string) => text.split(/\s+/).filter(Boolean).length;

/** Pfade unter references/, die der Text nennt, als Link oder in Backticks */
export function verweise(text: string): string[] {
  return [...new Set([...text.matchAll(/(?<![\w/])references\/[\w./-]+\.md/g)].map((t) => t[0]))];
}

/** `erzeugt`: Skills, die ein Skript schreibt (Nachschlagewerk); ihre Länge prüft das Projekt selbst */
export function pruefeSkill({ ordner, inhalt, dateien }: Skill, erzeugt: string[] = []): Befund[] {
  const befunde: string[] = [];
  const { name, description, rumpf } = frontMatter(inhalt);
  if (name !== ordner) befunde.push(`name „${name ?? ""}“ im Front Matter, erwartet „${ordner}“`);
  if (!description) befunde.push("description fehlt im Front Matter");
  else if (description.length > BESCHREIBUNG_MAX)
    befunde.push(`description hat ${description.length} Zeichen, höchstens ${BESCHREIBUNG_MAX}: nur sagen, wann der Skill geladen wird`);
  const anzahl = woerter(rumpf);
  if (!erzeugt.includes(ordner) && anzahl > HAUPTTEIL_MAX)
    befunde.push(`SKILL.md hat ${anzahl} Wörter, höchstens ${HAUPTTEIL_MAX}: was nur ein Teil der Aufrufe braucht, nach references/`);
  const referenzen = dateien.filter((datei) => datei.startsWith("references/"));
  const genannt = verweise(inhalt);
  for (const pfad of genannt) if (!dateien.includes(pfad)) befunde.push(`${pfad} genannt, gibt es aber nicht`);
  for (const datei of referenzen) if (!genannt.includes(datei)) befunde.push(`${datei} nennt SKILL.md nicht, kein Agent lädt sie`);
  return befunde.map((message) => ({ skill: ordner, message }));
}

/**
 * Zeichen in CLAUDE.md und AGENTS.md: Beide liest jede Session ganz. OpenClaw hält seine AGENTS.md unter 20.000
 * Zeichen; unsere lag bei der Einführung unter 7.000, die Grenze lässt Platz, ohne dass sie unbemerkt wächst.
 */
export const ANWEISUNG_MAX = 10000;

export function pruefeAnweisung(datei: string, inhalt: string): Befund[] {
  const zeichen = [...inhalt].length;
  if (zeichen <= ANWEISUNG_MAX) return [];
  return [{ skill: datei, message: `${zeichen} Zeichen, höchstens ${ANWEISUNG_MAX}: Schritte gehören in einen Skill, Regeln in docs/` }];
}

/**
 * Andere Agenten als Claude (Codex und weitere) finden die Skills über AGENTS.md, nicht über die Beschreibung im Front
 * Matter. Fehlt dort ein Skill, kennt ihn nur Claude.
 */
export function pruefeAgentsMd(inhalt: string, skills: string[]): Befund[] {
  return skills
    .filter((skill) => !inhalt.includes(`\`${skill}\``))
    .map((skill) => ({ skill: "AGENTS.md", message: `nennt den Skill \`${skill}\` nicht; andere Agenten als Claude finden ihn sonst nicht` }));
}
