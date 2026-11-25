import { describe, expect, it } from "vitest";
import { ANWEISUNG_MAX, pruefeAgentsMd, BESCHREIBUNG_MAX, HAUPTTEIL_MAX, pruefeAnweisung, pruefeSkill, verweise } from "./regel.ts";

const skill = (beschreibung: string, rumpf = "Ablauf.", name = "beispiel") => `---\nname: "${name}"\ndescription: "${beschreibung}"\n---\n\n${rumpf}\n`;

describe("pruefeSkill", () => {
  it("lässt einen kurzen Skill mit genannten Referenzen durch", () => {
    const inhalt = skill("Wann laden.", "Vorlagen in `references/vorlagen.md`.");
    expect(pruefeSkill({ ordner: "beispiel", inhalt, dateien: ["SKILL.md", "references/vorlagen.md"] })).toEqual([]);
  });

  it("meldet einen falschen Namen und eine fehlende Beschreibung", () => {
    const messages = pruefeSkill({ ordner: "beispiel", inhalt: "---\nname: anders\n---\nText", dateien: ["SKILL.md"] }).map((b) => b.message);
    expect(messages).toEqual([expect.stringContaining("erwartet „beispiel“"), "description fehlt im Front Matter"]);
  });

  it("meldet eine lange Beschreibung und einen langen Hauptteil", () => {
    const inhalt = skill("x".repeat(BESCHREIBUNG_MAX + 1), "wort ".repeat(HAUPTTEIL_MAX + 1));
    const messages = pruefeSkill({ ordner: "beispiel", inhalt, dateien: ["SKILL.md"] }).map((b) => b.message);
    expect(messages).toEqual([expect.stringContaining("description hat"), expect.stringContaining("Wörter")]);
  });

  it("lässt erzeugte Skills lang", () => {
    const inhalt = skill("Wann laden.", "wort ".repeat(HAUPTTEIL_MAX + 1), "belegvorlage");
    expect(pruefeSkill({ ordner: "belegvorlage", inhalt, dateien: ["SKILL.md"] }, ["belegvorlage"])).toEqual([]);
  });

  it("meldet fehlende und nie genannte Referenzen", () => {
    const inhalt = skill("Wann laden.", "Siehe `references/fehlt.md`.");
    const messages = pruefeSkill({ ordner: "beispiel", inhalt, dateien: ["SKILL.md", "references/waise.md"] }).map((b) => b.message);
    expect(messages).toEqual([expect.stringContaining("references/fehlt.md genannt"), expect.stringContaining("references/waise.md nennt SKILL.md nicht")]);
  });
});

describe("verweise", () => {
  it("findet Pfade in Backticks und Links, ohne fremde Pfade", () => {
    expect(verweise("`references/a.md`, [b](references/b.md), docs/references/c.md")).toEqual(["references/a.md", "references/b.md"]);
  });
});

describe("pruefeAnweisung", () => {
  it("zählt Zeichen, nicht Bytes", () => {
    expect(pruefeAnweisung("CLAUDE.md", "ü".repeat(ANWEISUNG_MAX))).toEqual([]);
    expect(pruefeAnweisung("CLAUDE.md", "x".repeat(ANWEISUNG_MAX + 1))[0].message).toContain("höchstens");
  });
});

describe("pruefeAgentsMd", () => {
  it("meldet Skills, die AGENTS.md nicht nennt", () => {
    const inhalt = "Skills: `checks` (Prüfungen), `beitrag`.";
    expect(pruefeAgentsMd(inhalt, ["checks", "beitrag"])).toEqual([]);
    expect(pruefeAgentsMd(inhalt, ["checks", "release"]).map((b) => b.message)).toEqual([expect.stringContaining("`release`")]);
  });

  it("zählt einen Namen nur in Backticks, nicht als Teil eines längeren", () => {
    expect(pruefeAgentsMd("`beitrag-pruefen`", ["beitrag"])).toHaveLength(1);
  });
});
