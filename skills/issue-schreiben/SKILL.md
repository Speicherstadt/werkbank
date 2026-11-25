---
name: "issue-schreiben"
description: "Schreibt ein Issue für ein Projekt der Speicherstadt in der Gliederung des Projekts: Anlass, Stand im Projekt (auf main geprüft), Vorschlag, Akzeptanzkriterien, Bezug. Wenn ein Issue entworfen oder überarbeitet wird, und vor dem Anlegen auf GitHub."
---

# Issue schreiben

Ein Issue ist so gebaut, dass ein Maintainer oder Agent daraus ohne Rückfrage arbeiten kann. Die Gliederung und der Rahmen stehen in docs/mitwirken.md des Projekts unter „Issues schreiben“; die Formulare in `.github/ISSUE_TEMPLATE/` fragen, falls vorhanden, dieselben Punkte in Alltagssprache ab.

## Vorgehen

1. **Typ wählen** aus den Typen, die das Projekt kennt (Formulare, Labels, docs/mitwirken.md), etwa Fehler, Funktionswunsch, Frage oder Hinweis zur Doku. Ein Issue behandelt ein Thema; mehrere Probleme werden mehrere Issues, die aufeinander verweisen.
2. **Doppelte und Erledigtes suchen:** offene und geschlossene Issues (`gh issue list --repo <owner>/<repo> --state all --search "<Stichwort>"`), ebenso Pull Requests (`gh pr list --repo <owner>/<repo> --state all --search "<Stichwort>"`; Erledigtes steht oft nur in Pull Requests, ohne eigenes Issue) und das Board aus `board` in .github/werkbank.json mit seinen Entwürfen ohne Issue, dazu, falls das Projekt eine hat, die Liste „Bewusst nicht“ seiner Roadmap. Gibt es das Thema schon, bekommt der Nutzer den Fund mit Link gemeldet; ein Kommentar im bestehenden Issue folgt nur auf Anweisung. Ist es nur zum Teil umgesetzt, wird das neue Issue auf den fehlenden Teil begrenzt und nennt die Umsetzung unter „Stand im Projekt“.
3. **Stand am Code prüfen:** Zuerst `git fetch origin`, dann auf dem aktuellen `origin/main` lesen, was das Projekt heute tut (`git show origin/main:<pfad>`, Doku-Seite des Bereichs, bei Bedarf der Code). Den geprüften Commit (`git rev-parse --short origin/main`) nennen und mit Permalinks auf Doku oder Datei (`https://github.com/<owner>/<repo>/blob/<commit>/<pfad>#L<n>`) belegen. Nichts behaupten, was nicht geprüft ist; Ungeprüftes als offen kennzeichnen.
4. **Quellen am Original lesen:** Gesetz, Norm, Spezifikation, Formatbeschreibung, Dokumentation des Fremdsystems. Mit Link. Ratgeber und Blogs sind keine Quelle. Quellen, die ein früherer Pull Request schon am Original geprüft hat, dürfen mit Link auf den Pull Request übernommen werden. Bei Fremdprogrammen die Hilfe-Seite oder die API-Antwort (anonymisiert).
5. **Schreiben**, auf Deutsch, mit den Abschnitten aus docs/mitwirken.md des Projekts (meist `## Anlass`, `## Stand im Projekt` bzw. mit dem Namen des Projekts, `## Vorschlag`, `## Akzeptanzkriterien`, `## Bezug`; nicht benötigte weglassen). Weicht der Vorschlag vom Wunsch des Nutzers ab, steht der Wunsch unter „Anlass“ und die Begründung unter „Vorschlag“. Bei Änderungen am Aussehen nennen die Akzeptanzkriterien Themes und Handy. Als letzte Zeile, nach `---`: `_Generated with <Agent>_` mit Namen und Link des Agenten; nicht bei bloßen Korrekturen.
6. **Prüfen vor dem Anlegen:**
   - Keine echten personenbezogenen oder geschäftlichen Daten, Zugangsdaten, Schlüssel oder Zertifikate, auch nicht in Screenshots oder Logs.
   - Beträge und Namen erfunden oder anonymisiert.
   - Quellcode nur als Link, nicht als Auszug.
   - Das Issue ist höchstens ein bis zwei Bildschirme lang.
   - Unsicheres steht ausdrücklich als Frage oder als „mit einer Fachperson zu klären“.
   - Der Titel nennt das Ergebnis, nicht den Anlass („Eigene Kategorien beim Import auswählen“).
7. **Anlegen** nur auf Anweisung des Nutzers (beim Einordnen nach `board-pflegen` ist das OK des Maintainers zum Vorschlag die Anweisung), etwa mit `gh issue create --repo <owner>/<repo>`, per MCP oder in der Web-Oberfläche. Der Typ kommt wie bei den Formularen als Label dazu (`--label`), Pflicht: Ohne Label hat das Issue keinen Typ (`gh label list --repo <owner>/<repo>` zeigt, was es gibt). Weitere Labels (Thema, Einstieg und was docs/mitwirken.md nennt) und die Karte im Board kommen mit `board-pflegen`; nichts davon erfinden.
