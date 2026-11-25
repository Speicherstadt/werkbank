---
name: "release"
description: "Eine neue Version eines Projekts der Speicherstadt veröffentlichen (Release Candidate, Minor oder Patch) und danach prüfen, dass Artefakte, GitHub-Release und das Schließen der Issues durchgelaufen sind. Wenn der Maintainer ein Release will oder fragt, ob eins fällig ist."
---

# Release

Wie das Projekt veröffentlicht wird (Workflows, Artefakte, Release Candidates), steht in seiner Entwicklungs-Doku unter „Veröffentlichen“ (AGENTS.md sagt, wo); was mit den Issues passiert, in docs/mitwirken.md des Projekts unter „Vom Issue zum Release“. Artefakte, Tags, GitHub-Release und das Schließen der Issues machen die Workflows des Projekts, sobald der Tag da ist; das Schließen der Issues der wiederverwendbare Workflow der Werkbank (`werkzeug/board/release.ts`). Dieser Skill entscheidet, prüft und kontrolliert.

**Ausgelöst wird nur nach ausdrücklichem OK des Maintainers.** Ein Release geht an alle Nutzer, und ob ein RC stabil ist, entscheidet er nach seinem Test.

## 1. Stand

```sh
git fetch origin main --tags
git describe --tags --abbrev=0 --match 'v*'        # letzter Tag der App, nicht die Tags einzelner Pakete
git log --oneline <letzter-tag>..origin/main
```

Hat das Projekt ein Skript für die Vorschau (Skill `checks` oder AGENTS.md nennen es), nennt es dasselbe samt Vorschlag für die Art, den Issues, die eine fertige Version schließt, und den Hinweisen für das Release.

Die Squash-Commits auf `main` sind die PR-Beschreibungen; ihre erste Zeile ist der Titel mit `(#PR)`.

## 2. Art vorschlagen

| Lage | Vorschlag | Ergebnis aus `0.7.0` |
| --- | --- | --- |
| Neue Migrationen oder Änderungen an fachlich heiklen Pfaden (`heikel` in .github/werkbank.json, docs/mitwirken.md des Projekts) | erst ein RC: `preminor` (neue Funktionen) oder `prepatch` (nur Fixes) | `v0.8.0-rc.1` bzw. `v0.7.1-rc.1` |
| Neue Funktionen ohne das oben | `minor` | `v0.8.0` |
| Nur Fixes und Doku | `patch` | `v0.7.1` |
| RC läuft, Fix nachgeschoben | `prerelease` | `v0.8.0-rc.2` |
| RC läuft und ist beim Maintainer stabil | `patch` | `v0.8.0` |
| Bruch mit bestehenden Installationen | `major`, nur auf ausdrücklichen Wunsch | |

Ob heikle Pfade berührt sind: `git diff --name-only <letzter-tag>..origin/main` gegen die Muster aus `heikel`; ob neue Funktionen dabei sind, entscheiden die Titel. Ein Skript des Projekts ersetzt diese Abwägung nicht.

## 3. Vorher prüfen

- **CI auf `main` grün** für den aktuellen Stand.
- **Zwischen RC und fertiger Version nur Fixes:** `git log --oneline <rc-tag>..origin/main` darf keine neuen Funktionen enthalten; sonst erst ein weiterer RC.
- **Was geschlossen wird:** Eine fertige Version schließt jedes Issue, das seit der vorigen fertigen Version mit `Umgesetzt #…` gemergt wurde. Die Liste zeigt, mit der Werkbank flach geklont (`git clone --depth 1 https://github.com/Speicherstadt/werkbank ../werkbank && (cd ../werkbank && bun install)`), im Projekt `GITHUB_REPOSITORY=<owner>/<repo> GITHUB_TOKEN=<token> bun <werkbank>/werkzeug/board/release.ts vX.Y.Z --probe`, sonst die Suche nach `Umgesetzt #` in `git log <vorige-fertige-version>..origin/main`.
- **Karten in „Im nächsten Release“, deren PR nur `Refs` hat:** Die schließt das Release nicht. Dem Maintainer melden; er schließt sie danach von Hand (Skill `board-pflegen`).
- **Offene Teile:** Karten in „In Arbeit“, deren Pull Requests seit der vorigen fertigen Version alle nur mit `Refs` gemergt sind und für die kein offener Pull Request mehr da ist. Als Liste dem Maintainer vorlegen, bevor er das Release freigibt: Was fertig ist, bekommt im letzten Pull Request `Umgesetzt` (zählt auch nach dem Merge) oder wird nach dem Release geschlossen (Skill `board-pflegen`, „offene Teile“).
- **Offene Pull Requests**, die mit hinein sollen: beim Maintainer nachfragen.
- **Hinweise für das Release:** die Abschnitte `## Für das Release` aus den Squash-Commits, beim RC seit dem letzten Tag, bei einer fertigen Version seit der vorigen fertigen Version, je Pull Request unter seinem Titel. Was nur für Entwickler gilt, streichen; Zeilenumbrüche mitten im Satz zusammenziehen.

## 4. Vorschlag an den Maintainer

Kurz: vorgeschlagene Art und Version mit Grund, die Liste der Änderungen (Titel der Squash-Commits), die Issues, die geschlossen werden, die Hinweise für das Release im Wortlaut und offene Punkte aus Schritt 3. Auf sein OK warten, auch für den Text der Hinweise.

## 5. Auslösen

So, wie die Entwicklungs-Doku des Projekts es beschreibt, meist über einen Workflow (etwa Actions → „Bump version“ mit der gewählten Art, auf `main`; mit einem GitHub-Werkzeug per `workflow_dispatch`). Er erhöht die Version, committet, taggt, und der Tag startet die Release-Workflows. Nie von Hand auf `main` pushen oder einen Tag setzen, wenn das Projekt dafür einen Workflow hat.

## 6. Danach kontrollieren

- Die Release-Workflows auf dem Tag: alle Jobs grün.
- Artefakte, die das Projekt veröffentlicht (Images in den Registries, Pakete, Downloads): die erwarteten Tags bzw. Versionen; `latest` nur bei einer fertigen Version, beim RC die Kennzeichnung als Vorabversion, wie die Doku des Projekts es nennt.
- GitHub-Release mit den Anhängen, die die Doku des Projekts nennt; beim RC als Pre-release.
- Hinweise aus Schritt 3, wenn es welche gibt, über die erzeugten Notizen setzen:

  ```sh
  gh release view vX.Y.Z --json body -q .body > notizen.md
  { printf '## Hinweise zum Update\n\n'; cat hinweise.md; printf '\n'; cat notizen.md; } > release.md
  gh release edit vX.Y.Z --notes-file release.md
  ```

  Ging eine Ankündigung (Chat, Mail) schon ohne die Hinweise raus und betrifft ein Hinweis Daten, den Maintainer fragen, ob er sie noch einmal ankündigen will.
- Fertige Version: der Job, der die Issues schließt, ist grün, seine Ausgabe nennt die geschlossenen Issues; im Board stehen sie in „Erledigt“.
- Etwas rot: nicht neu taggen; Ursache melden, beheben, beim RC `prerelease`, sonst `patch`. Scheitert nur ein Job an etwas Äußerem (etwa am Netz) und ist er wiederholbar, reicht es, ihn neu zu starten.

## 7. Beim RC: Testauftrag

Für die Testinstanz des Maintainers einen Auftrag erzeugen, angepasst an das, was der RC ändert:

```text
Teste auf diesem Server den Release Candidate vX.Y.Z-rc.N von <Projekt>. Die Instanz ist eine Testinstanz.

Regeln: Vor dem Update ein Backup der Daten machen und prüfen. Nichts an echte Gegenstellen senden (nur Testmodus), keine Mails an echte Empfänger. Testdaten danach entfernen oder stornieren. Bei einem Fehler anhalten, Logs sichern, berichten.

Ablauf: Version notieren, Backup, auf den RC umstellen und starten (Migrationen ohne Fehler?), dann prüfen:
<je Änderung des RC ein Punkt>

Bericht: Version vorher/nachher, Ergebnis je Punkt, Fehler mit Log-Auszug ohne Zugangsdaten oder personenbezogene Daten, Einschätzung: freigeben oder Fix und nächster RC.
```
