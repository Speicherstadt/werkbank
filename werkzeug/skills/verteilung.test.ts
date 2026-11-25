import { describe, expect, it } from "vitest";
import { manifestLesen, manifestText, planen, prBeschreibung } from "./verteilung.ts";

describe("planen", () => {
  it("ersetzt die Skills der Werkbank und lässt eigene des Projekts stehen", () => {
    expect(planen(["beitrag", "tdd-review"], ["beitrag", "checks"], { skills: ["beitrag"] })).toEqual({
      ersetzen: ["beitrag", "tdd-review"],
      entfernen: [],
      konflikte: [],
    });
  });

  it("entfernt, was aus der Werkbank kam und dort nicht mehr ist", () => {
    expect(planen(["beitrag"], ["beitrag", "alt", "checks"], { skills: ["beitrag", "alt"] }).entfernen).toEqual(["alt"]);
  });

  it("überschreibt keinen eigenen Skill mit demselben Namen", () => {
    expect(planen(["release", "beitrag"], ["release"], { skills: [] })).toEqual({ ersetzen: ["beitrag"], entfernen: [], konflikte: ["release"] });
  });
});

describe("manifest", () => {
  it("liest ein fehlendes oder kaputtes Manifest als leer", () => {
    expect(manifestLesen(null)).toEqual({ skills: [] });
    expect(manifestLesen("{kaputt")).toEqual({ skills: [] });
    expect(manifestLesen(manifestText(["b", "a"]))).toEqual({ skills: ["a", "b"] });
  });
});

describe("prBeschreibung", () => {
  it("nennt Ersetztes, Entferntes und Konflikte", () => {
    const text = prBeschreibung("0123456789abcdef", { ersetzen: ["beitrag"], entfernen: ["alt"], konflikte: ["release"] });
    expect(text).toContain("werkbank@0123456");
    expect(text).toContain("Entfernt (nicht mehr in der Werkbank): `alt`");
    expect(text).toContain("eigenen Skill mit demselben Namen hat: `release`");
  });
});
