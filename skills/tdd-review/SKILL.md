---
name: "tdd-review"
description: "Unabhängiges Review eines Pull Requests in einem Projekt der Speicherstadt, das nur Fehler mit fehlschlagendem Test meldet und bis grüner CI behebt. Für jeden Pull Request mit Code vor dem Merge; Markdown prüft doku-pruefen, bei beidem parallel."
---

# TDD-Review

Ein unabhängiger Reviewer prüft einen Pull Request und meldet **nur Fehler, die er mit einem fehlschlagenden Test beweisen kann**. Behauptungen ohne Test zählen nicht. Die Fehler werden nach Red-Green behoben; ist alles grün, mergt ein Maintainer oder mit dessen Zustimmung ein Collaborator. Der Ablauf für Menschen steht in docs/mitwirken.md des Projekts unter „Review“.

## 0. Wer reviewt?

Zeigt `git diff --name-only origin/main...<branch>` nur Markdown (und die Konfiguration der Doku), gilt Skill `doku-pruefen` statt dieses Skills. Ändert der PR Code und Markdown, prüft dieser Skill nur den Code; für die Markdown-Dateien zugleich einen frischen Agenten oder Subagenten mit `doku-pruefen`, PR-Nummer und Branch starten. Gemergt wird erst, wenn beide fertig sind (Schritt 6).

Unabhängig ist, wer den Code nicht selbst geschrieben hat. Gemeint ist der Agent oder Mensch, nicht das Konto: Ein frischer Agent ohne den Verlauf der Entstehung ist unabhängig, auch wenn ihn der Autor gestartet hat.

- **In dieser Session wurde am Code gearbeitet:** nicht selbst reviewen, sondern einen **frischen Agenten oder Subagenten** starten, der die Entstehung nicht gesehen hat. Ihm nur Repo, PR-Nummer, Branch, Basis-Branch und die Schritte 1–4 geben, keine eigene Einschätzung. Gibt es noch keinen PR, vorher Branch pushen und PR anlegen (Skill `beitrag`). Der Reviewer arbeitet in einem eigenen Worktree auf dem Branch des PR und mit eigener Testumgebung (eigene Ports, eigene Test-Datenbank, eigener Compose-Projektname, wie Skill `checks` des Projekts es beschreibt), nie im Checkout oder in der laufenden Entwicklungsumgebung der Person; am Ende räumt er beides ab. Bei mehreren parallelen Reviews je eine eigene Umgebung. Danach weiter mit Schritt 5.
- **Frische Session, nur ein PR genannt:** Diese Session ist unabhängig; direkt mit Schritt 1 beginnen.

## 1. Direkt reviewen

- Diff holen (`git fetch origin main <branch>`, `git diff origin/main...<branch>`) und **sofort** reviewen. Vorher keine Test-Suite laufen lassen.
- Mit `git merge-tree --write-tree origin/main <branch>` prüfen, ob der Branch noch konfliktfrei auf `main` passt.
- Gesucht werden echte Fehler: falsche Logik, Randfälle (null, leer, Grenzwerte, Vorzeichen, Stornos), Fehlerbehandlung, Race Conditions, Sicherheitslücken, Regressionen gegenüber dem bisherigen Verhalten. Auch die anderen Stellen ansehen, die die geänderten Funktionen oder Daten nutzen.
- Fachlich besonders: die Pfade aus `heikel` in .github/werkbank.json und die Regeln in docs/mitwirken.md des Projekts; alle Varianten, die das Projekt für Tests verlangt; Schutzmechanismen, die AGENTS.md des Projekts unter den Verboten nennt. Hängt ein Detail an Recht, Norm oder Format, die Quelle nennen.
- Tests des PR, deren erwarteter Wert genauso berechnet wird wie im Code (`expect(steuer(x)).toBe(x * satz)`), bestehen immer und belegen nichts: Für diesen Fall gilt der Verdacht als ungeprüft und bekommt in Schritt 2 einen eigenen Test.
- Keine Anmerkungen zu Stil, Namen oder Geschmack.

## 2. Jeden Verdacht mit einem Test beweisen

- Für jeden Verdacht einen neuen Test schreiben, der das erwartete Verhalten beschreibt, und nur diesen Test ausführen, auf der Ebene, die das Projekt dafür vorsieht (Skill `checks`):
  - Logik ohne Datenbank oder Netz: Unit-Test neben dem Modul.
  - Server mit Datenbank: Integrationstest neben dem Modul, gegen die Test-Datenbank. Wird er ohne Datenbank übersprungen, beweist er nichts.
  - Was ein Nutzer klickt: End-to-End-Test, nur wenn es nicht anders geht.
- Den erwarteten Wert unabhängig vom Code ermitteln: Beispiel aus Norm, Gesetz oder Referenzimplementierung, von Hand gerechneter Fall, bekannte gute Ausgabe.
- **Nur ein Test, der auf dem Stand des PR rot ist, ist ein Finding.**
- Bleibt der Test grün oder lässt sich der Verdacht nicht testen, wird er verworfen (höchstens als Notiz unter „Nicht belegt“).

## 3. Findings in den PR posten

- Ein Kommentar im PR: je Finding Titel, Datei/Zeile, Testname, Ausgabe des roten Tests, kurze Erklärung; dazu die verworfenen Verdachte in je einem Satz.
- Keine Findings: das kurz im PR vermerken und weiter mit Schritt 5.
- Sprache Deutsch.

## 4. Fixen (Red → Green)

- Je Finding: Test committen, minimalen Fix, Test grün. Kleine Commits (`test: …`, `fix: …`, Beschreibung auf Deutsch).
- Bestehende Tests nie abschwächen, überspringen oder löschen, Sperren und Schutzmechanismen nie lockern, um grün zu werden.
- Fixes als neue Commits auf den Branch des Pull Requests, Commits von Beitragenden nie umschreiben; wie bei Forks und „Allow edits by maintainers“ vorzugehen ist, steht in docs/mitwirken.md des Projekts unter „Review“.
- **PR aus einem fremden Fork:** pushen nach Skill `fork-pushen`.
- Dann gezielt prüfen, was der PR und die Fixes berühren. Die volle Suite läuft in der CI, lokal nicht noch einmal (Befehle und Umgebung: Skill `checks`):
  - immer Lint und Typprüfung;
  - Unit- und Integrationstests nur für die neuen Tests und die geänderten Module;
  - End-to-End-Tests nur, wenn die Oberfläche betroffen ist, und nur die passenden Spec-Dateien oder Tests;
  - Doku-Build nur, wenn `docs/` geändert ist;
  - breiter nur, wenn die Änderung viele Stellen trifft (Schema und Migrationen, viel genutzte gemeinsame Funktionen, globale Styles, Testkonfiguration, Abhängigkeiten): dann die Aufrufer mitprüfen.
- Im Abschlusskommentar nennen, was lokal lief und was übersprungen wurde. Einen übersprungenen Test nie als bestanden melden.
- Auf den PR-Branch pushen.

## 5. Grün prüfen

- Die CI prüft die volle Suite; ohne grüne CI ist das Review nicht fertig. Auf Entwürfen läuft sie nicht: Dann ist der PR vor dem Merge auf „Ready for review“ zu setzen, nur auf Freigabe der Person.
- Die CI-Checks des PR abwarten. Bei roten Checks nach docs/mitwirken.md des Projekts, „Review“: Log des Jobs einmal lesen (`gh run view <id> --log-failed` oder in der Web-Oberfläche), nur die fehlgeschlagenen Tests lokal wiederholen, beheben, einmal pushen. Keinen Test überspringen, keinen leeren Commit und keinen Neustart, um grün zu bekommen.
- Abschlusskommentar im PR: welche Findings behoben sind, welche Tests neu sind, Stand der Checks.

## Wie viele Runden

Die Regel steht in docs/mitwirken.md des Projekts, „Review“, „Runden“. Schritte 1 bis 5 sind eine Runde; für den Agenten heißt das:

- Hat Runde 1 Fixes am Code gebracht, prüft eine Runde 2 nur diese Fixes und den betroffenen Bereich.
- Laufen weitere KI-Reviews mit, prüfen alle denselben Stand; Befunde zusammenführen, dann gemeinsam beheben.
- Nach vier Runden noch ein schwerer Befund offen: nicht weiter fixen, nicht mergen, an den Maintainer zurückmelden.
- Befunde nur mit konstruierten Eingaben (außer Sicherheit): notieren, nicht fixen, lohnt es sich, ein Issue vorschlagen.

## 6. Merge (Maintainer oder Collaborator mit Zustimmung)

- Mergen darf, wer Maintainer des Projekts ist und das ausdrücklich will, oder ein Collaborator mit Zustimmung des Maintainers (docs/mitwirken.md des Projekts, „Wer mergt was“). Wer sonst beiträgt, hört nach Schritt 5 auf. Niemand reviewt oder mergt seinen eigenen Code ohne unabhängiges Review.
- Vor dem Merge prüfen: alle Findings behoben oder nach „Wie viele Runden“ notiert, bei Markdown im PR auch `doku-pruefen` abgeschlossen, alle Checks grün auf dem aktuellen Stand (Ausnahme wie unter „Nicht mergen“), kein Konflikt mit `main`, Titel und Beschreibung passen zum Stand (sie werden der Squash-Commit auf `main`).
- Merge-Methode: immer **Squash** des Pull Requests selbst.
- **Nicht mergen**, wenn ein zu behebendes Finding offen ist, Checks rot bleiben (außer einem Check, der auf `main` genauso rot ist, nach „Wer mergt was“) oder der Fix eine fachliche Entscheidung braucht – dann zurückmelden und fragen.

## Abschlussbericht

Immer zurückmelden: PR-Link, Anzahl belegter Findings, was behoben wurde (Commits), Stand der Checks, ob gemergt wurde oder warum nicht. Nach einem Merge in der Form aus docs/mitwirken.md des Projekts, „Review“.
