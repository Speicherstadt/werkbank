# Werkbank

Der gemeinsame Ablauf zum Mitwirken für die Projekte der Speicherstadt: dieselben Regeln für Pull Requests,
derselbe Bot, dasselbe Board und dieselben Skills für Agenten, egal ob mit Claude, Codex, Gemini oder ohne Agent.
Entstanden aus [Haben](https://github.com/Speicherstadt/haben), wo der Ablauf zuerst lief.

| Teil | Wo | Was |
| --- | --- | --- |
| PR-Regeln | `.github/workflows/pr-regeln.yml`, `werkzeug/pr-regeln/` | Titel, `Umgesetzt`/`Refs` statt `Closes`, neue Abhängigkeiten nur mit Begründung, Hinweise auf Code ohne Doku, Fix ohne Test, lange Funktionen, heikle Pfade, Selbstprüfung |
| Kommentar | `.github/workflows/pr-regeln-kommentar.yml` | ein Kommentar je Pull Request mit dem Ergebnis, bei jedem Push geändert, auch bei Forks |
| Board | `.github/workflows/board.yml`, `werkzeug/board/` | Karten wandern mit: zugewiesen oder PR geöffnet → „In Arbeit“, gemergt → „Im nächsten Release“ |
| Übernehmen | `.github/workflows/uebernehmen.yml` | `/übernehmen` und `/freigeben` in Issues, Erinnerung nach 14 Tagen, Freigabe sieben Tage später |
| Issues schließen | `.github/workflows/issues-schliessen.yml` | eine fertige Version schließt die umgesetzten Issues mit Link auf das Release |
| Skills | `skills/`, `werkzeug/skills/` | neun allgemeine Skills; der Sync bringt sie per Pull Request nach `.agents/skills/` jedes Projekts, die Skill-Prüfung läuft in „PR-Regeln“ |
| Vorlagen | `vorlagen/` | Aufrufe der Workflows, `werkbank.json`, `AGENTS.md`, `CLAUDE.md`, `docs/mitwirken.md` |

## Warum so

- **Regeln setzt GitHub durch, nicht der Agent.** Was zählt, prüfen die Workflows; welches Werkzeug jemand benutzt, ist
  dafür gleich.
- **Offene Formate für Agenten.** `AGENTS.md` lesen die meisten Agenten; Skills sind Ordner mit `SKILL.md`, die
  mehrere Agenten aus `.agents/skills/` laden. Für Claude zeigt `.claude/skills` dorthin. Wer keinen Agenten hat, liest
  dieselben Dateien.
- **Einmal gepflegt.** Workflows und Werkzeuge rufen die Projekte von hier auf, die Skills kopiert der Sync. Was nur
  ein Projekt betrifft, steht in seiner `.github/werkbank.json`, in seinen eigenen Skills (mindestens `checks`) und in
  seinem `docs/mitwirken.md`.

## Ein Projekt anschließen

1. **Workflows:** `vorlagen/workflows/pr-regeln.yml`, `pr-regeln-kommentar.yml`, `board.yml` und `uebernehmen.yml`
   nach `.github/workflows/` kopieren; `release-issues.yml` als Job in den eigenen Release-Workflow.
2. **Einstellungen:** `vorlagen/werkbank.json` nach `.github/werkbank.json`, Board-Nummer und Links eintragen, dazu
   was abweicht. Alle Einstellungen mit Standard stehen in `werkzeug/konfiguration.ts`; unbekannte Schlüssel sind ein
   Fehler.
3. **Doku und Agenten:** `vorlagen/AGENTS.md`, `vorlagen/CLAUDE.md` und `vorlagen/mitwirken.md` (nach `docs/`)
   übernehmen und die Platzhalter füllen. Einen eigenen Skill `checks` mit den Prüfbefehlen des Projekts unter
   `.agents/skills/checks/` anlegen und `.claude/skills` als Verweis auf `../.agents/skills`.
4. **Skills:** das Projekt in `verteilung.json` eintragen; der nächste Lauf von „Skills verteilen“ öffnet dort einen
   Pull Request.
5. **Auf GitHub** (braucht Admin-Rechte):
    - Ruleset für `main`: Pull Request nötig, Check `pr-regeln / pr-regeln` und die eigene CI nötig, nur Squash-Merge.
    - Repository-Einstellung: Squash-Commit mit Titel und Beschreibung des Pull Requests.
    - Board (Project der Organisation) mit dem Feld „Status“ und den Spalten Später, Geplant, In Arbeit, Im nächsten
      Release, Erledigt; der Workflow des Boards „Item closed“ setzt „Erledigt“.
    - Labels `fehler`, `wunsch`, `frage`, `technik`, `doku`, `einstieg`.
    - Secret `PROJECT_TOKEN` (klassisches Token mit Scope `project`) im Projekt oder in der Organisation.
    - In der Werkbank: Secret `SKILLS_TOKEN` (Schreibrecht auf Inhalte und Pull Requests der Projekte).

Angeschlossen: [Schreibzeug](https://github.com/Speicherstadt/schreibzeug) (Pilot). Haben folgt, wenn das zweite
Projekt läuft.

## Lokal vor dem Push

```sh
git clone --depth 1 https://github.com/Speicherstadt/werkbank ../werkbank && (cd ../werkbank && bun install)
bun ../werkbank/werkzeug/pr-regeln/pruefen.ts --titel "Bereich: was sich ändert (#12)" --beschreibung beschreibung.md
bun ../werkbank/werkzeug/skills/pruefen.ts
```

## An der Werkbank arbeiten

`bun install`, `bun run lint`, `bun run test`. Jede Änderung wirkt sofort in allen Projekten, die `@main` aufrufen;
Regeln für Agenten in [`AGENTS.md`](AGENTS.md).

## Noch offen

- `bun.lock` fehlt noch: Das Paket `@firsttris/checks` kommt von GitHub, und die Umgebung, in der die Werkbank
  entstand, konnte es nicht laden. Einmal `bun install` auf einem Rechner und `bun.lock` committen; danach in
  `ci.yml` und `pr-regeln.yml` wieder `--frozen-lockfile`.
- Projekte rufen `@main` auf. Sobald sich die Werkbank seltener ändert, Tags (`v1`) und Aufrufe mit `@v1`.
