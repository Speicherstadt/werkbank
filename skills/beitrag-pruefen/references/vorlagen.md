# Berichte an den Maintainer

Teil von Skill `beitrag-pruefen`.

## Angehalten (Schritt 5)

```
## <PR-Link> – <Titel>
**Angehalten, weil:** <ein Satz>
**Vorschlag:** Ablehnen | Teilen | <Entscheidung> – <zwei bis drei Sätze, mit besserem Weg, wenn es einen gibt>

### Wollen wir das?            <je Punkt ein Satz mit Beleg>
### Quellen und fachlich       | Aussage oder Fall | Quelle, Fundstelle | Ergebnis |
### Einfachste und beste Lösung?  <was sich streichen ließe, besserer Weg, je mit Stelle; sonst „passt“>
### Regeln                     | Regel | Ergebnis | Stelle |  (nur ✗, „Rest ✓“)
### Fragen an dich
```

## Heikel, bereit zum Merge (Schritt 7)

Höchstens fünf Zeilen:

```
<PR-Link> – fachlich: <was sich am fachlich heiklen Verhalten ändert, ein Satz>
Quelle: <Fundstelle> – gegengerechnet: <Fall: erwartet = Test>, <Randfall: erwartet = Test>
Ergänzt von uns: <Commits in einem Halbsatz>; TDD-Review: <Befunde, behoben>
Bestehende Daten: <was beim Update passiert, oder „unberührt“>
Offen oder unsicher: <oder „nichts“>  –  CI grün, bereit zum Merge
```
