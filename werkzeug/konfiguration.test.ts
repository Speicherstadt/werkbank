import { describe, expect, it } from "vitest";
import { anleitungsLink, konfigurationLesen, passt, STANDARD } from "./konfiguration.ts";

describe("konfigurationLesen", () => {
  it("ergänzt die Standards und übernimmt, was das Projekt nennt", () => {
    const k = konfigurationLesen({ board: { owner: "Speicherstadt", nummer: 5 }, funktionMax: 60 });
    expect(k.board).toEqual({ owner: "Speicherstadt", nummer: 5 });
    expect(k.funktionMax).toBe(60);
    expect(k.code).toEqual(STANDARD.code);
    expect(konfigurationLesen(undefined)).toEqual(STANDARD);
  });

  it("lässt $schema und Kommentarfelder mit $ durch", () => {
    expect(konfigurationLesen({ $schema: "x", $kommentar: "y" })).toEqual({ ...STANDARD, $schema: "x", $kommentar: "y" });
  });

  it("wirft bei Unbekanntem und falschen Typen, damit ein Tippfehler nicht still verpufft", () => {
    expect(() => konfigurationLesen({ heikle: [] })).toThrow("unbekannte Einstellung heikle");
    expect(() => konfigurationLesen({ funktionMax: "80" })).toThrow("funktionMax");
    expect(() => konfigurationLesen({ heikel: "^packages/" })).toThrow("heikel");
    expect(() => konfigurationLesen({ heikel: ["(kaputt"] })).toThrow();
    expect(() => konfigurationLesen({ board: { owner: "o" } })).toThrow("board");
    expect(() => konfigurationLesen({ anleitung: 3 })).toThrow("anleitung");
  });
});

describe("passt und anleitungsLink", () => {
  it("prüft Pfade gegen die Ausdrücke", () => {
    expect(passt(STANDARD.code, "apps/web/src/a.tsx")).toBe(true);
    expect(passt(STANDARD.code, "docs/a.md")).toBe(false);
    expect(passt([], "apps/web/src/a.tsx")).toBe(false);
  });

  it("verlinkt die Seite des Projekts oder nennt docs/mitwirken.md", () => {
    expect(anleitungsLink("https://x.app/mitwirken#a", "Etwas übernehmen")).toBe("[Etwas übernehmen](https://x.app/mitwirken#a)");
    expect(anleitungsLink(null, "Etwas übernehmen")).toBe("„Etwas übernehmen“ in docs/mitwirken.md");
  });
});
