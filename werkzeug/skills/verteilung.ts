/*
 * Was der Sync der Skills in einem Projekt ändert, ohne Zugriff auf Dateien oder GitHub. Die Werkbank kennt ihre
 * Skills; im Projekt merkt sich `.agents/skills/.werkbank.json`, welche von dort kamen. Nur diese ersetzt oder
 * entfernt der Sync, eigene Skills des Projekts (etwa `checks`) bleiben unberührt.
 */

export const MANIFEST = ".agents/skills/.werkbank.json";

export type Manifest = { skills: string[] };

/** Manifest aus dem Projekt; fehlt es oder ist es kaputt, kam bisher nichts aus der Werkbank */
export function manifestLesen(inhalt: string | null): Manifest {
  if (inhalt === null) return { skills: [] };
  try {
    const { skills } = JSON.parse(inhalt) as { skills?: unknown };
    return { skills: Array.isArray(skills) ? skills.filter((name): name is string => typeof name === "string") : [] };
  } catch {
    return { skills: [] };
  }
}

export type Plan = { ersetzen: string[]; entfernen: string[]; konflikte: string[] };

/**
 * `werkbank`: Skills der Werkbank; `projekt`: Ordner unter .agents/skills im Projekt; `manifest`: was zuletzt kam.
 * Ein Skill, den das Projekt selbst unter demselben Namen hat (im Ordner, aber nicht im Manifest), ist ein Konflikt:
 * Der Sync überschreibt ihn nicht, das entscheidet ein Mensch.
 */
export function planen(werkbank: string[], projekt: string[], manifest: Manifest): Plan {
  const vonWerkbank = new Set(manifest.skills);
  const konflikte = werkbank.filter((name) => projekt.includes(name) && !vonWerkbank.has(name));
  const ersetzen = werkbank.filter((name) => !konflikte.includes(name));
  const entfernen = manifest.skills.filter((name) => !werkbank.includes(name) && projekt.includes(name));
  return { ersetzen, entfernen, konflikte };
}

export function manifestText(skills: string[]): string {
  return `${JSON.stringify({ $kommentar: "Skills aus https://github.com/Speicherstadt/werkbank; der Sync ersetzt sie, Änderungen dort machen", skills: [...skills].sort() }, null, 2)}\n`;
}

export function prBeschreibung(werkbankSha: string, plan: Plan): string {
  const zeilen = [
    `Übernimmt die Skills aus der Werkbank (Stand Speicherstadt/werkbank@${werkbankSha.slice(0, 7)}).`,
    "",
    `Ersetzt: ${plan.ersetzen.map((name) => `\`${name}\``).join(", ") || "nichts"}`,
  ];
  if (plan.entfernen.length > 0) zeilen.push(`Entfernt (nicht mehr in der Werkbank): ${plan.entfernen.map((name) => `\`${name}\``).join(", ")}`);
  if (plan.konflikte.length > 0)
    zeilen.push(
      "",
      `Nicht übernommen, weil das Projekt einen eigenen Skill mit demselben Namen hat: ${plan.konflikte.map((name) => `\`${name}\``).join(", ")}. Umbenennen oder löschen, dann übernimmt der nächste Sync ihn.`,
    );
  zeilen.push("", "Änderungen an diesen Skills gehören in die Werkbank, nicht hierher: Der nächste Sync überschreibt sie.");
  return zeilen.join("\n");
}
