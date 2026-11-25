# Selbstprüfung

Teil von Skill `beitrag-pruefen`.

Nur für den eigenen Pull Request, statt der Schritte 5 bis 7; Urteil, Übernehmen und Merge bleiben beim Maintainer.

- **Selbst nachbessern:** Was nach den Schritten 1 bis 4 fehlt oder falsch ist, behebt der Beitragende mit eigenen Commits: ein fachlicher Fehler zuerst mit rotem Test, geprüft nach Skill `checks`, die Beschreibung nachgezogen. Die Selbstprüfung läuft einmal: Danach bekommt der Kommentar einen Nachtrag mit dem neuen Stand und je behobenem Punkt dem Commit, ohne neue Prüfrunde; ob der Code danach stimmt, prüft das unabhängige Review im nächsten Punkt. Ganz neu, wieder in einem frischen Agenten, nur wenn das Nachbessern Umfang oder Ansatz ändert (ein Thema mehr oder weniger, ein anderer Lösungsweg).
- **Kommentar im Pull Request:** Der Aufruf des Skills ist die Zustimmung dazu. Ein Kommentar je Pull Request; der Nachtrag zum Nachbessern kommt in denselben Kommentar. Was der Beitragende nicht entscheiden kann (ob die Änderung gewollt ist, eine Quelle, die nicht eindeutig ist), steht als offene Frage darin, nicht als erfüllt. Am Ende die Kennzeichnung, welcher Agent ihn erzeugt hat.

```
## Selbstprüfung (beitrag-pruefen)
Stand: <Commit-SHA>, geprüft in einem frischen Agenten ohne den Verlauf der Entstehung

### Wollen wir das?            <je Punkt ein Satz mit Beleg; ohne Issue: „Frage an den Maintainer“>
### Vollständig                | Akzeptanzkriterium | erfüllt, teilweise oder fehlt | Datei oder Test |
### Quellen und fachlich       heikel: ja | nein – | Aussage oder Fall | Quelle, Fundstelle | Ergebnis |
### Einfachste und beste Lösung?  <was gestrichen wurde oder warum es so bleibt; besserer Weg mit Stelle oder „keiner“>
### Regeln                     | Regel | Ergebnis | Stelle |  (nur ✗ und „betrifft nicht“, „Rest ✓“)
### Offene Fragen an den Maintainer
### Nachtrag: nachgebessert bis <Commit-SHA>   <je Punkt: vorher → jetzt, Commit; nur nach dem Nachbessern>
```

- **Unabhängiges Review mitbringen:** Danach Code nach Skill `tdd-review`, Markdown nach Skill `doku-pruefen`, bei beidem parallel, je in einem frischen Agenten oder Subagenten (Skill `beitrag`, Schritt 6).
