---
title: "Mitwirken an <Projekt>: Branches, Prüfungen, Review"
description: >-
  Wie ein Beitrag zu <Projekt> entsteht: Aufgabe übernehmen, Branches, Titel und Commits, Arbeit mit KI-Agenten,
  automatische Prüfungen, Issues, Beiträge annehmen und Review.
---

<!--
  Vorlage aus https://github.com/Speicherstadt/werkbank (vorlagen/mitwirken.md). Platzhalter in <spitzen Klammern>
  ersetzen; Abschnitte mit „Projekt:“ um das ergänzen, was nur hier gilt. Der Rest gilt für alle Projekte der
  Speicherstadt gleich; eine Verbesserung daran gehört auch in die Vorlage.
-->

# Mitwirken

**Programmieren musst du nicht.** Fehler melden, die Doku korrigieren und neue Versionen testen hilft genauso. Ein [Issue](#issues-schreiben) genügt.

Vor jedem Push dieselben Prüfungen wie in der CI; die Befehle stehen im Skill [`checks`](../.agents/skills/checks/SKILL.md). Was übersprungen wurde, gehört in die Beschreibung des Pull Requests.

- Ein Pull Request, ein Thema; er trägt nur seine eigenen Commits.
- **Aufräumen gehört dazu (Pfadfinder-Regel):** Was beim Arbeiten in den berührten Dateien auffällt, etwa ein wackeliger Test, eine zu lange Funktion oder toter Code, wird im selben Pull Request mit verbessert und in der Beschreibung unter „Aufgeräumt“ genannt. Das Verhalten ändert sich dabei nicht, die Tests zeigen es; ein wackeliger Test wird an der Ursache behoben, nicht abgeschwächt. Nicht über die berührten Dateien hinaus.
- **Tests für das, was sich ändert.** Ein Bugfix beginnt mit einem Test, der fehlschlägt.
- **Die Doku in `docs/`**, die das Verhalten beschreibt, im selben Pull Request, kurz und für Menschen; Schritte für Agenten gehören in einen Skill, Interna eines Skripts in seine Kommentare. Das README nur, wenn ein Bereich dazukommt oder wegfällt.
- **Änderungen am Aussehen** mit Screenshots vorher und nachher in der Beschreibung; die Bilder für „vorher“ entstehen vor der ersten Änderung.
- Projekt: <weitere Regeln, etwa Texte der Oberfläche in beiden Sprachen>

## Etwas übernehmen

Wer mitbauen will, sucht sich eine Aufgabe im [Board](<Board-Link>) aus:

1. **Aussuchen:** eine Karte aus „Geplant“, am liebsten weit oben, denn die Reihenfolge ist die Priorität. Für den Einstieg eignen sich Issues mit dem Label `einstieg`. Ein Vorschlag ohne Issue bekommt zuerst ein Issue.
2. **Übernehmen:** im Issue eine Zeile `/übernehmen` kommentieren, gern mit einem kurzen Plan darunter. Der Workflow „Übernehmen“ weist dir das Issue zu, schiebt die Karte nach „In Arbeit“ und bestätigt es im Issue; Schreibrecht brauchst du dafür nicht. Er lehnt mit Begründung ab, wenn das Issue schon vergeben ist, noch keine Karte hat oder schon umgesetzt ist.
3. **Nachfragen und Freigeben:** Kommt 14 Tage lang weder ein Pull Request mit `Refs` oder `Umgesetzt` noch ein Kommentar von dir, fragt der Workflow im Issue nach; kommt danach sieben Tage nichts, hebt er die Zuweisung auf, und die Karte geht zurück nach „Geplant“. Wer aufhören will, kommentiert `/freigeben`.
4. **Bauen:** wie im Folgenden beschrieben, mit `Umgesetzt #…` in der Beschreibung und vor „Ready for review“ mit der [Selbstprüfung](#beiträge-annehmen).

## Branches, Titel und Commits

- **Branch:** Wer Schreibrecht hat, legt den Branch im Repository an, alle anderen in ihrem Fork. Direkt auf `main` wird nicht gepusht, außer zur Reparatur eines roten `main` ([Wer mergt was](#wer-mergt-was)). Vor jedem Push prüfen, ob der Pull Request des Branches noch offen ist; ist er gemergt, neu von `origin/main`.
- **Entwurf:** Ein Pull Request bleibt Entwurf, solange noch an ihm gearbeitet wird. Commits sammeln und gemeinsam pushen; die Runner teilt sich die ganze Organisation.
- **Titel:** `Bereich: was sich ändert (#Issue)`, etwa „Export: PDF mit Lesezeichen (#104)“; die Nummer nur, falls es ein Issue gibt, jede aus `Umgesetzt #…` gehört hinein. Der Bereich ist ein bis drei Wörter, groß geschrieben, ohne Punkt am Ende. Pull Requests werden per **Squash** gemergt; der Titel wird der Commit auf `main`.
- **Beschreibung:** Beim Squash wird sie die Nachricht des Commits auf `main` (Einstellung des Repositorys: „Default to pull request title and description“). Sie passt deshalb bis zum Merge zum Stand: Ändert ein Push, was der Pull Request tut oder wie er geprüft wurde, ändert sie sich mit. Sie beschreibt das Ergebnis, nicht den Weg.
- **Abschnitte der Beschreibung**, wo sie zutreffen: `## Aufgeräumt` (Pfadfinder-Regel), `## Neue Abhängigkeiten` (je Paket: wofür, warum eigener Code nicht reicht, Lizenz, wie viele Pakete es mitbringt), `## Für das Release` (was jemand beim Update wissen oder tun muss).
- **Issues in der Beschreibung:** `Umgesetzt #…`, wenn der Pull Request das Issue fertig macht, sonst `Refs #…`. Mehrere als Liste: `Umgesetzt #12, #13`. Nie `Closes` oder `Fixes`: GitHub schlösse das Issue schon beim Merge, die Nutzer haben es aber erst mit dem Release.
- **Commits im Pull Request:** gern im Stil von [Conventional Commits](https://www.conventionalcommits.org/de/) auf Deutsch (Empfehlung, keine Prüfung).

### Vom Issue zum Release

Das Board zieht die Karte mit, nie zurück: Issue zugewiesen oder Pull Request mit `Refs`/`Umgesetzt` geöffnet → „In Arbeit“; mit `Umgesetzt` gemergt → „Im nächsten Release“; eine fertige Version (kein Release Candidate) schließt das Issue mit Link auf das Release → „Erledigt“. Was die Automatik nicht sieht, erledigt der Skill `board-pflegen`.

## Mit KI-Werkzeugen

Mit KI-Agenten zu arbeiten ist ausdrücklich in Ordnung, mit jedem Werkzeug. Der Transparenz halber wird es gekennzeichnet: im Commit mit `Co-Authored-By: <Werkzeug oder Modell> <Adresse>`, in der Beschreibung mit einer Zeile wie „🤖 Generated with <Werkzeug>“. Verantwortlich für den Inhalt bleibt, wer den Pull Request einreicht.

Die Regeln für Agenten stehen in [`AGENTS.md`](../AGENTS.md), die Schritte für wiederkehrende Aufgaben in den Skills unter `.agents/skills/`. Die meisten davon kommen aus der [Werkbank](https://github.com/Speicherstadt/werkbank) und sind in allen Projekten gleich; Änderungen daran gehören dorthin.

## Automatische Prüfungen der Regeln

Der Workflow „PR-Regeln“ aus der Werkbank prüft jeden Pull Request, auch Entwürfe, und schreibt das Ergebnis als einen Kommentar, der sich mit jedem Push ändert. Eingestellt wird er in `.github/werkbank.json`.

| Regel | Wirkung |
| --- | --- |
| Titel `Bereich: was sich ändert`, `(#Issue)` für jedes Issue aus `Umgesetzt` | Fehler |
| Issues mit `Umgesetzt #…` oder `Refs #…`, nicht `Closes` oder `Fixes` | Fehler |
| Neue Abhängigkeit in einer `package.json` | Hinweis, ohne Begründung unter `## Neue Abhängigkeiten` Fehler |
| Skills: Beschreibung höchstens 320 Zeichen, Hauptteil höchstens 1.500 Wörter, jede Datei unter `references/` genannt; `AGENTS.md` nennt jeden Skill | Fehler |
| Code ohne Änderung in `docs/`, `fix`-Commit ohne Test | Hinweis |
| Funktion über der Grenze neu oder gewachsen, alte große Datei wächst deutlich, Doku-Seite zu lang | Hinweis |
| Fachlich heikle Pfade (`heikel`): Merge erst nach „OK“ des Maintainers | Hinweis |
| Pull Request von außen: Selbstprüfung und unabhängiges Review mitbringen | Hinweis |
| Projekt: <eigene Prüfungen in der CI> | |

Vor dem Push meldet `bun <werkbank>/werkzeug/pr-regeln/pruefen.ts --titel "…" --beschreibung <datei>` dasselbe in unter einer Sekunde (Skill `beitrag`).

### Wenn eine Prüfung anschlägt

Titel, Issue-Verweise und Abhängigkeiten sagen in der Meldung selbst, was zu tun ist. Eine neue oder über die Grenze gewachsene Funktion wird vor dem Merge geteilt; ein Grund in der Beschreibung reicht dort nicht. Bei den übrigen Hinweisen (Code ohne Doku, Fix ohne Test, große Datei, lange Seite): beheben, oder der Grund steht in der Beschreibung.

## Issues schreiben

Ein Issue behandelt ein Thema und passt auf ein bis zwei Bildschirme. Fragen gehören in die Discussions, bestätigte Fehler und konkrete Wünsche in Issues; sie kommen ins Board. Größere Vorhaben und Issues von Agenten gliedern sich in **Anlass**, **Stand** (auf dem aktuellen `main` geprüft, mit Links), **Vorschlag** (mit Grenzen), **Akzeptanzkriterien** (drei bis sechs prüfbare Punkte als `- [ ]`) und **Bezug** (verwandte Issues, Quellen). Agenten legen Issues nur auf Anweisung an; die Schritte stehen im Skill `issue-schreiben`.

Labels: der Typ (`fehler`, `wunsch`, `frage`, `technik`, `doku`) und `einstieg` für Kleines und Abgegrenztes. Projekt: <Themen-Labels>

## Beiträge annehmen

Bevor ein Pull Request ins [Review](#review) geht, egal von wem, beantwortet jemand, der ihn nicht geschrieben hat, vier Fragen, jede mit Beleg (Stelle im Diff, Satz aus der Quelle, Regel):

1. **Wollen wir das?** Es passt zum Projekt, hat ein Issue (sonst entscheidet der Maintainer zuerst), und der Nutzen ist größer als die dauerhafte Last jeder Einstellung, Abhängigkeit und jedes Sonderfalls.
2. **Nach den Quellen gebaut und richtig?** Jedes Detail, das eine Quelle entscheidet (Norm, Format, Referenzimplementierung), steht mit Quelle im Kommentar. Wer prüft, liest die Quelle selbst und rechnet einen typischen und einen Randfall gegen die Tests nach.
3. **Die einfachste und beste Lösung?** Jeder Teil des Diffs dient einem Akzeptanzkriterium oder ist Aufräumen; keine Abstraktion mit einem Nutzer, keine Einstellung auf Vorrat. Ersetzt ein Umbau einen Weg, fällt der alte weg, außer ein benannter Grund spricht dagegen. Befund ist das nur mit konkret benanntem besseren Weg.
4. **Nach unseren Regeln?** Diese Seite und die Konventionen des Projekts.

**Selbstprüfung:** Beitragende beantworten die vier Fragen vor „Ready for review“ selbst (Skill `beitrag-pruefen`), in einem frischen Agenten oder durch jemand anderen, und posten das Ergebnis als Kommentar. Danach bringen sie auch das unabhängige Review mit. Bei Beitragenden ohne Schreibrecht prüfen wir erst, wenn beides vorliegt. Alle offenen Pull Requests nacheinander arbeitet der Skill `prs-abarbeiten` ab.

## Review

Jeder Pull Request mit Code bekommt vor dem Merge ein unabhängiges **TDD-Review** (Skill `tdd-review`), jeder mit Markdown eine **Doku-Prüfung** (Skill `doku-pruefen`); bei beidem laufen beide nebeneinander.

1. **Unabhängig:** Wer den Code geschrieben hat, reviewt ihn nicht. Ein Agent, der mitgeschrieben hat, startet einen neuen ohne diesen Verlauf.
2. **Nur mit rotem Test:** Nur ein Test, der auf dem Stand des Pull Requests fehlschlägt, ist ein Befund. Stil und Namen sind keiner.
3. **Red → Green:** Test und Fix als eigene Commits auf den Branch des Pull Requests. Keine Tests abschwächen, keine Commits von Beitragenden umschreiben.
4. **Grün:** Lokal gezielt, die volle Suite in der CI. Einen Job neu starten nur bei einem erkannten Fehler der Infrastruktur, höchstens einmal.

### Runden

Eine; eine zweite nur, wenn die erste Fixes am Code gebracht hat. Höchstens vier, und weitere nur nach einem schweren Befund.

### Doku-Prüfung

Für Markdown gibt es keinen roten Test: Ein Befund braucht ein Zitat und den Beleg dagegen (Code, Quelle, andere Stelle). Geprüft wird, ob es stimmt, kurz ist und jede Regel nur an einem Ort steht.

### Wer mergt was

| Änderung | Gemergt wird |
| --- | --- |
| Alles nach Review bei grüner CI | per Squash vom Maintainer oder, mit dessen Zustimmung, von einem Collaborator |
| Fachlich heikel (`heikel` in `.github/werkbank.json`) | erst nach einem „OK“ des Maintainers auf eine kurze Zusammenfassung mit Quelle |
| Ohne Issue, grundsätzliche Entscheidung, Ablehnen | entscheidet der Maintainer zuerst |
| Release | nur nach ausdrücklichem „OK“ des Maintainers (Skill `release`) |
| Reparatur eines roten `main` | direkt auf `main`, vom Maintainer oder auf seine Anweisung: nur was den Check wieder grün macht, kein Test abgeschwächt |
| Rote CI durch den Pull Request, Code ohne TDD-Review, Markdown ohne Doku-Prüfung | nicht |
