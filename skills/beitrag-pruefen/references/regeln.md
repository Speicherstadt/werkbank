# Regeln von Hand (Schritt 4)

Teil von Skill `beitrag-pruefen`. Die Regeln selbst stehen in docs/mitwirken.md des Projekts, in seinen Konventionen und unter „Never“ bzw. den Verboten in AGENTS.md des Projekts.

Je Punkt ✓, ✗ mit Datei und Zeile, oder „betrifft nicht“:

- **Tests:** Zu jeder geänderten Funktion ein Test, der das neue Verhalten zeigt; ein Bugfix beginnt mit einem Test, der ohne den Fix rot ist (Commit-Reihenfolge ansehen); die Varianten, die docs/mitwirken.md für Tests verlangt, je abgedeckt; Unit-, Integrations- und End-to-End-Tests so, wie das Projekt sie aufteilt (Skill `checks`); neue Seiten in den Tests, die alle Seiten durchgehen, falls es sie gibt.
- **Keine Tests geschwächt:** im Diff nach entfernten `it(`/`test(`, `.skip`, `.only`, `.todo`, `test.fixme`, gelockerten Erwartungen (`toBeCloseTo` statt `toBe`, weniger Felder in `toEqual`), geänderten Erwartungswerten ohne Grund in der Beschreibung, erhöhten Timeouts, `--passWithNoTests` suchen. Was übersprungen wurde, muss in der Beschreibung stehen.
- **Doku:** Die Nutzerseite in `docs/`, die das Verhalten beschreibt, ist geändert und stimmt mit dem Code überein; neue Seiten mit Front Matter und im Inhaltsverzeichnis der Doku; README nur bei neuem oder wegfallendem Bereich. Erzeugte Dateien mit dem Skript des Projekts erzeugt, nicht von Hand.
- **Fachlich heikle Pfade:** die Verbote aus AGENTS.md und docs/mitwirken.md des Projekts für die Pfade aus `heikel` in .github/werkbank.json eingehalten (etwa keine bestehende Migration geändert, erzeugte Metadaten nicht von Hand, Sperren und Schutzmechanismen nicht gelockert, vorhandene Bausteine genutzt statt eigener).
- **Pakete und Module:** Baut der Diff etwas nach, wofür es im Projekt schon ein Paket oder Modul gibt, statt es zu erweitern?
- **Neue Abhängigkeiten:** je neuem Paket in einer Paketliste ein Grund im Abschnitt `## Neue Abhängigkeiten` der Beschreibung, und dass eigener Code zuerst versucht wurde.
- **Übrige Konventionen:** Geheimnisse nur dort, wo das Projekt sie verschlüsselt ablegt; Sprache der Kommentare und Texte nach AGENTS.md; Stil (etwa funktional ohne Klassen), wie die Konventionen ihn verlangen.
- **Länge:** Jede Funktion, die „PR-Regeln“ als neu oder gewachsen über die Grenze (`funktionMax` in .github/werkbank.json) nennt, ist ein Befund „vor dem Merge nötig“, auch mit Grund in der Beschreibung; teilen darf die prüfende Person selbst (Kleinigkeit). Alte lange Funktionen, die der Pull Request nicht verlängert, sind kein Befund; teilt er sie mit, prüfen, dass sich das Verhalten nicht ändert.
- **Pfadfinder-Regel:** Aufgeräumtes ohne Verhaltensänderung, aufgeführt unter `## Aufgeräumt`.
- **Oberfläche:** Gestaltungsregeln des Projekts eingehalten und bei neuer Gestaltungsregel mitgeändert; Screenshots vorher und nachher (Skill `pr-screenshots`, falls das Projekt ihn hat), hell und dunkel, wo nötig am Handy.
- **Pull Request:** Titel `Bereich: was sich ändert (#Issue)`; Beschreibung nennt alles, was sich ändert, das Ergebnis statt des Wegs, was lokal lief und was übersprungen wurde, `Umgesetzt #…` oder `Refs #…` (nie `Closes`/`Fixes`); KI-Kennzeichnung (`Co-Authored-By:` in Commits, „🤖 Generated with …“ in der Beschreibung), wenn ein Agent beteiligt war; Entwurf oder „Ready for review“; CI-Stand.
