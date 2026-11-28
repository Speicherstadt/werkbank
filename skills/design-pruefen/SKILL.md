---
name: "design-pruefen"
description: "Oberfläche eines Projekts der Speicherstadt gegen DESIGN.md, Screenshots und Barrierefreiheit prüfen: Gestaltung und Nutzung (Sicht A) getrennt von Technik und Bedien-Hygiene (Sicht B). Als Projekt-/Bereichs-Audit mit Paketvorschlag oder als Optik-Prüfung eines UI-Pull-Requests."
---

# Design prüfen

Der Skill prüft Oberfläche, Bedienbarkeit und Barrierefreiheit aus zwei getrennten Blickwinkeln: **Gestaltung und Nutzung** auf echten Screenshots gegen die Gestaltungsregeln des Projekts (`DESIGN.md`, Mockup) sowie **Technik, Barrierefreiheit und Bedien-Hygiene** im Code. Er ergänzt `tdd-review` (Code-Fehler mit rotem Test) und `doku-pruefen` (Markdown) um das, was Unit-Tests nicht sehen.

Zwei Modi:

- **Audit** (ganzes Projekt oder ausgewählte Bildschirme): vollständige Bestandsaufnahme mit zwei getrennten Sichten, danach entdupliziert und in kleine, umsetzbare Pakete geschnitten. Erst nach Freigabe der Person folgen Issues und Pull Requests.
- **PR-Prüfung** (ein UI-Pull-Request): geänderte Bildschirme, Diff und Vorher/Nachher-Screenshots prüfen und Befunde strukturiert melden.

Grundsätze:

- **Kein Befund ohne Beleg:** jeder Punkt nennt den Screenshot (Bildschirm, Größe, Hell/Dunkel) oder Datei und Zeile im Code sowie die verletzte Regel (`DESIGN.md`, Mockup oder WCAG). Geschmack ohne Beleg ist kein Befund.
- **Unabhängig:** Hat diese Session die Oberfläche selbst gebaut, startet sie für die Prüfung frische Agenten oder Subagenten ohne eigene Einschätzung.
- **Nie ungefragt handeln:** keine Issues, Pull Requests oder Commits ohne Auftrag der Person anlegen.

## 0. Umfang und Quellen holen

- **Gestaltungsregeln lesen:** `DESIGN.md` (oder die Gestaltungsregeln laut `AGENTS.md` des Projekts) und das Mockup, falls vorhanden. Gewollte Abweichungen dort ernst nehmen – sie sind kein Befund.
- **Screenshots finden:** vorhandene Bilder des Projekts (etwa unter `docs/assets/screenshots/`) für Desktop, Handy, Hell/Dunkel und Sondergrößen (etwa Terminal). Bei einer **PR-Prüfung** zusätzlich die Vorher/Nachher-Screenshots aus der PR-Beschreibung und `git diff origin/main...<branch>`.
- **Automatische Prüfungen prüfen:** gibt es im Projekt Barrierefreiheits- oder UI-Tests (etwa Axe/Playwright laut Skill `checks`), deren Stand mit einbeziehen statt Fehler zu raten.

## 1. Zwei getrennte Sichten fahren

Beide Sichten nach Möglichkeit **parallel in zwei frischen Subagenten** ausführen, damit Code-Details nicht die visuelle Wahrnehmung verfärben – und visuelle Eindrücke nicht die technische Prüfung abkürzen.

- **Sicht A – Gestaltung & Nutzung:** prüft die Screenshots (und bei PR-Prüfung Vorher/Nachher) gegen `DESIGN.md` und Mockup nach `references/gestaltung.md`. Keine Code-Optimierungen, sondern das, was ein Mensch auf dem Bildschirm sieht und bedient.
- **Sicht B – Technik, Barrierefreiheit & Bedien-Hygiene:** prüft CSS-Tokens, Komponenten, Formulare, Tastatur-, Touch-, Dark-Mode- und RTL-Verhalten im Code nach `references/checkliste.md`.

Im Modus **PR-Prüfung** beschränken sich beide Sichten auf die vom Diff berührten Bildschirme und gemeinsamen UI-Komponenten.

## 2. Zusammenführen und einordnen

Beide Berichte zusammenlegen, Doppelungen streichen und jeden Befund gegen `DESIGN.md` und den aktuellen Code auf `main` (bzw. den PR-Stand) gegenchecken. Einordnen in vier Stufen:

- **Fehler (hoch):** bricht Bedienung, Kontrast, Barrierefreiheit, Mobilansicht oder eine klare Regel in `DESIGN.md`.
- **Verbesserung (mittel):** spürbare Reibung bei Hierarchie, Orientierung, Touch, Formular-Schutz oder Dark Mode.
- **Feinschliff (niedrig):** kleine visuelle oder textliche Schärfung mit klarem Beleg.
- **Kein Befund / Bewusst so:** Stellen, die `DESIGN.md` oder das Projekt ausdrücklich so festlegt.

## 3. Weiter nach Modus

### Modus Audit

Den zusammengeführten Bericht knapp vorstellen (nach Schwere geordnet, je Punkt Beleg und konkreter Vorschlag) und die Befunde in **kleine, unabhängige Umsetzungspakete** schneiden – typischerweise:

1. eindeutige Fehler und Quick-Wins;
2. Basis-Komponenten, Kontrast, Barrierefreiheit und Touch-Verhalten;
3. ein komplexer Einzelbereich (etwa Kalender, Plan, Tabelle);
4. visuelle Hierarchie und Feinschliff.

**Hier anhalten und die Person fragen**, welche Pakete umgesetzt werden sollen. Erst auf Freigabe:

- je Paket ein Issue nach Skill `issue-schreiben` (Label `oberfläche` / `fehler` oder `wunsch`, je nach Projekt);
- je Paket ein kleiner Pull Request nach Skill `beitrag` mit Selbstprüfung (`beitrag-pruefen`), unabhängigem `tdd-review` (und `doku-pruefen`, wenn `DESIGN.md` oder `docs/` berührt sind);
- nach Änderungen am Aussehen den Screenshot-Workflow des Projekts laufen lassen und die neuen Bilder ansehen.

### Modus PR-Prüfung

Einen klaren Kommentar nach dem Umgangston aus `beitrag-pruefen` schreiben (bei reiner Durchsicht ohne Auftrag erst der Person vorlegen), getrennt in:

- **Vor dem Merge:** Fehler gegen `DESIGN.md`, Kontrast, Barrierefreiheit oder Mobil-Nutzbarkeit, jeweils mit Beleg und konkretem Vorschlag;
- **Vorschläge:** sinnvolle Verbesserungen ohne Zwang;
- **Folge-Issue:** Auffälligkeiten außerhalb des PR-Umfangs.

## Abschlussbericht

- **Audit:** geprüfte Bildschirme und Dateien, Befunde je Schweregrad, vorgeschlagene Pakete und offene Entscheidungen für die Person (bzw. nach Freigabe: Links zu Issues, Pull Requests und aktualisierten Screenshots).
- **PR-Prüfung:** PR-Link, geprüfte Bildschirme, Befunde (vor dem Merge / Vorschläge / Folge-Issue) und fehlende Screenshots, falls das Aussehen sich ändert.
