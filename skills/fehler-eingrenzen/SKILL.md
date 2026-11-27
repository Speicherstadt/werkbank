---
name: "fehler-eingrenzen"
description: "Einen Fehler oder eine Verlangsamung in einem Projekt der Speicherstadt eingrenzen, dessen Ursache nicht auf der Hand liegt: erst eine Prüfung, die auf genau diesem Fehler rot wird, dann Vermutungen, dann der Fix. Wenn etwas falsch rechnet, abstürzt, wackelt oder langsam ist."
---

# Fehler eingrenzen

Wer die Ursache sucht, bevor er den Fehler zuverlässig auslösen kann, rät. Dieser Skill dreht die Reihenfolge um: zuerst eine **rote Prüfung**, dann denken. Ein offensichtlicher Fehler (Tippfehler, Ursache in der Meldung) braucht ihn nicht; dann direkt mit dem roten Test beginnen, mit dem jeder Bugfix beginnt (docs/mitwirken.md des Projekts).

Geheimnisse (Tokens, Passwörter, Header mit Anmeldedaten) in allem, was gezeigt oder gepostet wird, durch `<GESCHWÄRZT>` ersetzen; Zugangsdaten bleiben in Umgebungsvariablen.

## 1. Eine rote Prüfung bauen

Hier liegt die eigentliche Arbeit. Gesucht ist **ein Befehl**, der:

- den Pfad des Fehlers wirklich durchläuft und **genau das Symptom** prüft, das gemeldet wurde (die falsche Zahl, die Meldung, die Dauer), nicht nur „läuft ohne Fehler“;
- bei jedem Lauf dasselbe Ergebnis bringt (Zeit festsetzen, Zufall mit festem Startwert, eigene Test-Datenbank);
- in Sekunden fertig ist und ohne Menschen läuft.

Wege dahin, ungefähr in dieser Reihenfolge:

1. Test auf der Ebene, die den Fehler erreicht (Unit, Integration gegen die Test-Datenbank, End-to-End), wie Skill `checks` sie vorsieht.
2. Aufruf per `curl` oder kurzes Skript gegen einen laufenden Server in eigener Testumgebung, nie gegen die Entwicklungsumgebung der Person.
3. Kommandozeile mit fester Eingabedatei, Ausgabe gegen eine bekannte gute vergleichen.
4. Playwright-Skript, das klickt und auf DOM, Konsole oder Netz prüft.
5. Eine echte Anfrage, Datei oder ein Log aufzeichnen (geschwärzt) und durch den Codepfad abspielen.
6. Gleiche Eingabe durch alte und neue Version schicken und die Ausgaben vergleichen; trat der Fehler zwischen zwei Ständen auf, mit `git bisect run <befehl>` den Commit finden.
7. Bei „manchmal falsch“: viele zufällige Eingaben mit festem Startwert, bis eine scheitert.

**Wackelt der Fehler**, ist das Ziel nicht ein sauberes Nachstellen, sondern eine höhere Quote: den Auslöser hundertmal laufen lassen, parallel, unter Last, mit eingestreuten Pausen. Bei der Hälfte rot lässt sich arbeiten, bei einem Prozent nicht.

**Geht es nicht:** aufhören und sagen, was versucht wurde. Die Person um Zugang zu der Umgebung bitten, in der es auftritt, oder um ein geschwärztes Beispiel (Datei, Log, Bildschirmaufnahme mit Uhrzeit). Ohne rote Prüfung keine Vermutungen.

**Fertig, wenn** der Befehl mindestens einmal gelaufen und rot geworden ist; Befehl und Ausgabe (geschwärzt) festhalten.

## 2. Nachstellen und verkleinern

- Prüfen, dass die Prüfung **den gemeldeten** Fehler zeigt und nicht einen benachbarten. Falscher Fehler, falscher Fix.
- Dann verkleinern: Eingaben, Aufrufer, Einstellungen, Daten und Schritte **einzeln** weglassen und jedes Mal neu laufen lassen. Was den Fehler nicht mehr braucht, fliegt raus.

**Fertig, wenn** jedes übrige Teil nötig ist: Fehlt eines, wird die Prüfung grün. Der kleine Fall wird später der Regressionstest.

## 3. Vermutungen aufstellen

Drei bis fünf, nach Wahrscheinlichkeit geordnet, bevor eine davon geprüft wird; eine einzige verankert beim ersten plausiblen Gedanken. Jede sagt etwas vorher:

> Wenn X die Ursache ist, verschwindet der Fehler, sobald Y sich ändert, und wird schlimmer, wenn Z sich ändert.

Wer keine Vorhersage formulieren kann, hat eine Ahnung, keine Vermutung: schärfen oder streichen. Die Liste der Person zeigen, bevor geprüft wird; sie weiß oft, was sich zuletzt geändert hat oder was schon ausgeschlossen ist. Ist niemand da, nach eigener Reihenfolge weiter.

## 4. Gezielt nachsehen

- Jede Messung gehört zu einer Vorhersage aus Schritt 3; **eine Sache auf einmal** ändern.
- Debugger oder REPL vor Log-Ausgaben; Logs nur an den Stellen, die zwei Vermutungen unterscheiden, nie „alles loggen und suchen“.
- Jede Debug-Ausgabe bekommt eine Marke wie `[DEBUG-a4f2]`, dieselbe für die ganze Suche. Am Ende findet ein `grep` alle.
- **Langsamkeit:** erst messen (Zeitmessung, Profiler, Abfrageplan der Datenbank), dann eingrenzen; Logs helfen hier selten.

## 5. Fix mit Regressionstest

1. Den kleinen Fall aus Schritt 2 als Test schreiben, an einer Stelle, die das echte Muster des Fehlers trifft. Reicht keine Ebene dafür (der Fehler braucht zwei Aufrufer, der Test kennt nur einen), ist das selbst ein Befund: im Pull Request nennen.
2. Den Test rot sehen. Wurde das Rot durch eine Änderung an Code oder Testdaten erzwungen, mit `git diff` belegen, dass sie wirklich gegriffen hat.
3. Fixen, Test grün sehen.
4. Die Prüfung aus Schritt 1 mit dem ursprünglichen, nicht verkleinerten Fall noch einmal laufen lassen.

## 6. Aufräumen

- [ ] Die Prüfung aus Schritt 1 ist grün.
- [ ] Der Regressionstest läuft mit (oder der Pull Request nennt, warum es keinen gibt).
- [ ] `grep` nach der Debug-Marke findet nichts mehr.
- [ ] Wegwerf-Skripte sind gelöscht.
- [ ] Die Vermutung, die gestimmt hat, steht in der Beschreibung des Pull Requests, damit der Nächste daraus lernt (Skill `beitrag`).
