# Maintainer-Prüfung: Urteil bis Merge

Teil von Skill `beitrag-pruefen`, für die Maintainer-Prüfung nach den Schritten 1 bis 4.

## Vorhandene Selbstprüfung nachprüfen

Sie zählt, wenn der Kommentar „Selbstprüfung“ den aktuellen Commit nennt (als Stand oder im Nachtrag zum Nachbessern), in einem frischen Agenten oder durch eine andere Person lief und alle vier Fragen mit Beleg beantwortet. Dann die Schritte 1 bis 4 nachprüfen statt neu machen: jede Zeile mit ✗, „teilweise“ oder „nicht prüfbar“, jede offene Frage und jeden Punkt des Nachtrags am Commit ansehen; „Wollen wir das?“ und den „Besseren Weg“ aus Schritt 3 beantwortet die prüfende Person selbst, die Selbstprüfung liefert nur die Belege; ist die Änderung fachlich heikel (Schritt 2), mindestens eine Quelle selbst lesen und einen Fall selbst gegenrechnen; bei den Regeln Stichproben. Stimmt etwas davon nicht, die Schritte 1 bis 4 ganz machen. Fehlen bei einem Autor ohne Schreibrecht Selbstprüfung oder unabhängiges Review oder reichen sie nicht bis zu seinem letzten Commit, und geht es nicht um Nachbesserungen auf unsere Befunde oder, mit unabhängigem Review, um eine reine Testdaten-Änderung: nicht prüfen, sondern das berichten (docs/mitwirken.md des Projekts, „Beiträge annehmen“, „Selbstprüfung“). Sonst ohne gültige Selbstprüfung alle Schritte; das ist kein Befund.

## 5. Urteil

Aus den Schritten 1 bis 4 eines von drei Ergebnissen:

- **Gleich mergen:** gewollt, fachlich richtig, einfach, kein besserer Weg, Regeln eingehalten. Weiter mit Schritt 7.
- **Übernehmen und fertig machen:** gewollt und der Weg stimmt, aber etwas fehlt oder ist falsch (Doku, Tests, Quellenangabe, fachlicher Fehler mit eindeutiger Quelle, Vereinfachung, Regelverstoß). Weiter mit Schritt 6.
- **Anhalten:** nicht gewollt, grundsätzlich falscher Ansatz, mehrere Themen, eine Entscheidung für den Maintainer oder eine fachliche Frage ohne eindeutige Quelle. Nichts posten, nichts ändern; der prüfenden Person nach der Vorlage „Angehalten“ in `vorlagen.md` berichten und auf ihr Wort warten.

Ablehnen und Schließen entscheidet der Maintainer. Lehnt er ein Thema grundsätzlich ab, eine Zeile für „Bewusst nicht“ in der Roadmap des Projekts vorschlagen, falls es eine führt (eigener Pull Request).

## 6. Übernehmen und fertig machen

- **Kleinigkeit oder Lücke?** Kleinigkeiten (Doku, ein fehlender Test, Quellenangabe, Titel oder Beschreibung, Regelverstoß ohne Umbau) machen wir sofort selbst. Fehlt mehr (ein Akzeptanzkriterium, ein fachlicher Fehler, eine Vereinfachung mit Umbau), fragt der Kommentar zuerst, ob der Beitragende selbst nachbessern will, mit Frist von zwei Tagen als Datum: „Willst du das selbst machen? Wenn bis <Datum> nichts kommt, übernehmen wir es.“ Dann hier anhalten und der prüfenden Person melden, ab wann es weitergeht. Antwortet niemand bis dahin oder bittet der Beitragende darum, weiter mit „Ergänzen“; bessert er selbst nach, mit Schritt 1 auf dem neuen Stand.
- **Kommentar im Pull Request**, bevor die ersten Commits kommen: nach „Umgangston“ Dank, was gut ist, und was wir noch ergänzen (bei einer Lücke mit der Frage und der Frist von oben), als Liste mit Grund und Link auf Regel oder Quelle. Keine Duplikate des „PR-Regeln“-Kommentars. Am Ende die Kennzeichnung, welcher Agent ihn erzeugt hat.
- **Ergänzen:** je Punkt eigene Commits auf den Branch des Pull Requests, wie in `tdd-review`, Schritt 4 (Commits des Beitragenden nie umschreiben; bei einem fremden Fork nach Skill `fork-pushen`). Ein fachlicher Fehler beginnt mit einem roten Test. Geprüft nach Skill `checks`.
- **Beschreibung nachziehen:** Sie nennt danach alles, was der Pull Request tut, auch unsere Ergänzungen; sie wird der Squash-Commit.
- Danach ist diese Session fürs TDD-Review nicht mehr unabhängig: weiter mit Schritt 7 über einen frischen Agenten oder Subagenten nach `tdd-review`, Schritt 0.

## 7. TDD-Review und Merge

- **Review schon mitgebracht?** Wann es zählt, steht in docs/mitwirken.md des Projekts, „Review“. Im Pull Request nachsehen: Hinweis auf frischen Agenten oder andere Person, je Befund ein roter Test mit Commits für Test und Fix, ein Abschlusskommentar ohne spätere Commits, CI auf dem aktuellen Stand grün; dasselbe Konto für Autor und Reviewer ist kein Hindernis. Fehlt ein Merkmal, haben wir nach Schritt 6 Commits ergänzt oder lässt Schritt 2 einen Zweifel offen: eigenes Review.
- Sonst Skill `tdd-review` bis zum Merge, mit dessen Regeln für Runden und CI; Markdown im PR parallel nach `doku-pruefen` (`tdd-review`, Schritt 0). Ohne eigene Commits in dieser Session darf sie das Review selbst machen.
- **Nicht heikel** (nach Schritt 2): mergen per Squash, sobald die CI auf dem aktuellen Stand grün ist (oder nur ein Check rot, der auf `main` genauso rot ist, nach „Wer mergt was“ in docs/mitwirken.md des Projekts) und Titel und Beschreibung passen. Der Aufruf durch den Maintainer genügt; ein Collaborator holt vorher seine Zustimmung ein.
- **Heikel** (nach Schritt 2): bis grün fertig machen, dann nicht mergen, sondern dem Maintainer nach der Vorlage „Heikel“ in `vorlagen.md` berichten und auf sein „OK“ warten.
  Erst nach dem „OK“ mergen; ein Collaborator holt es beim Maintainer ein. Kommen Fragen, sie beantworten oder nachbessern, nicht ohne „OK“ mergen.
- Hält `tdd-review` an (offener schwerer Befund nach vier Runden, fachliche Entscheidung), nicht mergen und berichten.
- Nach dem Merge ein kurzer Dank im Pull Request: was die Änderung den Nutzern bringt, dass sie mit dem nächsten Release kommt, gern eine passende nächste Karte oder ein Issue für den Einstieg.

