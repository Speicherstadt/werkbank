---
name: "board-pflegen"
description: "Das Board (GitHub Project) eines Projekts der Speicherstadt pflegen: neue Issues prüfen und einordnen, offene Gespräche und Übernahme-Wünsche finden, Karten aufräumen. Wenn neue Issues da sind, einmal pro Woche oder nach einem Release."
---

# Board pflegen

Die Planung steht im Board aus `board` in .github/werkbank.json (`owner` und `nummer` des Projects; im Folgenden `<owner>` und `<nr>`, das Repository `<owner>/<repo>`). Ist dort `null` eingetragen, hat das Projekt kein Board, und der Skill hat nichts zu tun. Die Regeln stehen in docs/mitwirken.md des Projekts unter „Etwas übernehmen“ und „Vom Issue zum Release“, die Grundsätze und „Bewusst nicht“ in seiner Roadmap, falls es eine gibt. Was der Workflow „Board“ der Werkbank (`werkzeug/board/`) selbst schiebt, macht dieser Skill nicht noch einmal.

Befehle mit `gh`; mit MCP oder in der Web-Oberfläche geht dasselbe.

## Voraussetzungen

- `gh` mit dem Scope `project`: `gh auth status` zeigt ihn, sonst `gh auth refresh -s project`.
- Schreibrecht am Project: Project → Settings → Manage access, Rolle Write. Collaborator am Repository zu sein reicht nicht.
- Ohne beides: nur lesen und Vorschläge als Liste an den Maintainer geben.
- Der Login des Maintainers (aus docs/mitwirken.md, „Wer mergt was“, oder `gh api repos/<owner>/<repo>/collaborators`), im Folgenden `<maintainer>`.

## Das Board

Felder (Status, Aufwand, Bereich, Hinweis), Rang, Reihenfolge in „Geplant“, was nicht ins Board gehört, Einstiegs-Label und Labels: `references/board.md`. Vor Schritt 2 lesen.

## Ablauf

### 1. Lesen

```sh
gh project item-list <nr> --owner <owner> --limit 1000 --format json > board.json
gh issue list --repo <owner>/<repo> --state open --limit 500 --json number,title,author,labels,assignees,comments,createdAt,updatedAt > issues.json
```

Daraus ermitteln:
- offene Issues ohne Karte (weiter mit Schritt 2); wieder geöffnete können eine archivierte Karte haben, dann zurückholen statt neu anlegen (`references/umsetzen.md`, „Archivieren“);
- offene Issues, die eine Karte, aber noch keinen Kommentar des Maintainers zur Einordnung haben: Der Workflow „Board“ legt Karten selbst an, wenn ein Pull Request mit `Refs` oder `Umgesetzt` kommt (`jq '.[]|select([.comments[].author.login]|index("<maintainer>")|not)' issues.json`, Bots ausgenommen). Kommentar wie in Schritt 5, bei gemergtem Pull Request mit der Vorlage „Erledigt“ und Hinweis aufs nächste Release;
- Karten ohne Aufwand oder Bereich: Felder nachtragen;
- offene Issues ohne Typ-Label (die Typen aus `references/board.md`), auch solche, die schon eine Karte haben;
- **offene Gespräche:** offene Issues, deren letzter Kommentar nicht vom Maintainer und nicht von einem Bot stammt (`jq '.[]|select((.comments|length)>0 and (.comments|last|.author.login)!="<maintainer>")' issues.json`). Jedes lesen und einordnen: **Übernahme** (jemand will die Karte bauen und ist nicht zugewiesen; meist hat der Workflow „Übernehmen“ dann mit Begründung abgelehnt, oder die Person hat ohne `/übernehmen` geschrieben: dann auf den Befehl hinweisen oder nach OK von Hand zuweisen), **Frage an den Maintainer**, **neue Angaben** (Anwendungsfall, Beispieldatei, Rückmeldung zu einem Release) oder **keine Antwort nötig** (Dank, Notiz eines Collaborators, Verweis auf ein anderes Issue);
- Karten in „In Arbeit“ ohne offenen PR und ohne Kommentar seit 14 Tagen (`gh issue view <n> --json comments,updatedAt`, `gh pr list --search "<n> in:body"`);
- geschlossene Issues, deren Karte nicht in „Erledigt“ steht;
- Karten in „Im nächsten Release“, deren PR kein `Umgesetzt #…` hat: die schließt das Release nicht;
- **offene Teile:** Karten in „In Arbeit“, deren Pull Requests alle gemergt sind, nur mit `Refs`, und für die kein offener Pull Request mehr da ist (`gh pr list --state all --search "<n> in:body"`). Meist fehlte beim letzten Teil das `Umgesetzt`, und das Release schließt das Issue nie. Akzeptanzkriterien des Issues gegen die gemergten Pull Requests halten (Abschnitte „Offen“ oder „Nicht dabei“ in ihren Beschreibungen): ist alles da, mit der Vorlage „Erledigt“ schließen (Release, in dem der letzte Teil kam); bleibt ein klar abgegrenzter Rest, ihn als Folge-Issue anlegen (Schritt 5) und das Issue dann schließen; sonst bleibt die Karte, und der Zugewiesene bekommt eine kurze Frage nach dem Stand;
- Entwürfe, für die es inzwischen ein Issue gibt.

### 2. Issues prüfen

Jedes offene Issue ohne Karte lesen, mit Kommentaren (`gh issue view <n> --json body,comments`), und genau ein Ergebnis bestimmen. Wie bei `beitrag-pruefen` braucht jedes Ergebnis einen Beleg: Commit oder PR, Abschnitt der Roadmap, Issue-Nummer, Satz aus der Quelle.

| Ergebnis | Wann | Beleg |
| --- | --- | --- |
| **Erledigt** | Auf `origin/main` schon umgesetzt | `git log --oneline origin/main \| grep "#<n>"`, `gh pr list --state all --search "<n> in:body"`, Doku der Seite; Release, in dem es kam |
| **Duplikat** | Thema steht schon in einem Issue oder Entwurf | Nummer bzw. Titel des Entwurfs; Neues aus diesem Issue nennen, damit es nicht verloren geht |
| **Nicht ins Board** | Unter „Bewusst nicht“, Frage, Sammel-Issue, Interna | Zeile in „Bewusst nicht“ oder die Art des Issues |
| **Rückfrage** | Angaben reichen nicht für Aufwand und Akzeptanzkriterien: kein Beispiel, kein Ablauf, unklar, was „fertig“ ist | Die eine oder zwei Fragen, die fehlen |
| **Teilweise** | Der Kern passt, ein klar abgrenzbarer Teil nicht (siehe „Wollen wir das?“) | Was kommt, was nicht, mit Grund; Rest wie „Aufnehmen“ |
| **Aufnehmen** | Alles andere | Spalte, Position, Aufwand, Bereich, Hinweis, Labels, Einstieg ja/nein |

Bei fachlich heiklen Issues (Pfade aus `heikel` in .github/werkbank.json, Regeln in docs/mitwirken.md des Projekts) die fachliche Aussage an der Primärquelle prüfen, die das Issue nennt. Stimmt sie nicht oder ist sie unsicher, ist das eine Rückfrage, keine Karte.

**Wollen wir das?** Vor „Aufnehmen“ fragen, ob das Thema zum Projekt passt, nicht nur, ob es unter „Bewusst nicht“ steht:

- Gehört es zum Zweck des Projekts (README, Roadmap), oder macht es das Projekt zu einem anderen Werkzeug?
- Bringt es einen neuen externen Dienst, eine Lizenz oder eine Abhängigkeit mit?
- Steht die dauerhafte Pflege im Verhältnis zum Nutzen?
- Gibt es das schon in einfacherer Form, etwa über eine Schnittstelle oder eine bestehende Funktion?

Nicht zu streng: Im Zweifel aufnehmen und die Reihenfolge entscheiden lassen; ein Wunsch, der den Alltag erleichtert und zum Datenmodell passt, ist willkommen. Nur bei einem klaren Grund aus der Liste oben „Teilweise“ oder „Nicht ins Board“ vorschlagen, dann mit diesem Grund. Ist der Grund neu, eine Zeile für „Bewusst nicht“ in der Roadmap vorschlagen (Thema, Grund, Issue), damit die Entscheidung dokumentiert ist.

Vor jeder Rückfrage, auch in offenen Gesprächen, alle Kommentare lesen: Steht die Angabe schon da, ist es keine Rückfrage.

### 3. Vorschlagen

Eine Tabelle an den Maintainer, je Zeile: Issue, Titel, Ergebnis aus Schritt 2, bei „Aufnehmen“ Spalte, Position „nach #…“, Aufwand, Bereich, Hinweis, Labels (Typ und Thema), Einstieg ja/nein, dazu ein Satz Begründung und ob ein Kommentar kommt (Schritt 5). Eigene Abschnitte für die übrigen Funde aus Schritt 1, darunter eine Tabelle „Labels ergänzen“ (Issue, Vorschlag) für Issues ohne Typ-Label. Die offenen Gespräche kommen als eigene Tabelle mit Antwortentwurf; **Übernahmen stehen ganz oben**, weil die Person laut „Etwas übernehmen“ auf die Zuweisung wartet. Dazu je Übernahme: bisherige PRs der Person (`gh pr list --state all --author <login>`), wie viele Karten sie schon hat, offene Fragen in ihrer Skizze. Was nur der Maintainer entscheiden kann (Verträge, Rechtsfragen, Reihenfolge), steht als Frage an ihn in der Tabelle, nicht als Antwortentwurf.

**Fragen an den Maintainer mit Empfehlung.** Fachliche und technische Fragen, die Mitwirkende an den Maintainer stellen, kommen nicht als nackte Frage in die Tabelle. Vorher Issue, Verlinktes, Code auf `origin/main` und Doku lesen; dann je Frage eine Empfehlung mit Beleg (Code-Stelle, Abschnitt der Doku, Primärquelle) und ein Antwortentwurf, nummeriert entlang der Punkte der Person. Bevorzugt die einfachste Lösung, die bestehende Daten nicht ändert und zu vorhandenem Code passt. Hängen mehrere Issues an derselben Entscheidung, einmal entscheiden und in jeder Antwort gleich formulieren. Was rechtlich unsicher bleibt, markieren; diese Punkte bleiben Fragen. Kündigt ein Entwurf ein eigenes Issue an, steht das Folge-Issue mit Titel, Labels, Spalte und Position in einer Tabelle „Folge-Issues“.

Die Rangfolge in „Geplant“ entscheidet der Maintainer. Erledigtes ohne `Umgesetzt` schließt der Maintainer von Hand mit Hinweis auf das Release.

### 4. Umsetzen, nach OK

Karten anlegen, Felder setzen, Position per GraphQL, Labels, Zuweisung: Befehle in `references/umsetzen.md`. Zum Schluss den Status noch einmal auslesen; eine Automatik des Projects überschreibt ihn manchmal.

### 5. Kommentieren, nach OK

Jedes geprüfte Issue und jede angelegte oder verschobene Karte bekommt einen kurzen Kommentar zur Einordnung, dazu die freigegebenen Antworten und angekündigten Folge-Issues. Regeln und Vorlagen in `references/kommentieren.md`. Schließen bleibt beim Maintainer.

### 6. Prüfen

`gh project item-list` erneut lesen und eine Tabelle je Spalte (Position, Karte, Aufwand, Bereich) gegen den Vorschlag vergleichen; Abweichungen korrigieren und melden. Dazu die Liste der geschriebenen Kommentare mit Link.

Vollständig ist der Lauf erst, wenn die Funde aus Schritt 1 erneut abgefragt leer sind oder jeder Rest eine Begründung in der Tabelle hat: kein offenes Issue ohne Karte und ohne Ergebnis aus Schritt 2, keine neue oder verschobene Karte ohne Kommentar zur Einordnung (`gh issue view <n> --json comments`).

## Grenzen

- Kommentare nur die aus Schritt 5 und nur nach OK; zuweisen nur nach OK; Issues schließen oder anlegen nur auf Auftrag, außer den Folge-Issues aus Schritt 5; Labels nur nach OK.
- Die Spalten nicht umbenennen: der Workflow „Board“ der Werkbank hängt an den Namen.
- Keine Karte zurückschieben, die der Workflow nach vorn gesetzt hat, außer der Maintainer will es.
- Nach einem Release: prüfen, dass der Job, der die Issues schließt, lief und die Karten in „Erledigt“ stehen; das Release selbst ist Skill `release`. Danach nach OK die Karten in „Erledigt“ archivieren, deren Issue vor diesem Release geschlossen wurde (`references/umsetzen.md`, „Archivieren“).
