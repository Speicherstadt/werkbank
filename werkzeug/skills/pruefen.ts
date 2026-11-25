import { existsSync, readdirSync, readFileSync } from "node:fs";
import { join, relative } from "node:path";
import { parseArgs } from "node:util";
import { konfigurationLaden } from "../konfiguration.ts";
import { pruefeAgentsMd, pruefeAnweisung, pruefeSkill } from "./regel.ts";

/*
 * Prüft die Skills in .agents/skills/, CLAUDE.md und AGENTS.md des Repositorys im aktuellen Verzeichnis nach regel.ts.
 * Läuft im wiederverwendbaren Workflow pr-regeln.yml und lokal mit `bun <werkbank>/werkzeug/skills/pruefen.ts`.
 * Die Werkbank selbst prüft ihre Vorlagen mit `--ordner skills`.
 */

const { values } = parseArgs({ options: { ordner: { type: "string", default: ".agents/skills" } } });
const wurzel = values.ordner;

function alleDateien(ordner: string): string[] {
  return readdirSync(ordner, { withFileTypes: true }).flatMap((eintrag) => {
    const pfad = join(ordner, eintrag.name);
    return eintrag.isDirectory() ? alleDateien(pfad) : [pfad];
  });
}

const namen = existsSync(wurzel)
  ? readdirSync(wurzel, { withFileTypes: true })
      .filter((eintrag) => eintrag.isDirectory())
      .map((eintrag) => eintrag.name)
  : [];
const { erzeugteSkills } = konfigurationLaden();

const skills = namen.flatMap((name) => {
  const ordner = join(wurzel, name);
  return pruefeSkill(
    { ordner: name, inhalt: readFileSync(join(ordner, "SKILL.md"), "utf8"), dateien: alleDateien(ordner).map((datei) => relative(ordner, datei)) },
    erzeugteSkills,
  );
});

const lesen = (datei: string) => (existsSync(datei) ? readFileSync(datei, "utf8") : null);
const agents = lesen("AGENTS.md");
const anweisungen = [
  ...["CLAUDE.md", "AGENTS.md"].flatMap((datei) => {
    const inhalt = lesen(datei);
    return inhalt === null ? [] : pruefeAnweisung(datei, inhalt);
  }),
  ...(agents === null
    ? [{ skill: "AGENTS.md", message: "fehlt; andere Agenten als Claude finden Regeln und Skills sonst nicht" }]
    : pruefeAgentsMd(agents, namen)),
];
for (const { skill, message } of skills) console.error(`${wurzel}/${skill}: ${message}`);
for (const { skill, message } of anweisungen) console.error(`${skill}: ${message}`);
if (skills.length + anweisungen.length > 0) process.exit(1);
console.log(`Skills: ${namen.length} geprüft, alles in Ordnung`);
