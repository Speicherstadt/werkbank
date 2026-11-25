# Hinweise für Coding-Agenten

Die Werkbank hält, was alle Projekte der Speicherstadt für ihren Ablauf zum Mitwirken teilen: Werkzeuge
(`werkzeug/`), wiederverwendbare Workflows (`.github/workflows/`), die allgemeinen Skills (`skills/`) und Vorlagen
(`vorlagen/`). Wie das zusammenspielt und wie ein Projekt angeschlossen wird, steht im [README](README.md).

## Skills

Die Skills unter `skills/` sind Vorlagen, die der Sync in die Projekte kopiert; in der Werkbank selbst werden sie nur
bearbeitet, nicht ausgeführt: `beitrag`, `beitrag-pruefen`, `tdd-review`, `doku-pruefen`, `fork-pushen`,
`issue-schreiben`, `board-pflegen`, `prs-abarbeiten`, `release`. Sie bleiben allgemein: Was nur ein Projekt
betrifft, gehört in dessen eigene Skills oder in `.github/werkbank.json`.

## Regeln

- Für Änderungen hier gelten dieselben Regeln wie in den Projekten (`vorlagen/mitwirken.md`): Pull Request, Titel
  `Bereich: was sich ändert`, Squash, unabhängiges Review, nie direkt auf `main`.
- Jede Änderung wirkt sofort in allen Projekten, die `@main` aufrufen: Werkzeuge rückwärtskompatibel halten, eine neue
  Einstellung bekommt einen Standard, der das bisherige Verhalten behält.
- Prüfungen vor jedem Push: `bun install`, `bun run lint`, `bun run test`.
- Deutsch für Kommentare, Doku und Commits; Bezeichner englisch. Funktional, keine Klassen.
