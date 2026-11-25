---
name: "prs-abarbeiten"
description: "Die offenen Pull Requests an ein Projekt der Speicherstadt als Maintainer nacheinander abarbeiten, vom einfachsten Merge an. Wenn der Maintainer sagt „arbeite die Pull Requests ab“; auf „was können wir mergen?“ nur die Rangliste."
---

# Pull Requests abarbeiten

Der Skill ordnet und verteilt nur. Die Prüfung eines Pull Requests macht `beitrag-pruefen` mit `tdd-review` und `doku-pruefen`, den Push auf einen Fork `fork-pushen`. Die Regeln dafür stehen in docs/mitwirken.md des Projekts unter „Beiträge annehmen“ und „Review“. Er läuft nur für einen Maintainer oder einen Collaborator mit dessen Zustimmung.

## 1. Lage erfassen

`git fetch origin`, dann alle offenen Pull Requests ohne Entwürfe (`gh pr list`, MCP oder Web-Oberfläche). Für jeden festhalten:

- Head-SHA, Autor, Fork und „Allow edits by maintainers“, `mergeable`
- CI auf dem Head: grün, rot (welcher Job, welcher Test) oder nicht gelaufen. Nicht gelaufen heißt bei einem Erstbeitrag meist, dass der Maintainer die CI in GitHub freigeben muss.
- Wer zuletzt etwas getan hat: neue Commits oder Kommentare des Autors seit unserem letzten Kommentar? Wartet er auf uns oder wir auf ihn?
- Migrationen im Diff mit ihrer Nummer, falls das Projekt welche hat
- Heikel, also Pfade aus `heikel` in .github/werkbank.json oder fachlich heikel nach `beitrag-pruefen`, Schritt 2 (auch Migration auf bestehenden Daten)?
- Prüfungen des Autors (nur bei Pull Requests von jemandem ohne Schreibrecht): Selbstprüfung nach `beitrag-pruefen` und unabhängiges Review (`tdd-review` für Code, `doku-pruefen` für Markdown) als Kommentare, die seinen letzten Commit nennen oder per Nachtrag bis zu ihm reichen?

Ist auf `main` ein Check rot, kommt das vor allem anderen: Sonst ist er in jedem Pull Request rot. Den Fix legt der Maintainer direkt auf `main` an oder lässt ihn auf seine Anweisung anlegen, in den Grenzen von „Wer mergt was“ in docs/mitwirken.md des Projekts; ein fachlich heikler Fix geht als Pull Request.

Pull Requests, die der Maintainer anderen überlassen hat (eigene Pull Requests eines Collaborators, Pull Requests, die ein Collaborator betreut), fasst der Skill nicht an. Steht dazu nichts im Verlauf, fragt er einmal, zusammen mit der Rangliste.

## 2. Rangliste

Hat das Projekt ein Skript für die Rangliste (Skill `checks` oder AGENTS.md nennen es), schlägt es die Plätze 2 bis 7 vor; Platz 1 setzt der Agent nach dem Lesen, ebenso ob ein roter Check auf `main` genauso rot ist; im Zweifel gilt die Liste hier.

Von oben nach unten, wie einfach der Merge ist:

1. **Fertig:** Prüfung durch, Befunde behoben, CI grün, Beschreibung stimmt. Nur noch Nachprüfung der letzten Commits und Merge.
2. **Klein und neu:** wenige Dateien, keine Migration, nicht heikel, CI grün
3. **Neu und heikel oder groß** (heikel nach `beitrag-pruefen`, Schritt 2; Hinweis „Fachlich heikel“ im Kommentar von „PR-Regeln“): braucht eine volle Prüfung und das OK des Maintainers
4. **Autor hat nachgeliefert:** nur die neuen Commits gegen die offenen Befunde prüfen
5. **Konflikt oder rote CI**, die der Pull Request selbst verursacht
6. **Wartet auf den Autor:** Befunde stehen schon im Pull Request, seitdem nichts Neues. Nichts tun.
7. **Prüfungen fehlen:** Selbstprüfung oder unabhängiges Review fehlt oder reicht nicht bis zum letzten Commit des Autors, auch wenn der Pull Request sonst weiter oben stünde; Nachbesserungen auf unsere Befunde stehen auf Platz 4, reine Testdaten-Änderungen mit unabhängigem Review nach ihrem Stand weiter oben (docs/mitwirken.md des Projekts, „Beiträge annehmen“).

Gleich einfache Pull Requests nach Alter.

**Migrationen nacheinander** (falls das Projekt Migrationen hat): Pull Requests mit Migration gehen einzeln durch, der fertigere zuerst; Pull Requests ohne Migration dürfen dazwischen. Erst nach dem Merge des vorigen holt der nächste `main` per Merge herein und erzeugt seine Migrationen neu, kurz vor seinem eigenen Merge, nach Prüfung und grüner CI, so wie es docs des Projekts unter „Migrationen“ beschreiben (eigene erzeugte Dateien verwerfen, Metadaten auf den Stand von `main`, nie von Hand, dann neu erzeugen). Die Rangliste nennt die Reihenfolge der Pull Requests mit Migration, der Kommentar aus Schritt 3 jedem Autor seinen Platz.

Die Rangliste geht als Tabelle an den Maintainer, bevor der Skill etwas fragt oder an einem Pull Request etwas tut (ein roter Check auf `main` aus Schritt 1 steht über der Tabelle), mit einer Zeile je Pull Request: Platz, Nummer (als Link), worum es geht, Stand, was noch fehlt. Auf Deutsch und in einfachen Worten: Ein Fachbegriff oder Paragraf steht nie allein, sondern mit einem halben Satz, was er bedeutet; was der Maintainer entscheiden muss, steht als konkrete Frage in der Zeile. Darunter nummeriert nur die Fragen, an denen ein Pull Request hängt.

Hat der Maintainer nur gefragt, endet der Skill hier. Sonst geht es nach der Tabelle gleich mit Schritt 3 weiter, ohne auf eine Antwort zu warten: Was kein OK braucht und an keiner offenen Frage hängt, läuft. Heikle Pull Requests laufen bis grün mit; das OK holt der Skill erst vor ihrem Merge, einzeln nach `beitrag-pruefen`, Schritt 7.

## 3. Von oben nach unten

Platz 7 bekommt keinen Agenten, nur einmal eine freundliche Bitte mit Link auf Skill `beitrag`, Schritt 6. Sie nennt immer alle drei Prüfungen mit Stand: `beitrag-pruefen` (Selbstprüfung), `tdd-review` für Code und `doku-pruefen` für Markdown, je durch jemand anderen oder einen frischen Agenten und bis zum letzten Commit des Autors; was schon vorliegt oder nicht nötig ist, steht dabei. Je übrigem Pull Request einen frischen Agenten oder Subagenten mit `beitrag-pruefen` in der Rolle des Maintainers. Unabhängige Pull Requests laufen parallel. Der Auftrag an den Agenten:

- eigener Worktree und eigene Testumgebung (Skill `checks`), nie die laufende Entwicklungsumgebung der Person
- nichts posten, pushen oder mergen
- Fixes in eigenen Commits auf einem lokalen Branch, ein Fehler im Code mit rotem Test (`tdd-review`)
- Bericht mit Befunden, Commits, HEAD und Tree, gelaufenen und übersprungenen Checks und „Red Flag ja/nein“

Mit dem Bericht:

- **Red Flag:** Ist fachlich etwas falsch, ein Schutzmechanismus aufgeweicht, eine Migration falsch oder eine Grundsatzfrage offen, anhalten und den Maintainer mit Empfehlung fragen.
- **Fixes von uns:** Vor dem Push den Head des Pull Requests erneut lesen, weil Autoren während der Prüfung force-pushen. Dann pushen, aus einem Fork nach `fork-pushen`, danach den Tree des neuen Heads mit dem Tree des lokalen Branches vergleichen.
- **Autor muss liefern:** nur die Befunde posten, vor dem Merge nötig und Vorschläge getrennt
- **Fertig:** siehe 4

Jeder Pull Request bekommt einen Kommentar mit dem Ergebnis. Bei heiklen Pull Requests gehört die fachliche Einschätzung mit Quelle dazu.

## 4. Merge

Nach `beitrag-pruefen`, Schritt 7: nur bei grüner CI auf dem Head, heikel erst nach OK des Maintainers. Ist ein Check auf `main` genauso rot (derselbe Job, derselbe Fehler), darf der Pull Request trotzdem gemergt werden, wenn er die Stelle nicht berührt und nicht heikel ist; der Merge-Kommentar verlinkt den roten Lauf auf `main`. Sonst wartet er auf den Fix von `main` (Schritt 1). Dazu:

- Squash mit dem vollen Head-SHA als erwartetem Head (`gh pr merge <nr> --squash --match-head-commit <sha>` oder das Gleiche im verwendeten Werkzeug)
- Worktree, lokale Branches und Testumgebung aufräumen

## 5. Wieder von vorn

Nach jedem Merge kann sich die Rangliste ändern: Konflikte, Migrationsnummern, eine grüne CI auf `main`. Wieder bei 1 anfangen. Auf CI oder Hilfssessions wartet der Skill mit einem Monitor oder einer Abfrage in Abständen, die das Werkzeug anbietet, nicht mit blindem `sleep`. Sind nur noch wartende Pull Requests übrig, meldet er die Liste und hört auf; für regelmäßiges Nachsehen kann der Maintainer einen wiederkehrenden Lauf einrichten.
