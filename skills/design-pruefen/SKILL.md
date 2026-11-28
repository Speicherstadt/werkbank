---
name: "design-pruefen"
description: "Oberfläche eines Projekts der Speicherstadt mit zwei isolierten Sichten prüfen: UX-Design-Critique (Nielsen-Heuristiken /40, Cognitive Load, Personas, Craft Floor nach Impeccable) plus technisches Audit (/20) und Web Interface Guidelines (Vercel). Für Projekt-/Bereichs-Audits und UI-Pull-Requests."
---

# Design prüfen

Verbindet zwei bewährte Prüfverfahren für Projekte der Speicherstadt – **Impeccable** (`critique` + `audit` + `craft-floor`, [pbakaus/impeccable](https://github.com/pbakaus/impeccable)) und **Web Interface Guidelines** ([vercel-labs/web-interface-guidelines](https://github.com/vercel-labs/web-interface-guidelines)) – mit den Gestaltungsregeln (`DESIGN.md`, Mockup) und dem Beitragsablauf des Projekts. Ergänzt `tdd-review` (Code-Fehler mit rotem Test) und `doku-pruefen` (Markdown).

Zwei Modi:

- **Audit** (Projekt, Bereich oder ausgewählte Bildschirme): vollständige Dual-Agent-Bewertung mit Scores (`/40` und `/20`), `P0`–`P3`-Priorisierung, Persona-Red-Flags, systemischen Mustern und Paketvorschlag. Erst nach Freigabe der Person folgen Issues und Pull Requests.
- **PR-Prüfung** (ein UI-Pull-Request): dieselbe Methode fokussiert auf Diff, berührte Bildschirme, gemeinsame Komponenten und Vorher/Nachher-Screenshots.

## Harte Regeln

- **Zwei isolierte Subagenten (Pflicht, wenn Subagenten verfügbar sind):** Sicht A (Design-Critique) und Sicht B (Technisches Audit & Guidelines) laufen **parallel und isoliert**, ohne die Ausgabe der jeweils anderen Sicht zu kennen. Erst danach führt die Hauptsession beide zusammen. So verfärben technische Lint-Treffer nicht das visuelle Urteil, und visuelle Eindrücke kürzen das technische Audit nicht ab.
- **Degraded-Banner bei Einzelkontext:** Steht kein Subagent-Werkzeug zur Verfügung (oder in einer schreibgeschützten Delegation), zuerst Sicht A komplett abschließen, erst danach Sicht B laufen lassen – und als erste Zeile des Berichts zwingend ausgeben: `⚠️ DEGRADED: Einzelkontext (<Grund>)`. Eine stille Degradierung gilt als fehlgeschlagener Lauf.
- **Kein Befund ohne Beleg:** jeder Befund nennt den konkreten Screenshot (Bildschirm, Viewport, Theme) oder `datei:zeile` und die verletzte Regel (`DESIGN.md`, Heuristik, WCAG oder Guideline). Kein weichgespültes „könnte man prüfen“, kein reiner Geschmack ohne Beleg.
- **Erst der Bericht, dann konkrete Rückfragen – nie ungefragt bauen:** keine Issues, PRs oder Commits ohne Auftrag. Am Ende eines Audits stehen immer 2–4 konkrete Entscheidungsfragen mit Optionen (außer bei weniger als 3 Prioritäts-Befunden oder rein delegiertem Lauf, dann `Fragen übersprungen: <Grund>`).

## 0. Ziel, Kontext und Nachweise holen

1. **Ziel festlegen:** konkretes Projekt, Route, Komponente oder PR (`git diff --name-only origin/main...<branch>`).
2. **Gestaltungsregeln lesen:** `DESIGN.md` (und `PRODUCT.md`/Mockup, falls vorhanden). Gewollte Abweichungen und feste Vorgaben der Oberfläche respektieren (z. B. Betriebsmodus **Operate** / **Read** / **Persuade** / **Experience** – bei Arbeitswerkzeugen zählen Präzision, Scanbarkeit und Ruhe mehr als Dekoration).
3. **Visuelle Wahrheit prüfen:** echte Screenshots des Projekts (z. B. `docs/assets/screenshots/` in Hell/Dunkel, Desktop, Handy, weitere Ansichtsgrößen) oder laufende App im Browser betrachten. Bei PR-Prüfung Vorher/Nachher-Screenshots aus der PR-Beschreibung heranziehen.
4. **Vorhandene Prüfwerkzeuge mitnehmen:** gibt es im Projekt Axe-/Playwright-A11y-Tests (Skill `checks`) oder ist `impeccable detect` lokal verfügbar, diese Ergebnisse in Sicht B einbeziehen und klar nennen, was lief und was fehlte.

## 1. Zwei isolierte Sichten ausführen

Beide Subagenten parallel starten (ohne eigene Einschätzung im Prompt):

- **Sicht A – Design-Critique (`references/critique-rubric.md`):**
  - Arbeitet auf Screenshots/gerenderter Oberfläche, `DESIGN.md` und Mockup (ohne Output von Sicht B).
  - Prüft: **Design-Spezifität** (eigenständig fürs Produkt oder austauschbarer Einheitsbrei?), **Nielsen-Heuristiken 1–10** (je 0–4, Summe `/40` bzw. renormiert bei `n/a`), **Cognitive Load** (8-Punkte-Checkliste + Arbeitsgedächtnis-Regel `≤ 4` + 8 typische Verstöße), **Emotionale Reise** (Peak-End, Vertrauen bei heiklen Momenten), **Persona-Walkthroughs** (2–3 passende aus Alex, Jordan, Sam, Riley, Casey plus 1–2 projektbezogene aus `DESIGN.md`/`PRODUCT.md`) sowie **Craft Floor & Anti-Slop** (`Verify` / `Refuse`).
- **Sicht B – Technisches Audit & Web Interface Guidelines (`references/audit-und-guidelines.md`):**
  - Prüft Code, CSS-Tokens, Komponenten und – falls vorhanden – Detektor-/Axe-Läufe.
  - Bewertet die **5 Audit-Dimensionen** (je 0–4, Summe `/20`): Accessibility, Performance, Theming, Responsive Design (inkl. Touch-Gesten & RTL-Regeln) und Implementation Integrity.
  - Prüft die kompletten **Web Interface Guidelines** (16 Kategorien + 14 Anti-Patterns) und liefert kompakte `datei:zeile`-Befunde sowie **systemische Muster** und **positive Funde**.

## 2. Zusammenführen und Bericht ausgeben

Beide Sichten in **einem** zusammenhängenden Bericht verweben (nicht bloß hintereinanderkleben): markieren, wo A und B übereinstimmen, was nur Sicht B gefunden hat und welche Detektor-Treffer Fehlalarme sind.

Pflichtstruktur des Berichts:

1. **Herkunftszeile:** `Methode: Dual-Agent (A: <ID/Rolle> · B: <ID/Rolle>)` oder das Degraded-Banner.
2. **Design Health Score (Nielsen `/40`) & Audit Health Score (`/20`):** beide Tabellen mit Bewertungsband und Hauptbefund je Zeile.
3. **Design-Spezifität & Implementation Integrity:** klares Urteil, ob die Oberfläche stimmig aus dem Produkt heraus gebaut ist oder nach Baukasten/Drift wirkt (inkl. Stand automatischer Scans).
4. **Was gut funktioniert:** 2–3 konkrete Stärken, die erhalten bleiben sollen.
5. **Prioritäts-Befunde (`P0`–`P3`):** die wichtigsten Befunde nach Schwere (`P0` blockierend, `P1` wesentlich/WCAG-AA, `P2` störend mit Umweg, `P3` Feinschliff), jeweils mit **Beleg**, **Warum es Nutzer trifft** und **konkretem Fix**.
6. **Persona-Red-Flags:** konkrete Brüche je ausgewählter Persona am Hauptablauf.
7. **Systemische Muster & `file:line`-Liste:** wiederkehrende Lücken (z. B. fehlendes Token, Touch-Ziele) plus kompakte Web-Guidelines-Treffer nach Datei.
8. **Provokante Fragen:** 2–3 zugespitzte Fragen, die bessere Lösungen freilegen.

## 3. Weiter nach Modus

### Modus Audit

Nach dem Bericht die Befunde in **kleine, unabhängige Umsetzungspakete** schneiden (z. B. 1. `P0`/Quick-Wins, 2. Basis-Komponenten/A11y/Touch, 3. komplexer Einzelbereich, 4. Hierarchie & Feinschliff) und die Person mit **2–4 konkreten Auswahlfragen** (Priorität, Umfang, ggf. beabsichtigter Ton/Tabu-Bereiche) entscheiden lassen.

Erst auf Freigabe:
- je Paket ein Issue nach Skill `issue-schreiben`;
- je Paket ein kleiner Pull Request nach Skill `beitrag` mit Selbstprüfung (`beitrag-pruefen`), unabhängigem `tdd-review` (und `doku-pruefen`, wenn Markdown geändert ist);
- nach Änderungen am Aussehen Screenshots aktualisieren und die neuen Bilder ansehen.

### Modus PR-Prüfung

Den Bericht kompakt auf den PR-Umfang zuschneiden und im Umgangston von `beitrag-pruefen` trennen in **Vor dem Merge (`P0`/`P1`)**, **Vorschläge (`P2`/`P3`)** und **Folge-Issue** (außerhalb des PR-Umfangs). Bei reiner Durchsicht ohne Auftrag erst der Person vorlegen, nicht ungefragt kommentieren.
