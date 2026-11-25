import { konfigurationLesen } from "./konfiguration.ts";

/** Konfiguration von Haben, aus dem die Werkzeuge stammen; die Tests von dort prüfen damit weiter dieselben Fälle */
export const HABEN = konfigurationLesen({
  board: { owner: "Speicherstadt", nummer: 3 },
  anleitung: "https://haben.app/mitwirken.html#wenn-eine-prüfung-anschlägt",
  uebernehmen: "https://haben.app/mitwirken.html#etwas-übernehmen",
  code: ["^(apps/(web|firmenportal)/src|packages/[^/]+/src)/.*\\.tsx?$"],
  heikel: [
    "^packages/(core|elster|gobd-kern)/",
    "^apps/web/src/server/modules/(buchhaltung|umsatzsteuer|elster|jahreserklaerung|auswertungen|lohn|sv-meldungen|ausschuettung|finanzamt|koerperschaft)/",
    "^apps/web/drizzle/",
  ],
  grosseDateien: ".checks/large-files.txt",
  duerfenWachsen: ["apps/web/src/server/db/schema.ts"],
});

export const LINKS = {
  board: "[Board](https://github.com/orgs/Speicherstadt/projects/3)",
  anleitung: "[Etwas übernehmen](https://haben.app/mitwirken.html#etwas-übernehmen)",
};
