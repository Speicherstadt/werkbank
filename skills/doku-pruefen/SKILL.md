---
name: "doku-pruefen"
description: "Unabhängige Prüfung der Markdown-Dateien eines Pull Requests in einem Projekt der Speicherstadt (Doku, Skills, AGENTS.md, CLAUDE.md, DESIGN.md). Statt tdd-review, wenn nur Markdown geändert ist; bei Code und Markdown parallel dazu."
---

# Doku prüfen

Die Regel steht in docs/mitwirken.md des Projekts, „Review“, „Doku-Prüfung“, hier die Schritte. Ein Befund braucht keinen Test, aber ein Zitat aus dem Diff und einen Beleg dagegen: Datei und Zeile im Code, die Quelle oder die andere Stelle im Repo. Wortwahl und Satzbau sind kein Befund.

## 0. Wer prüft?

Wie `tdd-review`, Schritt 0: Hat diese Session am Text mitgeschrieben, einen frischen Agenten oder Subagenten mit diesem Skill, der PR-Nummer und dem Branch starten, ohne eigene Einschätzung. Sonst direkt mit Schritt 1.

## 1. Holen

- `git fetch origin main <branch>`, dann `git diff --name-only origin/main...<branch>`: Steht dort mehr als Markdown und die Konfiguration der Doku, prüft parallel ein anderer Agent den Code nach `tdd-review`; dieser Skill prüft nur die Markdown-Dateien (`git diff origin/main...<branch> -- '*.md'`).
- `git diff origin/main...<branch>` und die geänderten Abschnitte ganz lesen, nicht nur die Zeilen: Doppelungen stehen oft im Absatz daneben.

## 2. Stimmt es?

- Zu jeder Aussage über das Projekt die Stelle im Code: `git grep -n` nach dem Text eines Knopfes oder Feldes, der Funktion, dem Pfad, der Einstellung, dem Standardwert. Widerspricht der Code, ist das ein Befund mit beiden Stellen.
- Befehle, die nichts verändern, ausführen. Genannte Pfade, Skripte und Skills müssen existieren.
- Fachliche Aussagen (Paragraph, Grenzwert, Frist, Format): die verlinkte Quelle öffnen und die Aussage dort finden (welche Quellen zählen: `beitrag-pruefen`, Schritt 2). Fehlt die Quelle bei einer fachlichen Aussage, ist das ein Befund.

## 3. Ist es kurz?

Jeden neuen oder geänderten Satz probeweise streichen. Fehlt danach keine Information, ist er ein Befund. Typisch sind:

- Ankündigungen („Diese Seite beschreibt …“, „Im Folgenden …“), die nur die Überschriften aufzählen;
- Zusammenfassungen am Absatzende, die den Absatz wiederholen;
- dieselbe Aussage zweimal auf einer Seite: die spätere Stelle streichen, die andere muss bleiben;
- Füllwörter: „einfach“, „ganz“, „wie bisher“, „wie gewohnt“, „übrigens“;
- Angaben, die bei jeder Änderung veralten: Zeilenzahlen, Anzahl der Tests;
- ein langer Absatz mit mehreren Fällen oder Schritten: als Liste.

Nicht streichen: Fakten, Zahlen, Paragraphen, Links, Befehle, Front Matter, Warnungen zu Sicherheit, Recht und Datenintegrität. Im Zweifel stehen lassen.

## 4. Steht es einmal, am richtigen Ort?

- Die Kernbegriffe der Änderung suchen, `git grep -n -i "<begriff>" -- '*.md'`, und die Treffer in `docs/`, den Skills (`.agents/skills/`), `AGENTS.md`, `CLAUDE.md`, `CONTRIBUTING.md`, den Gestaltungsregeln und `README.md` vergleichen.
- Der Ort:
  - was gilt und warum: `docs/`, die Regeln fürs Mitarbeiten in docs/mitwirken.md, die Gestaltung in den Gestaltungsregeln des Projekts (etwa `DESIGN.md`);
  - was ein Agent tut (Befehle, Werkzeuge, Reihenfolge, wann anhalten): ein Skill; er begründet nicht, sondern verweist mit dem Abschnittsnamen auf `docs/`;
  - wie ein Skript entscheidet: Kommentar im Skript;
  - `AGENTS.md` und `CLAUDE.md`: nur wohin schauen und was nie passieren darf; `CONTRIBUTING.md` und README: Kurzfassung mit Link.
- Steht eine Regel ausgeschrieben an zwei Orten, ist das ein Befund: Sie bleibt am richtigen Ort, der andere verweist.
- Sagen zwei Stellen Verschiedenes, beide gegen den Code prüfen (Schritt 2); die falsche ist der Befund.
- Ändert der PR eine Regel, müssen alle Stellen nachgezogen sein, die sie nennen oder auf sie verweisen. Eine vergessene ist ein Befund.

## 5. Erzeugtes und Sonderfälle

- Erzeugte Doku und erzeugte Skills (etwa die unter `erzeugteSkills` in .github/werkbank.json) schreibt ein Skript des Projekts; von Hand geändert ist ein Befund.
- Die allgemeinen Skills unter `.agents/skills/`, die aus der Werkbank kommen, werden dort geändert, nicht im Projekt; eine Änderung im Projekt überschreibt der nächste Sync. Ein Befund, wenn der PR sie im Projekt ändert.
- ADRs (Entscheidungen, falls das Projekt sie führt): nicht kürzen oder umschreiben; eine neue Entscheidung ist ein neues ADR.
- Neue Seite in `docs/`: Front Matter (Titel, Beschreibung) und Eintrag im Inhaltsverzeichnis der Doku, wie das Projekt es verlangt.
- Links im README zeigen auf die veröffentlichte Doku des Projekts, nicht auf `docs/*.md`, wenn das Projekt es so festlegt.

## 6. Skills, AGENTS.md und CLAUDE.md

- Den Diff gegen die Verbote in AGENTS.md (bzw. „Never“ in CLAUDE.md) des Projekts lesen. Erlaubt ein Satz, auch nebenbei, etwas, das dort verboten ist (auf `main` pushen außer zur Reparatur nach „Wer mergt was“, ohne Maintainer mergen, Tests überspringen, Sperren lockern, ungefragt auf GitHub schreiben), ist das ein Befund.
- Neue oder geänderte `description:` mit allen anderen vergleichen (`grep -h '^description:' .agents/skills/*/SKILL.md`): Sagt sie, wann der Skill dran ist, ohne sich mit einem anderen zu überschneiden?
- Ein neuer Skill steht in der Liste in `AGENTS.md` und, wenn das Projekt eine Übersicht nach Themen führt, auch dort.

## 7. Melden, beheben, mergen

- Ein Kommentar im PR, auch ohne Befund: je Befund das Zitat, der Beleg und was stattdessen gilt.
- Befunde selbst beheben, je Befund ein Commit (`docs: …`). Commits des Autors nie umschreiben; bei einem fremden Fork nach Skill `fork-pushen`.
- Den Doku-Build und die Doku-Prüfungen des Projekts, wenn `docs/` oder die Konfiguration der Doku geändert ist (Skill `checks`).
- Die Beschreibung des PR nachziehen, wenn Fixes dazukamen.
- Eine Runde. Nur Markdown: mergen wie `tdd-review`, Schritt 6, sobald die CI grün ist; mit Code mergt das TDD-Review (dort Schritt 6).

## Abschlussbericht

PR-Link, Befunde und Commits, Stand der CI, gemergt oder woran es hängt. Nach einem Merge in der Form aus docs/mitwirken.md des Projekts, „Review“.
