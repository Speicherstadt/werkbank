# Felder, Reihenfolge und Labels

Teil von Skill `board-pflegen`.

| Feld | Werte |
| --- | --- |
| Status | Später, Geplant, In Arbeit, Im nächsten Release, Erledigt |
| Aufwand | S, S–M, M, M–L, L |
| Bereich | die Bereiche des Projekts, wie das Feld im Board sie anbietet (`gh project field-list <nr> --owner <owner>`) |
| Hinweis | Freitext ohne Markdown: Frist, Vorbedingung, wer es übernimmt |

- **Rang** ist die Position in der Spalte, von oben nach unten. Es gibt keine Platznummer; in einer Ansicht keine Sortierung setzen, sonst ist der Rang nicht zu sehen.
- **Reihenfolge in „Geplant“:** zuerst Fehler in fachlich heiklen Bereichen (`heikel` in .github/werkbank.json), dann kleine Wünsche aus dem Alltag, dann was Nutzern nach der Roadmap des Projekts am meisten fehlt.
- **Eine Karte je Thema.** Gehören mehrere Issues zu einem Thema, stehen sie als eigene Karten direkt untereinander; Hinweis nur auf der ersten. Ein Thema ohne Issue ist ein Entwurf (Draft Item).
- **Nicht ins Board:** Fragen, Sammel-Issues, Interna (Renovate, CI), Themen unter „Bewusst nicht“.
- **Einstieg:** das Label des Projekts für den Einstieg (meist `einstieg`), für kleine, abgegrenzte Issues ohne fachlich heikle Feinheiten, die niemand übernommen hat. Auch größere Issues, die sich in kleine Pull Requests teilen lassen und deren Ergebnis Tests absichern (etwa Aufräumen ohne Verhaltensänderung).
- **Labels:** Jedes offene Issue hat einen Typ (die Typ-Labels aus docs/mitwirken.md des Projekts, „Issues schreiben“); die Formulare setzen ihn selbst, Issues per `gh issue create` oder von Agenten oft nicht. Dazu passt, wo es zutrifft, ein Themen-Label. Was jedes Label bedeutet, zeigt `gh label list --repo <owner>/<repo>`. Keine neuen Labels erfinden und keine englischen Doppel wie `bug` neben deutschen: Ein neues Label schlägt der Maintainer vor bzw. legt es an. **Fehlen im Repository die Labels, die docs/mitwirken.md oder die Issue-Formulare (`labels:` in `.github/ISSUE_TEMPLATE/`) nennen**, ist das ein Fund für Schritt 3: nach OK mit Farbe und Beschreibung wie in Speicherstadt/haben anlegen (`gh label create`), ein englisches Gegenstück vorher umbenennen statt neu anlegen (`gh label edit bug --name fehler`; die Zuweisungen bleiben), englische Standard-Labels, die an keinem Issue und keinem PR hängen, löschen. Ohne diese Labels setzen die Formulare keinen Typ; findet sich eins, das nicht in der Liste des Projekts steht, als Fund in Schritt 3 vorschlagen (ersetzen und löschen oder in die Liste aufnehmen).
