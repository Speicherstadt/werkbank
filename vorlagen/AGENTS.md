# Hinweise für Coding-Agenten

<!-- Vorlage aus https://github.com/Speicherstadt/werkbank (vorlagen/AGENTS.md). Gilt für jeden Agenten
     (Claude, Codex, Gemini und andere); CLAUDE.md verweist nur hierher. Höchstens 10.000 Zeichen. -->

<Projekt>: <ein Satz, was es ist und woraus es besteht>.

Die Regeln stehen einmal, in [`docs/mitwirken.md`](docs/mitwirken.md) (Beitragen) und <`docs/entwicklung.md`> (Bauen),
auf Deutsch, für Menschen und Agenten. Diese Datei sagt, wo was steht und was nie passieren darf. Vor dem Start die
Abschnitte lesen, die die Änderung berühren.

## Skills

Die Schritte für wiederkehrende Aufgaben stehen in [`.agents/skills`](.agents/skills); jeder Agent folgt denselben
Dateien. Aus der Werkbank (gleich in allen Projekten, Änderungen dort): `beitrag` (Branch, Commits, Pull Request
als Entwurf, dann Selbstprüfung und Review), `beitrag-pruefen` (gewollt, Quellen, einfachste Lösung, Regeln),
`tdd-review` (unabhängiges Review, ein Befund braucht einen fehlschlagenden Test), `doku-pruefen` (Review des
Markdowns), `design-pruefen` (Oberfläche gegen `DESIGN.md`, Screenshots und Barrierefreiheit prüfen), `fork-pushen`
(Push auf den Fork einer anderen Person), `prs-abarbeiten` (alle offenen Pull Requests, vom einfachsten Merge an),
`issue-schreiben`, `board-pflegen` (das Board auf GitHub), `release`, `fehler-eingrenzen` (Ursache eines Fehlers über
eine rote Prüfung finden) und `vorhaben-klaeren` (einen Plan vor dem Bauen mit der Person durchfragen).
Aus diesem Projekt: `checks` (alle Prüfungen) <und weitere>.

## Nie

- Auf `main` pushen (Ausnahme: Reparatur eines roten `main` durch oder auf Anweisung des Maintainers), Commits von
  Beitragenden umschreiben, mergen (nur Maintainer oder Collaborator mit dessen Zustimmung), eigenen Code reviewen.
- Einen Test überspringen, abschwächen oder löschen, um grün zu werden; einen übersprungenen Test als bestanden melden.
- Issues und Pull Requests ohne Auftrag anlegen oder kommentieren.
- Eine Abhängigkeit hinzufügen, ohne zuerst eigenen Code zu versuchen und den Grund je Paket unter
  „## Neue Abhängigkeiten“ im Pull Request zu nennen.
- Prozesse der Nutzerin oder des Nutzers stoppen; `sudo` umgehen.
- Projekt: <was hier nie passieren darf>

## Bei jeder Änderung

- Jede berührte Datei sauberer hinterlassen, ohne das Verhalten zu ändern, und unter „Aufgeräumt“ nennen.
- Tests für das, was sich ändert; ein Bugfix beginnt mit einem fehlschlagenden Test.
- Doku in `docs/` im selben Pull Request, kurz und für Menschen.
- Issues mit `Umgesetzt #…` oder `Refs #…`, nie `Closes`/`Fixes`.
- Prüfungen grün vor jedem Push (Skill `checks`), übersprungene Tests nennen; danach die CI prüfen.
- Die Beschreibung des Pull Requests wird die Squash-Nachricht: bei jedem Push nachziehen, der etwas daran ändert.
- Vor dem Merge ein unabhängiges Review durch einen eigenen Agenten: `tdd-review` für Code, `doku-pruefen` für Markdown.

## Arbeitsweise

- Deutsch für Kommentare, Doku, Commits, Pull Requests und alles, was Nutzer sehen; Bezeichner englisch.
- Funktional, keine Klassen; eine Datei über ~400 Zeilen und eine Funktion über ~80 werden geteilt.
- Fremde, nicht committete Änderungen gehören jemand anderem (oft einem anderen Agenten): beim eigenen Umfang bleiben.
- Quellen nennen, wo sie ein Detail entscheiden; GitHub-Quellen flach in ein temporäres Verzeichnis klonen.
- Projekt: <Sprache, Stack, Besonderheiten>
