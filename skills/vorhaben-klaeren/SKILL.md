---
name: "vorhaben-klaeren"
description: "Einen Plan, Wunsch oder Entwurf in einem Projekt der Speicherstadt vor dem Bauen mit der Person durchfragen, bis keine Entscheidung mehr offen ist. Vor einem größeren Issue oder Umbau, vor dem Plan zu /übernehmen, oder wenn jemand ausgefragt werden will."
---

# Vorhaben klären

Ein Pull Request kann alle Tests bestehen und trotzdem falsch sein, weil eine Annahme nie gefragt wurde.

## Fakten sucht der Agent, entscheiden muss die Person

- **Fakten** (wie der Code heute arbeitet, was eine Quelle sagt, was ein Issue schon festhält) nie fragen, sondern selbst nachsehen, auf dem aktuellen `main`. Dauert das länger, einen Subagenten damit losschicken und die Fragen, die nicht davon abhängen, schon stellen.
- **Entscheidungen** (was das Ergebnis tun soll, was nicht, was es Nutzern zusagt, welche Lösung bei mehreren guten) gehören der Person. Jede ihr vorlegen und auf die Antwort warten, nie selbst beantworten.

## Der Baum der Entscheidungen

Jede Entscheidung zieht weitere nach sich. Offen sind gerade die, deren Voraussetzungen schon geklärt sind: Sie lassen sich jetzt fragen, ohne eine Antwort zu erraten, die noch aussteht. Eine Frage, die von einer anderen Frage derselben Runde abhängt, gehört in die nächste.

Besonders nachfragen, was kein Test prüfen kann: was das Ergebnis Nutzern verspricht oder schriftlich bestätigt, was Recht, Norm oder Format verlangen (mit Quelle), was mit bestehenden Daten passiert, was ausdrücklich nicht dazugehört.

## In Runden fragen

Je Runde alle Fragen, die gerade offen sind, nummeriert und jede mit Empfehlung, so formuliert, dass „ja“ die Empfehlung annimmt:

```
❓ **F1 – <Titel>:** <Frage, bei Bedarf mit Möglichkeiten und dem, was dafür und dagegen spricht>

➡️ <Empfehlung>

---

❓ **F2 – <Titel>:** …
```

Dann auf die Antworten warten. Jede Antwort klärt Entscheidungen und macht neue fragbar; daraus die nächste Runde bauen.

## Fertig

Fertig, wenn keine Frage mehr offen ist: jeder Zweig besucht, nichts stillschweigend angenommen. Dann das Ergebnis kurz zusammenfassen (entschieden, bewusst nicht dabei, noch offen mit Grund) und die Person bestätigen lassen, dass das gemeinsame Verständnis stimmt. Erst danach bauen.

Wohin das Ergebnis geht, sagt die Person: in ein neues oder bestehendes Issue (Skill `issue-schreiben`), als Plan unter `/übernehmen` oder nur in diese Session. Issues anlegen und kommentieren nur auf ihren Auftrag.
